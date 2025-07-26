import React, { useState } from "react";

export default function App() {
  const [m2, setM2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showGiderler, setShowGiderler] = useState(false);

  const numberToText = (number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const hesapla = () => {
    setLoading(true);
    setTimeout(() => {
      const m2Float = parseFloat(m2);

      const betonM3 = m2Float * 0.35;
      const demirKG = m2Float * 40;
      const iscilik = m2Float * 1500;
      const cati = m2Float * 1500;
      const duvar = m2Float * 320;

      const onGiderler = 50000; // İnşaat öncesi sabit gider
      const ruhsat = 30000;
      const harita = 20000;
      const zeminEtudu = 15000;
      const mimari = 25000;

      const toplam = iscilik + cati + duvar + onGiderler + ruhsat + harita + zeminEtudu + mimari;

      setResult({
        betonM3,
        demirKG,
        iscilik,
        cati,
        duvar,
        onGiderler,
        ruhsat,
        harita,
        zeminEtudu,
        mimari,
        toplam,
      });

      setLoading(false);
    }, 10000); // 10 saniye gif göster
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Maliyet Hesap Modülü</h1>
      <input
        type="number"
        placeholder="İnşaat m² girin"
        value={m2}
        onChange={(e) => setM2(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <button
        onClick={hesapla}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Hesapla
      </button>

      <div className="mt-4">
        <label>
          <input
            type="checkbox"
            checked={showGiderler}
            onChange={() => setShowGiderler(!showGiderler)}
            className="mr-2"
          />
          İnşaat öncesi giderleri göster
        </label>
      </div>

      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <img
            src="/dancing-dog.gif"
            alt="Yükleniyor..."
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Hesap Sonuçları</h2>
          <p>Beton: {result.betonM3.toFixed(2)} m³</p>
          <p>Demir: {result.demirKG.toFixed(0)} kg ({(result.demirKG / 1000).toFixed(2)} ton)</p>
          <p>Kalıp-Demir İşçiliği: {numberToText(result.iscilik)} ({result.iscilik.toLocaleString("tr-TR")} TL)</p>
          <p>Çatı: {numberToText(result.cati)} ({result.cati.toLocaleString("tr-TR")} TL)</p>
          <p>Duvar: {numberToText(result.duvar)} ({result.duvar.toLocaleString("tr-TR")} TL)</p>

          {showGiderler && (
            <>
              <h3 className="text-lg font-bold mt-4">İnşaat Öncesi Giderler</h3>
              <p>Ön Giderler: {numberToText(result.onGiderler)}</p>
              <p>Ruhsat Gideri: {numberToText(result.ruhsat)}</p>
              <p>Harita Gideri: {numberToText(result.harita)}</p>
              <p>Zemin Etüdü: {numberToText(result.zeminEtudu)}</p>
              <p>Mimari Proje: {numberToText(result.mimari)}</p>
            </>
          )}

          <h3 className="text-xl font-bold mt-4">
            Toplam: {numberToText(result.toplam)} ({result.toplam.toLocaleString("tr-TR")} TL)
          </h3>
        </div>
      )}
    </div>
  );
            }
