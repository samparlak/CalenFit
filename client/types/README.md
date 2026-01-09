# Types Directory

Bu klasör, uygulama genelinde kullanılan TypeScript tip tanımlamalarını içerir.

## Yapı

```
types/
└── index.ts    # Tüm tip tanımlamaları
```

## İçerik

### Enums

| Enum | Açıklama |
|------|----------|
| `SectionId` | Sayfa bölüm ID'leri |
| `PlanTier` | Fiyat planı seviyeleri |
| `BenefitType` | Avantaj kategorileri |
| `FormInputType` | Form input tipleri |
| `SocialPlatform` | Sosyal medya platformları |
| `AppStore` | Uygulama mağazaları |
| `AnimationState` | Animasyon durumları |
| `ButtonVariant` | Buton varyantları |
| `ButtonSize` | Buton boyutları |
| `FormStatus` | Form gönderim durumları |
| `ScrollDirection` | Scroll yönleri |

### Interfaces

| Interface | Açıklama |
|-----------|----------|
| `INavItem` | Navigasyon öğesi |
| `IBenefit` | Avantaj kartı verisi |
| `IPricingFeature` | Fiyat özelliği |
| `IPricingPlan` | Fiyat planı |
| `IContactFormData` | İletişim formu verisi |
| `ISocialLink` | Sosyal medya linki |
| `IAppStoreButton` | Mağaza butonu |
| `ITypewriterOptions` | Typewriter seçenekleri |
| `ITypewriterResult` | Typewriter sonucu |
| `IIntersectionObserverOptions` | Observer seçenekleri |
| `IScrollPositionOptions` | Scroll seçenekleri |
| `IScrollPositionResult` | Scroll sonucu |

### Component Props

| Interface | Bileşen |
|-----------|---------|
| `ILogoProps` | Logo |
| `IButtonProps` | Button |
| `IFormInputProps` | FormInput |
| `IPricingCardProps` | PricingCard |
| `IBenefitCardProps` | BenefitCard |

## Kullanım

```typescript
import { 
  SectionId,           // Enum
  PlanTier,            // Enum
  type IPricingPlan,   // Interface
  type IContactFormData // Interface
} from '@/types'
```

## Naming Conventions

- **Enums**: PascalCase (`SectionId`)
- **Interfaces**: IPascalCase (`IPricingPlan`)
- **Types**: PascalCase (`ContactFormField`)
