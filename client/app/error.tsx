'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F4F0] text-center px-4 font-sans">
            <div className="bg-red-50 p-4 rounded-full mb-6">
                <AlertCircle className="w-12 h-12 text-[#89342A]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4 font-serif">Bir şeyler ters gitti!</h2>
            <p className="text-[#5E231C]/60 mb-8 max-w-md mx-auto">
                Uygulamada beklenmedik bir hata oluştu. Teknik hata kodu: <span className="font-mono text-xs bg-black/5 px-1 py-0.5 rounded">{error.digest || 'UNKNOWN'}</span>
            </p>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="bg-[#89342A] hover:bg-[#702a22] text-white rounded-full px-8 h-12 shadow-lg shadow-[#89342A]/20 transition-transform hover:scale-105"
            >
                Tekrar Dene
            </Button>
        </div>
    )
}
