# Vercel Deployment Guide

## Ön Gereksinimler

1. **Vercel CLI** kurulu olmalı:
   ```bash
   npm i -g vercel
   ```

2. **Git** repository'niz hazır olmalı

## Deployment Adımları

### 1. Yerel Test
Önce projenizi yerel olarak test edin:
```bash
npm install
npm run build
npm start
```

### 2. Vercel'e Deploy Etme

#### Seçenek A: Vercel CLI ile
```bash
# Proje dizininde
vercel

# İlk kez deploy ediyorsanız:
vercel --prod
```

#### Seçenek B: Vercel Dashboard ile
1. [vercel.com](https://vercel.com) adresine gidin
2. GitHub/GitLab/Bitbucket hesabınızla giriş yapın
3. "New Project" butonuna tıklayın
4. Repository'nizi seçin
5. Framework Preset olarak "Create React App" seçin
6. Deploy edin

## Önemli Notlar

### ✅ Yapılan Optimizasyonlar
- **vercel.json** güncellendi - SPA routing için optimize edildi
- **Service Worker** sadece production'da çalışacak şekilde ayarlandı
- **Build script** source map'leri devre dışı bırakacak şekilde güncellendi
- **.vercelignore** dosyası eklendi - gereksiz dosyalar hariç tutuldu

### 🔧 Environment Variables
Eğer environment variable'larınız varsa, Vercel dashboard'da şu şekilde ekleyin:
- `GENERATE_SOURCEMAP=false`

### 🚀 Performance Optimizasyonları
- Static dosyalar için cache headers eklendi
- Service worker sadece production'da aktif
- Source map'ler devre dışı bırakıldı

## Olası Hatalar ve Çözümleri

### Build Hatası
```bash
# Node.js versiyonunu kontrol edin
node --version  # 16.x veya üzeri olmalı

# Dependencies'leri temizleyin
rm -rf node_modules package-lock.json
npm install
```

### Routing Hatası
- `vercel.json` dosyasındaki routing kuralları doğru çalışıyor
- Tüm route'lar `/index.html`'e yönlendiriliyor

### Service Worker Hatası
- Service worker sadece production'da çalışıyor
- Development'ta hata almayacaksınız

## Monitoring

Deploy sonrası şunları kontrol edin:
1. ✅ Ana sayfa yükleniyor mu?
2. ✅ Hesaplama formu çalışıyor mu?
3. ✅ Sonuçlar görüntüleniyor mu?
4. ✅ Geçmiş kayıtları çalışıyor mu?

## Support

Herhangi bir sorun yaşarsanız:
1. Vercel dashboard'daki build loglarını kontrol edin
2. Browser console'da hata var mı bakın
3. Network tab'ında 404 hataları var mı kontrol edin