---
description: Backend development workflow with TDD, security, and SOLID principles
---

# CalenFit Backend Development Workflow

Bu workflow, backend geliştirmelerinde uyulması ZORUNLU adımları tanımlar.

## Geliştirme Öncesi Kontroller

1. **Gereksinim Analizi**
   - Özelliğin ne yapması gerektiğini netleştir
   - Güvenlik gereksinimlerini belirle
   - API endpoint tasarımını planla

2. **Mimari Karar**
   - Hangi modülde olacak?
   - Yeni modül mü gerekiyor?
   - Mevcut servislerle entegrasyon nasıl olacak?

## TDD Döngüsü (ZORUNLU)

// turbo-all

3. **RED - Test Yaz**
   ```bash
   # Test dosyası oluştur
   # src/[module]/[feature].service.spec.ts
   ```
   - Önce başarısız olacak test yaz
   - Beklenen davranışı tanımla
   - Edge case'leri düşün

4. **GREEN - Kodu Yaz**
   - Testi geçirecek MINIMUM kodu yaz
   - Overengineering yapma
   - Sadece testi geçir

5. **REFACTOR - Temizle**
   - Kod kalitesini artır
   - SOLID prensiplerine uygunluğu kontrol et
   - Duplicate kodu temizle
   - Testlerin hala geçtiğini doğrula

## Güvenlik Kontrolleri (ZORUNLU)

6. **Input Validation**
   - DTO'da tüm alanlar validate ediliyor mu?
   - Whitelist aktif mi?
   - SQL Injection riski var mı?

7. **Authentication/Authorization**
   - Endpoint korumalı mı?
   - Doğru guard kullanılıyor mu?
   - Role kontrolü yapılıyor mu?

8. **Sensitive Data**
   - Şifre veya token log'lanıyor mu? (OLMAMALI)
   - Response'da gereksiz veri var mı?

## Kod Kalitesi Kontrolleri

9. **SOLID Prensipler**
   - Single Responsibility: Sınıf tek iş mi yapıyor?
   - Open/Closed: Genişletilebilir mi?
   - Dependency Inversion: DI kullanılıyor mu?

10. **Okunabilirlik**
    - Fonksiyonlar 25 satırdan kısa mı?
    - Magic number/string var mı?
    - Yorumlar yeterli mi?

## Final Kontroller

11. **Test Coverage**
    ```bash
    npm run test:cov
    ```
    - Minimum %80 coverage
    - Critical path'ler %100

12. **Lint Check**
    ```bash
    npm run lint
    ```
    - Hata olmamalı

13. **Build Check**
    ```bash
    npm run build
    ```
    - Başarılı derlenmeli

## Döküman Güncelleme

14. **Swagger/OpenAPI**
    - Yeni endpoint eklendiyse decorator'lar tam mı?
    - Response tipler doğru mu?

15. **README Güncelleme**
    - Yeni özellik açıklaması gerekiyor mu?
    - Environment variable eklendiyse dokümante et

---

## Hızlı Referans - Güvenlik Checklist

- [ ] DTO validation aktif
- [ ] Auth guard kullanılıyor
- [ ] Role kontrolü yapılıyor
- [ ] Şifre/token loglanmıyor
- [ ] Rate limiting aktif (public endpoint'ler için)
- [ ] CORS doğru yapılandırılmış

## Hızlı Referans - SOLID Checklist

- [ ] Her sınıf tek sorumluluk
- [ ] Interface segregation
- [ ] Dependency injection kullanılıyor
- [ ] Abstract'a bağımlılık, concrete'a değil
