# Config Directory

Bu klasör, uygulama konfigürasyonlarını içerir.

## Yapı

```
config/
├── app.config.ts    # Merkezi uygulama konfigürasyonu
└── index.ts         # Barrel export
```

## İçerik

### `app.config.ts`

Tüm uygulama ayarlarının merkezi dosyası:

| Export | Açıklama |
|--------|----------|
| `APP_CONFIG` | Uygulama metadata |
| `SEO_CONFIG` | SEO ayarları |
| `THEME_CONFIG` | Tema/renk ayarları |
| `FEATURE_FLAGS` | Feature toggle'lar |
| `API_CONFIG` | API endpoint'leri |
| `EXTERNAL_SERVICES` | Harici servis URL'leri |
| `VALIDATION_CONFIG` | Form doğrulama kuralları |
| `ANIMATION_CONFIG` | Animasyon ayarları |
| `LAYOUT_CONFIG` | Layout ölçüleri |

## Kullanım

```typescript
// Named exports
import { APP_CONFIG, FEATURE_FLAGS } from '@/config'

// Default export (tüm config)
import config from '@/config/app.config'

// Örnek kullanım
if (FEATURE_FLAGS.enableDarkMode) {
  // Dark mode logic
}

console.log(APP_CONFIG.name) // "CalenFit"
```

## Ortam Değişkenleri

Sensitive değerler için `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.calenfit.com
```

Config dosyasında kullanım:
```typescript
baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.calenfit.com'
```
