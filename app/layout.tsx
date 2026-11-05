import './globals.css';
import { Navbar, Footer } from '@/components/layout';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: { default: 'BookNook | Home', template: 'BookNook | %s' }, description: 'Discover, share and borrow your next favorite book.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><Navbar/><main className="main">{children}</main><Footer/><Toaster position="top-right"/></body></html>;
}
