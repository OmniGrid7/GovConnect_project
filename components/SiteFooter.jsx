'use client';
import Link from 'next/link';
import LocalizedText from '@/components/LocalizedText';
import { useLanguage } from '@/components/LanguageProvider';

const navigation = [
  {
    title: 'Explore',
    links: [
      ['Departments', '/departments'],
      ['Schemes', '/categories/scheme-programme-mission-application'],
      ['District portals', '/categories/district-portal'],
    ],
  },
  {
    title: 'GovConnect',
    links: [
      ['Home', '/'],
      ['All categories', '/#directory'],
      ['Department directory', '/departments'],
    ],
  },
  {
    title: 'Connect',
    links: [
      ['Maharashtra.gov.in', 'https://www.maharashtra.gov.in/'],
      ['India.gov.in', 'https://www.india.gov.in/'],
      ['NIC', 'https://www.nic.gov.in/'],
    ],
  },
];

function FooterLink({ label, href }) {
  const external = href.startsWith('http');
  return external ? <a href={href} target="_blank" rel="noreferrer">{label}</a> : <Link href={href}>{label}</Link>;
}

export default function SiteFooter() {
  const { t } = useLanguage();
  return <footer className="site-footer">
    <div className="footer-grid">
      <div className="footer-intro">
        <Link className="footer-brand" href="/">@Anti-Graviti</Link>
        <p><LocalizedText id="footerIntro" /></p>
        <div className="footer-socials" aria-label="Social links">
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
          <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X">X</a>
          <a href="mailto:team@anti-gravity.example" aria-label="Email">@</a>
        </div>
        <p className="footer-credit">Built for Maharashtra citizens</p>
      </div>
      {navigation.map((group) => <div className="footer-links" key={group.title}>
        <h2>{t(`footer_${group.title.toLowerCase()}`, { defaultValue: group.title })}</h2>
        {group.links.map(([label, href]) => <FooterLink key={label} label={t(`footer_${label.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`, { defaultValue: label })} href={href} />)}
      </div>)}
    </div>
    <div className="footer-bottom">
      <span>Copyright 2026 @Anti-Graviti. All rights reserved.</span>
      <div><Link href="/">Privacy policy</Link><Link href="/">Terms of service</Link><Link href="/">Accessibility</Link></div>
    </div>
  </footer>;
}
