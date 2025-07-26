import React, { useState } from "react";

export default function App() {
  const [m2, setM2] = useState("");
  const [sonuc, setSonuc] = useState(null);
  const [loading, setLoading] = useState(false);

  const [onGiderCheck, setOnGiderCheck] = useState(false);

  const handleHesapla = () => {
    if (!m2) return;

    setLoading(true);
    setSonuc(null);

    setTimeout(() => {
      const m2Value = parseFloat(m2);

      // Temel inşaat maliyetleri
      const beton = m2Value * 0.35;
      const demir = m2Value * 40;
      const kalipIscilik = m2Value * 1500;
      const cati = m2Value * 1500;
      const duvar = m2Value * 320;

      // İnşaat öncesi giderler
      const ruhsat = 150000;
      const proje = 100000;
      const harc = 120000;
      const zeminEtudu = 60000;
      const elektrikSuAbone = 40000;
      const diger = 30000;

      const onGiderToplam = ruhsat + proje + harc + zeminEtudu + elektrikSuAbone + diger;

      const toplamMaliyet =
        beton * 3500 + // 1 m³ beton 3500 TL
        demir * 25 +   // 1 kg demir 25 TL
        kalipIscilik +
        cati +
        duvar +
        (onGiderCheck ? onGiderToplam : 0);

      setSonuc({
        beton,
        demir,
        kalipIscilik,
        cati,
        duvar,
        toplamMaliyet,
        onGiderCheck,
        onGiderToplam,
      });

      setLoading(false);
    }, 3000);
  };

  return (
    <div className="p-4 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">İnşaat Maliyet Hesabı</h1>

      <div className="mb-4">
        <label className="block mb-2">İnşaat Alanı (m²):</label>
        <input
          type="number"
          value={m2}
          onChange={(e) => setM2(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Örn: 1000"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={onGiderCheck}
            onChange={() => setOnGiderCheck(!onGiderCheck)}
          />
          <span>İnşaat öncesi giderleri dahil et</span>
        </label>
        {onGiderCheck && (
          <ul className="mt-2 ml-4 list-disc text-sm text-gray-700">
            <li>Ruhsat: 150.000 TL</li>
            <li>Proje: 100.000 TL</li>
            <li>Harc: 120.000 TL</li>
            <li>Zemin Etüdü: 60.000 TL</li>
            <li>Elektrik/Su Abonelik: 40.000 TL</li>
            <li>Diğer: 30.000 TL</li>
          </ul>
        )}
      </div>

      <button
        onClick={handleHesapla}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Hesapla
      </button>

      {/* Loading Ekranı */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            margin: 0,
            padding: 0,
            overflow: "hidden",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <img
            src="/dancing-dog.gif"
            alt="Yükleniyor"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* Sonuçlar */}
      {sonuc && (
        <div className="mt-6 bg-white p-4 rounded shadow text-gray-800 space-y-2">
          <p>Beton: {sonuc.beton.toFixed(2)} m³</p>
          <p>Demir: {(sonuc.demir / 1000).toFixed(2)} ton ({sonuc.demir.toLocaleString()} kg)</p>
          <p>Kalıp/Demir İşçilik: {sonuc.kalipIscilik.toLocaleString()} TL (yaklaşık {yaziyaCevir(sonuc.kalipIscilik)})</p>
          <p>Çatı: {sonuc.cati.toLocaleString()} TL</p>
          <p>Duvar: {sonuc.duvar.toLocaleString()} TL</p>
          {sonuc.onGiderCheck && (
            <p>İnşaat Öncesi Giderler: {sonuc.onGiderToplam.toLocaleString()} TL</p>
          )}
          <hr />
          <p className="text-xl font-bold">
            Toplam Maliyet: {sonuc.toplamMaliyet.toLocaleString()} TL ({yaziyaCevir(sonuc.toplamMaliyet)})
          </p>
        </div>
      )}
    </div>
  );
}

// Basit sayı -> yazı çevirici (bin/milyon için)
function yaziyaCevir(sayi) {
  if (sayi >= 1_000_000_000) return "bir milyar+";
  if (sayi >= 100_000_000) return "yüz milyon+";
  if (sayi >= 10_000_000) return "on milyon+";
  if (sayi >= 1_000_000) return "bir milyon+";
  if (sayi >= 100_000) return "yüz bin+";
  if (sayi >= 10_000) return "on bin+";
  if (sayi >= 1_000) return "bin+";
  return Math.round(sayi).toString();
        }
