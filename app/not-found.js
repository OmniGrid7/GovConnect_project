import Link from 'next/link';
import LocalizedText from '@/components/LocalizedText';
export default function NotFound() { return <main className="not-found"><p className="eyebrow">404</p><h1><LocalizedText id="pageNotFound" /></h1><p><LocalizedText id="pageNotFoundDescription" /></p><Link className="browse-schemes" href="/"><LocalizedText id="returnHome" /></Link></main>; }
