'use client';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

const slides = [
  { image: '/assets/figma/hero-caves.png', title: 'Welcome To GovConnect', subtitle: 'आपले स्वागत आहे', text: 'One destination for Maharashtra government departments, services and schemes.' },
  { image: '/assets/figma/hero-right.png', title: 'Services made easier', subtitle: 'आपली सेवा, आपल्या दारी', text: 'Discover verified public portals and department resources.' },
  { image: '/assets/figma/asset-05.jpeg', title: 'Connected Maharashtra', subtitle: 'डिजिटल महाराष्ट्र', text: 'Navigate public information with a simpler, searchable directory.' }
];

export default function HeroCarousel() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  useEffect(() => { const timer = setInterval(() => setCurrent((slide) => (slide + 1) % slides.length), 5000); return () => clearInterval(timer); }, []);
  const slide = slides[current];
  const slideContent = [{ title: t('welcome'), subtitle: t('welcomeSubtitle'), text: t('heroWelcome') }, { title: t('servicesEasier'), subtitle: t('servicesSubtitle'), text: t('heroServices') }, { title: t('connected'), subtitle: t('connectedSubtitle'), text: t('heroConnected') }][current];
  const move = (direction) => setCurrent((slideIndex) => (slideIndex + direction + slides.length) % slides.length);
  return <section className="hero-carousel" aria-label={t('portalLabel')}>
    {slides.map((item, index) => <img key={item.title} className={index === current ? 'hero-image active' : 'hero-image'} src={item.image} alt="" />)}
    <div className="hero-shade" /><div className="hero-content"><p className="hero-label">{t('portalLabel')}</p><h1>{slideContent.title}</h1><h2 lang="mr">{slideContent.subtitle}</h2><p>{slideContent.text}</p><a href="#directory">{t('exploreDirectory')} <span>→</span></a></div>
    <div className="carousel-controls" aria-label={t('selectSlide')}><button className="carousel-arrow" onClick={() => move(-1)} aria-label={t('previousSlide')}>←</button>{slides.map((item, index) => <button key={item.title} className={index === current ? 'active' : ''} onClick={() => setCurrent(index)} aria-label={`${t('selectSlide')} ${index + 1}`} aria-current={index === current} />)}<button className="carousel-arrow" onClick={() => move(1)} aria-label={t('nextSlide')}>→</button></div>
  </section>;
}
