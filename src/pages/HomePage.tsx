import { ConsoleHeader } from '../components/ConsoleHeader/ConsoleHeader';
import { ServiceCard } from '../components/ServiceCard/ServiceCard';
import type { BadgeData } from '../components/ServiceCard/ServiceCard';
import { AssetIcon } from '../components/AssetIcon/AssetIcon';
import type { AssetIconName } from '../components/AssetIcon/AssetIcon';
import styles from './HomePage.module.css';

type Workspace = { title: string; description: string; icon: AssetIconName; badges?: BadgeData[]; locked?: boolean; to?: string };
type RecentItem = { title: string; sub: string; icon: AssetIconName };

// Content lives in plain lists; the page loops over them to draw cards (no copy-pasting markup)
const workspaces: Workspace[] = [
  { title: 'Web App & API Protection', icon: 'web-app-and-api-protection', description: 'Create Load balancer and configure WAF, Bot, and API security services for your apps' },
  { title: 'Bot & Risk Management', icon: 'bot-defense', to: '/summary', description: 'Detect, assess and mitigate bots and high-risk activity across digital applications.' },
  { title: 'Multi Cloud App Connect', icon: 'load-balancers', locked: true, description: 'Connect apps across clouds, edge and on-premises using Load Balancers' },
  { title: 'Multi-Cloud-Network Connect', icon: 'web-app-and-api-protection', description: 'Networking & security across clouds, edge and on-premises' },
  { title: 'DNS Management', icon: 'web-app-and-api-protection', description: 'Configure and manage primary or secondary DNS service' },
  { title: 'Client-Side Defense', icon: 'web-app-and-api-protection', badges: [{ label: 'Limited Availability' }], description: 'Monitor and mitigate fraudulent app requests at the client devices' },
  { title: 'Observability', icon: 'application-traffic-insight', description: 'Easily monitor your critical applications and systems from regions around the world' },
  { title: 'Content Delivery Network', icon: 'content-delivery-network', locked: true, badges: [{ label: 'Limited Availability' }, { label: 'Early Access' }], description: 'Optimize asset delivery with content caching' },
];
const moreWorkspaces: Omit<Workspace, 'description'>[] = [
  { title: 'Web App Scanning', icon: 'web-app-scanning' },
  { title: 'BIG-IP Utilities', icon: 'big-ip-utilities', locked: true },
  { title: 'Routed DDoS', icon: 'ddos-and-transit-services', locked: true, badges: [{ label: 'LA' }, { label: 'EA' }, { label: 'Unavailable', variant: 'unavailable' }] },
  { title: 'Application Traffic Insights', icon: 'application-traffic-insight' },
  { title: 'NGINX One', icon: 'nginx-one', locked: true, badges: [{ label: 'New', variant: 'new' }] },
];
const recent: RecentItem[] = [
  { title: 'Multi-Cloud App Connect', sub: 'HTTP Load Balancers', icon: 'load-balancers' },
  { title: 'Bot Defense', sub: 'About', icon: 'bot-defense-recent' },
  { title: 'Content Delivery Network', sub: 'About', icon: 'content-delivery-network' },
  { title: 'Content Delivery Network', sub: 'About', icon: 'content-delivery-network' },
];
const getStarted = ['Quickstart Tutorials', 'Operational References', 'Release Notes'];
const footerLinks = ['Policies', 'Trademarks', 'F5 CA Privacy Summary', 'Do Not Sell My Personal Information', 'Cookie Preferences'];

export function HomePage() {
  return (
    <div className={styles.page}>
      <ConsoleHeader />
      <main className={styles.content}>
        <h1 className={styles.hero}>Welcome to Distributed Cloud</h1>
        <div className={styles.columns}>
          <div>
            <div className={styles.sectionHead}>
              <h2 className={styles.h2}>Your Workspaces</h2>
              <a href="#" className={styles.catalog}>Go to Catalog</a>
            </div>
            <div className={styles.grid}>
              {workspaces.map((w) => <ServiceCard key={w.title} {...w} />)}
            </div>

            <h2 className={`${styles.h2} ${styles.moreTitle}`}>More Workspaces</h2>
            <p className={styles.sub}>Improve your experience with additional capabilities. Visit the Catalog to see <a href="#">more workspaces</a>.</p>
            <div className={styles.grid3}>
              {moreWorkspaces.map((w) => <ServiceCard key={w.title} {...w} compact />)}
            </div>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <aside>
            <h2 className={styles.h2}>Recently Visited</h2>
            <ul className={styles.recent}>
              {recent.map((r, i) => (
                <li key={i}><AssetIcon name={r.icon} size={20} />
                  <a href="#"><span>{r.title}</span><small>{r.sub}</small></a>
                </li>
              ))}
            </ul>
            <h2 className={`${styles.h2} ${styles.getStarted}`}>Get Started</h2>
            <ul className={styles.links}>
              {getStarted.map((t) => <li key={t}><a href="#">{t}</a> <AssetIcon name="external" size={16} /></li>)}
            </ul>
          </aside>
        </div>
      </main>
      <footer className={styles.footer}>
        <span>©2026 F5, Inc. All rights reserved.</span>
        {footerLinks.map((l) => <a key={l} href="#">{l}</a>)}
      </footer>
    </div>
  );
}
