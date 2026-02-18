import * as yup from "yup";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("البريد الإلكتروني مطلوب")
    .email("يرجى إدخال بريد إلكتروني صحيح"),
  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
    .matches(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
    .matches(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل")
    .matches(
      /[^A-Za-z0-9]/,
      "يجب أن تحتوي على رمز خاص واحد على الأقل",
    ),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export { loginSchema, type LoginFormData };
