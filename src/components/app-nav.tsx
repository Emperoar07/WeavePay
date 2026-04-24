"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DynamicInitiaHeaderActions } from "@/components/initia-dynamic";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/invoices/new", label: "Create" },
  { href: "/settings", label: "Verify" },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="nav-mark">WP</div>
        <div>
          <p className="nav-logo-name">WeavePay</p>
          <p className="nav-logo-sub">Initia checkout rail</p>
        </div>
      </div>

      <div className="nav-links">
        {navLinks.map(({ href, label }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} data-active={active}>
              {label}
            </Link>
          );
        })}
      </div>

      <div className="nav-actions">
        <DynamicInitiaHeaderActions />
      </div>
    </nav>
  );
}
