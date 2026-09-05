import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
export const metadata = { title: 'GovConnect Maharashtra', description: 'Maharashtra government departments, schemes and digital services directory.' };
export default function RootLayout({ children }) { return <html lang="en"><body><LanguageProvider>{children}</LanguageProvider></body></html>; }
