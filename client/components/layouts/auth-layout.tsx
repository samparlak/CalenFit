import Link from "next/link"
import { Logo } from "@/components/logo"
import { BRAND } from "@/lib/messages"

interface AuthLayoutProps {
    children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center p-4 relative font-sans">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-[#F9F4F0] z-0" />

            {/* Top Header / Logo Area */}
            <div className="absolute top-6 left-6 z-10">
                <Link href="/" className="flex items-center gap-2 group">
                    <Logo className="h-8 w-8 text-[#89342A] transition-transform group-hover:scale-105" />
                    <span className="text-xl font-bold text-[#89342A] tracking-tight">{BRAND.name}</span>
                </Link>
            </div>

            {/* Content Wrapper (Card) */}
            <div className="w-full max-w-[500px] bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EAE0D5]/50 p-8 sm:p-12 relative z-10">
                {children}
            </div>
        </div>
    )
}
