import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Tailor | One master resume. Each new role.',description:'Upload your master resume, paste a job description, and review a focused one-page CV with source-backed achievements.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
