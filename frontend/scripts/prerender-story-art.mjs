/**
 * Rasterize the existing procedural artwork, without changing its geometry.
 * Run manually with `npm run artwork`; generated assets are checked in so the
 * browser composites images instead of rebuilding SVG noise and CSS masks.
 * Sharp ships with Next's image optimizer; this adds no runtime dependency.
 */
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const output = fileURLToPath(new URL("../public/assets/decor/", import.meta.url));
await mkdir(output, { recursive: true });
const body = "M121 64c20-1 39 12 47 30 8 17 6 39-5 54-11 16-31 25-50 22-19-2-36-16-42-34-6-17-2-38 11-51 10-11 25-20 39-21z";
const scratches = [
  ["M96 148c14-19 30-35 48-48", 3.4, 1],
  ["M104 158c12-14 25-27 39-37", 2.6, .7],
  ["M92 126c10-14 22-26 36-35", 2.2, .6],
  ["M120 156c9-11 19-20 30-27", 2.8, .5],
  ["M86 138c6-9 13-17 21-24", 2, .45],
  ["M138 150c6-6 12-12 17-19", 2.2, .4],
];
const rays = ["M120 44L120 -2", "M160.6 63L182.1 40.6", "M183.1 100.4L228.3 92.4", "M190.3 155.2L232.2 174", "M155.9 186.7L172 220.1", "M116.1 195L112.1 244", "M76.4 183.6L52.2 216.4", "M48.9 148.6L4 158.6", "M43.6 96.2L2.4 82", "M78.4 62.6L57.9 37.5", "M97.7 47.6L83.6 5.7", "M143 51L160 20"];
const sun = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-48 -48 336 336" width="672" height="672">
<defs><filter id="grain" x="-25%" y="-25%" width="150%" height="150%">
<feTurbulence type="fractalNoise" baseFrequency=".28" numOctaves="5" seed="11" result="n"/>
<feColorMatrix in="n" type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, .6 .35 .25 0 -.32" result="g"/>
<feComposite in="SourceGraphic" in2="g" operator="out" result="sp"/>
<feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="3" seed="4" result="t"/>
<feDisplacementMap in="sp" in2="t" scale="5" xChannelSelector="R" yChannelSelector="G"/>
</filter><filter id="shadow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
<feGaussianBlur in="SourceAlpha" stdDeviation="12.413793"/>
<feOffset dy="8.275862" result="blur"/><feFlood flood-color="rgb(96,70,20)" flood-opacity=".22"/>
<feComposite in2="blur" operator="in"/>
<feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
</filter></defs>
<g filter="url(#shadow)"><g filter="url(#grain)"><path d="${body}" fill="#f7b500"/><path d="${body}" fill="none" stroke="#e09600" stroke-width="5" opacity=".5"/>
<g stroke="#ffe98a" stroke-linecap="round" fill="none" opacity=".6">${scratches.map(([d, width, opacity]) => `<path d="${d}" stroke-width="${width}" opacity="${opacity}"/>`).join("")}</g>
<g stroke="#f7b500" stroke-width="6.5" stroke-linecap="round" fill="none">${rays.map(d => `<path d="${d}"/>`).join("")}</g></g></g></svg>`;
// Shadow units are rendered CSS px (6px at the original 116px sun),
// converted to the original 240-unit viewBox. Padding retains rays and shadow.
await sharp(Buffer.from(sun)).webp({ quality: 90, alphaQuality: 90, effort: 6 }).toFile(`${output}sun.webp`);

// CSS's default radial ellipse uses farthest-corner radii. A closest-side
// alpha mask and elliptical border radii are baked into each separate texture;
// their relative scroll-controlled rotations remain in CSS.
const layers = {
  pigment: {
    corners: [.43, .57, .61, .39, .54, .43, .57, .46],
    gradients: [
      [.44, .54, [[0, [158, 203, 231, .74]], [.38, [176, 212, 236, .68]], [.72, [176, 212, 236, 0]]]],
      [.57, .42, [[0, [170, 207, 236, .6]], [.42, [194, 223, 242, .54]], [.74, [194, 223, 242, 0]]]],
      [.48, .48, [[.18, [209, 229, 242, 1]], [.58, [183, 217, 239, .58]], [.76, [183, 217, 239, 0]]]],
    ],
  },
  edge: {
    corners: [.57, .43, .42, .58, .46, .59, .41, .54],
    gradients: [
      [.34, .59, [[.12, [153, 195, 227, .28]], [.55, [153, 195, 227, 0]]]],
      [.67, .37, [[.1, [166, 205, 235, .32]], [.57, [166, 205, 235, 0]]]],
    ],
  },
  pool: {
    corners: [.48, .52, .57, .43, .61, .43, .57, .39],
    gradients: [
      [.57, .54, [[0, [142, 190, 225, .18]], [.63, [142, 190, 225, 0]]]],
      [.38, .43, [[0, [228, 240, 248, .7]], [.68, [228, 240, 248, 0]]]],
    ],
  },
};
function roundedRect([tl, tr, br, bl, tly, try_, bry, bly]) {
  return `M${tl} 0H${1-tr}A${tr} ${try_} 0 0 1 1 ${try_}V${1-bry}A${br} ${bry} 0 0 1 ${1-br} 1H${bl}A${bl} ${bly} 0 0 1 0 ${1-bly}V${tly}A${tl} ${tly} 0 0 1 ${tl} 0Z`;
}
for (const [name, { corners, gradients }] of Object.entries(layers)) {
  const definitions = gradients.map(([x, y, stops], index) => {
    const rx = Math.max(x, 1-x) * Math.SQRT2;
    const ry = Math.max(y, 1-y) * Math.SQRT2;
    return `<radialGradient id="g${index}" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="translate(${x} ${y}) scale(${rx} ${ry})">${stops.map(([offset, [r,g,b,a]]) => `<stop offset="${offset}" stop-color="rgb(${r},${g},${b})" stop-opacity="${a}"/>`).join("")}</radialGradient>`;
  }).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1 1"><defs>${definitions}
<radialGradient id="fade"><stop offset=".52" stop-color="white"/><stop offset=".7" stop-color="white" stop-opacity=".72"/><stop offset=".86" stop-color="white" stop-opacity=".2"/><stop offset="1" stop-color="white" stop-opacity="0"/></radialGradient>
<mask id="mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1" height="1"><circle cx=".5" cy=".5" r=".5" fill="url(#fade)"/></mask><clipPath id="border"><path d="${roundedRect(corners)}"/></clipPath></defs>
<g clip-path="url(#border)" mask="url(#mask)">${gradients.map((_, i) => `<rect width="1" height="1" fill="url(#g${gradients.length-i-1})"/>`).join("")}</g></svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 90, alphaQuality: 90, effort: 6 }).toFile(`${output}wash-${name}.webp`);
}
console.log("Prepared sun and three independently moving wash textures.");
