import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card/Card';
import { SideNav } from '../components/SideNav/SideNav';
import { AssetIcon } from '../components/AssetIcon/AssetIcon';
import { Donut } from '../components/charts/Donut';
import { HBars } from '../components/charts/HBars';
import { StackedColumns } from '../components/charts/StackedColumns';
import styles from './BotReportPage.module.css';

// Numbers live in plain lists. Swap them for real API data later.
const categories = [
  { name: 'Web Crawler', abs: '10k', pct: '16.67%', color: 'var(--viz-gigas)' },
  { name: 'Search Engine Optimization', abs: '10k', pct: '16.67%', color: 'var(--viz-chetwode)' },
  { name: 'Advertising & Marketing', abs: '5k', pct: '8.33%', color: 'var(--viz-red-violet)' },
  { name: 'Page Preview', abs: '5k', pct: '8.33%', color: 'var(--viz-lavender-magenta)' },
  { name: 'Algorithm Tracker', abs: '1K', pct: '0.13%', color: 'var(--viz-mai-tai)' },
  { name: 'All Others', abs: '30k', pct: '50%', color: 'var(--color-n300-haze)' },
];
const proportion = [
  { w: 30, c: 'var(--viz-cornflower)' }, { w: 75, c: 'var(--viz-red-violet)' }, { w: 50, c: 'var(--viz-mai-tai)' },
  { w: 25, c: 'var(--viz-pizazz)' }, { w: 12, c: 'var(--viz-forest-green)' }, { w: 12, c: 'var(--viz-malibu)' },
];
const actions = [
  { label: 'Web Crawler', a: 255, b: 90 }, { label: 'Search Engine Optimization', a: 218, b: 70 },
  { label: 'Advertising & Marketing', a: 330, b: 255 }, { label: 'Monitoring & Analytics', a: 108, b: 255 },
  { label: 'All Others', a: 90, b: 55 },
];
const legend = [
  ['Web Crawler: 10k', 'var(--viz-gigas)'], ['Search Engine Optimization: 10k', 'var(--viz-chetwode)'],
  ['Advertising & Marketing: 5K', 'var(--viz-red-violet)'], ['Monitoring & Analytics: 5K', 'var(--viz-lavender-magenta)'],
  ['Page Preview: 1K', 'var(--viz-mai-tai)'], ['Algorithm Tracker: 1K', 'var(--viz-pizazz)'],
  ['Search Flow Analyzer: 1K', 'var(--viz-night-shadz)'], ['Something A: 1K', 'var(--viz-froly)'],
  ['Something B: 1K', 'var(--viz-sushi)'], ['Something C: 1K', 'var(--viz-malibu)'],
];
// Illustrative values eyeballed from the design; each inner list stacks bottom to top
const timeColumns = [[8], [8, 0, 20, 0, 0, 0, 0, 0, 0, 9], [8, 36], [8], [8, 6, 8, 12], [8, 6, 10, 4, 6, 0, 8, 12], [8, 0, 24], [8], [8], [8], [8, 0, 0, 0, 0, 20], [8], [8], [8], [8, 0, 0, 0, 0, 0, 0, 0, 4], [8, 12, 0, 0, 0, 0, 0, 0, 0, 5], [8], [8], [8, 0, 0, 0, 0, 0, 0, 0, 0, 5], [8], [8, 0, 28, 6, 0, 8, 0, 0, 10], [8, 0, 0, 0, 0, 20], [8], [8]];
const timeColors = ['var(--viz-gigas)', 'var(--viz-chetwode)', 'var(--viz-red-violet)', 'var(--viz-lavender-magenta)', 'var(--viz-mai-tai)', 'var(--viz-pizazz)', 'var(--viz-night-shadz)', 'var(--viz-froly)', 'var(--viz-sushi)', 'var(--viz-malibu)'];
const timeLabels = ['12:00 AM', '2:00 AM', '4:00 AM', '6:00 AM', '8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM', '12:00 AM'];
const topBots = [['EchoPulseAI', 100, '6%'], ['SignalSeeker', 60, '3%'], ['NimbusAnalyzer', 60, '3%'], ['OmegaScribe', 40, '2%'], ['CoreBeacon', 20, '1%']] as const;
const rows = [
  ['/api/v1/user/login', 'Human Interaction Verification', 'Web Crawler', 'Amazon', '↓ 2.5%'],
  ['/fetch/data', 'Challenge Rules', 'Web Crawler', 'Google', 'No Change'],
  ['/security/bot-detection', 'Behavior Watch', 'Web Crawler', 'Google', '↑ 2.5%'],
  ['/ads/recommendations', 'Quarantine Filters', 'Search Engine Optimization', 'Google', '↑ 2.5%'],
  ['/seo/audit', 'API Traffic Regulation', 'Page Preview', 'Google', '↑ 2.5%'],
  ['/notifications/unread', 'Behavioral Traffic Analysis', 'Page Preview', 'Amazon', '↑ 2.5%'],
  ['/preview/page/{id}', 'Behavior Watch', 'Web Crawler', 'Apple', '↑ 2.5%'],
  ['/rss/subscriptions', 'Challenge Rules', 'Web Crawler', 'Amazon', 'No Change'],
  ['/ai/models/train', 'Human Interaction Verification', 'Web Crawler', 'Apple', '↑ 2.5%'],
  ['/webhooks/subscribe', 'Human Interaction Verification', 'Web Crawler', 'Facebook', 'No Data'],
];
const startFilters = [
  { field: 'Action Taken', op: 'In', value: 'Block, Continue' },
  { field: 'Bad Reason', op: 'In', value: 'Token Invalid, Token Missing' },
];
const aiBreakdown = [
  { name: 'AI Crawlers', total: '8K', color: 'var(--viz-red-violet)', children: [['Block', '7K', 'var(--viz-froly)'], ['Continue', '1K', 'var(--viz-amber)']] },
  { name: 'AI Agent Actions', total: '3K', color: 'var(--color-dodger-blue)', children: [['Block', '7K', 'var(--viz-froly)'], ['Continue', '0', 'var(--viz-amber)']] },
] as const;

