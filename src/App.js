import React, { useState } from "react";

export default function App() {
  const [arsaM2, setArsaM2] = useState("");
  const [insaatM2, setInsaatM2] = useState("");
  const [kabaMaliyet, setKabaMaliyet] = useState(true);
  const [inceMaliyet, setInceMaliyet] = useState(true);
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

    // Kaba maliyet kalemleri
    const betonM3 = i * 0.35;
    const betonFiyat = betonM3 * 3000;

    const demirTon = i * 0.04;
    const demirFiyat = demirTon * 27000;

    const kalipDemirIscilik = i * 1500;

    const cati = i * 1500;

    const duvarM2 = i - i * 0.2;
    const duvarFiyat = duvarM2 * 250;

    // Asansör boşluğu sabit maliyet
    const asansorBoslugu = 35000;

    // Kat sayısı ve asansör cihaz maliyeti
    const katSayisi = Math.ceil(i / a / 0.4);
    const asansorAdet = Math.ceil(katSayisi / 4);
    const asansorCihazFiyat = asansorAdet * 350000;

    // İnce maliyet kalemleri
    const alciBoyaSivaM2 = duvarM2 * 3;
    const alciBoyaSivaFiyat = alciBoyaSivaM2 * 350;

    const mekanik = duvarM2 * 500;

    const zeminKaplama = i * 0.6 * 1200;

    const ortalamaDaireM2 = 100;
    const daireSayisi = Math.ceil(i / ortalamaDaireM2);
    const pencereAdet = daireSayisi * 6;
    const kapiAdet = daireSayisi * 5;
    const celikKapiAdet = daireSayisi;
    const dogramaFiyat = pencereAdet * 7000 + kapiAdet * 10000 + celikKapiAdet * 25000;

    const disCepheM2 = i / 6.25;
    const disCepheFiyat = disCepheM2 * 2200;

    // İnşaat öncesi sabit gider (700.000 TL / 1000 m²)
    const oncesiGider = (i / 1000) * 700000;

    const banyoSayisi = Math.ceil(i / 100);
    const montajFiyat = banyoSayisi * 15000;

    const peyzajAlan = a * 0.2;
    const peyzajFiyat = peyzajAlan * 300;

    const ongorulmayanGiderler = 1000000;

    const resmiIslemler = 30000;

    const toplamKaba =
      betonFiyat +
      demirFiyat +
      kalipDemirIscilik +
      cati +
      duvarFiyat;

    const toplamInce =
      alciBoyaSivaFiyat +
      mekanik +
      zeminKaplama +
      dogramaFiyat +
      disCepheFiyat +
      oncesiGider +
      montajFiyat +
      asansorBoslugu +
      asansorCihazFiyat +
      peyzajFiyat +
      ongorulmayanGiderler +
      resmiIslemler;

    const toplam = (kabaMaliyet ? toplamKaba : 0) + (inceMaliyet ? toplamInce : 0);

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
      asansorBoslugu,
      asansorCihazFiyat,
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

        <div className="flex items-center space-x-4 mt-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={kabaMaliyet}
              onChange={() => setKabaMaliyet(!kabaMaliyet)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="text-indigo-900 font-semibold">Kaba Maliyet</span>
          </label>

          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={inceMaliyet}
              onChange={() => setInceMaliyet(!inceMaliyet)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="text-indigo-900 font-semibold">İnce Maliyet</span>
          </label>
        </div>

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
            <h2 className="text-3xl font-bold mb-6 text-indigo-900">Toplam Maliyet</h2>
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
          {kabaMaliyet && (
            <>
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
            </>
          )}

          {inceMaliyet && (
            <>
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

              {/* Asansör Boşluğu */}
              <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
                <h2 className="font-semibold mb-2 text-indigo-900">🚧 Asansör Boşluğu</h2>
                <p>🔹 Maliyet: {sonuc.asansorBoslugu.toLocaleString()} TL</p>
              </div>

              {/* Asansör Cihazı */}
              <div className="bg-indigo-50 rounded-md p-3 shadow-inner">
                <h2 className="font-semibold mb-2 text-indigo-900">🛗 Asansör Cihazı</h2>
                <p>🔹 Maliyet: {sonuc.asansorCihazFiyat.toLocaleString()} TL</p>
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
            </>
          )}

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
