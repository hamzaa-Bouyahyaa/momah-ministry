import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth-store";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import calendarIcon from "@/assets/icons/calendar-icon.svg";

function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  function onSubmit(data: LoginFormData) {
    console.log("Login attempt:", data);

    // TODO: Replace with actual API call
    login("mock-token");
    navigate("/");
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Platform branding */}
      <div className="flex items-center gap-2">
        <img src={calendarIcon} alt="" className="size-8" />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">المنصة الموحّدة</span>
          <span className="text-xs text-muted-foreground">للمكتب التنفيذي</span>
        </div>
      </div>

      {/* Welcome */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold tracking-tight">مرحباً بك,</h1>
        <p className="text-sm text-muted-foreground">
          قم بتسجيل الدخول للوصول إلى حسابك وإدارة اجتماعاتك بكل سهولة.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            autoComplete="email"
            dir="ltr"
            className="text-right"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            dir="ltr"
            className="text-right"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-xl"
        >
          تسجيل الدخول
        </Button>
      </form>
    </div>
  );
}

export { LoginForm };
