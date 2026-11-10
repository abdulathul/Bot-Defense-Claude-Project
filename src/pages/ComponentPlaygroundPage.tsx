import { useState } from 'react';
import { Accordion } from '../components/Accordion/Accordion';
import { Button } from '../components/Button/Button';
import { CheckboxField } from '../components/CheckboxField/CheckboxField';
import { DialogBody } from '../components/Dialog/Dialog';
import { InputField } from '../components/InputField/InputField';
import { SelectField } from '../components/Inputs/InputControls';
import { NavigationPillList } from '../components/Navigation/Navigation';
import { Notification } from '../components/Notification/Notification';
import { Pagination } from '../components/Pagination/Pagination';
import { Tag, TagList } from '../components/Tags';
import { Tabs } from '../components/Tabs';
import styles from './ComponentPlaygroundPage.module.css';

const navigationItems = [
  { label: 'Products', href: '#products', state: 'active' as const },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Community', href: '#community' },
  { label: 'Resources', href: '#resources' },
  { label: 'Pricing', href: '#pricing' },
];

const tabItems = [
  { id: 'red', label: 'Red', content: 'A clear view of your most important updates.' },
  { id: 'blue', label: 'Blue', content: 'Bring related work together in one place.' },
  { id: 'green', label: 'Green', content: 'See what is moving forward across your team.' },
  { id: 'yellow', label: 'Yellow', content: 'Keep useful ideas close at hand.' },
  { id: 'pink', label: 'Pink', content: 'Make room for a different perspective.' },
];

const faqItems = [
  {
    title: 'What are the terms and conditions for purchasing online orders?',
    content: 'Orders are covered by our standard terms. Review the details before completing your purchase.',
  },
  {
    title: 'What are your opening hours?',
    content: 'Our support team is available Monday through Friday.',
  },
  {
    title: 'How fast do you ship products?',
    content: 'Most orders ship within two working days.',
  },
];

const locations = [
  { label: 'New York', value: 'new-york' },
  { label: 'London', value: 'london' },
  { label: 'Tokyo', value: 'tokyo' },
];

function SampleHeader({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <header className={styles.sampleHeader}>
      <a className={styles.brand} href="#playground" aria-label="Studio home">S</a>
      <NavigationPillList items={navigationItems} ariaLabel={`Sample product navigation, ${theme} mode`} />
      <div className={styles.headerActions}>
        <Button variant="neutral" size="small" fullWidth={false}>Sign in</Button>
        <Button size="small" fullWidth={false}>Register</Button>
      </div>
    </header>
  );
}

function SampleFooter() {
  return (
    <footer className={styles.sampleFooter}>
      <a className={styles.brand} href="#playground" aria-label="Studio home">S</a>
      <div className={styles.socialLinks} aria-label="Social links">
        <a href="#social-x" aria-label="𝕏, Studio on X">𝕏</a>
        <a href="#social-instagram" aria-label="Studio on Instagram">◎</a>
        <a href="#social-video" aria-label="Studio video channel">▶</a>
      </div>
      <div className={styles.footerLinkColumns}>
        <div><strong>Use cases</strong><a href="#design">UI design</a><a href="#research">Research</a><a href="#planning">Planning</a></div>
        <div><strong>Explore</strong><a href="#guides">Guides</a><a href="#community">Community</a><a href="#resources">Resources</a></div>
      </div>
    </footer>
  );
}

function PlaygroundContent({ theme }: { theme: 'light' | 'dark' }) {
  const [currentPage, setCurrentPage] = useState(1);
  const modeName = theme === 'light' ? 'Light' : 'Dark';

  return (
    <>
      <SampleHeader theme={theme} />
      <div className={styles.dashboard}>
        <div className={styles.leftColumn}>
          <SampleFooter />
          <div className={styles.paginationCard}>
            <Pagination
              currentPage={currentPage}
              totalPages={6}
              onPageChange={setCurrentPage}
              ariaLabel={`Pagination, ${theme} mode`}
            />
          </div>
        </div>

        <div className={styles.middleColumn}>
          <section className={styles.card}>
            <h3 className={styles.visuallyHidden}>Workspace tabs</h3>
            <Tabs items={tabItems} defaultActiveTabId="blue" ariaLabel={`Color workspaces, ${theme} mode`} />
          </section>
          <section className={`${styles.card} ${styles.dialogCard}`}>
            <DialogBody
              theme={theme}
              title={`Would you like to upgrade? (${modeName})`}
              description={(
                <>
                  <p>We just released version 3.0 of the Simple Design System. Would you like to upgrade?</p>
                  <p>If you prefer to wait, additional components are available for the latest version.</p>
                </>
              )}
              actions={(
                <>
                  <Button variant="neutral" size="small" fullWidth={false}>View previous updates</Button>
                  <Button size="small" fullWidth={false}>Update to version 3.0</Button>
                </>
              )}
            />
          </section>
          <section className={`${styles.card} ${styles.promoCard}`}>
            <span className={styles.promoIcon} aria-hidden="true">☆</span>
            <div><strong>Introducing the redesigned workspace</strong><p>A simpler way to bring your projects, conversations, and tools together.</p></div>
            <Button variant="neutral" size="small" fullWidth={false}>Read the story</Button>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Shipping information</h3>
            <p className={styles.cardIntro}>We ship within 2 working days.</p>
            <div className={styles.form}>
              <InputField label="Full Name" placeholder="Value" autoComplete="name" />
              <SelectField label="Location" options={locations} />
              <InputField label="Delivery note" placeholder="Value" />
              <CheckboxField label="I accept the terms" description="Read our T&Cs" />
              <Button size="small">Save shipping information</Button>
            </div>
          </section>
          <Notification
            variant="error"
            title="Components are low in stock"
            message="Many basic building blocks are running low. Start with a new set or browse our component library."
            actionLabel="Browse components"
            onAction={() => undefined}
          />
          <TagList ariaLabel={`Status tags, ${theme} mode`} className={styles.statusTags}>
            <Tag label="Fig" tone="neutral" hierarchy="secondary" />
            <Tag label="Error" tone="danger" />
            <Tag label="Success" tone="positive" hierarchy="secondary" />
            <Tag label="Warning" tone="warning" />
            <Tag label="Info" tone="brand" />
          </TagList>
          <section className={styles.card}>
            <h3 className={styles.visuallyHidden}>Frequently asked questions</h3>
            <Accordion
              items={faqItems.map((item, index) => (
                index === 0 ? { ...item, title: `${item.title} (${modeName})` } : item
              ))}
              defaultOpenIndex={0}
            />
          </section>
        </div>
      </div>
    </>
  );
}

function ThemeSample({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <section className={`${styles.themeSample} ${styles[theme]}`}>
      <h2 className={styles.themeTitle}>{theme === 'light' ? 'Component Sample → Light' : 'Component Sample → Dark'}</h2>
      <div className={styles.canvas}><PlaygroundContent theme={theme} /></div>
    </section>
  );
}

export function ComponentPlaygroundPage() {
  return (
    <main className={styles.page} id="playground">
      <div className={styles.samples}>
        <ThemeSample theme="light" />
        <ThemeSample theme="dark" />
      </div>
    </main>
  );
}

export { PlaygroundContent, ThemeSample };
