/**
 * CalenFit Application Messages & Content
 * 
 * Centralized message/content management for:
 * - Easy localization support (i18n-ready)
 * - Single source of truth for all UI text
 * - Consistent messaging across the application
 * 
 * Naming Convention:
 * - SCREAMING_SNAKE_CASE for namespaces
 * - camelCase for message keys
 * - Descriptive names indicating context and purpose
 */

// ============================================================================
// BRAND
// ============================================================================
export const BRAND = {
    name: 'CalenFit',
    nameParts: {
        prefix: 'Calen',
        suffix: 'Fit',
    },
    tagline: 'Fitness koçları için tasarlandı',
} as const

// ============================================================================
// NAVIGATION
// ============================================================================
export const NAVIGATION = {
    items: {
        features: 'Özellikler',
        pricing: 'Fiyatlandırma',
        contact: 'İletişim',
    },
    auth: {
        login: 'Giriş Yap',
        getStarted: 'Ücretsiz Başla',
    },
    mobile: {
        openMenu: 'Menüyü aç',
        closeMenu: 'Menüyü kapat',
    },
} as const

// ============================================================================
// HERO SECTION
// ============================================================================
export const HERO = {
    heading: {
        line1: 'Fitness Koçluğu İşinizi',
        line2: 'Otomatik Pilota Alın',
    },
    description: 'CalenFit randevu, ödeme ve müşteri yönetim süreçlerini otomatize eder ve size zaman kazandırarak işinizi büyütmeye odaklanmanızı sağlar.',
    cta: {
        primary: 'Ücretsiz Başlayın',
    },
    // Demo card content
    demoCard: {
        weekdays: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
        appointments: [
            {
                initials: 'AY',
                name: 'Ahmet Yılmaz',
                time: '14:00-15:00',
                type: 'Kişisel Antrenman',
            },
            {
                initials: 'EK',
                name: 'Elif Kaya',
                time: '16:00-17:00',
                type: 'Yoga Seansı',
            },
        ],
        athleteNotes: {
            title: 'Sporcu Notları',
            goal: '🎯 Hedef: 5kg kas',
            schedule: '✓ Haftada 3 seans',
        },
    },
} as const

// ============================================================================
// WHY CALENFIT SECTION
// ============================================================================
export const WHY_CALENFIT = {
    typewriterLines: [
        'Koçluğunuza odaklanın, manuel süreçleri CalenFit\'e devredin.',
        'Randevu, planlama ve ödemeleri tek platformdan otomatik yönetin.',
        'Verimliliği artırın, kusursuz bir deneyimle fark yaratın.',
    ],
    benefits: {
        timeSaving: {
            title: 'Zaman Tasarrufu',
            description: 'Otomatik randevu yönetimi ile manuel iş yükünü minimize edin.',
        },
        performance: {
            title: 'Performans Takibi',
            description: 'Müşteri ilerlemesini anlık metriklerle izleyin ve raporlayın.',
        },
        professional: {
            title: 'Profesyonel Görünüm',
            description: 'Kişiselleştirilmiş portal ile marka güvenilirliğinizi artırın.',
        },
        payment: {
            title: 'Kolay Tahsilat',
            description: 'Entegre ödeme sistemi ile finansal süreçleri otomatikleştirin.',
        },
    },
} as const

// ============================================================================
// PRICING SECTION
// ============================================================================
export const PRICING = {
    header: {
        title: 'Size Uygun Planı Seçin',
        subtitle: 'İşinizi büyütmek için ihtiyacınız olan tüm araçlar, size en uygun paketlerde toplandı.',
    },
    badges: {
        popular: 'En Popüler',
    },
    currency: {
        symbol: '₺',
        period: '/ay',
    },
    plans: {
        free: {
            name: 'Ücretsiz',
            description: 'Dijital koçluğun gücünü keşfet',
            price: '0',
            capacity: '5 öğrenci kapasitesi',
            cta: 'Hemen Başla',
        },
        pro: {
            name: 'Pro',
            description: 'İşini profesyonelce büyüt',
            price: '499',
            capacity: '15 öğrenci kapasitesi',
            cta: 'Pro Edin',
        },
        elite: {
            name: 'Elite',
            description: 'Performansını zirveye taşı',
            price: '999',
            capacity: '50 öğrenci kapasitesi',
            cta: 'Elite Edin',
        },
    },
    features: {
        calendar: 'Akıllı Randevu ve Takvim Yönetimi',
        portfolio: 'Müşteri Portföy Takibi',
        programs: 'Kişiselleştirilmiş Antrenman Programları',
        payment: 'Entegre Ödeme ve Tahsilat Sistemi',
        invoicing: 'Otomatik Faturalandırma Modülü',
    },
} as const

