import React, { useState } from "react";

export default function App() { const [sayi, setSayi] = useState(0); const [loading, setLoading] = useState(false); const [showResult, setShowResult] = useState(false); const [ekstraGiderEkle, setEkstraGiderEkle] = useState(false); const [sonuc, setSonuc] = useState({});

const hesapla = () => { setLoading(true); setShowResult(false); setTimeout(() => { const beton = sayi * 0.35; const demirKg = sayi * 40; const demirTon = demirKg / 1000; const kalipIscilik = sayi * 1500; const cati = sayi * 1500; const duvar = sayi * 320; const toplam = kalipIscilik + cati + duvar;

const projeGider = 150000;
  const zeminEtudu = 120000;
  const ruhsatPerM2 = 8;
  const ruhsatHarc = sayi * ruhsatPerM2;
  const yapiDenetim = 80000;
  const hafriyatPerM2 = 900;
  const hafriyat = sayi * hafriyatPerM2;

  const ekstraGiderler = ekstraGiderEkle ? (
    zeminEtudu + projeGider + ruhsatHarc + yapiDenetim + hafriyat
  ) : 0;

  const genelToplam = toplam + ekstraGiderler;

  setSonuc({ beton, demirKg, demirTon, kalipIscilik, cati, duvar, toplam, 
    projeGider, zeminEtudu, ruhsatHarc, yapiDenetim, hafriyat, ekstraGiderler, genelToplam });
  setLoading(false);
  setShowResult(true);
}, 1000);

};

const formatBinTL = (deger) => { const sayi = Math.round(deger); return sayi.toLocaleString("tr-TR") + " (" + yaziylaYaz(sayi) + ") TL"; };

const yaziylaYaz = (sayi) => { const formatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }); const yazi = sayi.toLocaleString('tr-TR'); // Gerçek yazıya çevirme yerine basit örnek format kullanalım if (sayi >= 1000000) return Math.round(sayi / 1000000) + " milyon"; if (sayi >= 1000) return Math.round(sayi / 1000) + " bin"; return sayi.toString(); };

return ( <div className="p-6 max-w-2xl mx-auto"> <h1 className="text-2xl font-bold mb-4">Maliyet Hesaplama</h1>

<input
    type="number"
    value={sayi}
    onChange={(e) => setSayi(parseFloat(e.target.value))}
    className="border p-2 w-full mb-4"
    placeholder="İnşaat alanı (m²)"
  />

  <label className="flex items-center space-x-2 mb-4">
    <input
      type="checkbox"
      checked={ekstraGiderEkle}
      onChange={(e) => setEkstraGiderEkle(e.target.checked)}
    />
    <span>İnşaat öncesi giderleri dahil et</span>
  </label>

  <button
    onClick={hesapla}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Hesapla
  </button>

  {loading && <p className="mt-4">Hesaplanıyor...</p>}

  {showResult && (
    <div className="mt-6 space-y-2">
      <h2 className="text-xl font-semibold">Sonuçlar</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Beton: {sonuc.beton.toFixed(2)} m³</li>
        <li>Demir: {sonuc.demirKg.toFixed(0)} kg ({sonuc.demirTon.toFixed(2)} ton)</li>
        <li>Kalıp/Demir İşçiliği: {formatBinTL(sonuc.kalipIscilik)}</li>
        <li>Çatı: {formatBinTL(sonuc.cati)}</

  
