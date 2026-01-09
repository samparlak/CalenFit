# Components Directory

Bu klasör, uygulamanın React bileşenlerini içerir.

## Yapı

```
components/
├── ui/                 # UI primitives (shadcn/ui)
│   ├── button.tsx      # Button component
│   └── index.ts        # Barrel export
│
├── header.tsx          # Navigation header
├── hero.tsx            # Hero/landing section
├── why-calenfit.tsx    # Benefits section
├── pricing.tsx         # Pricing plans section
├── contact.tsx         # Contact form section
├── footer.tsx          # Footer component
├── logo.tsx            # Brand logo SVG
├── theme-provider.tsx  # Theme context provider
└── index.ts            # Barrel export
```

## Kullanım

```typescript
// Barrel export ile
import { Header, Hero, Footer } from '@/components'

// Direkt import ile
import { Header } from '@/components/header'

// UI bileşenleri için
import { Button } from '@/components/ui'
```

## Bileşen Kategorileri

### Layout Components
- `Header` - Navigasyon ve logo
- `Footer` - Alt bilgi ve linkler

### Section Components
- `Hero` - Ana landing bölümü
- `WhyCalenFit` - Avantajlar/özellikler
- `Pricing` - Fiyatlandırma planları
- `Contact` - İletişim formu

### Shared Components
- `Logo` - Marka logosu (SVG)
- `ThemeProvider` - Tema context'i

### UI Primitives
- `Button` - Temel buton bileşeni

## Geliştirme Kuralları

1. Her bileşen kendi dosyasında
2. Bileşen adı = Dosya adı (kebab-case)
3. Props için interface tanımı zorunlu
4. JSDoc yorum satırları önerilir
