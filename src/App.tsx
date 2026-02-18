import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProviders } from "@/providers/AppProviders";
import { RootLayout } from "@/layouts/RootLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { GuestGuard } from "@/components/guards/GuestGuard";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { LoginPage } from "@/pages/login";

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Routes>
          <Route element={<RootLayout />}>
            {/* Guest routes */}
            <Route element={<GuestGuard />}>
              <Route element={<AuthLayout />}>
                <Route path="/auth/login" element={<LoginPage />} />
              </Route>
            </Route>

            {/* Protected routes */}
            <Route element={<AuthGuard />}>
              <Route path="/" element={<AppLayout />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
