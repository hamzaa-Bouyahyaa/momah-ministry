import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

function DashboardPage() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-12">
      <h1 className="text-2xl font-bold">لوحة التحكم</h1>
      <p className="text-muted-foreground">مرحباً بك في المنصة الموحدة</p>
      <Button variant="outline" onClick={logout}>
        تسجيل الخروج
      </Button>
    </div>
  );
}

export { DashboardPage };
