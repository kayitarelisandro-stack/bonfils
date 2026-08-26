import { type ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

interface DashboardLayoutProps {
  children: ReactNode;
  admin?: boolean;
}

export default function DashboardLayout({ children, admin }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex pt-16">
        {!admin && <Sidebar />}
        <main className={`flex-1 min-h-[calc(100vh-4rem)] pb-20 lg:pb-8 ${admin ? '' : 'lg:ml-64'}`}>
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
