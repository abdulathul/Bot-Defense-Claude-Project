import { Fragment, useState } from 'react';
import { Card } from '../components/Card/Card';
import { SideNav } from '../components/SideNav/SideNav';
import { AssetIcon } from '../components/AssetIcon/AssetIcon';
import { RingChart } from '../components/charts/RingChart';
import type { RingSeg } from '../components/charts/RingChart';
import { StackedArea } from '../components/charts/StackedArea';
import styles from './SummaryPage.module.css';

type LegendRow = { label: string; total: string; color: string; value: number; children?: LegendRow[] };
type Highlight = { title: string; sub: string; big: string; trend?: string; prev?: string; center: string; legendHead: [string, string]; rows: LegendRow[] };

// All numbers live in plain lists. Swap them for real API data later.
const highlights: Highlight[] = [
  { title: 'Traffic by Type', sub: 'Total Traffic', big: '534K', trend: '↑ 2.5%', prev: 'Was 25K in previous period', center: '534K', legendHead: ['Traffic Type', 'Total'],
    rows: [
      { label: 'Human', total: '278.4K', color: '#4fc36a', value: 278.4 },
      { label: 'Automated', total: '145.7K', color: '#0f1e57', value: 145.7, children: [
        { label: 'Good Bot', total: '92.4K', color: '#7fa8f8', value: 92.4 },
        { label: 'Bad Bot', total: '53.3K', color: '#f37f85', value: 53.3 },
      ] },
      { label: 'Allowlisted', total: '43.2K', color: '#ffc43b', value: 43.2, children: [
        { label: 'Trusted', total: '28.6K', color: '#63c4f4', value: 28.6 },
        { label: 'Untrusted', total: '14.6K', color: '#ff8b35', value: 14.6 },
      ] },
      { label: 'Interstitial', total: '66.7K', color: '#9b8ed4', value: 66.7 }] },
  { title: 'Traffic by Category', sub: 'Total Traffic', big: '510K', trend: '↑ 2.5%', prev: 'Was 521K in previous period', center: '510K', legendHead: ['Traffic Categories', 'Total'],
    rows: [
      { label: 'Search', total: '260.8K', color: '#a6df55', value: 260.8 }, { label: 'Authentication', total: '104.6K', color: '#4da2bd', value: 104.6 },
      { label: 'Shopping Cart', total: '59.2K', color: '#ff8c2f', value: 59.2 }, { label: 'Credit Card', total: '39.5K', color: '#17618e', value: 39.5 },
      { label: 'Profile Management', total: '25.8K', color: '#a569c7', value: 25.8 }, { label: 'Undefined', total: '20.1K', color: '#cbd1dd', value: 20.1 }] },
  { title: 'Bad Bot Traffic Actions', sub: 'Total Traffic', big: '160K', trend: '↑ 2.5%', prev: 'Was 156K in previous period', center: '160K', legendHead: ['Actions Taken', 'Total'],
    rows: [
      { label: 'Flagged', total: '70.2K', color: '#ffc857', value: 26 },
      { label: 'Mitigated', total: '54.6K', color: '#f47f82', value: 17 },
      { label: 'Challenged', total: '19.8K', color: '#a6adbb', value: 7 },
      { label: 'Undefined', total: '15.4K', color: '#cfd4e0', value: 50 }] },
  { title: 'Protected Apps', sub: 'Defended Applications', big: '738', trend: '↑ 2.5%', prev: 'Was 720 in previous period', center: '738', legendHead: ['Main Categories', 'Total'],
    rows: [
      { label: 'Web Applications', total: '400', color: '#809fea', value: 400 },
      { label: 'APIs', total: '338', color: '#8b3296', value: 338 }] },
];
const tabs = ['Traffic Type', 'Endpoint Category', 'Bad Bot', 'Geolocation'];
const labels = ['Nov 1', 'Nov 2', 'Nov 3', 'Nov 4', 'Nov 5', 'Nov 6', 'Nov 7'];
// Illustrative values eyeballed from the design (13 points = 2 per day)
const traffic = [
  { key: 'Human', label: 'Human: 26K', color: 'var(--color-dodger-light)', values: [20, 24, 16, 14, 18, 17, 22, 20, 18, 22, 15, 13, 12] },
  { key: 'Known', label: 'Known Bot: 25K', color: 'var(--viz-cornflower)', values: [16, 10, 12, 16, 10, 14, 10, 14, 16, 30, 12, 10, 9] },
  { key: 'Bad', label: 'Bad Bot: 13K', color: 'var(--viz-froly)', values: [8, 6, 9, 10, 8, 8, 9, 9, 10, 10, 7, 5, 5] },
  { key: 'Allow', label: 'AllowListed 29K', color: 'var(--viz-turquoise)', values: [6, 8, 8, 6, 8, 8, 7, 8, 8, 6, 6, 5, 4] },
  { key: 'Telemetry', label: 'Telemetry Client: 24K', color: 'var(--viz-lavender-magenta)', values: [5, 4, 4, 4, 5, 5, 5, 5, 6, 4, 4, 3, 3] },
  { key: 'Challenged', label: 'Challenged: 39K', color: 'var(--viz-bright-sun)', values: [10, 12, 14, 9, 10, 9, 9, 10, 11, 13, 9, 5, 3] },
];
const goodBots = [['AppleBot', 'Crawler', 9], ['Others', 'Others', 7], ['BingBot', 'Search Engine Bot', 9], ['YahooBot', 'Search Engine Bot', 7]] as const;
const endpoints = [
  ['/media-resource/abcdef…', 'Authentication', 'target-us.com', 'Login', '136K', '33.1%'],
  ['/media-resource/bcdefab…', 'Account Management', 'target.com', 'Account Creation', '127K', '11.1%'],
  ['/media-resource/cdefab…', 'Authentication', 'target.com', 'Login', '118K', '11.1%'],
  ['/media-resource/defabc…', 'Account Management', 'target.com', 'Password Reset', '104K', '11.1%*'],
  ['/media-resource/efabcd…', 'Profile Management', 'target.com', 'Profile Creation', '92K', '11.1%*'],
  ['/media-resource/fabcde…', 'Authentication', 'target.com', 'Login MFA', '84K', '0%'],
  ['/media-resource/cabdef…', 'Authentication', 'target.com', 'Logout', '81K', '0%'],
  ['/media-resource/cdabef…', 'Profile Management', 'target.com', 'Profile Update', '81K', '0%'],
  ['/media-resource/abcdeabf…', 'Shopping & Gift Cards', 'target.com', 'Add to Cart', '81K', '0%'],
  ['/media-resource/adefbc…', 'Shopping & Gift Cards', 'target.com', 'Checkout', '81K', '0%'],
];

