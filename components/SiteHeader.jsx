'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

export default function SiteHeader() {
  const { language, setLanguage, fontScale, setFontScale, t } = useLanguage();
  const [showRajyageet, setShowRajyageet] = useState(false);
  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setShowRajyageet(false);
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);
  return <header>
    <div className="utility-bar"><Link className="utility-brand" href="/"><img src="/assets/figma/brand-map.png" alt="" /><strong>GovConnect</strong></Link><div className="utility-actions"><button type="button" onClick={() => setShowRajyageet(true)}>{t('rajyageet')}</button><button type="button" className={fontScale === 'small' ? 'active' : ''} onClick={() => setFontScale('small')} aria-label={t('decreaseText')}>A-</button><button type="button" className={fontScale === 'normal' ? 'active' : ''} onClick={() => setFontScale('normal')} aria-label={t('normalText')}>A</button><button type="button" className={fontScale === 'large' ? 'active' : ''} onClick={() => setFontScale('large')} aria-label={t('increaseText')}>A+</button><label className="language-control"><span className="sr-only">{t('selectLanguage')}</span><select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={t('selectLanguage')}><option value="mr">MARATHI</option><option value="en">ENGLISH</option><option value="hi">HINDI</option></select></label></div></div>
    <div className="identity-bar"><div className="gov-identity"><img src="/assets/figma/seal.png" alt="Seal of Maharashtra" /><div><span lang="mr">महाराष्ट्र शासन</span><strong>{t('gov')}</strong></div></div><img className="centre-logo" src="/assets/figma/brand-mark.png" alt="GovConnect Maharashtra" /><div className="shivaji-identity"><img src="/assets/figma/shivaji.png" alt="Chhatrapati Shivaji Maharaj" /><strong lang="mr">जय भवानी, जय शिवाजी !</strong></div></div>
    <nav className="main-nav" aria-label={t('directory')}><Link href="/">{t('home')}</Link><Link href="/#directory">{t('directory')}</Link><Link href="/categories/scheme-programme-mission-application">{t('schemes')}</Link><Link href="/departments">{t('departments')}</Link><Link href="/emergency-numbers">{t('emergencyNumbers')}</Link><Link href="/categories/district-portal">{t('districts')}</Link></nav>
    {showRajyageet && <div className="rajyageet-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setShowRajyageet(false)}><div className="rajyageet-dialog" role="dialog" aria-modal="true" aria-labelledby="rajyageet-title"><button className="modal-close" type="button" onClick={() => setShowRajyageet(false)} aria-label={t('close')}>×</button><img src="/assets/figma/rajyageet.png" alt={t('rajyageet')} onError={(event) => { event.currentTarget.hidden = true; event.currentTarget.nextElementSibling.hidden = false; }} /><div className="rajyageet-fallback" hidden><strong>{t('rajyageet')}</strong><p>{t('rajyageetImageMissing')}</p></div><h2 id="rajyageet-title">{t('rajyageet')}</h2></div></div>}
  </header>;
}
