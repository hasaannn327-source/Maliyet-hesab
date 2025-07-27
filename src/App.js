import React, { useState } from "react";

export default function App() {
  const [arsaM2, setArsaM2] = useState("");
  const [insaatM2, setInsaatM2] = useState("");
  const [sonuc, setSonuc] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const hesaplaMaliyet = () => {
    const a = parseFloat(arsaM2);
    const i = parseFloat(insaatM2);
    if (isNaN(a) || isNaN(i)) {
      setSonuc(null);
      setShowPopup(false);
      return;
    }

    // Beton
    const betonM3 = i * 0.35;
    const betonFiyat = betonM3 * 3000;

    // Demir
    const demirTon = i * 0.04;
    const demirFiyat = demirTon * 27000;

    // Kalıp/Demir işçilik
    const kalipDemirIscilik = i * 1500;

    // Çatı
    const cati = i * 1500;

    // Duvar
    const duvarM2 = i - i * 0.2;
    const duvarFiyat = duvarM2 * 250;

    // Alçı-Sıva-Boya
    const alciBoyaSivaM2 = duvarM2 * 3;
    const alciBoyaSivaFiyat = alciBoyaSivaM2 * 350;

    // Mekanik Tesisat
    const mekanik = duvarM2 * 500;

    // Zemin Kaplama
    const zeminKaplama = i * 0.6 * 1200;

    // Doğrama
    const ortalamaDaireM2 = 100;
    const daireSayisi = Math.ceil(i / ortalamaDaireM2);
    const pencereAdet = daireSayisi * 6;
    const kapiAdet = daireSayisi * 5;
    const celikKapiAdet = daireSayisi;
    const dogramaFiyat = pencereAdet * 7000 + kapiAdet * 10000 + celikKapiAdet * 25000;

    // Dış Cephe
    const disCepheM2 = i / 6.25;
    const disCepheFiyat = disCepheM2 * 2200;

    // İnşaat Öncesi Giderler
    const oncesiGider = i * 300;

    // Banyo + Mutfak Montaj Malzemesi
    const banyoSayisi = Math.ceil(i / 100);
    const montajFiyat = banyoSayisi * 15000;

    // Kat Sayısı ve Asansör
    const katSayisi = Math.ceil(i / a / 0.4);
    const asansorAdet = Math.ceil(katSayisi / 4);
    const asansorFiyat = asansorAdet * 350000;

    // Peyzaj
    const peyzajAlan = a * 0.2;
    const peyzajFiyat = peyzajAlan * 300;

    // Öngörülmeyen Giderler ve Personel
    const ongorulmayanGiderler = 1000000;

    // Resmi İşlemler
    const resmiIslemler = 30000;

    // Toplam
    const toplam =
      betonFiyat +
      demirFiyat +
      kalipDemirIscilik +
      cati +
      duvarFiyat +
      alciBoyaSivaFiyat +
      mekanik +
      zeminKaplama +
      dogramaFiyat +
      disCepheFiyat +
      oncesiGider +
      montajFiyat +
      asansorFiyat +
      peyzajFiyat +
      ongorulmayanGiderler +
      resmiIslemler;

    // %5 hata payı
    const hataPayi = toplam * 0.05;
    const toplamHataPayli = toplam + hataPayi;

    setSonuc({
      betonFiyat,
      demirFiyat,
      kalipDemirIscilik,
      cati,
      duvarFiyat,
      alciBoyaSivaFiyat,
      mekanik,
      zeminKaplama,
      dogramaFiyat,
      disCepheFiyat,
      oncesiGider,
      montajFiyat,
      asansorFiyat,
      peyzajFiyat,
      ongorulmayanGiderler,
      resmiIslemler,
      toplam,
      toplamHataPayli,
    });
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-cyan-100 via-blue-100 to-indigo-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-900 drop-shadow-md">
        🏗️ Maliyet Hesap Modülü
      </h1>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <input
          type="number"
          placeholder="Arsa Alanı (m²)"
          value={arsaM2}
          onChange={(e) => setArsaM2(e.target.value)}
          className="w-full p-3 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          type="number"
          placeholder="İnşaat Alanı (m²)"
          value={insaatM2}
          onChange={(e) => setInsaatM2(e.target.value)}
          className="w-full p-3 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <button
          onClick={hesaplaMaliyet}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transition"
        >
          Hesapla
        </button>
      </div>

      {showPopup && sonuc && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center z-50 px-4">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-xl animate-fadeIn">
            <h2 className="text-3xl font-bold mb-6 text-indigo-900">
              Toplam Maliyet
            </h2>
            <p className="text-5xl font-extrabold mb-8 text-indigo-700">
              {sonuc.toplamHataPayli.toLocaleString()} TL
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition"
            >
              Okey
            </button>
          </div>
        </div>
      )}

      {!showPopup && sonuc && (
        <div className="w-full max-w-md mt-10 bg-white rounded-xl shadow-lg p-6 space-y-4 animate-slideUp">
          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">📄 İnşaat Öncesi Giderler</h2>
            <p>🔹 Maliyet: {sonuc.oncesiGider.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">🧱 Beton</h2>
            <p>🔹 Maliyet: {sonuc.betonFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">🔩 Demir</h2>
            <p>🔹 Maliyet: {sonuc.demirFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">👷 Kalıp/Demir İşçilik</h2>
            <p>🔹 Maliyet: {sonuc.kalipDemirIscilik.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">🏠 Çatı</h2>
            <p>🔹 Maliyet: {sonuc.cati.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">🧱 Duvar</h2>
            <p>🔹 Maliyet: {sonuc.duvarFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">🎨 Alçı - Sıva - Boya</h2>
            <p>🔹 Maliyet: {sonuc.alciBoyaSivaFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">🚿 Mekanik Tesisat</h2>
            <p>🔹 Maliyet: {sonuc.mekanik.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">🧼 Zemin Kaplama</h2>
            <p>🔹 Maliyet: {sonuc.zeminKaplama.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">🚪 Doğrama (Pencere, Kapı, Çelik Kapı)</h2>
            <p>🔹 Maliyet: {sonuc.dogramaFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">🏢 Dış Cephe</h2>
            <p>🔹 Maliyet: {sonuc.disCepheFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">🛁 Banyo + Mutfak Donanımı (Montaj Malzemesi Dahil)</h2>
            <p>🔹 Maliyet: {sonuc.montajFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">🚀 Asansör</h2>
            <p>🔹 Maliyet: {sonuc.asansorFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">🌿 Peyzaj / Çevre Düzenlemesi</h2>
            <p>🔹 Maliyet: {sonuc.peyzajFiyat.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">💼 Öngörülmeyen Giderler ve Personel Ödemeleri</h2>
            <p>🔹 Maliyet: {sonuc.ongorulmayanGiderler.toLocaleString()} TL</p>
          </div>

          <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
            <h2 className="font-semibold mb-2 text-indigo-900">🏛️ Resmi İşlemler</h2>
            <p>🔹 Maliyet: {sonuc.resmiIslemler.toLocaleString()} TL</p>
          </div>

          <hr className="border-indigo-300" />

          <p className="font-bold text-xl text-center text-indigo-900">
            Toplam Maliyet (Hata Payı %5 dahil): {sonuc.toplamHataPayli.toLocaleString()} TL
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(10px);}
          to {opacity: 1; transform: translateY(0);}
        }
        @keyframes slideUp {
          from {opacity: 0; transform: translateY(30px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
                }
