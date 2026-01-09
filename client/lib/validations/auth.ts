import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().min(1, "E-posta adresi zorunludur").email("Geçerli bir e-posta adresi giriniz"),
    password: z.string().min(1, "Şifre zorunludur").min(6, "Şifre en az 6 karakter olmalıdır")
})

export const registerSchema = z.object({
    fullName: z.string().min(1, "Ad Soyad zorunludur").min(3, "Ad Soyad en az 3 karakter olmalıdır"),
    email: z.string().min(1, "E-posta adresi zorunludur").email("Geçerli bir e-posta adresi giriniz"),
    password: z.string().min(1, "Şifre zorunludur").min(6, "Şifre en az 6 karakter olmalıdır"),
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir"),
    termsAccepted: z.boolean().refine((val) => val === true, {
        message: "Hizmet şartlarını kabul etmelisiniz",
    }),
})

export const forgotPasswordSchema = z.object({
    email: z.string().min(1, "E-posta adresi zorunludur").email("Geçerli bir e-posta adresi giriniz"),
})

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>
