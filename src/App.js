import React, { useState, useEffect } from "react";

export default function App() { const [m2, setM2] = useState(0); const [showResult, setShowResult] = useState(false); const [loading, setLoading] = useState(false); const [showGiderKalemleri, setShowGiderKalemleri] = useState(false);

const hesapla = () => { setLoading(true); setShowResult(false); setTimeout(() => { setLoading(false); setShowResult(true); }, 10000); // 10 saniye loading süresi };

const formatTL = (deger) => { if (!deger) return "0"; const sayi = Number(deger); const yazili = sayi .toLocaleString("tr-TR") .replace(/./g, "") .replace(/,/g, ".") .replace(//g, ","); const binlik = sayi >= 1000 ?  (${sayi.toLocaleString("tr-TR", { style: "decimal" }).split(",")[0]} TL) : ""; return ${yazili}${binlik}; };

const giderKalemleri = [ "Zemin Etüdü: 25.000 TL", "Proje Çizimi: 35.000 TL", "Ruhsat Harcı: 40.000 TL", "Yapı Denetim: 50.000 TL", "Hafriyat: 60.000 TL" ];

const beton = m2 * 0.35; const demir = m2 * 40; const kalipDemirIscilik = m2 * 1500; const cati = m2 * 1500; const duvar = m2 * 320;

const toplam = kalipDemirIscilik + cati + duvar;

return ( <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl mt-10"> <h1 className="text-xl font-bold mb-4">Maliyet Hesaplama Modülü</h1> <input type="number" value={m2} onChange={(e) => setM2(e.target.value)} placeholder="İnşaat alanı (m²)" className="w-full p-2 border border-gray-300 rounded mb-4" /> <button
onClick={hesapla}
className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
> Hesapla </button>

<div className="mt-4">
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        checked={showGiderKalemleri}
        onChange={(e) => setShowGiderKalemleri(e.target.checked)}
        className="mr-2"
      />
      İnşaat Öncesi Giderleri Göster
    </label>

    {showGiderKalemleri && (
      <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
        {giderKalemleri.map((kalem, index) => (
          <li key={index}>{kalem}</li>
        ))}
      </ul>
    )}
  </div>

  {loading && (
    <div className="text-center mt-6">
      <img
        src="/dancing-dog.gif"
        alt="Yükleniyor..."
        className="w-32 h-32 mx-auto my-4 animate-bounce"
      />
      <p className="text-gray-600">Maliyetler hesaplanıyor...</p>
    </div>
  )}

  {showResult && !loading && (
    <div className="mt-6 text-sm text-gray-800 space-y-2">
      <div>
        <strong>Beton:</strong> {beton.toFixed(2)} m³
      </div>
      <div>
        <strong>Demir:</strong> {demir.toFixed(2)} kg ({(demir / 1000).toFixed(2)} ton)
      </div>
      <div>
        <strong>Kalıp/Demir İşçilik:</strong> {formatTL(kalipDemirIscilik)}
      </div>
      <div>
        <strong>Çatı:</strong> {formatTL(cati)}
      </div>
      <div>
        <strong>Duvar:</strong> {formatTL(duvar)}
      </div>
      <div className="font-bold border-t pt-2 mt-2">
        Toplam: {formatTL(toplam)}
      </div>
    </div>
  )}
</div>

); }

