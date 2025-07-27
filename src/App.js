import React, { useState } from "react";

export default function MaliyetModulu() {
  const [insaatAlani, setInsaatAlani] = useState("");
  const [arsaAlani, setArsaAlani] = useState("");
  const [kabaMaliyetSecili, setKabaMaliyetSecili] = useState(true);
  const [inceMaliyetSecili, setInceMaliyetSecili] = useState(true);
  const [sonuc, setSonuc] = useState(null);

  const birimFiyat = {
    beton: 3000,
    demir: 45,
    kalipIscilik: 1500,
    duvar: 320,
    zeminIyilestirme: 150,
    temelPerdeIzolasyon: 100,
    asansorBoslugu: 20000,
    sarnic: 15000,

    sivaBoya: 200,
    seramikZemin: 300,
    kapi: 150,
    mutfakDolabi: 200,
    banyo: 200,
    elektrik: 250,
    suTesisati: 200,
    isitma: 250,
    camPencere: 300,
  };

  function hesapla() {
    const insaat = parseFloat(insaatAlani) || 0;
    const arsa = parseFloat(arsaAlani) || 0;

    let kaba = 0;
    let ince = 0;

    if (kabaMaliyetSecili) {
      kaba =
        insaat * 0.35 * birimFiyat.beton +
        insaat * 40 * birimFiyat.demir +
        insaat * birimFiyat.kalipIscilik +
        insaat * birimFiyat.duvar +
        arsa * birimFiyat.zeminIyilestirme +
        insaat * birimFiyat.temelPerdeIzolasyon +
        2 * birimFiyat.asansorBoslugu +
        1 * birimFiyat.sarnic;
    }

    if (inceMaliyetSecili) {
      ince =
        insaat * birimFiyat.sivaBoya +
        insaat * birimFiyat.seramikZemin +
        insaat * birimFiyat.kapi +
        insaat * birimFiyat.mutfakDolabi +
        insaat * birimFiyat.banyo +
        insaat * birimFiyat.elektrik +
        insaat * birimFiyat.suTesisati +
        insaat * birimFiyat.isitma +
        insaat * birimFiyat.camPencere;
    }

    setSonuc(kaba + ince);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">İnşaat Maliyet Hesaplama</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">İnşaat Alanı (m²)</label>
        <input
          type="number"
          min="0"
          value={insaatAlani}
          onChange={(e) => setInsaatAlani(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Örn: 1200"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Arsa Alanı (m²)</label>
        <input
          type="number"
          min="0"
          value={arsaAlani}
          onChange={(e) => setArsaAlani(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Örn: 1500"
        />
      </div>

      <div className="flex gap-4 mb-6">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={kabaMaliyetSecili}
            onChange={() => setKabaMaliyetSecili(!kabaMaliyetSecili)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-semibold">Kaba Maliyet</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={inceMaliyetSecili}
            onChange={() => setInceMaliyetSecili(!inceMaliyetSecili)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-semibold">İnce Maliyet</span>
        </label>
      </div>

      <button
        onClick={hesapla}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Hesapla
      </button>

      {sonuc !== null && (
        <div className="mt-6 text-center text-3xl font-bold text-green-700">
          Toplam Maliyet: {sonuc.toLocaleString()} TL
        </div>
      )}
    </div>
  );
}
