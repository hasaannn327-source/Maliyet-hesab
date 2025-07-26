import React, { useState } from "react";

export default function MaliyetHesaplama() { const [m2, setM2] = useState(0); const [showResult, setShowResult] = useState(false); const [includeExtras, setIncludeExtras] = useState(false); const [sonuc, setSonuc] = useState({});

const formatBinTL = (value) => { const binTL = Math.round(value / 1000); return ${binTL.toLocaleString()} (bin TL); };

const hesapla = () => { setShowResult(true); const betonM3 = m2 * 0.35; const demirKg = m2 * 40; const demirTon = demirKg / 1000; const kalipDemirIscilik = m2 * 1500; const cati = m2 * 1500; const duvar = m2 * 320;

let toplamMaliyet = kalipDemirIscilik + cati + duvar;
let giderKalemleri = [];

if (includeExtras) {
  const zeminEtudu = 10000;
  const projeCizim = 30000;
  const ruhsatHarci = m2 * 8;
  const yapiDenetim = m2 * 60;
  const hafriyat = 40000;
  toplamMaliyet += zeminEtudu + projeCizim + ruhsatHarci + yapiDenetim + hafriyat;
  giderKalemleri = [
    { ad: "Zemin Etüdü", tutar: zeminEtudu },
    { ad: "Proje Çizimi", tutar: projeCizim },
    { ad: "Ruhsat Harcı", tutar: ruhsatHarci },
    { ad: "Yapı Denetim", tutar: yapiDenetim },
    { ad: "Hafriyat", tutar: hafriyat }
  ];
}

setSonuc({
  betonM3,
  demirKg,
  demirTon,
  kalipDemirIscilik,
  cati,
  duvar,
  toplamMaliyet,
  giderKalemleri
});

};

return ( <div className="p-4 max-w-xl mx-auto space-y-4"> <h1 className="text-xl font-bold">İnşaat Maliyet Hesaplama</h1> <input type="number" value={m2} onChange={(e) => setM2(Number(e.target.value))} placeholder="İnşaat Alanı (m²)" className="border rounded p-2 w-full" />

<label className="flex items-center space-x-2">
    <input
      type="checkbox"
      checked={includeExtras}
      onChange={(e) => setIncludeExtras(e.target.checked)}
    />
    <span>İnşaat öncesi giderleri dahil et</span>
  </label>

  <button
    onClick={hesapla}
    className="bg-blue-500 text-white px-4 py-2 rounded"
  >
    Hesapla
  </button>

  {showResult && (
    <div className="mt-4 space-y-2">
      <h2 className="text-lg font-semibold">Sonuçlar:</h2>
      <p>Beton: {sonuc.betonM3.toFixed(1)} m³</p>
      <p>Demir: {sonuc.demirKg.toLocaleString()} kg ({sonuc.demirTon.toFixed(2)} ton)</p>
      <p>Kalıp/Demir İşçilik: {formatBinTL(sonuc.kalipDemirIscilik)}</p>
      <p>Çatı: {formatBinTL(sonuc.cati)}</p>
      <p>Duvar: {formatBinTL(sonuc.duvar)}</p>

      {includeExtras && (
        <div className="mt-2">
          <h3 className="font-semibold">İnşaat Öncesi Giderler:</h3>
          <ul className="list-disc list-inside">
            {sonuc.giderKalemleri.map((gider, i) => (
              <li key={i}>{gider.ad}: {formatBinTL(gider.tutar)}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="font-bold mt-2">Toplam Maliyet: {formatBinTL(sonuc.toplamMaliyet)}</p>
    </div>
  )}
</div>

); }

        
