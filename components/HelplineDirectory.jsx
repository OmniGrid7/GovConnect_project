'use client';
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

const helplines = [
  { id: 'helplineEmergency', number: '112 / 100', tone: 'urgent', icon: '!', descriptionKey: 'emergencyDescription', featureKeys: ['emergencyFeature1', 'emergencyFeature2', 'emergencyFeature3', 'emergencyFeature4', 'emergencyFeature5', 'emergencyFeature6'] },
  { id: 'helplinePolice', number: '112', tone: 'blue', icon: 'P', descriptionKey: 'policeDescription', featureKeys: ['policeFeature1', 'policeFeature2', 'policeFeature3'] },
  { id: 'helplineFire', number: '101', tone: 'orange', icon: 'F', descriptionKey: 'fireDescription', featureKeys: ['fireFeature1', 'fireFeature2', 'fireFeature3'] },
  { id: 'helplineAmbulance', number: '108', tone: 'red', icon: '+', descriptionKey: 'ambulanceDescription', featureKeys: ['ambulanceFeature1', 'ambulanceFeature2', 'ambulanceFeature3'] },
  { id: 'helplineWomen', number: '1091', tone: 'violet', icon: 'W', descriptionKey: 'womenDescription', featureKeys: ['womenFeature1', 'womenFeature2', 'womenFeature3'] },
  { id: 'helplineChild', number: '1098', tone: 'green', icon: 'C', descriptionKey: 'childDescription', featureKeys: ['childFeature1', 'childFeature2', 'childFeature3'] },
  { id: 'helplineSupport', number: '181', tone: 'teal', icon: 'S', descriptionKey: 'supportDescription', featureKeys: ['supportFeature1', 'supportFeature2', 'supportFeature3'] },
  { id: 'helplineDisaster', number: '1077', tone: 'gold', icon: 'D', descriptionKey: 'disasterDescription', featureKeys: ['disasterFeature1', 'disasterFeature2', 'disasterFeature3'] }
];

export default function HelplineDirectory() {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState(helplines[0].id);
  const selected = helplines.find((helpline) => helpline.id === selectedId) || helplines[0];

  return <section className="helpline-directory" aria-labelledby="helpline-title">
    <div className="section-heading">
      <div><p className="eyebrow">{t('helplineEyebrow')}</p><h2 id="helpline-title">{t('helplineTitle')}</h2><p>{t('helplineIntro')}</p></div>
    </div>
    <div className="helpline-tabs" role="tablist" aria-label={t('helplineTitle')}>
      {helplines.slice(0, 2).map((helpline) => <button className={`helpline-tab ${helpline.tone} ${selected.id === helpline.id ? 'active' : ''}`} key={helpline.id} onClick={() => setSelectedId(helpline.id)} role="tab" aria-selected={selected.id === helpline.id} type="button"><span className="helpline-tab-icon">{helpline.icon}</span>{t(helpline.id)}</button>)}
    </div>
    <div className="helpline-service-list">
      {helplines.slice(2).map((helpline) => <button className={`helpline-service ${helpline.tone} ${selected.id === helpline.id ? 'active' : ''}`} key={helpline.id} onClick={() => setSelectedId(helpline.id)} type="button"><span className="helpline-service-icon">{helpline.icon}</span><span>{t(helpline.id)}</span></button>)}
    </div>
    <article className={`helpline-detail ${selected.tone}`} role="tabpanel">
      <div className="helpline-contact-card"><div className="helpline-detail-icon">{selected.icon}</div><p>{t(selected.id)}</p><strong>{selected.number}</strong><span>{t('forEmergency')}</span><a className="helpline-call-button" href={`tel:${selected.number.replace(/\s\/\s/g, ',')}`}>{t('callNow')}</a></div>
      <div className="helpline-description"><p>{t(selected.descriptionKey)}</p><h3>{t('features')}</h3><ul>{selected.featureKeys.map((feature) => <li key={feature}>{t(feature)}</li>)}</ul></div>
    </article>
  </section>;
}