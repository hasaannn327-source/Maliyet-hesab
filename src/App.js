import React, { useState } from "react";

export default function App() {
  const [arsaM2, setArsaM2] = useState("");
  const [insaatM2, setInsaatM2] = useState("");

  const hesaplaMaliyet = () => {
    const a = parseFloat(arsaM2);
    const i = parseFloat(insaatM2);

    if (isNaN(a) || isNaN(i)) return null;

    const betonM3 = i * 0.35;
    const betonFiyat = betonM3 * 2000;

    const demirTon = (i * 40) / 1000;
    const demirFiyat = demirTon * 32000;

    const kalipDemirIscilik = i * 1500;
    const cati = i * 1500;

    const duvarM2 = i - i * 0.2;
    const duvarFiyat = duvarM2 * 250;

    const alciBoyaSivaM2 = duvarM2 * 3;
    const alciBoyaSivaFiyat = alciBoyaSivaM2 * 350;

    const mekanik = duvarM2 * 500;

    const zeminKaplama = i * 0.6 * 1200;

    const pencereAdet = Math.ceil(i / 100); // Yaklaşık oran
    const kapiAdet = Math.ceil(pencereAdet / 3);
    const dogramaFiyat =
      pencereAdet * 5000 + kapiAdet * 7000 + 1 * 15000; // çelik kapı dahil

    const disCepheM2 = i / 6.25;
    const disCepheFiyat = disCepheM2 * 1800;

    const oncesiGider = i * 300;

    const banyoSayisi = Math.ceil(i / 100); // Her 100 m2'ye 1 banyo
    const montajFiyat = banyoSayisi * 15000;

    const katSayisi = Math.ceil(i / a / 0.4);
    const asansorAdet = Math.ceil(katSayisi / 4);
    const asansorFiyat = asansorAdet * 350000;

    const peyzajAlan = a * 0.2;
    const peyzajFiyat = peyzajAlan * 300;

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
      peyzajFiyat;

    return {
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
      toplam,
    };
  };

  const sonuc = hesaplaMaliyet();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 text-sm">
      <h1 className="text-2xl font-bold text-center">🏗️ Maliyet Hesap Modülü</h1>

      <div className="grid grid-cols-2 gap-4">
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
      </div>

      {sonuc && (
        <div className="bg-white shadow p-4 rounded space-y-2">
          <p>Beton: {sonuc.betonFiyat.toLocaleString()} TL</p>
          <p>Demir: {sonuc.demirFiyat.toLocaleString()} TL</p>
          <p>Kalıp/Demir İşçilik: {sonuc.kalipDemirIscilik.toLocaleString()} TL</p>
          <p>Çatı: {sonuc.cati.toLocaleString()} TL</p>
          <p>Duvar: {sonuc.duvarFiyat.toLocaleString()} TL</p>
          <p>Alçı-Sıva-Boya: {sonuc.alciBoyaSivaFiyat.toLocaleString()} TL</p>
          <p>Mekanik Tesisat: {sonuc.mekanik.toLocaleString()} TL</p>
          <p>Zemin Kaplama: {sonuc.zeminKaplama.toLocaleString()} TL</p>
          <p>Doğrama: {sonuc.dogramaFiyat.toLocaleString()} TL</p>
          <p>Dış Cephe: {sonuc.disCepheFiyat.toLocaleString()} TL</p>
          <p>İnşaat Öncesi Gider: {sonuc.oncesiGider.toLocaleString()} TL</p>
          <p>Banyo + Montaj Malzemesi: {sonuc.montajFiyat.toLocaleString()} TL</p>
          <p>Asansör: {sonuc.asansorFiyat.toLocaleString()} TL</p>
          <p>Peyzaj: {sonuc.peyzajFiyat.toLocaleString()} TL</p>
          <hr />
          <p className="font-bold text-lg">
            Toplam Maliyet: {sonuc.toplam.toLocaleString()} TL
          </p>
        </div>
      )}
    </div>
  );
        }
