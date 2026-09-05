import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import PortalCard from '@/components/PortalCard';
import LocalizedText from '@/components/LocalizedText';
import { categories, records, slugify, unslugify } from '@/lib/directory';

export function generateStaticParams() { return categories.map((category) => ({ category: slugify(category) })); }
export default async function CategoryPage({ params }) {
  const { category: slug } = await params;
  const category = unslugify(slug, categories);
  if (!category) notFound();
  const categoryRecords = records.filter((record) => record.category === category);
  return <><SiteHeader /><main className="listing-page"><div className="breadcrumb"><Link href="/"> <LocalizedText id="homeBreadcrumb" /></Link><span>/</span><span><LocalizedText id="directory" /></span><span>/</span><strong>{category}</strong></div><section className="listing-hero"><p className="eyebrow"><LocalizedText id="categoryDirectory" /></p><h1>{category}</h1><p>{categoryRecords.length} <LocalizedText id="verifiedRecords" /></p></section><section className="listing-content"><aside><h2><LocalizedText id="browseCategories" /></h2>{categories.map((item) => <Link key={item} className={item === category ? 'side-link active' : 'side-link'} href={`/categories/${slugify(item)}`}>{item}<span>{records.filter((record) => record.category === item).length}</span></Link>)}</aside><div className="listing-results"><h2>{categoryRecords.length} <LocalizedText id="servicesPortals" /></h2><div className="results-grid">{categoryRecords.map((record) => <PortalCard key={record.name} record={record} />)}</div></div></section></main></>;
}
