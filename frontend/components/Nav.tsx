"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "home" },
  { href: "/experience", label: "experience" },
  { href: "/projects", label: "projects" },
  { href: "/community", label: "community" },
  { href: "/awards", label: "awards" },
  { href: "/features", label: "features" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center pt-5 px-4 sticky top-4 z-50">
      <div className="bg-yellow rounded-full px-8 py-2.5 flex gap-8 items-center shadow-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-indigo text-sm font-body transition-opacity hover:opacity-60 ${
              pathname === link.href ? "font-bold" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
