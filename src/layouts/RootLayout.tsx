import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-4">
      <div className="flex w-full max-w-[1300px] overflow-hidden rounded-3xl bg-background shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.1)]">
        <Outlet />
      </div>
    </div>
  );
}

export { RootLayout };
