import Link from "next/link";

const links = [
  ["⌂", "Overview", "/workspace"], ["✧", "Events", "/workspace/events"], ["♧", "Guests & RSVPs", "/workspace/guests"],
  ["◷", "Expenses", "/workspace/expenses"], ["▧", "Photo album", "/workspace/album"], ["⚙", "Settings", "/workspace/settings"]
];

export default function WorkspaceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="layout"><aside className="sidebar"><Link href="/workspace" className="brand"><span className="brand-mark">g</span><span className="brand-name">gather</span></Link>
    <div className="wedding-switch"><div className="eyebrow">Your wedding</div><div className="switch-title">Anaya & Arjun⌄</div></div>
    <div className="nav-label">Workspace</div><nav className="nav">{links.map(([icon,label,href])=><Link key={href} href={href}><span className="nav-icon">{icon}</span>{label}</Link>)}</nav>
    <div className="sidebar-bottom"><div className="help-card"><span className="eyebrow">A little help</span><strong>Here for the happy chaos</strong><p>Find your way around your wedding workspace.</p><a className="top-link" href="#help">Visit help centre ↗</a></div><div className="user-row"><div className="avatar">A</div><div className="user-meta"><strong>Anaya Mehta</strong><span>Admin · Demo account</span></div></div></div>
  </aside><main className="main"><header className="topbar"><div className="mobile-brand"><span className="brand-mark">g</span> gather</div><div className="crumb">Workspace <span style={{color:"#c2c1b9"}}> / </span> <strong style={{color:"#363934"}}>Anaya & Arjun</strong></div><div className="top-actions"><a className="top-link" href="/w/anaya-arjun">↗ View wedding site</a><span className="avatar" style={{width:30,height:30,fontSize:11}}>A</span></div></header>{children}</main>
    <nav className="mobile-nav">{links.slice(0,5).map(([icon,label,href])=><Link href={href} key={href}><span>{icon}</span><span>{label.split(" ")[0]}</span></Link>)}</nav>
  </div>;
}
