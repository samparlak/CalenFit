# Lib Directory

Bu klasör, uygulama genelinde kullanılan yardımcı fonksiyonları, sabitleri, mesajları ve custom hook'ları içerir.

## Yapı

```
lib/
├── hooks/                      # Custom React hooks
│   ├── useTypewriter.ts        # Typewriter animasyon hook'u
│   ├── useIntersectionObserver.ts  # Visibility detection
│   ├── useScrollPosition.ts    # Scroll tracking
│   └── index.ts                # Barrel export
│
├── constants.ts                # Teknik sabitler
├── messages.ts                 # UI metinleri (i18n-ready)
├── utils.ts                    # Utility fonksiyonlar
└── index.ts                    # Barrel export
```

## Kullanım

```typescript
// Barrel export ile
import { cn, SECTION_IDS, HERO, useTypewriter } from '@/lib'

// Path alias ile (önerilen)
import { cn } from '@/utils'
import { SECTION_IDS } from '@/constants'
import { HERO } from '@/messages'
import { useTypewriter } from '@/hooks'
```

## Modüller

### `constants.ts`
Teknik sabitler:
- `ANIMATION` - Animasyon süreleri
- `LAYOUT` - Layout ölçüleri
- `NAV_ITEMS` - Navigasyon öğeleri
- `SECTION_IDS` - Bölüm ID'leri
- `COLORS` - Renk paleti

### `messages.ts`
UI metinleri (i18n hazır):
- `BRAND` - Marka bilgileri
- `NAVIGATION` - Menü etiketleri
- `HERO` - Hero bölümü içerikleri
- `WHY_CALENFIT` - Avantajlar metinleri
- `PRICING` - Fiyatlandırma içerikleri
- `CONTACT` - İletişim formu metinleri
- `FOOTER` - Footer içerikleri
- `ARIA` - Accessibility etiketleri

### `utils.ts`
Yardımcı fonksiyonlar:
- `cn()` - Tailwind class birleştirme

### `hooks/`
Custom React hooks:
- `useTypewriter` - Typewriter animasyonu
- `useIntersectionObserver` - Görünürlük algılama
- `useScrollPosition` - Scroll pozisyonu takibi
