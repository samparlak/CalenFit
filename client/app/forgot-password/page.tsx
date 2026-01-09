"use client"

/**
 * Forgot Password Page
 * Refactored to use AuthLayout for consistency and reduced duplication.
 */

import { useState } from "react"
import Link from "next/link"
import { Playfair_Display } from "next/font/google"
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AUTH } from "@/lib/messages"
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validations/auth"
import { AuthLayout } from "@/components/layouts/auth-layout"

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function ForgotPasswordPage() {
    const [isSuccess, setIsSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = async (data: ForgotPasswordValues) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log("Password reset requested for:", data.email)
        setIsSuccess(true)
        // TODO: Trigger backend password reset flow
    }

    return (
        <AuthLayout>
            {/* Card Header */}
            <div className="text-center mb-8">
                <h1 className={cn("text-3xl font-bold text-[#1a1a1a] mb-3", playfair.className)}>
                    {AUTH.forgotPassword.title}
                </h1>
                <p className="text-sm text-[#5E231C]/60 font-medium leading-relaxed">
                    {AUTH.forgotPassword.subtitle}
                </p>
            </div>

            {isSuccess ? (
                // Success State
                <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-[#1a1a1a]">E-posta Gönderildi!</h3>
                        <p className="text-sm text-[#5E231C]/70">
                            {AUTH.forgotPassword.successMessage}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="w-full h-12 border-[#E2E8F0] text-[#1a1a1a] hover:bg-[#F9F4F0] font-semibold mt-4"
                        asChild
                    >
                        <Link href="/login">
                            {AUTH.forgotPassword.form.backToLogin}
                        </Link>
                    </Button>
                </div>
            ) : (
                // Form State
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-[#1a1a1a]"
                        >
                            {AUTH.forgotPassword.form.email}
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                placeholder={AUTH.forgotPassword.form.emailPlaceholder}
                                {...register("email")}
                                className={cn(
                                    "w-full h-12 px-4 rounded-lg border bg-white text-[#1a1a1a] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 transition-all",
                                    errors.email
                                        ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                                        : "border-[#E2E8F0] focus:ring-[#89342A]/10 focus:border-[#89342A]"
                                )}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-12 bg-[#89342A] hover:bg-[#702a22] text-white font-bold rounded-lg shadow-lg shadow-[#89342A]/20 transition-all hover:translate-y-[-1px]"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Gönderiliyor...
                            </>
                        ) : (
                            AUTH.forgotPassword.form.submitButton
                        )}
                    </Button>

                    {/* Back to Login Link */}
                    <div className="text-center pt-2">
                        <Link
                            href="/login"
                            className="inline-flex items-center text-sm font-medium text-[#5E231C]/60 hover:text-[#89342A] transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                            {AUTH.forgotPassword.form.backToLogin}
                        </Link>
                    </div>
                </form>
            )}
        </AuthLayout>
    )
}
