import React, { useState } from "react";

export default function App() {
  const [insaatAlani, setInsaatAlani] = useState("");
  const [sonuc, setSonuc] = useState(null);

  const hesapla = () => {
    const m2 = parseFloat(insaatAlani);
    if (isNaN(m2)) return;

    // Sabitler
    const betonM3 = m2 * 0.35;
    const demirKg = m2 * 40;
    const kalipDemirIscilik = m2 * 1500;
    const cati = m2 * 1500;

    // Doğru Hesap: %20 alan duvara gitmiş, geriye kalan %80 kullanılacak
    const duvarAlanM2 = m2 - (m2 * 0.2); // yani %80
    const duvarMaliyet = duvarAlanM2 * 250;

    const alciSivaBoyaM2 = duvarAlanM2 * 3;
    const alciSivaBoyaMaliyet = alciSivaBoyaM2 * 350;

    const toplamMaliyet =
      kalipDemirIscilik +
      duvarMaliyet +
      alciSivaBoyaMaliyet +
      cati;

    setSonuc({
      betonM3,
      demirKg,
      kalipDemirIscilik,
      cati,
      duvarAlanM2,
      duvarMaliyet,
      alciSivaBoyaM2,
      alciSivaBoyaMaliyet,
      toplamMaliyet,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <h1 className="text-2xl font-bold mb-4">🔧 İnşaat Maliyet Modülü</h1>

      <input
        type="number"
        placeholder="İnşaat Alanı (m²)"
        className="p-2 border rounded mb-4 w-full max-w-sm"
        value={insaatAlani}
        onChange={(e) => setInsaatAlani(e.target.value)}
      />

      <button
        onClick={hesapla}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Hesapla
      </button>

      {sonuc && (
        <div className="mt-6 bg-white p-4 rounded shadow w-full max-w-2xl space-y-2 text-left">
          <p>🔹 Beton: {sonuc.betonM3.toFixed(2)} m³</p>
          <p>🔹 Demir: {sonuc.demirKg.toFixed(2)} kg</p>
          <p>🔹 Kalıp/Demir İşçilik: {sonuc.kalipDemirIscilik.toLocaleString()} TL</p>
          <p>🔹 Çatı Maliyeti: {sonuc.cati.toLocaleString()} TL</p>
          <p>🧱 Duvar Alanı (%80): {sonuc.duvarAlanM2.toFixed(2)} m² → {sonuc.duvarMaliyet.toLocaleString()} TL</p>
          <p>🎨 Alçı + Sıva + Boya: {sonuc.alciSivaBoyaM2.toFixed(2)} m² → {sonuc.alciSivaBoyaMaliyet.toLocaleString()} TL</p>
          <hr />
          <p className="font-bold text-lg">
            💰 Toplam Maliyet: {sonuc.toplamMaliyet.toLocaleString()} TL
          </p>
        </div>
      )}
    </div>
  );
      }
