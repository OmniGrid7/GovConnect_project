'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { slugify } from '@/lib/directory';
import { useLanguage } from '@/components/LanguageProvider';

export default function DirectoryExplorer({ categories, records, sourceInfo }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const categoryKey = (name) => `category_${name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`;
  const matches = useMemo(() => records.filter((record) => [record.name, record.department, record.category, record.description].join(' ').toLowerCase().includes(query.toLowerCase())).slice(0, 9), [query, records]);
  return <section id="directory" className="directory-section"><div className="section-heading"><div><p className="eyebrow">{t('directoryEyebrow')}</p><h2>{t('findServices')}</h2><p>{sourceInfo.total} records from {sourceInfo.source}. Last verified {sourceInfo.lastVerified}.</p></div><Link className="browse-schemes" href="/departments">{t('browseDepartments')} <span>→</span></Link></div>
    <label className="directory-search">{t('searchDirectory')}<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('searchPlaceholder')} /></label>
    {!query && <div className="category-widgets">{categories.map((category) => <Link key={category.slug} href={`/categories/${category.slug}`} className="category-widget"><strong>{category.count}</strong><span>{t(categoryKey(category.name), { defaultValue: category.name })}</span><small>{t('viewCategory')} →</small></Link>)}</div>}
    {query && <div className="live-results"><div className="result-caption"><strong>{matches.length}</strong> {t('matchingServices')}</div>{matches.length ? <div className="results-grid">{matches.map((record) => <article className="portal-card" key={`${record.name}-${record.category}`}><span className="card-category">{record.category}</span><h3>{record.name}</h3><p>{record.description}</p><footer><Link href={`/departments/${slugify(record.department)}`}>{record.department}</Link>{record.url && <a href={record.url} target="_blank" rel="noreferrer">{t('visit')} ↗</a>}</footer></article>)}</div> : <p className="empty-state">{t('noResults')}</p>}</div>}
  </section>;
}
