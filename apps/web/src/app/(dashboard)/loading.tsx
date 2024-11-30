import { Loader } from "lucide-react";

function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}

export default DashboardLoading;
