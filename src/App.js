import React, { useState } from "react";

export default function App() {
  const [m2, setM2] = useState("");
  const [sureAy, setSureAy] = useState(12);
  const [artisOrani, setArtisOrani] = useState(2);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sabitMaliyet = (m2Float) => ({
    iscilik: m2Float * 1500,
    cati: m2Float * 1500,
    duvar: m2Float * 320,
  });

  const hesapla = () => {
    if (!m2) return alert("Lütfen m² girin");
    if (sureAy <= 0) return alert("İnşaat süresi pozitif olmalı");
    if (artisOrani < 0) return alert("Artış oranı negatif olamaz");

    setLoading(true);
    setTimeout(() => {
      const m2Float = parseFloat(m2);
      const base = sabitMaliyet(m2Float);

      let toplam = 0;
      let aylikMaliyetler = [];

      for (let ay = 1; ay <= sureAy; ay++) {
        const faktor = Math.pow(1 + artisOrani / 100, ay - 1);
        const aylikToplam = (base.iscilik + base.cati + base.duvar) * faktor;
        aylikMaliyetler.push({ ay, maliyet: aylikToplam });
        toplam += aylikToplam;
      }

      setResult({ aylikMaliyetler, toplam });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-6 font-sans max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Zaman Bazlı Maliyet Simülasyonu</h1>

      <input
        type="number"
        placeholder="İnşaat m²"
        value={m2}
        onChange={(e) => setM2(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <input
        type="number"
        placeholder="İnşaat Süresi (ay)"
        value={sureAy}
        onChange={(e) => setSureAy(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
        min={1}
      />
      <input
        type="number"
        placeholder="Aylık maliyet artış oranı (%)"
        value={artisOrani}
        onChange={(e) => setArtisOrani(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
        min={0}
      />

      <button
        onClick={hesapla}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
      >
        Hesapla
      </button>

      {loading && <p className="mt-4 text-center">Yükleniyor...</p>}

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Aylık Maliyetler</h2>
          <ul className="list-disc list-inside max-h-64 overflow-auto">
            {result.aylikMaliyetler.map(({ ay, maliyet }) => (
              <li key={ay}>
                Ay {ay}: {maliyet.toLocaleString("tr-TR", {maximumFractionDigits:2})} TL
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <p className="font-bold text-lg">
            Toplam Maliyet: {result.toplam.toLocaleString("tr-TR", {maximumFractionDigits:2})} TL
          </p>
        </div>
      )}
    </div>
  );
}
