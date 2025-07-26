import React, { useState } from "react";

export default function App() {
  const [arsaM2, setArsaM2] = useState("");
  const [insaatM2, setInsaatM2] = useState("");
  const [sonuc, setSonuc] = useState(null);

  const hesaplaMaliyet = () => {
    const a = parseFloat(arsaM2);
    const i = parseFloat(insaatM2);
    if (isNaN(a) || isNaN(i)) {
      setSonuc(null);
      return;
    }

    // Beton
    const betonM3 = i * 0.35;
    const betonFiyat = betonM3 * 3000;

    // Demir
    const demirTon = i * 0.04;
    const demirFiyat = demirTon * 27000;

    // Kalıp/Demir işçilik
    const kalipDemirIscilik = i * 1500;

    // Çatı
    const cati = i * 1500;

    // Duvar
    const duvarM2 = i - i * 0.2;
    const duvarFiyat = duvarM2 * 250;

    // Alçı-Sıva-Boya
    const alciBoyaSivaM2 = duvarM2 * 3;
    const alciBoyaSivaFiyat = alciBoyaSivaM2 * 350;

    // Mekanik Tesisat
    const mekanik = duvarM2 * 500;

    // Zemin Kaplama
    const zeminKaplama = i * 0.6 * 1200;

    // Doğrama (Ortalama daireye göre hesaplama)
    const ortalamaDaireM2 = 100; // Ortalama daire m2
    const daireSayisi = Math.ceil(i / ortalamaDaireM2);

    const pencereAdet = daireSayisi * 6;
    const kapiAdet = daireSayisi * 5;
    const celikKapiAdet = daireSayisi;

    const dogramaFiyat = pencereAdet * 7000 + kapiAdet * 10000 + celikKapiAdet * 25000;

    // Dış Cephe
    const disCepheM2 = i / 6.25;
    const disCepheFiyat = disCepheM2 * 2200;

    // İnşaat Öncesi Giderler
    const oncesiGider = i * 300;

    // Banyo + Mutfak Donanımı + Montaj
    const banyoSayisi = Math.ceil(i / 100);
    const montajFiyat = banyoSayisi * 15000;

    // Kat Sayısı Hesabı ve Asansör
    const katSayisi = Math.ceil(i / a / 0.4);
    const asansorAdet = Math.ceil(katSayisi / 4);
    const asansorFiyat = asansorAdet * 350000;

    // Peyzaj
    const peyzajAlan = a * 0.2;
    const peyzajFiyat = peyzajAlan * 300;

    // Öngörülmeyen Giderler ve Personel Ödemeleri
    const ongorulmayanGiderler = 1000000;

    // Resmi İşlemler
    const resmiIslemler = 30000;

    // Toplam Maliyet
    const toplam =
      betonFiyat +
      demirFiyat +
      kalipDemirIscilik +
      cati +
      duvarFiyat +
      alciBoyaSivaFiyat +
      mekanik +
      zeminKaplama +
      dogramaFiyat +
      disCepheFiyat +
      oncesiGider +
      montajFiyat +
      asansorFiyat +
      peyzajFiyat +
      ongorulmayanGiderler +
      resmiIslemler;

    setSonuc({
      betonFiyat,
      demirFiyat,
      kalipDemirIscilik,
      cati,
      duvarFiyat,
      alciBoyaSivaFiyat,
      mekanik,
      zeminKaplama,
      dogramaFiyat,
      disCepheFiyat,
      oncesiGider,
      montajFiyat,
      asansorFiyat,
      peyzajFiyat,
      ongorulmayanGiderler,
      resmiIslemler,
      toplam,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 text-sm">
      <h1 className="text-2xl font-bold text-center mb-4">🏗️ Maliyet Hesap Modülü</h1>

      <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
        <input
          type="number"
          placeholder="Arsa Alanı (m²)"
          value={arsaM2}
          onChange={(e) => setArsaM2(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="İnşaat Alanı (m²)"
          value={insaatM2}
          onChange={(e) => setInsaatM2(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={hesaplaMaliyet}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Hesapla
        </button>
      </div>

      {sonuc && (
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">📄 İnşaat Öncesi Giderler</h2>
            <p>🔹 Maliyet: {sonuc.oncesiGider.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">🧱 Beton</h2>
            <p>🔹 Maliyet: {sonuc.betonFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">🔩 Demir</h2>
            <p>🔹 Maliyet: {sonuc.demirFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">👷 Kalıp/Demir İşçilik</h2>
            <p>🔹 Maliyet: {sonuc.kalipDemirIscilik.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">🏠 Çatı</h2>
            <p>🔹 Maliyet: {sonuc.cati.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">🧱 Duvar</h2>
            <p>🔹 Maliyet: {sonuc.duvarFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">🎨 Alçı - Sıva - Boya</h2>
            <p>🔹 Maliyet: {sonuc.alciBoyaSivaFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">🚿 Mekanik Tesisat</h2>
            <p>🔹 Maliyet: {sonuc.mekanik.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">🧼 Zemin Kaplama</h2>
            <p>🔹 Maliyet: {sonuc.zeminKaplama.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">🚪 Doğrama (Pencere, Kapı, Çelik Kapı)</h2>
            <p>🔹 Maliyet: {sonuc.dogramaFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">🏢 Dış Cephe</h2>
            <p>🔹 Maliyet: {sonuc.disCepheFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">🛁 Banyo + Mutfak Donanımı (Montaj Malzemesi Dahil)</h2>
            <p>🔹 Maliyet: {sonuc.montajFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">🚀 Asansör</h2>
            <p>🔹 Maliyet: {sonuc.asansorFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">🌿 Peyzaj / Çevre Düzenlemesi</h2>
            <p>🔹 Maliyet: {sonuc.peyzajFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">💼 Öngörülmeyen Giderler ve Personel Ödemeleri</h2>
            <p>🔹 Maliyet: {sonuc.ongorulmayanGiderler.toLocaleString()} TL</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">🏛️ Resmi İşlemler</h2>
            <p>🔹 Maliyet: {sonuc.resmiIslemler.toLocaleString()} TL</p>
          </div>

          <hr />

          <p className="font-bold text-lg text-center">
            Toplam Maliyet: {sonuc.toplam.toLocaleString()} TL
          </p>
        </div>
      )}
    </div>
  );
            }
