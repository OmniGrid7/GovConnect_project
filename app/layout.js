import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import SiteFooter from '@/components/SiteFooter';
export const metadata = { title: 'GovConnect Maharashtra', description: 'Maharashtra government departments, schemes and digital services directory.' };
export default function RootLayout({ children }) { return <html lang="en"><body><LanguageProvider>{children}<SiteFooter /></LanguageProvider></body></html>; }
