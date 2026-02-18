import { Outlet } from "react-router-dom";
import loginImage from "@/assets/login-momah.svg";

function AuthLayout() {
  return (
    <>
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
    </>
  );
}

export { AuthLayout };
