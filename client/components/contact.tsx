"use client"

/**
 * Contact Component
 * 
 * Layout: Split Layout (Text Left | Form Right) matching the provided screenshot.
 * Style: Warm beige tones, white inputs, bordo button.
 */

import { useState, useCallback, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SECTION_IDS } from "@/lib/constants"
import { CONTACT } from "@/lib/messages"



interface ContactFormData {
    name: string
    email: string
    phone: string
    message: string
}

// Görseldeki input stili: Beyaz zemin, yuvarlak köşeler, kenarlık yok veya çok silik
const INPUT_CLASSES = cn(
    "w-full px-4 py-3",
    "bg-white rounded-lg border-none shadow-sm", // Beyaz kutular
    "focus:outline-none focus:ring-2 focus:ring-[#89342A]/20",
    "transition-all text-base text-[#1a1a1a] placeholder:text-gray-400"
)

interface FormInputProps {
    type: "text" | "email" | "tel"
    name: keyof ContactFormData
    placeholder: string
    value: string
    onChange: (name: keyof ContactFormData, value: string) => void
    required?: boolean
}

function FormInput({
    type,
    name,
    placeholder,
    value,
    onChange,
    required = false
}: FormInputProps) {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                className={INPUT_CLASSES}
                required={required}
            />
        </div>
    )
}

const INITIAL_FORM_STATE: ContactFormData = {
    name: "",
    email: "",
    phone: "",
    message: "",
}

export function Contact() {
    const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_STATE)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleFieldChange = useCallback((field: keyof ContactFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            console.log("Form submitted:", formData)
            setIsSuccess(true)
            setFormData(INITIAL_FORM_STATE)
            setTimeout(() => setIsSuccess(false), 5000)
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        // Görseldeki gibi açık zemin
        <section id={SECTION_IDS.contact} className="py-20 lg:py-32 bg-[#F9F4F0] relative overflow-hidden">

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* SOL TARA: Başlık ve Açıklama (Sola Yaslı) */}
                    <div className="text-left lg:pt-12">
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 font-serif">
                            {CONTACT.header.title}
                        </h2>
                        <p className="text-lg text-[#5E231C]/60 leading-relaxed max-w-lg">
                            {CONTACT.header.subtitle}
                        </p>
                    </div>

                    {/* SAĞ TARAF: Form Kartı */}
                    <div>
                        {/* Kart arka planı görseldeki gibi biraz daha koyu/belirgin bir bej tonu ve shadow */}
                        <div className="bg-[#FAF5F0] rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-[#EAE0D5] p-8 sm:p-10">

                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">
                                {CONTACT.form.title} {/* "Bize Mesaj Gönderin" */}
                            </h3>

                            {isSuccess ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Teşekkürler!</h3>
                                    <p className="text-[#5E231C]/60 mb-6">Mesajınız başarıyla iletildi.</p>
                                    <Button
                                        onClick={() => setIsSuccess(false)}
                                        variant="outline"
                                        className="border-[#89342A] text-[#89342A] hover:bg-[#F9F4F0]"
                                    >
                                        Yeni Mesaj Gönder
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <FormInput
                                        type="text"
                                        name="name"
                                        placeholder={CONTACT.form.placeholders.name}
                                        value={formData.name}
                                        onChange={handleFieldChange}
                                        required
                                    />

                                    <FormInput
                                        type="email"
                                        name="email"
                                        placeholder={CONTACT.form.placeholders.email}
                                        value={formData.email}
                                        onChange={handleFieldChange}
                                        required
                                    />

                                    <FormInput
                                        type="tel"
                                        name="phone"
                                        placeholder={CONTACT.form.placeholders.phone}
                                        value={formData.phone}
                                        onChange={handleFieldChange}
                                    />

                                    <div>
                                        <textarea
                                            className={cn(INPUT_CLASSES, "resize-none h-32 py-3")}
                                            placeholder={CONTACT.form.placeholders.message}
                                            value={formData.message}
                                            onChange={(e) => handleFieldChange("message", e.target.value)}
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-12 bg-[#89342A] hover:bg-[#722b22] text-white font-bold rounded-full shadow-lg shadow-[#89342A]/10 mt-2 transition-transform hover:scale-[1.02]"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Gönderiliyor..." : CONTACT.form.submitButton}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
