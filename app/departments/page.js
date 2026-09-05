import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { departmentData } from '@/lib/directory';
import LocalizedText from '@/components/LocalizedText';

export const metadata = { title: 'Departments | GovConnect Maharashtra' };

export default function DepartmentsPage() {
  return <><SiteHeader /><main className="listing-page"><div className="breadcrumb"><Link href="/"><LocalizedText id="homeBreadcrumb" /></Link><span>/</span><strong><LocalizedText id="departments" /></strong></div><section className="listing-hero"><p className="eyebrow"><LocalizedText id="directoryEyebrow" /></p><h1><LocalizedText id="departments" /></h1><p><LocalizedText id="exploreDepartments" /></p></section><section className="department-grid department-index-grid">{departmentData.map((department) => <Link className="department-tile" key={department.slug} href={`/departments/${department.slug}`}><strong>{department.name}</strong><span>{department.count} {department.count === 1 ? <LocalizedText id="portal" /> : <LocalizedText id="portals" />} <b>→</b></span></Link>)}</section></main></>;
}