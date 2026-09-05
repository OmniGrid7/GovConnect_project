import SiteHeader from '@/components/SiteHeader';
import HeroCarousel from '@/components/HeroCarousel';
import DirectoryExplorer from '@/components/DirectoryExplorer';
import DepartmentDirectory from '@/components/DepartmentDirectory';
import PortalCard from '@/components/PortalCard';
import LocalizedText from '@/components/LocalizedText';
import { categories, departmentData, records, schemes, sourceInfo } from '@/lib/directory';

export default function Home() {
  return <><SiteHeader /><main><HeroCarousel /><DirectoryExplorer categories={categories.map((name) => ({ name, slug: encodeURIComponent(name.toLowerCase().replace(/\//g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')), count: records.filter((record) => record.category === name).length }))} records={records} sourceInfo={sourceInfo} /><DepartmentDirectory departments={departmentData} />
    <section className="featured-schemes"><div className="section-title"><p className="eyebrow"><LocalizedText id="schemesEyebrow" /></p><h2><LocalizedText id="popularSchemes" /></h2></div><div className="results-grid">{schemes.slice(0, 6).map((record) => <PortalCard key={record.name} record={record} />)}</div></section>
  </main><footer className="site-footer"><div><strong>GovConnect Maharashtra</strong><p><LocalizedText id="footerIntro" /></p></div><div><strong><LocalizedText id="directorySource" /></strong><p><LocalizedText id="sourceNote" /></p></div></footer></>;
}
