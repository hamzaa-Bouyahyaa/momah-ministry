import { Outlet } from "react-router-dom";
import loginImage from "@/assets/login-momah.svg";

function AuthLayout() {
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <div className="flex w-full max-w-[1100px] overflow-hidden rounded-3xl bg-background shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.1)]">
        {/* Form panel */}
        <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

        {/* Branding panel */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={loginImage}
            alt="المنصة الموحدة للمكتب التنفيذي"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export { AuthLayout };