export function SummaryPage() {
  const [tab, setTab] = useState(tabs[0]);
  const [hidden, setHidden] = useState<string[]>([]); // series switched off in the chart legend
  const [asc, setAsc] = useState(true);
  const [trafficTypeDetailsVisible, setTrafficTypeDetailsVisible] = useState(true);
  const visible = traffic.filter((s) => !hidden.includes(s.key));
  const toggle = (key: string) => setHidden((h) => (h.includes(key) ? h.filter((k) => k !== key) : [...h, key]));
  const sorted = [...endpoints].sort((a, b) => (asc ? 1 : -1) * a[0].localeCompare(b[0]));

  return (
    <div className={styles.shell}>
      <SideNav active="Monitor" />
      <div className={styles.main}>
        <header className={styles.pageHeader}>
          <small className={styles.crumbs}>Home &gt; Bot Defense</small>
          <h1>Summary</h1>
        </header>
        <div className={styles.toolbar}>
          <button type="button">Last 7 Days</button>
          <button type="button">Refresh: Updated 20 min ago</button>
          <button type="button">Filter</button>
        </div>

        <div className={styles.content}>
          <h2 className={styles.section}>Highlights</h2>
          <div className={styles.highlights}>
            {highlights.map((h) => (
              <Card key={h.title} title={h.title} className={styles.hCard}>
                <span className={styles.muted}>{h.sub}</span>
                <strong className={styles.big}>{h.big}</strong>
                {h.trend && <><span className={styles.pillGreen}>{h.trend}</span><p className={styles.prev}>{h.prev}</p></>}
                <RingChart caption={h.title === 'Traffic by Type' ? 'Events' : 'Transactions'} value={h.center}
                  segs={h.title === 'Bad Bot Traffic Actions'
                    ? [...h.rows.slice(0, -1).map(({ value, color }) => ({ value, color })), { value: h.rows[h.rows.length - 1].value, color: h.rows[h.rows.length - 1].color }]
                    : h.rows.map(({ value, color }) => ({ value, color }))}
                  innerSegs={h.title === 'Traffic by Type' && trafficTypeDetailsVisible
                    ? h.rows.flatMap((row, rowIndex) => {
                      const parentOffset = h.rows.slice(0, rowIndex).reduce((sum, parent) => sum + parent.value, 0);
                      return (row.children ?? []).map((child, childIndex) => ({
                        value: child.value,
                        color: child.color,
                        offset: parentOffset + (row.children ?? []).slice(0, childIndex).reduce((sum, sibling) => sum + sibling.value, 0),
                      }));
                    })
                    : undefined}
                  centerAction={h.title === 'Traffic by Type'
                    ? { label: trafficTypeDetailsVisible ? 'Hide Details' : 'Show Details', onClick: () => setTrafficTypeDetailsVisible((visible) => !visible) }
                    : h.title === 'Bad Bot Traffic Actions'
                      ? { label: 'Show Details', href: '#bad-bot-actions-legend' }
                      : undefined} />
                <table className={styles.legend}>
                  <thead><tr><th>{h.legendHead[0]}</th><th id={h.title === 'Bad Bot Traffic Actions' ? 'bad-bot-actions-legend' : undefined}>{h.legendHead[1]}</th></tr></thead>
                  <tbody>
                    {h.rows.map((r, i) => (
                      <Fragment key={r.label + i}>
                        <tr><td><i style={{ background: r.color }} />{r.label}</td><td>{r.total}</td></tr>
                        {trafficTypeDetailsVisible && r.children?.map((child) => (
                          <tr key={child.label} className={styles.legendChildRow}>
                            <td><span className={styles.childLabel}><i style={{ background: child.color }} />{child.label}</span></td>
                            <td>{child.total}</td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </Card>
            ))}
          </div>

          <h2 className={styles.section}>Details</h2>
          <div className={styles.tabs} role="tablist">
            {tabs.map((t) => <button key={t} role="tab" type="button" aria-selected={tab === t} onClick={() => setTab(t)}>{t}</button>)}
          </div>

          <div className={styles.details}>
            <Card title="Traffic Visualized">
              <div className={styles.chartBar}>
                <div className={styles.segmented} role="group" aria-label="Chart type">
                  <button type="button" aria-pressed="true">Area</button>
                  <button type="button" disabled title="Not built yet">Bar</button>
                  <button type="button" disabled title="Not built yet">Line</button>
                </div>
                <button type="button" className={styles.interval}>Interval: 1 day</button>
              </div>
              <div className={styles.seriesLegend}>
                {traffic.map((s) => (
                  <label key={s.key}>
                    <input type="checkbox" checked={!hidden.includes(s.key)} onChange={() => toggle(s.key)} style={{ accentColor: s.color }} />
                    {s.label}
                  </label>
                ))}
              </div>
              <StackedArea series={visible} labels={labels} />
            </Card>

            <Card>
              <h2 className={styles.goodTitle}><a href="#">Top Good Bots Found</a> <AssetIcon name="info" size={14} /></h2>
              <p className={styles.good}><strong>44K</strong> good bot events with <strong>3%</strong> across these top bots</p>
              <table className={styles.legend}>
                <thead><tr><th>Name</th><th>Type</th><th className={styles.num}>Events</th></tr></thead>
                <tbody>
                  {goodBots.map(([n, t, e]) => (
                    <tr key={n + t}><td>{n}</td><td>{t}</td><td className={styles.num}><b>{e}</b></td></tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          <Card className={styles.tableCard}>
            <div className={styles.tableHead}>
              <h2>Top Visited Endpoints <small>12,000 items</small></h2>
              <input type="search" placeholder="Search" aria-label="Search endpoints" />
              <button type="button" aria-label="More table options"><AssetIcon name="more" size={16} /></button>
            </div>
            <div className={styles.scroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th aria-sort={asc ? 'ascending' : 'descending'}><button type="button" onClick={() => setAsc((a) => !a)}>Endpoint {asc ? '↑' : '↓'}</button></th>
                    <th>Flow Category</th><th>Domain</th><th>Flow Label</th><th className={styles.num}>Bad Bot Events</th><th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map(([e, c, d, l, n, p]) => (
                    <tr key={e}>
                      <td>{e}</td><td>{c}</td><td>{d}</td><td>{l}</td><td className={styles.num}>{n}</td>
                      <td>{p.replace('*', '')}{p.endsWith('*') && <span className={styles.flag} aria-label="Marked">*</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.pager}><span>10 | 50 | 100 &nbsp; items per page</span><span>0–10 of 12K</span></div>
          </Card>
        </div>
      </div>
    </div>
  );
}
