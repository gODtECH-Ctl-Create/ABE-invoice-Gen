"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/", "Overview"],
  ["/invoices", "Invoices"],
  ["/projects", "Projects"],
  ["/settings", "Company setup"],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className="shell"><nav className="nav"><Link className="brand" href="/">ABE <span>Invoice & Projects</span></Link><div className="navlinks">{links.map(([href,label]) => <Link key={href} href={href} className={pathname === href || (href !== "/" && pathname.startsWith(href)) ? "active" : ""}>{label}</Link>)}</div></nav>{children}</div>;
}
