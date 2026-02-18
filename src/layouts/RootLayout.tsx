import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="bg-app min-h-svh">
      <Outlet />
    </div>
  );
}

export { RootLayout };
