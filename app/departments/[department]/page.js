import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import PortalCard from '@/components/PortalCard';
import LocalizedText from '@/components/LocalizedText';
import { departments, records, slugify, unslugify } from '@/lib/directory';

export function generateStaticParams() { return departments.map((department) => ({ department: slugify(department) })); }
export default async function DepartmentPage({ params }) {
  const { department: slug } = await params;
  const department = unslugify(slug, departments);
  if (!department) notFound();
  const departmentRecords = records.filter((record) => record.department === department);
  return <><SiteHeader /><main className="listing-page"><div className="breadcrumb"><Link href="/"><LocalizedText id="homeBreadcrumb" /></Link><span>/</span><Link href="/departments"><LocalizedText id="departments" /></Link><span>/</span><strong>{department}</strong></div><section className="listing-hero"><p className="eyebrow"><LocalizedText id="departmentPage" /></p><h1>{department}</h1><p><LocalizedText id="departmentDescription" /> {departmentRecords.length}.</p></section><section className="listing-content department-layout"><aside><h2><LocalizedText id="departments" /></h2><Link className="side-link active" href="/departments"><LocalizedText id="allDepartments" /><span>→</span></Link><Link className="side-link" href="/categories/scheme-and-programme-and-mission-and-application"><LocalizedText id="schemes" /><span>→</span></Link></aside><div className="listing-results"><h2><LocalizedText id="availableServices" /></h2><div className="results-grid">{departmentRecords.map((record) => <PortalCard key={record.name} record={record} />)}</div></div></section></main></>;
}