function Stat({ label, value, sub, trend }: { label: string; value: string; sub: string; trend?: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <strong>{value} <small>{sub}</small></strong>
      {trend && <span className={styles.pill}>{trend}</span>}
    </div>
  );
}

export function BotReportPage() {
  const [filters, setFilters] = useState(startFilters); // the chips in the filter bar

  return (
    <div className={styles.shell}>
      <SideNav active="Known Bot Report" />
      <div className={styles.main}>
        <header className={styles.top}>
          <div>
            <small className={styles.crumbs}>Home &gt; Bot Defense &gt; Report</small>
            <h1 className={styles.h1}>Known Bot Report</h1>
          </div>
          <div className={styles.account}><span>Support</span><AssetIcon name="avatar" size={32} /></div>
        </header>

        <div className={styles.filters}>
          {['Saved Filters', 'Environment: Production', 'Region: US', 'Last 7 days', 'Refresh'].map((f) => <button type="button" key={f}>{f}</button>)}
        </div>
        <div className={styles.filterBar}>
          <svg className={styles.filterIcon} viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2 3h12L9 8.5V13l-2 1V8.5L2 3Z" />
          </svg>
          {filters.map((f, i) => (
            <span key={f.field} className={styles.filterGroup}>
              {i > 0 && <em>AND</em>}
              <span>{f.field}</span> <span>{f.op}</span> <span className={styles.filterValue}>{f.value}</span>
            </span>
          ))}
          <a href="#" className={styles.blueLink}>Add Filter</a>
          <span className={styles.spacer} />
          <button type="button" className={styles.clear} onClick={() => setFilters([])} disabled={filters.length === 0}>Clear All</button>
          <Link to="/advanced-filter" className={styles.blueLink}>Switch to Advanced Filter</Link>
        </div>

        <div className={styles.grid}>
          <Card title="Known Bot Highlights">
            <div className={styles.stats}>
              <Stat label="Total Transactions" value="50K" sub="(100%)" trend="↓ 2.5%" />
              <Stat label="Distinct Known Bots" value="67" sub="/90" trend="↓ 2.5%" />
              <Stat label="Distinct AI Bots" value="2" sub="/67" trend="↑ 2.5%" />
              <Stat label="Distinct Categories" value="12" sub="/15" trend="↑ 2.5%" />
            </div>
            <a href="#" className={styles.cardLink}>Go to Peer Comparison</a>
          </Card>

          <Card title="AI Transactions Breakdown">
            <div className={styles.donutRow}>
              <Donut center="10K"
                outer={[{ value: 8, color: 'var(--viz-red-violet)' }, { value: 3, color: 'var(--color-dodger-blue)' }]}
                inner={[{ value: 7, color: 'var(--viz-froly)' }, { value: 1, color: 'var(--viz-amber)' }, { value: 7, color: 'var(--viz-froly)' }, { value: 0.01, color: 'var(--viz-amber)' }]} />
              <div className={styles.aiLegend}>
                <div className={styles.legendHeader}><span>Known Bots</span><span>Total</span></div>
                {aiBreakdown.map((group) => (
                  <div className={styles.legendGroup} key={group.name}>
                    <div className={styles.legendParent}>
                      <span className={styles.legendName}><span className={styles.legendSwatch} style={{ background: group.color }} />{group.name}</span>
                      <strong>{group.total}</strong>
                    </div>
                    <div className={styles.legendChildren}>
                      {group.children.map(([label, total, color]) => (
                        <div className={styles.legendChild} key={label}>
                          <span className={styles.legendName}><span className={styles.legendSwatch} style={{ background: color }} />{label}</span>
                          <strong>{total}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Transactions per Category">
            <span className={styles.statLabel}>Total Transactions</span>
            <strong className={styles.big}>50K <small>(100%)</small> <span className={styles.pillGreen}>↑ 2.5%</span></strong>
            <div className={styles.proportion}>{proportion.map((p, i) => <span key={i} style={{ flex: p.w, background: p.c }}>{p.w}</span>)}</div>
            <table className={styles.table}>
              <thead><tr><th>Category</th><th>Absolute</th><th>Percentage</th><th>Trend</th></tr></thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.name}>
                    <td><i className={styles.dot} style={{ background: c.color }} /><a href="#">{c.name}</a></td>
                    <td>{c.abs}</td><td>{c.pct}</td><td><span className={styles.pill}>↑ 2.5%</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a href="#" className={styles.cardLinkRight}>View All</a>
          </Card>

          <Card title="Actions Taken per Category">
            <div className={styles.legendRow}>
              <div><i className={styles.sq} style={{ background: 'var(--viz-froly)' }} /> Block <strong className={styles.big}>40K <small>(80%)</small></strong></div>
              <div><i className={styles.sq} style={{ background: 'var(--viz-amber)' }} /> Continue <strong className={styles.big}>10K <small>(20%)</small></strong></div>
            </div>
            <HBars rows={actions} max={350} colorA="var(--viz-froly)" colorB="var(--viz-amber)" />
            <a href="#" className={styles.cardLinkRight}>View All</a>
          </Card>

          <Card title="Categories Over Time" className={styles.wide}>
            <div className={styles.tabs} role="tablist">{['Bar', 'Line', 'Area'].map((t, i) => <button key={t} role="tab" aria-selected={i === 0} type="button">{t}</button>)}</div>
            <span className={styles.statLabel}>Total Transactions</span>
            <strong className={styles.big}>50K <small>(100%)</small> <span className={styles.pillGreen}>↑ 2.5%</span></strong>
            <div className={styles.legendWrap}>{legend.map(([l, c]) => <span key={l}><i className={styles.sq} style={{ background: c }} />{l}</span>)}</div>
            <StackedColumns columns={timeColumns} colors={timeColors} labels={timeLabels} />
          </Card>

          <Card title="Active AI Bots">
            <div className={styles.stats3}>
              <Stat label="Total AI Transactions" value="10K" sub="(100%)" />
              <Stat label="AI Crawlers" value="8K" sub="(80%)" />
              <Stat label="AI Agent Actions" value="2K" sub="(20%)" />
            </div>
            {[['AI Crawlers', '8K | 80%', 80, 'var(--viz-blue-ribbon)'], ['AI Agent Actions', '2K | 20%', 20, 'var(--viz-pizazz)']].map(([n, v, w, c]) => (
              <div key={n as string} className={styles.meter}><div className={styles.meterHead}><a href="#">{n}</a><span>{v}</span></div><div style={{ width: `${w}%`, background: c as string }} /></div>
            ))}
            <a href="#" className={styles.cardLinkRight}>View AI Bots Activity</a>
          </Card>

          <Card title="Top Active Bots">
            <div className={styles.meterHead}><span>Distinct Known Bot</span><span>Absolute | Percentage</span></div>
            {topBots.map(([n, v, p]) => (
              <div key={n} className={styles.meter}><div className={styles.meterHead}><a href="#">{n}</a><span>{v} | {p}</span></div><div style={{ width: `${v}%`, background: 'var(--viz-cornflower)' }} /></div>
            ))}
            <a href="#" className={styles.cardLinkRight}>Review All Bots</a>
          </Card>

          <Card className={styles.wide}>
            <div className={styles.tableHead}><h2>Total Bot Activity <small>35 items</small></h2><input type="search" placeholder="Search" aria-label="Search bot activity" /></div>
            <a href="#" className={styles.blueLink}>Add Filter</a>
            <table className={`${styles.table} ${styles.activity}`}>
              <thead><tr><th>Endpoint</th><th>Policy</th><th>Category</th><th>Owner</th><th>Action Taken</th><th>Trend</th></tr></thead>
              <tbody>
                {rows.map(([e, p, c, o, t]) => (
                  <tr key={e}>
                    <td><a href="#">{e}</a></td><td>{p}</td><td>{c}</td>
                    <td>{o}</td>
                    <td><span className={styles.action} /></td>
                    <td><span className={styles.pill}>{t}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.pager}><span>10 | 50 | 100 &nbsp; Items per page</span><span>1–10 of 35</span></div>
          </Card>
        </div>
      </div>
    </div>
  );
}
