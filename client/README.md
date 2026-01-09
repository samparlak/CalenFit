# CalenFit - Fitness Koçluğu Platformu

<div align="center">
  <img src="public/icon.svg" alt="CalenFit Logo" width="80" />
  <h3>Fitness Koçluğu İşinizi Otomatik Pilota Alın</h3>
  <p>Randevuları planlayın, ilerlemeyi takip edin, ödemeleri yönetin</p>
</div>

---

## 📋 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Teknoloji Stack](#-teknoloji-stack)
- [Proje Yapısı](#-proje-yapısı)
- [Kurulum](#-kurulum)
- [Geliştirme](#-geliştirme)
- [Mimari Kararlar](#-mimari-kararlar)
- [Kod Standartları](#-kod-standartları)

---

## 🎯 Proje Hakkında

CalenFit, fitness koçlarının işlerini dijitalleştirmelerine yardımcı olan bir SaaS platformudur. Bu repository, platformun landing page'ini içermektedir.

### Özellikler

- ✅ Modern, responsive tasarım
- ✅ Typewriter animasyonları
- ✅ Smooth scroll navigasyon
- ✅ SEO optimize
- ✅ Accessibility (a11y) compliant
- ✅ Type-safe TypeScript

---

## 🛠 Teknoloji Stack

| Kategori | Teknoloji |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Fonts | Google Fonts (Inter, Playfair Display) |
| Analytics | Vercel Analytics |

---

## 📁 Proje Yapısı

```
CalenFit/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles & Tailwind
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
│
├── components/             # React components
│   ├── ui/                 # UI primitives (shadcn)
│   │   ├── button.tsx
│   │   └── index.ts
│   ├── header.tsx          # Navigation header
│   ├── hero.tsx            # Hero section
│   ├── why-calenfit.tsx    # Benefits section
│   ├── pricing.tsx         # Pricing plans
│   ├── contact.tsx         # Contact form
│   ├── footer.tsx          # Footer
│   ├── logo.tsx            # Brand logo
│   └── index.ts            # Barrel export
│
├── config/                 # Application configuration
│   ├── app.config.ts       # Central config
│   └── index.ts            # Barrel export
│
├── lib/                    # Utilities & helpers
│   ├── hooks/              # Custom React hooks
│   │   ├── useTypewriter.ts
│   │   ├── useIntersectionObserver.ts
│   │   ├── useScrollPosition.ts
│   │   └── index.ts
│   ├── constants.ts        # Technical constants
│   ├── messages.ts         # UI text/content (i18n-ready)
│   ├── utils.ts            # Utility functions
│   └── index.ts            # Barrel export
│
├── types/                  # TypeScript definitions
│   └── index.ts            # Enums, interfaces, types
│
├── public/                 # Static assets
│   ├── hero-bg-gym.png
│   └── icon*.png
│
└── [config files]          # Project configuration
    ├── tsconfig.json
    ├── next.config.mjs
    ├── postcss.config.mjs
    └── package.json
```

---

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+
- npm veya pnpm

### Adımlar

```bash
# Repository'yi klonla
git clone https://github.com/calenfit/landing.git
cd landing

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Tarayıcıda aç
# http://localhost:3000
```

---

## 💻 Geliştirme

### Kullanılabilir Scriptler

```bash
npm run dev      # Geliştirme sunucusu
npm run build    # Production build
npm run start    # Production sunucusu
npm run lint     # ESLint kontrolü
```

### Ortam Değişkenleri

`.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_API_URL=https://api.calenfit.com
```

---

## 🏗 Mimari Kararlar

### 1. SOLID Prensipleri

- **Single Responsibility**: Her bileşen tek bir göreve odaklanır
- **Open/Closed**: Bileşenler extension'a açık, modification'a kapalı
- **Dependency Inversion**: Concrete yerine abstract'lara bağımlılık

### 2. Dosya Organizasyonu

- **Barrel Exports**: Her modül için `index.ts` ile clean import paths
- **Separation of Concerns**: Config, types, messages, components ayrı
- **Colocation**: İlgili dosyalar bir arada

### 3. Type Safety

- **Enums**: Fixed value sets için (SectionId, PlanTier, vb.)
- **Interfaces**: Object shapes için (IPricingPlan, IContactFormData)
- **Generics**: Reusable hook'lar için

### 4. i18n Hazırlık

- Tüm UI metinleri `lib/messages.ts` dosyasında merkezi
- Namespace-based organization
- Easy to integrate with i18n library

---

## 📝 Kod Standartları

### Import Sıralaması

```typescript
// 1. React/Next.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 2. Third-party libraries
import { Check, Clock } from 'lucide-react'

// 3. Internal modules (absolute paths)
import { Button } from '@/components/ui'
import { useTypewriter } from '@/lib/hooks'
import { HERO } from '@/lib/messages'
import { SectionId } from '@/types'

// 4. Relative imports
import { Logo } from './logo'

// 5. Types (type-only imports)
import type { IPricingPlan } from '@/types'
```

### Naming Conventions

| Tip | Convention | Örnek |
|-----|------------|-------|
| Components | PascalCase | `PricingCard` |
| Hooks | camelCase (use prefix) | `useTypewriter` |
| Constants | SCREAMING_SNAKE | `SECTION_IDS` |
| Enums | PascalCase | `SectionId` |
| Interfaces | IPascalCase | `IPricingPlan` |
| Files | kebab-case | `why-calenfit.tsx` |

### JSDoc Comments

```typescript
/**
 * Pricing card component
 * 
 * @param plan - Pricing plan data
 * @param typewriterText - Animated description text
 * @returns Rendered pricing card
 */
function PricingCard({ plan, typewriterText }: IPricingCardProps) {
  // ...
}
```

---

## 📄 Lisans

© 2026 CalenFit. Tüm hakları saklıdır.

---

<div align="center">
  <sub>Built with ❤️ by CalenFit Team</sub>
</div>
