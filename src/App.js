import React, { useState } from "react";

export default function App() {
  const [m2, setM2] = useState("");
  const [sonuc, setSonuc] = useState(null);
  const [ekstraGider, setEkstraGider] = useState(false);

  const hesapla = () => {
    const m2Sayisi = parseFloat(m2);
    if (isNaN(m2Sayisi) || m2Sayisi <= 0) return;

    const beton = m2Sayisi * 0.35;
    const demir = m2Sayisi * 40;
    const iscilik = m2Sayisi * 1500;
    const cati = m2Sayisi * 1500;
    const duvar = m2Sayisi * 320;
    const toplam = iscilik + cati + duvar;

    // Ekstra Giderler
    const ruhsatPerM2 = 8;
    const yapiDenetimPerM2 = 60;
    const projeCizim = 3000;
    const zeminEtudu = 5000;
    const hafriyat = 10000;

    const toplamEkstra = ekstraGider
      ? m2Sayisi * (ruhsatPerM2 + yapiDenetimPerM2) + projeCizim + zeminEtudu + hafriyat
      : 0;

    setSonuc({
      beton,
      demir,
      iscilik,
      cati,
      duvar,
      toplam,
      ekstra: toplamEkstra,
    });
  };

  const formatNumber = (num) =>
    num.toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatBinTL = (num) =>
    `${(num / 1000).toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} (bin TL)`;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Maliyet Hesaplama</h1>
      <input
        type="number"
        placeholder="İnşaat Alanı (m²)"
        value={m2}
        onChange={(e) => setM2(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={ekstraGider}
          onChange={() => setEkstraGider(!ekstraGider)}
          className="mr-2"
        />
        İnşaat öncesi giderleri dahil et
      </label>
      <button
        onClick={hesapla}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Hesapla
      </button>

      {sonuc && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="font-bold text-lg mb-2">Sonuçlar</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Beton: {formatNumber(sonuc.beton)} m³</li>
            <li>Demir: {formatNumber(sonuc.demir / 1000)} ton</li>
            <li>İşçilik (Kalıp + Demir): {formatBinTL(sonuc.iscilik)}</li>
            <li>Çatı: {formatBinTL(sonuc.cati)}</li>
            <li>Duvar: {formatBinTL(sonuc.duvar)}</li>
            <li className="font-bold mt-2">
              Toplam İşçilik + Çatı + Duvar: {formatBinTL(sonuc.toplam)}
            </li>

            {ekstraGider && (
              <>
                <li className="mt-2 font-semibold">İnşaat Öncesi Giderler:</li>
                <li>Ruhsat Harcı: {formatBinTL(m2 * 8)}</li>
                <li>Yapı Denetim: {formatBinTL(m2 * 60)}</li>
                <li>Proje Çizimi: {formatBinTL(3000)}</li>
                <li>Zemin Etüdü: {formatBinTL(5000)}</li>
                <li>Hafriyat: {formatBinTL(10000)}</li>
                <li className="font-bold mt-2">
                  Toplam Ön Giderler: {formatBinTL(sonuc.ekstra)}
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