// ============================================================================
// CONTACT SECTION
// ============================================================================
export const CONTACT = {
    header: {
        title: 'İletişime Geçin',
        subtitle: 'Fitness işinizi yönetirken ihtiyaç duyduğunuz profesyonel rehberliği sağlamak ve gelişim yolculuğunuza değer katmak için buradayız.',
    },
    form: {
        title: 'Bize Mesaj Gönderin',
        placeholders: {
            name: 'Adınız Soyadınız',
            email: 'E-posta Adresiniz',
            phone: 'Telefon Numaranız (Opsiyonel)',
            message: 'Size nasıl yardımcı olabiliriz?',
        },
        submitButton: 'Mesaj Gönder',
    },
} as const

// ============================================================================
// FOOTER
// ============================================================================
export const FOOTER = {
    legal: {
        copyright: '© 2026 CalenFit. Tüm hakları saklıdır.',
        links: {
            terms: 'Kullanım Şartları',
            privacy: 'Gizlilik Politikası',
        },
    },
    appStores: {
        appStore: 'App Store',
        googlePlay: 'Google Play',
    },
    social: {
        facebook: 'Facebook',
        twitter: 'Twitter',
        instagram: 'Instagram',
    },
} as const

// ============================================================================
// ACCESSIBILITY (ARIA Labels)
// ============================================================================
export const ARIA = {
    navigation: {
        main: 'Ana navigasyon',
        social: 'Sosyal medya linkleri',
        footer: 'Footer navigasyonu',
    },
    buttons: {
        downloadApp: (store: string) => `${store}'dan indir`,
        socialLink: (platform: string) => `${platform} sayfamızı ziyaret edin`,
    },
    sections: {
        hero: 'Ana tanıtım bölümü',
        features: 'Özellikler bölümü',
        pricing: 'Fiyatlandırma bölümü',
        contact: 'İletişim bölümü',
    },
} as const

// ============================================================================
// FORM VALIDATION MESSAGES (Future Use)
// ============================================================================
export const VALIDATION = {
    required: 'Bu alan zorunludur',
    email: {
        invalid: 'Geçerli bir e-posta adresi giriniz',
    },
    phone: {
        invalid: 'Geçerli bir telefon numarası giriniz',
    },
    message: {
        minLength: 'Mesajınız en az 10 karakter olmalıdır',
    },
} as const

// ============================================================================
// SUCCESS/ERROR MESSAGES (Future Use)
// ============================================================================
export const FEEDBACK = {
    contact: {
        success: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
        error: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.',
    },
} as const

// ============================================================================
// AUTHENTICATION
// ============================================================================
export const AUTH = {
    login: {
        title: 'Tekrar Hoşgeldiniz',
        subtitle: 'Koçluk panelinize giriş yapın',
        emailPlaceholder: 'E-posta adresiniz',
        passwordPlaceholder: 'Şifreniz',
        forgotPassword: 'Şifremi Unuttum',
        submitButton: 'Giriş Yap',
        googleButton: 'Google ile Devam Et',
        appleButton: 'Apple ile Devam Et',
        noAccount: 'Hesabınız yok mu?',
        registerLink: 'Hemen Başvurun',
        quote: {
            text: "CalenFit sayesinde işlerimi %80 oranında otomatize ettim. Artık sadece öğrencilerime odaklanabiliyorum.",
            author: "Berke Demir",
            role: "Fitness Antrenörü"
        }
    },
    register: {
        title: 'CalenFit Hesabınızı Oluşturun',
        subtitle: 'Profesyonel koçluk kariyerinizi dijitalleştirin.',
        benefits: [
            {
                title: 'Yönetiminizi Sadeleştirin',
                description: 'Tüm derslerinizi, öğrencilerinizi ve randevu takviminizi tek bir akıllı panel üzerinden zahmetsizce yönetin.'
            },
            {
                title: 'Kolay Rezervasyon',
                description: 'App Store ve Google Play\'deki uygulamamız sayesinde öğrencileriniz saniyeler içinde rezervasyon yapabilir, doluluk oranlarınızı artırabilirsiniz.'
            },
            {
                title: 'Kesintisiz Ödeme Altyapısı',
                description: 'Manuel tahsilat süreçlerini geride bırakın. Otomatik ödeme takibi ve doğrudan hesabınıza aktarım ile finansal akışınızı hızlandırın.'
            }
        ],
        form: {
            fullName: 'Ad Soyad',
            fullNamePlaceholder: 'Örn. Ahmet Yılmaz',
            email: 'E-posta',
            emailPlaceholder: 'ornek@email.com',
            password: 'Şifre',
            passwordPlaceholder: 'En az 6 karakter',
            terms: 'Kullanım Şartları ve Gizlilik Politikası\'nı kabul ediyorum.',
            submitButton: 'Hesap Oluştur',
            loginPrompt: 'Zaten hesabınız var mı?',
            loginLink: 'Giriş Yap'
        }
    },
    forgotPassword: {
        title: 'Şifrenizi Sıfırlayın',
        subtitle: 'E-posta adresinizi girin, size şifre sıfırlama talimatlarını gönderelim.',
        form: {
            email: 'E-posta',
            emailPlaceholder: 'ornek@email.com',
            submitButton: 'Sıfırlama Bağlantısı Gönder',
            backToLogin: 'Giriş ekranına dön'
        },
        successMessage: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.'
    }
} as const
