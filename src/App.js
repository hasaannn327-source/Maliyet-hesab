import React, { useState } from "react";

export default function MaliyetModulu() {
  const [m2, setM2] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSonuc, setShowSonuc] = useState(false);
  const [includeExtras, setIncludeExtras] = useState(false);
  const [sonuc, setSonuc] = useState(null);

  const hesapla = () => {
    const alan = parseFloat(m2);
    if (isNaN(alan) || alan <= 0) {
      alert("Lütfen geçerli bir metrekare girin!");
      return;
    }

    setLoading(true);
    setShowSonuc(false);

    setTimeout(() => {
      const beton = alan * 0.35;
      const demir = alan * 40;
      const iscilik = alan * 1500;
      const cati = alan * 1500;
      const duvar = alan * 320;

      let ekstra = {};
      if (includeExtras) {
        ekstra = {
          zeminEtudu: 10000,
          projeCizimi: 30000,
          ruhsatHarci: alan * 8,
          yapiDenetim: alan * 60,
          hafriyat: 40000,
        };
      }

      const toplamEkstra = Object.values(ekstra).reduce((a, b) => a + b, 0);

      const toplamMaliyet = iscilik + cati + duvar + toplamEkstra;

      setSonuc({
        beton,
        demir,
        iscilik,
        cati,
        duvar,
        ekstra,
        toplamMaliyet,
      });

      setLoading(false);
      setShowSonuc(true);
    }, 10000);
  };

  const formatTL = (num) => {
    if (!num) return "0 TL";
    return num.toLocaleString("tr-TR", { maximumFractionDigits: 0 }) + " TL";
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Maliyet Modülü</h1>

      <input
        type="number"
        placeholder="İnşaat alanı (m²)"
        value={m2}
        onChange={(e) => setM2(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="inline-flex items-center mb-4">
        <input
          type="checkbox"
          className="mr-2"
          checked={includeExtras}
          onChange={(e) => setIncludeExtras(e.target.checked)}
        />
        İnşaat öncesi giderleri dahil et
      </label>

      <button
        onClick={hesapla}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Hesapla
      </button>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <img
            src="/dancing-dog.gif"
            alt="Yükleniyor"
            className="w-full h-full object-contain"
            style={{ animation: "none" }}
          />
        </div>
      )}

      {showSonuc && !loading && sonuc && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Sonuçlar</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Beton: {sonuc.beton.toFixed(2)} m³</li>
            <li>
              Demir: {sonuc.demir.toFixed(2)} kg ({(sonuc.demir / 1000).toFixed(2)} ton)
            </li>
            <li>İşçilik (Kalıp + Demir): {formatTL(sonuc.iscilik)}</li>
            <li>Çatı: {formatTL(sonuc.cati)}</li>
            <li>Duvar: {formatTL(sonuc.duvar)}</li>

            {includeExtras && (
              <>
                <li className="mt-3 font-semibold">İnşaat Öncesi Giderler:</li>
                <li>Zemin Etüdü: {formatTL(sonuc.ekstra.zeminEtudu)}</li>
                <li>Proje Çizimi: {formatTL(sonuc.ekstra.projeCizimi)}</li>
                <li>Ruhsat Harcı: {formatTL(sonuc.ekstra.ruhsatHarci)}</li>
                <li>Yapı Denetim: {formatTL(sonuc.ekstra.yapiDenetim)}</li>
                <li>Hafriyat: {formatTL(sonuc.ekstra.hafriyat)}</li>
              </>
            )}

            <li className="font-bold mt-4">Toplam Maliyet: {formatTL(sonuc.toplamMaliyet)}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
