import React, { useState } from "react";

export default function App() {
  const [insaatAlani, setInsaatAlani] = useState("");
  const [daireSayisi, setDaireSayisi] = useState("");
  const [sonuc, setSonuc] = useState(null);

  const hesapla = () => {
    const m2 = parseFloat(insaatAlani);
    const daireSay = parseInt(daireSayisi);
    if (isNaN(m2)) return;

    // Ana kalemler
    const betonM3 = m2 * 0.35;
    const demirKg = m2 * 40;
    const demirTon = demirKg / 1000;
    const kalipDemirIscilik = m2 * 1500;
    const cati = m2 * 1500;

    // Duvar ve ona bağlı kalemler
    const duvarAlanM2 = m2 - m2 * 0.2; // %80
    const duvarMaliyet = duvarAlanM2 * 250;
    const alciSivaBoyaM2 = duvarAlanM2 * 3;
    const alciSivaBoyaMaliyet = alciSivaBoyaM2 * 350;
    const mekanikTesisatMaliyet = duvarAlanM2 * 500;

    // Zemin kaplama
    const zeminKaplamaM2 = m2 * 0.6;
    const zeminKaplamaMaliyet = zeminKaplamaM2 * 1200;

    // Doğrama
    const dogramaM2 = duvarAlanM2 * 0.1;
    const pencereM2 = dogramaM2 * 0.5;
    const kapiM2 = dogramaM2 * 0.5;
    const celikKapiAdet = !isNaN(daireSay) && daireSay > 0 ? daireSay : 1;

    const dogramaMaliyet =
      pencereM2 * 1800 + kapiM2 * 1200 + celikKapiAdet * 9500;

    // İnşaat öncesi giderler
    const projeRuhsat = m2 * 250;
    const zeminEtudu = m2 * 20;
    const belediyeHarci = m2 * 30;
    const oncesiGiderToplam = projeRuhsat + zeminEtudu + belediyeHarci;

    // Toplam maliyet
    const toplamMaliyet =
      kalipDemirIscilik +
      duvarMaliyet +
      alciSivaBoyaMaliyet +
      mekanikTesisatMaliyet +
      zeminKaplamaMaliyet +
      dogramaMaliyet +
      cati +
      oncesiGiderToplam;

    setSonuc({
      betonM3,
      demirTon,
      kalipDemirIscilik,
      cati,
      duvarAlanM2,
      duvarMaliyet,
      alciSivaBoyaM2,
      alciSivaBoyaMaliyet,
      mekanikTesisatMaliyet,
      zeminKaplamaM2,
      zeminKaplamaMaliyet,
      dogramaM2,
      pencereM2,
      kapiM2,
      celikKapiAdet,
      dogramaMaliyet,
      projeRuhsat,
      zeminEtudu,
      belediyeHarci,
      oncesiGiderToplam,
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

      <input
        type="number"
        placeholder="Daire Sayısı (Çelik Kapı Adedi)"
        className="p-2 border rounded mb-4 w-full max-w-sm"
        value={daireSayisi}
        onChange={(e) => setDaireSayisi(e.target.value)}
      />

      <button
        onClick={hesapla}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Hesapla
      </button>

      {sonuc && (
        <div className="mt-6 bg-white p-4 rounded shadow w-full max-w-2xl space-y-2 text-left">
          <h2 className="text-xl font-semibold mb-2">🧱 Yapı Kalemleri</h2>
          <p>🔹 Beton: {sonuc.betonM3.toFixed(2)} m³</p>
          <p>🔹 Demir: {sonuc.demirTon.toFixed(2)} ton</p>
          <p>🔹 Kalıp/Demir İşçilik: {sonuc.kalipDemirIscilik.toLocaleString()} TL</p>
          <p>🔹 Çatı Maliyeti: {sonuc.cati.toLocaleString()} TL</p>
          <p>🧱 Duvar Alanı (%80): {sonuc.duvarAlanM2.toFixed(2)} m² → {sonuc.duvarMaliyet.toLocaleString()} TL</p>
          <p>🎨 Alçı + Sıva + Boya: {sonuc.alciSivaBoyaM2.toFixed(2)} m² → {sonuc.alciSivaBoyaMaliyet.toLocaleString()} TL</p>
          <p>🔌🚿 Elektrik + Su Tesisatı: {sonuc.mekanikTesisatMaliyet.toLocaleString()} TL</p>
          <p>🧼 Zemin Kaplama: {sonuc.zeminKaplamaM2.toFixed(2)} m² → {sonuc.zeminKaplamaMaliyet.toLocaleString()} TL</p>

          <h2 className="text-xl font-semibold mt-4">🚪 Doğramalar</h2>
          <p>📐 Doğrama Toplam Alanı (Kapı+Pencere): {sonuc.dogramaM2?.toFixed(2) || (sonuc.dogramaM2 ?? 0)} m²</p>
          <p>🪟 Pencere Alanı: {sonuc.pencereM2.toFixed(2)} m² (1800 TL/m²)</p>
          <p>🚪 Kapı Alanı: {sonuc.kapiM2.toFixed(2)} m² (1200 TL/m²)</p>
          <p>🛡️ Çelik Kapı Adedi: {sonuc.celikKapiAdet} (9500 TL/adet)</p>
          <p>💸 Doğrama Maliyeti: {sonuc.dogramaMaliyet.toLocaleString()} TL</p>

          <h2 className="text-xl font-semibold mt-4">📄 İnşaat Öncesi Giderler</h2>
          <p>📌 Proje + Ruhsat: {sonuc.projeRuhsat.toLocaleString()} TL</p>
          <p>📌 Zemin Etüdü: {sonuc.zeminEtudu.toLocaleString()} TL</p>
          <p>📌 Belediye Harcı: {sonuc.belediyeHarci.toLocaleString()} TL</p>
          <p className="font-semibold">Toplam Öncesi Gider: {sonuc.oncesiGiderToplam.toLocaleString()} TL</p>

          <hr />
          <p className="font-bold text-lg">
            💰 Toplam Maliyet: {sonuc.toplamMaliyet.toLocaleString()} TL
          </p>
        </div>
      )}
    </div>
  );
        }
