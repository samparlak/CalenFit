import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { WhyCalenFit } from "@/components/why-calenfit"
import { Pricing } from "@/components/pricing"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
    return (
        <main className="min-h-screen">
            <Header />
            <Hero />
            <WhyCalenFit />
            <Pricing />
            <Contact />
            <Footer />
        </main>
    )
}
