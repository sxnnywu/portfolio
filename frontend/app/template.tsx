/**
 * Next remounts a template on every navigation, which is what gives each page
 * its own entry. Opacity only, deliberately: transform or filter here would
 * make this element the containing block for the fixed header and like button.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div data-page>{children}</div>;
}
