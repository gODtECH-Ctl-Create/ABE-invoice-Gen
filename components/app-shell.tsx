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
  return <div className="shell"><nav className="nav"><Link className="brand" href="/">ABE <span>Invoice & Projects</span></Link><div className="navlinks">{links.map(([href,label]) => <Link key={href} href={href} className={pathname === href || (href !== "/" && pathname.startsWith(href)) ? "active" : ""}>{label}</Link>)}</div><span title="Your workspace is stored in this browser on this device" style={{marginLeft:"auto",fontSize:11,fontWeight:800,padding:"7px 10px",borderRadius:999,border:"1px solid #d8ebae",background:"rgba(183,255,60,.12)",color:"#30420e",whiteSpace:"nowrap"}}>On-device</span></nav>{children}</div>;
}
