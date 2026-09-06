import './globals.css';
import Script from 'next/script';
import { LanguageProvider } from '@/components/LanguageProvider';
import SiteFooter from '@/components/SiteFooter';
export const metadata = { title: 'GovConnect Maharashtra', description: 'Maharashtra government departments, schemes and digital services directory.' };
export default function RootLayout({ children }) { return <html lang="en"><body><LanguageProvider>{children}<SiteFooter /></LanguageProvider><Script id="chatbase-loader" strategy="afterInteractive">{`(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="gQNGJvNjooEK9f-oajKbN";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`}</Script></body></html>; }
