import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex w-full h-full">
      <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
        <Sidebar />
      </div>
      <div className="lg:pl-[264px] w-full">
        <div className="h-full mx-auto max-w-screen-2xl">
          <Navbar />
          <main className="flex flex-col h-full px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
