"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F4F0] text-center px-4 font-sans">
            <h1 className="text-9xl font-black text-[#89342A] opacity-20 font-serif select-none">404</h1>
            <div className="relative z-10 -mt-12 sm:-mt-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4 font-serif">
                    Sayfa Bulunamadı
                </h2>
                <p className="text-base sm:text-lg text-[#5E231C]/60 mb-8 max-w-md mx-auto">
                    Aradığınız sayfa silinmiş, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
                </p>
                <Button
                    asChild
                    className="bg-[#89342A] hover:bg-[#702a22] text-white rounded-full px-8 h-12 shadow-lg shadow-[#89342A]/20 transition-transform hover:scale-105"
                >
                    <Link href="/">
                        Ana Sayfaya Dön
                    </Link>
                </Button>
            </div>
        </div>
    )
}
