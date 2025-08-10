# İmar Hesap Modülü - İnşaat Maliyet Hesaplama

Profesyonel inşaat maliyet hesaplama uygulaması. Kaba ve ince maliyet hesaplaması, kâr marjı, zaman çizelgesi ve daha fazlası.

## 🚀 Özellikler

- **Kaba Maliyet Hesaplama**: Beton, demir, kalıp, çatı, duvar maliyetleri
- **İnce Maliyet Hesaplama**: Alçı, boya, sıva, mekanik, zemin kaplama, doğrama
- **Şehir Bazlı Çarpanlar**: Farklı şehirler için maliyet çarpanları
- **Kalite Seviyeleri**: Ekonomik, Standart, Lüks kalite seçenekleri
- **Kâr Marjı Hesaplama**: Özelleştirilebilir kâr marjı
- **Zaman Çizelgesi**: Proje süresi ve maliyet dağılımı
- **Hesaplama Geçmişi**: Önceki hesaplamaları kaydetme ve yükleme
- **Karanlık/Aydınlık Tema**: Modern kullanıcı arayüzü

## 🛠️ Teknolojiler

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- Recharts
- React Hot Toast

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm start

# Production build oluştur
npm run build
```

## 🚀 Vercel'e Deployment

Bu proje Vercel için optimize edilmiştir. Deployment için:

1. **GitHub'a Push**: Kodunuzu GitHub'a push edin
2. **Vercel'e Bağla**: Vercel Dashboard'dan projenizi import edin
3. **Otomatik Deployment**: Her push'ta otomatik olarak deploy edilecek

### Vercel Konfigürasyonu

Proje `vercel.json` dosyası ile yapılandırılmıştır:

- **Framework**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Node.js Version**: 18.x

### Önemli Notlar

- ✅ TypeScript hataları düzeltildi
- ✅ Eksik icon dosyaları eklendi
- ✅ Vercel routing yapılandırıldı
- ✅ Build optimizasyonları yapıldı
- ✅ Service Worker desteği

## 📱 PWA Özellikleri

- Service Worker ile offline çalışma
- Manifest.json ile PWA desteği
- Responsive tasarım

## 🔧 Geliştirme

```bash
# TypeScript kontrolü
npm run type-check

# Test çalıştır
npm test
```

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

---

**Not**: Bu uygulama profesyonel inşaat maliyet hesaplamaları için geliştirilmiştir. Gerçek projelerde uzman görüşü alınması önerilir.