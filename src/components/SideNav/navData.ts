import type { NavGroup } from './SideNav';

export const reportNav: NavGroup[] = [
  { title: 'Overview', icon: 'overview', items: [{ label: 'Monitor', to: '/summary' }] },
  { title: 'Report', icon: 'report', items: ['Bad Bot Report', 'Protection Coverage Report', 'Transactions Usage', 'Traffic Analyzer', 'Known Bot Report'].map((label) => ({ label })) },
  { title: 'Manage', icon: 'manage', items: ['Applications', 'Mobile SDKs', 'Mobile Base Configurations', 'Saved Filters'].map((label) => ({ label })) },
  { title: 'Notifications', icon: 'bell', items: [{ label: 'Alerts, Audit Logs' }], disabled: true },
];

export const summaryNav: NavGroup[] = [
  { title: 'Overview', icon: 'overview', items: [{ label: 'Monitor', to: '/summary' }] },
  { title: 'Report', icon: 'report', items: [{ label: 'Bad Bot Report' }, { label: 'Protection Coverage Report' }, { label: 'Transaction Usage' }, { label: 'Traffic Analyzer' }, { label: 'Peer Comparison' }] },
  { title: 'Manage', icon: 'manage', items: ['Applications', 'Mobile SDKs', 'Mobile Base Configurations'].map((label) => ({ label })) },
  { title: 'Notifications', icon: 'bell', items: [{ label: 'Alerts' }, { label: 'Audit Logs' }] },
  { title: 'Service Info', icon: 'info', items: [{ label: 'About' }] },
];
