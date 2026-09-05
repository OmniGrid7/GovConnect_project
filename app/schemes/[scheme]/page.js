import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import PortalCard from '@/components/PortalCard';
import LocalizedText from '@/components/LocalizedText';
import { findScheme, schemeData, schemes, slugify } from '@/lib/directory';

export function generateStaticParams() { return schemeData.map((scheme) => ({ scheme: scheme.slug })); }

export default async function SchemePage({ params }) {
  const { scheme: slug } = await params;
  const scheme = findScheme(slug);
  if (!scheme) notFound();
  const relatedSchemes = schemes.filter((record) => record.department === scheme.department && record.name !== scheme.name).slice(0, 3);
  return <><SiteHeader /><main className="listing-page scheme-detail-page"><div className="breadcrumb"><Link href="/"><LocalizedText id="homeBreadcrumb" /></Link><span>/</span><Link href="/categories/scheme-programme-mission-application"><LocalizedText id="schemes" /></Link><span>/</span><strong>{scheme.name}</strong></div><section className="scheme-detail-hero"><p className="eyebrow"><LocalizedText id="schemesEyebrow" /></p><h1>{scheme.name}</h1><p>{scheme.description}</p><div className="scheme-detail-actions"><Link className="browse-schemes" href={`/departments/${slugify(scheme.department)}`}><LocalizedText id="exploreDepartmentServices" /> <span>→</span></Link>{scheme.url && <a className="primary-action" href={scheme.url} target="_blank" rel="noreferrer"><LocalizedText id="openOfficial" /> ↗</a>}</div></section><section className="scheme-detail-content"><div><h2><LocalizedText id="aboutService" /></h2><p>{scheme.description}</p></div><aside><span className="card-category"><LocalizedText id="responsibleDepartment" /></span><h2>{scheme.department}</h2><Link href={`/departments/${slugify(scheme.department)}`}><LocalizedText id="exploreDepartmentServices" /> →</Link></aside></section>{relatedSchemes.length > 0 && <section className="related-schemes"><div className="section-title"><p className="eyebrow"><LocalizedText id="relatedServices" /></p><h2>{scheme.department}</h2></div><div className="results-grid">{relatedSchemes.map((record) => <PortalCard key={record.name} record={record} />)}</div></section>}</main></>;
}