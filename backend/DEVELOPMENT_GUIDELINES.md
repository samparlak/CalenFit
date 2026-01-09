# 🏗️ CalenFit Backend - Development Guidelines

Bu doküman, CalenFit Backend geliştirmelerinde uyulması gereken standartları tanımlar.

---

## 1. 🧪 Test-Driven Development (TDD)

Her yeni özellik veya değişiklik için TDD döngüsü uygulanacaktır:

### TDD Döngüsü
```
1. RED    → Önce başarısız olacak test yaz
2. GREEN  → Testi geçirecek minimum kodu yaz
3. REFACTOR → Kodu temizle, kaliteyi artır
```

### Test Türleri
- **Unit Tests:** Her service metodu için
- **Integration Tests:** Controller + Service entegrasyonu için
- **E2E Tests:** Tam API akışları için

### Test Dosya Yapısı
```
src/
├── auth/
│   ├── auth.service.ts
│   ├── auth.service.spec.ts      # Unit tests
│   ├── auth.controller.spec.ts   # Integration tests
test/
├── auth/
│   └── auth.e2e-spec.ts          # E2E tests
```

### Test Coverage Hedefi
- Minimum **80%** code coverage
- Critical paths için **100%** coverage (auth, payment, vb.)

---

## 2. 🔒 Güvenlik Öncelikleri

### Kimlik Doğrulama & Yetkilendirme
- ✅ JWT ile stateless authentication
- ✅ Refresh Token rotation (tek kullanımlık)
- ✅ bcrypt ile password hashing (cost factor: 12)
- ✅ Role-based access control (RBAC)

### Input Validation
- ✅ class-validator ile DTO validasyonu
- ✅ whitelist: true (beklenmeyen alanları reddet)
- ✅ forbidNonWhitelisted: true (ekstra alan hata döndürür)

### Güvenlik Başlıkları
- ✅ Helmet.js middleware
- ✅ CORS yapılandırması (whitelist origins)
- ✅ Rate limiting (brute-force koruması)

### Hassas Veri Yönetimi
- ❌ Şifreleri ASLA loglamayın
- ❌ Token'ları response body'de döndürürken dikkatli olun
- ✅ Hassas veriler için encryption at rest
- ✅ HTTPS only (production)

### SQL Injection & XSS
- ✅ Prisma ORM (parameterized queries)
- ✅ Input sanitization
- ✅ Content-Type validation

---

## 3. 📐 SOLID Prensipleri

### S - Single Responsibility Principle
Her sınıf tek bir sorumluluğa sahip olmalı.
```typescript
// ❌ Yanlış
class UserService {
  createUser() { }
  sendWelcomeEmail() { }  // Email gönderimi ayrı service'te olmalı
  generateReport() { }     // Raporlama ayrı service'te olmalı
}

// ✅ Doğru
class UserService { createUser() { } }
class EmailService { sendWelcomeEmail() { } }
class ReportService { generateUserReport() { } }
```

### O - Open/Closed Principle
Sınıflar genişletmeye açık, değiştirmeye kapalı olmalı.
```typescript
// ✅ Strategy pattern kullanımı
interface PaymentStrategy {
  process(amount: number): Promise<void>;
}

class CreditCardPayment implements PaymentStrategy { }
class PayPalPayment implements PaymentStrategy { }
```

### L - Liskov Substitution Principle
Alt sınıflar, üst sınıfların yerine kullanılabilir olmalı.

### I - Interface Segregation Principle
Büyük interface'ler yerine küçük, spesifik interface'ler kullanın.

### D - Dependency Inversion Principle
Yüksek seviyeli modüller, düşük seviyeli modüllere bağımlı olmamalı.
```typescript
// ✅ NestJS Dependency Injection
constructor(private readonly userService: UserService) { }
```

---

## 4. 🏛️ Mimari Standartlar

### Katmanlı Mimari
```
┌─────────────────────────────────────┐
│         Controllers (API Layer)     │  ← HTTP Request/Response
├─────────────────────────────────────┤
│         Services (Business Logic)   │  ← İş mantığı
├─────────────────────────────────────┤
│         Repositories (Data Access)  │  ← Veritabanı işlemleri
├─────────────────────────────────────┤
│         Prisma (ORM)                │  ← Database
└─────────────────────────────────────┘
```

### Modül Yapısı
```
src/
├── common/                 # Paylaşılan kodlar
│   ├── decorators/        # Custom decorators
│   ├── guards/            # Auth guards
│   ├── filters/           # Exception filters
│   ├── interceptors/      # Request/Response interceptors
│   ├── pipes/             # Validation pipes
│   └── interfaces/        # Shared interfaces
├── config/                 # Konfigürasyon
│   └── configuration.ts
├── prisma/                 # Database
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── auth/                   # Feature module
│   ├── dto/               # Data Transfer Objects
│   ├── entities/          # Domain entities (if needed)
│   ├── guards/            # Module-specific guards
│   ├── strategies/        # Passport strategies
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   └── auth.service.spec.ts
└── users/                  # Another feature module
    └── ...
```

### Naming Conventions
- **Files:** kebab-case (`user-profile.service.ts`)
- **Classes:** PascalCase (`UserProfileService`)
- **Methods/Variables:** camelCase (`getUserById`)
- **Constants:** SCREAMING_SNAKE_CASE (`MAX_LOGIN_ATTEMPTS`)
- **Interfaces:** PascalCase with 'I' prefix optional (`IUserRepository` veya `UserRepository`)

---

## 5. 📖 Kod Okunabilirliği

### Yorum Standartları
```typescript
/**
 * Kullanıcı kaydı oluşturur ve JWT token döner.
 * 
 * @param dto - Kayıt bilgileri
 * @returns Kullanıcı bilgisi ve token'lar
 * @throws ConflictException - Email zaten kayıtlıysa
 */
async register(dto: RegisterDto): Promise<AuthResponse> { }
```

### Fonksiyon Uzunluğu
- Maksimum **25 satır** (tercihen 15 altında)
- Uzun fonksiyonları küçük helper'lara bölün

### Magic Numbers/Strings
```typescript
// ❌ Yanlış
if (loginAttempts > 5) { }

// ✅ Doğru
const MAX_LOGIN_ATTEMPTS = 5;
if (loginAttempts > MAX_LOGIN_ATTEMPTS) { }
```

### Error Messages
- Türkçe, kullanıcı dostu mesajlar
- Log'larda İngilizce, teknik detaylar

---

## 6. 📊 Code Review Checklist

Her PR için kontrol edilecekler:

- [ ] Testler yazılmış ve geçiyor
- [ ] Coverage %80 üzerinde
- [ ] Güvenlik açığı yok
- [ ] SOLID prensiplerine uygun
- [ ] Kod okunabilir ve yorumlanmış
- [ ] Error handling yapılmış
- [ ] Logging eklenmiş
- [ ] Documentation güncellenmiş

---

## 7. 🛠️ Geliştirme Araçları

### Linting & Formatting
- ESLint (code quality)
- Prettier (code formatting)

### Testing
- Jest (unit & integration tests)
- Supertest (E2E tests)

### Documentation
- Swagger/OpenAPI (API docs)
- JSDoc (code comments)

---

*Bu doküman, CalenFit Backend ekibi için zorunlu standarttır.*
*Son güncelleme: 2026-01-10*
