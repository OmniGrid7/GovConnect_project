import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import HelplineDirectory from '@/components/HelplineDirectory';
import LocalizedText from '@/components/LocalizedText';

export const metadata = { title: 'Emergency Numbers | GovConnect Maharashtra' };

export default function EmergencyNumbersPage() {
  return <><SiteHeader /><main className="listing-page emergency-page"><div className="breadcrumb"><Link href="/"><LocalizedText id="homeBreadcrumb" /></Link><span>/</span><strong><LocalizedText id="emergencyNumbers" /></strong></div><HelplineDirectory /></main></>;
}