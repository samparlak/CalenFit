"use client"

/**
 * Login Page
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
import { loginSchema, type LoginValues } from "@/lib/validations/auth"
import { AuthLayout } from "@/components/layouts/auth-layout"



export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: LoginValues) => {
        // Simulate API call
        console.log("Login data validated & ready:", data)
        // TODO: Handle authentication with backend
    }

    return (
        <AuthLayout>
            {/* Card Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-foreground mb-2 font-serif">
                    {AUTH.login.title}
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                    {AUTH.login.subtitle}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-foreground"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            placeholder="ornek@email.com"
                            {...register("email")}
                            aria-invalid={!!errors.email}
                            className={cn(
                                "w-full h-12 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all",
                                errors.email
                                    ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                                    : "border-input focus:ring-primary/10 focus:border-primary"
                            )}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-foreground"
                    >
                        Şifre
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
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

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg shadow-lg shadow-primary/20 transition-all hover:translate-y-[-1px]"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Giriş Yapılıyor...
                        </>
                    ) : (
                        AUTH.login.submitButton
                    )}
                </Button>

                {/* Forgot Password Link */}
                <div className="text-center">
                    <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        {AUTH.login.forgotPassword}?
                    </Link>
                </div>
            </form>

            {/* Divider */}
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-[#E2E8F0]"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-4 text-muted-foreground font-medium tracking-wide">
                        CalenFit'te yeni misiniz?
                    </span>
                </div>
            </div>

            {/* Sign Up Button */}
            <Button
                variant="outline"
                className="w-full h-12 border-input text-foreground hover:bg-secondary hover:text-primary hover:border-primary/30 font-semibold rounded-lg transition-all"
                asChild
            >
                <Link href="/register">
                    {AUTH.login.registerLink}
                </Link>
            </Button>
        </AuthLayout>
    )
}
