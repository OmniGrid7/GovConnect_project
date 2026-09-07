'use client';
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

const helplines = [
  { id: 'helplineEmergency', number: '112 / 100', tone: 'urgent', icon: '!', description: 'Quick response services for police, fire, women in distress and medical emergencies.', features: ['24x7 effective emergency response services.', 'Request help through voice call, SOS, SMS, email, web request or panic button.', 'Automatic location identification of the caller or victim.', 'Dynamic response from the nearest emergency response vehicle.', 'Live tracking of emergency response vehicles.', 'Emergency service coordination from a central control centre.'] },
  { id: 'helplinePolice', number: '112', tone: 'blue', icon: 'P', description: 'Immediate police assistance for threats, crime, accidents and public safety concerns.', features: ['Available around the clock for urgent police assistance.', 'Fast response for incidents reported from anywhere in Maharashtra.', 'Share your location and essential incident details with the control room.'] },
  { id: 'helplineFire', number: '101', tone: 'orange', icon: 'F', description: 'Contact the fire and rescue service for fires, accidents and other hazardous situations.', features: ['24x7 fire and rescue response.', 'Share the incident location to help teams reach you quickly.', 'Follow the operator instructions while help is on the way.'] },
  { id: 'helplineAmbulance', number: '108', tone: 'red', icon: '+', description: 'Free emergency ambulance support for patients who need immediate medical transport.', features: ['Pre-hospital care through life-support ambulances.', 'Emergency transport to the nearest suitable hospital.', 'Support for accidents, critical illness, pregnancy and natural disasters.'] },
  { id: 'helplineWomen', number: '1091', tone: 'violet', icon: 'W', description: 'Dedicated support for women facing distress, harassment or an unsafe situation.', features: ['Confidential assistance for women in distress.', 'Connects callers with the appropriate emergency response team.', 'Available for urgent safety support.'] },
  { id: 'helplineChild', number: '1098', tone: 'green', icon: 'C', description: 'Child helpline support for children who need care, protection or immediate assistance.', features: ['Support for children in difficult or unsafe situations.', 'Connects children with care and protection services.', 'Available for urgent intervention and guidance.'] },
  { id: 'helplineSupport', number: '181', tone: 'teal', icon: 'S', description: 'Women support services for counselling, information and help with related government services.', features: ['Guidance and support for women across Maharashtra.', 'Helps connect callers with relevant departments and services.', 'Accessible support for urgent and non-urgent concerns.'] },
  { id: 'helplineDisaster', number: '1077', tone: 'gold', icon: 'D', description: 'District disaster control room assistance during floods, storms and other emergencies.', features: ['Coordinate assistance during natural and man-made disasters.', 'Report incidents and request local emergency support.', 'Connect with district-level disaster management authorities.'] }
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
      <div className="helpline-description"><p>{selected.description}</p><h3>{t('features')}</h3><ul>{selected.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
    </article>
  </section>;
}