import React, { useState } from "react"; import dogGif from "./dancing-dog.gif"; // Köpek GIF dosyasını projene ekle

export default function App() { const [m2, setM2] = useState(""); const [sonuc, setSonuc] = useState(null); const [ekstraGider, setEkstraGider] = useState(false); const [loading, setLoading] = useState(false);

const hesapla = () => { const m2Sayisi = parseFloat(m2); if (isNaN(m2Sayisi) || m2Sayisi <= 0) return;

setLoading(true);
setTimeout(() => {
  const beton = m2Sayisi * 0.35;
  const demir = m2Sayisi * 40;
  const iscilik = m2Sayisi * 1500;
  const cati = m2Sayisi * 1500;
  const duvar = m2Sayisi * 320;
  const toplam = iscilik + cati + duvar;

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
  setLoading(false);
}, 1500);

};

const formatNumber = (num) => num.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2, });

const formatTL = (num) => ${num.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 0, })} TL;

return ( <div className="p-4 max-w-xl mx-auto font-sans"> <h1 className="text-2xl font-bold mb-6 text-center">Maliyet Hesaplama</h1> <input type="number" placeholder="İnşaat Alanı (m²)" value={m2} onChange={(e) => setM2(e.target.value)} className="border border-gray-400 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" /> <label className="flex items-center mb-4"> <input type="checkbox" checked={ekstraGider} onChange={() => setEkstraGider(!ekstraGider)} className="mr-2" /> İnşaat öncesi giderleri dahil et </label> <button
onClick={hesapla}
className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
> Hesapla </button>

{loading && (
    <div className="mt-6 text-center">
      <p className="mb-2 text-lg font-semibold">Hesaplanıyor...</p>
      <img src={dogGif} alt="loading" className="mx-auto w-48 h-48" />
    </div>
  )}

  {sonuc && !loading && (
    <div className="mt-6 bg-white p-6 rounded shadow-md">
      <h2 className="font-bold text-xl mb-4 text-gray-800">Sonuçlar</h2>
      <ul className="space-y-2 text-gray-700">
        <li>Beton: {formatNumber(sonuc.beton)} m³</li>
        <li>Demir: {formatNumber(sonuc.demir / 1000)} ton</li>
        <li>İşçilik (Kalıp + Demir): {formatTL(sonuc.iscilik)}</li>
        <li>Çatı: {formatTL(sonuc.cati)}</li>
        <li>Duvar: {formatTL(sonuc.duvar)}</li>
        <li className="font-bold mt-2">
          Toplam İşçilik + Çatı + Duvar: {formatTL(sonuc.toplam)}
        </li>

        {ekstraGider && (
          <>
            <li className="mt-4 font-semibold">İnşaat Öncesi Giderler:</li>
            <li>Ruhsat Harcı: {formatTL(m2 * 8)}</li>
            <li>Yapı Denetim: {formatTL(m2 * 60)}</li>
            <li>Proje Çizimi: {formatTL(3000)}</li>
            <li>Zemin Etüdü: {formatTL(5000)}</li>
            <li>Hafriyat: {formatTL(10000)}</li>
            <li className="font-bold mt-2">
              Toplam Ön Giderler: {formatTL(sonuc.ekstra)}
            </li>
          </>
        )}
      </ul>
    </div>
  )}
</div>

); }

   
