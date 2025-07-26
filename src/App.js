import React, { useState } from "react";

export default function App() {
  const [m2, setM2] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showGiderler, setShowGiderler] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const insaatBeton = m2 * 0.35;
      const insaatDemir = m2 * 40;
      const kalipDemirIscilik = m2 * 1500;
      const cati = m2 * 1500;
      const duvar = m2 * 320;

      const toplam =
        kalipDemirIscilik + cati + duvar;

      const giderler = {
        proje: 15000,
        jeolojikEtud: 8000,
        insaatMu: 10000,
        yapiDenetim: 15000,
        ruhsatHarci: 12000,
        belediyeHizmet: 5000,
        genelToplam: toplam + 15000 + 8000 + 10000 + 15000 + 12000 + 5000,
      };

      setResult({
        beton: insaatBeton.toFixed(2),
        demir: insaatDemir,
        kalip: kalipDemirIscilik,
        cati,
        duvar,
        toplam,
        giderler,
      });

      setLoading(false);
    }, 10000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            margin: 0,
            padding: 0,
            overflow: "hidden",
            backgroundColor: "rgba(0,0,0,0.85)",
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
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              animation: "none",
            }}
          />
        </div>
      )}

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Maliyet Hesap</h1>
        <input
          type="number"
          value={m2}
          onChange={(e) => setM2(e.target.value)}
          placeholder="İnşaat Alanı (m²)"
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Hesapla
        </button>

        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="showGider"
            className="mr-2"
            checked={showGiderler}
            onChange={(e) => setShowGiderler(e.target.checked)}
          />
          <label htmlFor="showGider">İnşaat Öncesi Giderleri Göster</label>
        </div>

        {result && (
          <div className="mt-6 text-sm">
            <p><strong>Beton:</strong> {result.beton} m³</p>
            <p><strong>Demir:</strong> {(result.demir / 1000).toFixed(2)} ton ({result.demir} kg)</p>
            <p><strong>Kalıp/Demir İşçilik:</strong> {result.kalip.toLocaleString()} TL ( {m2} x 1500 )</p>
            <p><strong>Çatı:</strong> {result.cati.toLocaleString()} TL ( {m2} x 1500 )</p>
            <p><strong>Duvar:</strong> {result.duvar.toLocaleString()} TL ( {m2} x 320 )</p>
            <p><strong>Toplam Maliyet:</strong> {result.toplam.toLocaleString()} TL ( {convertToWords(result.toplam)} TL )</p>

            {showGiderler && (
              <div className="mt-4">
                <p><strong>Proje:</strong> {result.giderler.proje.toLocaleString()} TL</p>
                <p><strong>Jeolojik Etüt:</strong> {result.giderler.jeolojikEtud.toLocaleString()} TL</p>
                <p><strong>İnşaat Mühendisi:</strong> {result.giderler.insaatMu.toLocaleString()} TL</p>
                <p><strong>Yapı Denetim:</strong> {result.giderler.yapiDenetim.toLocaleString()} TL</p>
                <p><strong>Ruhsat Harcı:</strong> {result.giderler.ruhsatHarci.toLocaleString()} TL</p>
                <p><strong>Belediye Hizmet:</strong> {result.giderler.belediyeHizmet.toLocaleString()} TL</p>
                <p className="mt-2"><strong>Genel Toplam:</strong> {result.giderler.genelToplam.toLocaleString()} TL ({convertToWords(result.giderler.genelToplam)} TL)</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function convertToWords(num) {
  const formatter = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
  });
  const words = new Intl.NumberFormat("tr-TR", {
    notation: "compact",
    compactDisplay: "long",
  }).format(num);

  return words;
          }
