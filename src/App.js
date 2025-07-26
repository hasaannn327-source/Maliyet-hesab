import React, { useState } from "react";

export default function MaliyetModulu() {
  const [m2, setM2] = useState("");
  const [loading, setLoading] = useState(false);
  const [sonuc, setSonuc] = useState(null);

  // Sabit değerler
  const betonM3PerM2 = 0.35;
  const demirKgPerM2 = 40;
  const iscilikPerM2 = 1500; // TL kalıp + demir işçiliği
  const catiPerM2 = 1500; // TL
  const duvarPerM2 = 320; // TL

  const hesapla = () => {
    const sayi = parseFloat(m2);
    if (isNaN(sayi) || sayi <= 0) {
      alert("Lütfen geçerli bir m² değeri giriniz.");
      return;
    }

    setLoading(true);
    setSonuc(null);

    // Simüle etmek için 1.5 saniye bekletelim
    setTimeout(() => {
      const beton = betonM3PerM2 * sayi;
      const demir = demirKgPerM2 * sayi;
      const iscilik = iscilikPerM2 * sayi;
      const cati = catiPerM2 * sayi;
      const duvar = duvarPerM2 * sayi;
      const toplam = iscilik + cati + duvar;

      setSonuc({ beton, demir, iscilik, cati, duvar, toplam });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow mt-10 font-sans">
      <h1 className="text-xl font-bold mb-4">Maliyet Hesaplama Modülü</h1>

      <label className="block mb-2 font-semibold" htmlFor="m2">
        İnşaat Alanı (m²):
      </label>
      <input
        id="m2"
        type="number"
        min="0"
        value={m2}
        onChange={(e) => setM2(e.target.value)}
        placeholder="Metrekare giriniz"
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={hesapla}
        disabled={loading}
        className={`w-full p-2 text-white font-semibold rounded ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Hesaplanıyor..." : "Hesapla"}
      </button>

      {sonuc && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Sonuçlar:</h2>
          <ul className="list-disc list-inside">
            <li>Beton: {sonuc.beton.toFixed(2)} m³</li>
            <li>Demir: {sonuc.demir.toFixed(2)} kg</li>
            <li>İşçilik (Kalıp + Demir): {sonuc.iscilik.toFixed(2)} TL</li>
            <li>Çatı: {sonuc.cati.toFixed(2)} TL</li>
            <li>Duvar: {sonuc.duvar.toFixed(2)} TL</li>
            <li className="font-bold mt-2">Toplam İşçilik + Çatı + Duvar: {sonuc.toplam.toFixed(2)} TL</li>
          </ul>
        </div>
      )}
    </div>
  );
}
