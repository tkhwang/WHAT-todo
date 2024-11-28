import { UserButton } from "@/features/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 pt-4">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground">Monitor all of you projects and tasks here</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
}
