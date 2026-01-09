import { z } from "zod"

export const contactSchema = z.object({
    name: z.string().min(1, "Ad Soyad zorunludur").min(2, "Ad Soyad en az 2 karakter olmalıdır"),
    email: z.string().min(1, "E-posta adresi zorunludur").email("Geçerli bir e-posta adresi giriniz"),
    phone: z.string().optional(),
    message: z.string().min(10, "Mesajınız en az 10 karakter uzunluğunda olmalıdır").max(1000, "Mesajınız çok uzun"),
})

export type ContactValues = z.infer<typeof contactSchema>
