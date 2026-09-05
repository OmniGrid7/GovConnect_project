'use client';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

export default function DepartmentDirectory({ departments, limit }) {
  const { t } = useLanguage();
  const visibleDepartments = limit ? departments.slice(0, limit) : departments;
  return <section className="department-directory" aria-labelledby="department-directory-title">
    <div className="section-heading">
      <div><p className="eyebrow">{t('departmentEyebrow')}</p><h2 id="department-directory-title">{t('exploreDepartments')}</h2><p>{t('departmentIntro')}</p></div>
      {limit && <Link className="browse-schemes" href="/departments">{t('viewAllDepartments')} <span>→</span></Link>}
    </div>
    <div className="department-grid">{visibleDepartments.map((department) => <Link className="department-tile" key={department.slug} href={`/departments/${department.slug}`}><strong>{department.name}</strong><span>{department.count} {department.count === 1 ? t('portal') : t('portals')} <b>→</b></span></Link>)}</div>
  </section>;
}