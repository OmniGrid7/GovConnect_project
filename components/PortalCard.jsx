'use client';
import Link from 'next/link';
import { slugify } from '@/lib/directory';
import { useLanguage } from '@/components/LanguageProvider';

export default function PortalCard({ record }) {
  const { t } = useLanguage();
  const isScheme = record.category.includes('Scheme');
  const categoryKey = `category_${record.category.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`;
  return <article className="portal-card"><span className="card-category">{t(categoryKey, { defaultValue: record.category })}</span>{isScheme ? <h3><Link className="portal-title-link" href={`/schemes/${slugify(record.name)}`}>{record.name}</Link></h3> : <h3>{record.name}</h3>}<p>{record.description || t('directoryEyebrow')}</p><footer><Link href={`/departments/${slugify(record.department)}`}>{record.department || t('gov')}</Link>{record.url ? <a href={record.url} target="_blank" rel="noreferrer">{t('visit')} ↗</a> : <span>{t('linkUnavailable')}</span>}</footer></article>;
}
