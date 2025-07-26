import React, { useState, useEffect } from "react";

export default function App() { const [m2, setM2] = useState(0); const [showLoading, setShowLoading] = useState(false); const [showResults, setShowResults] = useState(false); const [includeExtras, setIncludeExtras] = useState(false);

const [results, setResults] = useState({});

const handleCalculate = () => { setShowLoading(true); setShowResults(false);

setTimeout(() => {
  const beton = m2 * 0.35;
  const demir = m2 * 40;
  const demirTon = (demir / 1000).toFixed(2);
  const kalipDemir = m2 * 1500;
  const cati = m2 * 1500;
  const duvar = m2 * 320;

  let extras = {};

  if (includeExtras) {
    extras = {
      zeminEtudu: 25000,
      projeCizimi: 40000,
      ruhsatHarci: 30000,
      yapiDenetim: 50000,
      hafriyat: 35000,
    };
  }

  const totalExtras = Object.values(extras).reduce((a, b) => a + b, 0);
  const totalCost = kalipDemir + cati + duvar + totalExtras;

  setResults({ beton, demir, demirTon, kalipDemir, cati, duvar, totalExtras, totalCost, extras });
  setShowLoading(false);
  setShowResults(true);
}, 10000);

};

const formatTL = (val) => { if (!val) return "0"; const num = Number(val); const formatter = new Intl.NumberFormat("tr-TR"); const yazili = num >= 1000000 ? "milyon" : num >= 1000 ? "bin" : ""; return ${formatter.format(num)} (${yazili} TL); };

return ( <div className="p-6 max-w-xl mx-auto text-center"> <h1 className="text-2xl font-bold mb-4">İnşaat Maliyet Hesabı</h1> <input type="number" placeholder="İnşaat alanı (m²)" className="border p-2 w-full mb-4" onChange={(e) => setM2(Number(e.target.value))} />

<div className="mb-4">
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="mr-2"
        checked={includeExtras}
        onChange={() => setIncludeExtras(!includeExtras)}
      />
      İnşaat öncesi giderleri dahil et
    </label>
  </div>

  <button
    onClick={handleCalculate}
    className="bg-blue-500 text-white px-4 py-2 rounded"
  >
    Hesapla
  </button>

  {showLoading && (
    <div className="mt-6">
      <p className="mb-4">Hesaplanıyor, lütfen bekleyin...</p>
      <img
        src="/dancing-dog.gif"
        alt="Yükleniyor..."
        className="w-32 h-32 mx-auto my-4 animate-bounce"
      />
    </div>
  )}

  {showResults && (
    <div className="mt-6 text-left">
      <h2 className="text-xl font-semibold mb-2">Sonuçlar:</h2>
      <ul className="list-disc list-inside">
        <li>Beton: {results.beton} m³</li>
        <li>Demir: {results.demir} kg ({results.demirTon} ton)</li>
        <li>Kalıp/Demir İşçiliği: {formatTL(results.kalipDemir)}</li>
        <li>Çatı: {formatTL(results.cati)}</li>
        <li>Duvar: {formatTL(results.duvar)}</li>
        {includeExtras && (
          <>
            <li className="mt-2 font-semibold">İnşaat Öncesi Giderler:</li>
            <ul className="ml-6 list-disc">
              <li>Zemin Etüdü: {formatTL(results.extras.zeminEtudu)}</li>
              <li>Proje Çizimi: {formatTL(results.extras.projeCizimi)}</li>
              <li>Ruhsat Harcı: {formatTL(results.extras.ruhsatHarci)}</li>
              <li>Yapı Denetim: {formatTL(results.extras.yapiDenetim)}</li>
              <li>Hafriyat: {formatTL(results.extras.hafriyat)}</li>
            </ul>
          </>
        )}
        <li className="mt-2 font-bold">Toplam Maliyet: {formatTL(results.totalCost)}</li>
      </ul>
    </div>
  )}
</div>

); }

          
