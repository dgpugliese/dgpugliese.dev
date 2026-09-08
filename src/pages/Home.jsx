import { Nav, Footer } from '../components/Layout.jsx';
import { Hero, GitHubStrip } from '../components/Hero.jsx';
import { About, SelectedWork } from '../components/sections1.jsx';
import { Contact } from '../components/sections2.jsx';
import { useSeo } from '../lib/seo';

export default function Home() {
  useSeo({
    title: 'David Pugliese · IT Director · Solutions Architect · MSP Founder',
    description:
      'David Pugliese — IT Director, Lead Solutions Architect, and MSP founder with 16+ years across enterprise infrastructure, cybersecurity, cloud platforms, software development, and automation.',
    path: '/',
    image: 'https://dgpugliese.dev/og-v2.png',
  });

  return (
    <>
      <Nav />
      <main className="portfolio-home" id="main-content">
        <Hero />
        <SelectedWork />
        <About />
        <section className="activity-section" aria-label="Public GitHub activity"><GitHubStrip /></section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
