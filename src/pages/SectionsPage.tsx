import { Button } from '../components/Button/Button';
import styles from './SectionsPage.module.css';

const featureCards = [
  { number: '01', title: 'Fast setup', body: 'Start with a clear foundation and get moving in minutes.' },
  { number: '02', title: 'Built to scale', body: 'Flexible patterns grow with your team and your product.' },
  { number: '03', title: 'Made for people', body: 'Thoughtful details make everyday work feel simpler.' },
  { number: '04', title: 'Work together', body: 'Keep ideas, people, and progress moving in the same direction.' },
];

const panelItems = [
  { label: '01 / Discover', title: 'Find the right starting point', body: 'A focused introduction makes it easy to understand what comes next.' },
  { label: '02 / Build', title: 'Bring your ideas together', body: 'Use a flexible canvas to shape and refine the work with your team.' },
];

function Placeholder({ variant = 'landscape' }: { variant?: 'landscape' | 'portrait' | 'square' }) {
  return <div className={`${styles.placeholder} ${styles[variant]}`} aria-hidden="true"><span /></div>;
}

function HeroSection({ variation }: { variation: 'centered' | 'split' | 'compact' }) {
  if (variation === 'split') {
    return (
      <section className={`${styles.hero} ${styles.splitHero}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>A better way to work</p>
          <h2>Make room for your next big idea.</h2>
          <p>Bring your team, tools, and plans together in one thoughtful workspace.</p>
          <Button size="small" fullWidth={false}>Get started</Button>
        </div>
        <Placeholder variant="landscape" />
      </section>
    );
  }

  if (variation === 'compact') {
    return (
      <section className={`${styles.hero} ${styles.compactHero}`}>
        <div>
          <p className={styles.eyebrow}>Simple Design System</p>
          <h2>Everything in its right place.</h2>
          <p>Clear, practical building blocks for your next project.</p>
        </div>
        <Button size="small" fullWidth={false}>Explore components</Button>
      </section>
    );
  }

  return (
    <section className={`${styles.hero} ${styles.centeredHero}`}>
      <p className={styles.eyebrow}>Thoughtful by design</p>
      <h2>Good work starts with a clear view.</h2>
      <p>Bring your ideas together and turn them into something meaningful.</p>
      <div className={styles.buttonRow}>
        <Button size="small" fullWidth={false}>Get started</Button>
        <Button variant="neutral" size="small" fullWidth={false}>Learn more</Button>
      </div>
    </section>
  );
}

function PanelSection({ reverse = false, tinted = false }: { reverse?: boolean; tinted?: boolean }) {
  return (
    <section className={`${styles.panel} ${reverse ? styles.reverse : ''} ${tinted ? styles.tinted : ''}`}>
      <Placeholder />
      <div className={styles.panelCopy}>
        <p className={styles.eyebrow}>A little more clarity</p>
        <h3>Make complex work feel simple.</h3>
        <p>Give important information room to breathe. A balanced panel pairs a clear message with a useful visual.</p>
        <a href="#card-grids">See how it works <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}

function CardGridSection({ columns = 3 }: { columns?: 2 | 3 | 4 }) {
  return (
    <section className={styles.sectionBlock}>
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>Designed for your workflow</p>
          <h3>Small steps, meaningful progress.</h3>
        </div>
        <a href="#page-sections">View all <span aria-hidden="true">→</span></a>
      </div>
      <div className={styles.cardGrid} data-columns={columns}>
        {featureCards.slice(0, columns).map((card) => (
          <article className={styles.featureCard} key={card.number}>
            <span className={styles.cardNumber}>{card.number}</span>
            <h4>{card.title}</h4>
            <p>{card.body}</p>
            <a href="#page-sections" aria-label={`Learn more about ${card.title}`}>Learn more <span aria-hidden="true">→</span></a>
          </article>
        ))}
      </div>
    </section>
  );
}

function PageSection() {
  return (
    <section className={styles.pageSection}>
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>From first thought to finished work</p>
          <h3>A page with a natural rhythm.</h3>
          <p className={styles.sectionDescription}>Combine a strong opening, supporting content, and a clear next step.</p>
        </div>
      </div>
      <div className={styles.pageFeature}>
        <Placeholder variant="square" />
        <div>
          <span className={styles.cardNumber}>01 / OUR APPROACH</span>
          <h4>Give every idea room to take shape.</h4>
          <p>Thoughtful page sections help people find what matters, understand the details, and decide where to go next.</p>
          <Button size="small" fullWidth={false}>Discover our approach</Button>
        </div>
      </div>
    </section>
  );
}

function FooterSection({ variation = 'simple' }: { variation?: 'simple' | 'expanded' }) {
  return (
    <div className={`${styles.footer} ${variation === 'expanded' ? styles.expandedFooter : ''}`}>
      <div className={styles.footerBrand}>
        <strong>Studio</strong>
        <p>Ideas made clearer.</p>
      </div>
      {variation === 'expanded' && (
        <nav className={styles.footerLinks} aria-label="Footer">
          <a href="#hero">About</a>
          <a href="#panels">Our approach</a>
          <a href="#card-grids">Resources</a>
        </nav>
      )}
      <span>© 2026 Studio. All rights reserved.</span>
    </div>
  );
}

export function SectionsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <a href="#hero" className={styles.wordmark}>Studio</a>
        <nav aria-label="Main navigation">
          <a href="#panels">Approach</a>
          <a href="#card-grids">Resources</a>
        </nav>
        <Button size="small" fullWidth={false}>Get started</Button>
      </header>

      <div className={styles.showcase}>
        <section id="hero" className={styles.showcaseGroup}>
          <SectionLabel>Hero Sections</SectionLabel>
          <div className={styles.exampleStack}>
            <HeroSection variation="centered" />
            <HeroSection variation="split" />
            <HeroSection variation="compact" />
          </div>
        </section>

        <section id="panels" className={styles.showcaseGroup}>
          <SectionLabel>Panel Sections</SectionLabel>
          <div className={styles.exampleStack}>
            <PanelSection />
            <PanelSection reverse tinted />
          </div>
        </section>

        <section id="card-grids" className={styles.showcaseGroup}>
          <SectionLabel>Card Grid Sections</SectionLabel>
          <div className={styles.exampleStack}>
            <CardGridSection columns={3} />
            <CardGridSection columns={2} />
            <CardGridSection columns={4} />
          </div>
        </section>

        <section id="page-sections" className={styles.showcaseGroup}>
          <SectionLabel>Page Sections</SectionLabel>
          <div className={styles.exampleStack}><PageSection /></div>
        </section>

        <section className={styles.showcaseGroup}>
          <SectionLabel>Footer</SectionLabel>
          <div className={styles.exampleStack}>
            <FooterSection />
            <FooterSection variation="expanded" />
          </div>
        </section>

        <section className={styles.showcaseGroup}>
          <SectionLabel>AI</SectionLabel>
          <div className={`${styles.exampleStack} ${styles.aiPanel}`}>
            <div>
              <p className={styles.eyebrow}>Designed with intention</p>
              <h3>Let your ideas do the talking.</h3>
              <p>Use a focused message and simple actions to help people move forward.</p>
            </div>
            <Button size="small" fullWidth={false}>Try it now</Button>
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <h2 className={styles.groupTitle}>{children}</h2>;
}

export {
  CardGridSection,
  FooterSection,
  HeroSection,
  PageSection,
  PanelSection,
};
