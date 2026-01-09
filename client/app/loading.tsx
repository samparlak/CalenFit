import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="relative">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping duration-1000"></div>

                {/* Main spinner */}
                <Loader2 className="h-12 w-12 text-primary animate-spin relative z-10" />
            </div>

            {/* Loading text with pulse effect */}
            <h2 className="mt-4 text-lg font-semibold text-muted-foreground animate-pulse">
                Yükleniyor...
            </h2>
        </div>
    )
}
