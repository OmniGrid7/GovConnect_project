'use client';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

export default function SiteHeader() {
  const { language, setLanguage, t } = useLanguage();
  return <header>
    <div className="utility-bar"><Link className="utility-brand" href="/"><img src="/assets/figma/brand-map.png" alt="" /><strong>GovConnect</strong></Link><div className="utility-actions"><span>{t('rajyageet')}</span><span>A-</span><span>A+</span><label className="language-control"><span className="sr-only">{t('selectLanguage')}</span><select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={t('selectLanguage')}><option value="mr">MARATHI</option><option value="en">ENGLISH</option><option value="hi">HINDI</option></select></label></div></div>
    <div className="identity-bar"><div className="gov-identity"><img src="/assets/figma/seal.png" alt="Seal of Maharashtra" /><div><span lang="mr">महाराष्ट्र शासन</span><strong>{t('gov')}</strong></div></div><img className="centre-logo" src="/assets/figma/brand-mark.png" alt="GovConnect Maharashtra" /><div className="shivaji-identity"><img src="/assets/figma/shivaji.png" alt="Chhatrapati Shivaji Maharaj" /><strong lang="mr">जय भवानी, जय शिवाजी !</strong></div></div>
    <nav className="main-nav" aria-label={t('directory')}><Link href="/">{t('home')}</Link><Link href="/#directory">{t('directory')}</Link><Link href="/categories/scheme-programme-mission-application">{t('schemes')}</Link><Link href="/departments">{t('departments')}</Link><Link href="/categories/district-portal">{t('districts')}</Link></nav>
  </header>;
}
