"use client"

/**
 * Register Page
 * Refactored to use AuthLayout for consistency and reduced duplication.
 */

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AUTH } from "@/lib/messages"
import { registerSchema, type RegisterValues } from "@/lib/validations/auth"
import { AuthLayout } from "@/components/layouts/auth-layout"



export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            termsAccepted: false
        }
    })

    const onSubmit = async (data: RegisterValues) => {
        // Simulate API call
        console.log("Register data validated & ready:", data)
        // TODO: Handle registration logic
    }

    return (
        <AuthLayout>
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-foreground mb-2 font-serif">
                    {AUTH.register.title}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base font-medium">
                    {AUTH.register.subtitle}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                    <label htmlFor="fullName" className="text-sm font-semibold text-foreground">
                        {AUTH.register.form.fullName}
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        placeholder={AUTH.register.form.fullNamePlaceholder}
                        {...register("fullName")}
                        className={cn(
                            "w-full h-12 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all",
                            errors.fullName
                                ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                                : "border-input focus:ring-primary/10 focus:border-primary"
                        )}
                    />
                    {errors.fullName && (
                        <p className="text-xs text-destructive font-medium animate-in slide-in-from-top-1">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                        {AUTH.register.form.email}
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder={AUTH.register.form.emailPlaceholder}
                        {...register("email")}
                        className={cn(
                            "w-full h-12 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all",
                            errors.email
                                ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                                : "border-input focus:ring-primary/10 focus:border-primary"
                        )}
                    />
                    {errors.email && (
                        <p className="text-xs text-destructive font-medium animate-in slide-in-from-top-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                    <label htmlFor="password" className="text-sm font-semibold text-foreground">
                        {AUTH.register.form.password}
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder={AUTH.register.form.passwordPlaceholder}
                            {...register("password")}
                            className={cn(
                                "w-full h-12 px-4 pr-12 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all",
                                errors.password
                                    ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                                    : "border-input focus:ring-primary/10 focus:border-primary"
                            )}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs text-destructive font-medium animate-in slide-in-from-top-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Terms Checkbox */}
                <div className="space-y-2">
                    <div className="flex items-start gap-3 pt-2">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                type="checkbox"
                                {...register("termsAccepted")}
                                className={cn(
                                    "w-4 h-4 rounded border-input text-primary focus:ring-primary",
                                    errors.termsAccepted && "border-destructive"
                                )}
                            />
                        </div>
                        <label htmlFor="terms" className="text-xs sm:text-sm text-muted-foreground leading-tight cursor-pointer select-none">
                            {AUTH.register.form.terms}
                        </label>
                    </div>
                    {errors.termsAccepted && (
                        <p className="text-xs text-destructive font-medium animate-in slide-in-from-top-1 ml-7">
                            {errors.termsAccepted.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg shadow-lg shadow-primary/20 transition-all hover:translate-y-[-1px] mt-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Hesap Oluşturuluyor...
                        </>
                    ) : (
                        AUTH.register.form.submitButton
                    )}
                </Button>

                {/* Divider */}
                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground font-medium">veya</span>
                    </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" type="button" className="h-11 rounded-lg border-input text-foreground hover:bg-secondary font-medium">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </Button>
                    <Button variant="outline" type="button" className="h-11 rounded-lg border-input text-foreground hover:bg-secondary font-medium">
                        <svg className="w-5 h-5 mr-2 text-current" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.36-1.09-.56-2.13-.48-3.08.48A4.09 4.09 0 0 1 7.82 23C4.22 22.53 2.67 19.34 3.06 14.7c.36-4.14 2.87-6.22 5.6-5.83 1.12.16 2.16.82 2.92.82 1 0 2.29-1.01 3.87-.73 1.63.29 2.86 1.08 3.52 1.95a3.92 3.92 0 0 0-1.89 3.05c-.09 2.45 2.18 3.65 2.27 3.71-.06.31-.48 1.65-1.74 2.37.03.01-.52.26-.56.24zM12.04 8.78c-.46-2.58 1.67-4.8 4.08-4.94.39 2.58-2.22 4.97-4.08 4.94z" />
                        </svg>
                        Apple
                    </Button>
                </div>

                {/* Login Link */}
                <p className="text-center text-sm text-muted-foreground pt-2">
                    {AUTH.register.form.loginPrompt}{" "}
                    <Link href="/login" className="font-bold text-primary hover:underline transition-all">
                        {AUTH.register.form.loginLink}
                    </Link>
                </p>
            </form>
        </AuthLayout>
    )
}
