import { Outlet } from "react-router-dom";
import { AppHeader } from "@/components/schedule/AppHeader";

function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <main className="flex-1 px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export { AppLayout };
