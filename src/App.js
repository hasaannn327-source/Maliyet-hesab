import React, { useState } from "react";

export default function MaliyetHesaplama() {
  const [brutAlan, setBrutAlan] = useState(0);
  const [kalemler, setKalemler] = useState([
    { isim: "Hafriyat", birimFiyat: 120 },
    { isim: "Kalıp İşçiliği", birimFiyat: 350 },
    { isim: "Demir İşçiliği", birimFiyat: 300 },
    { isim: "Beton", birimFiyat: 500 },
    { isim: "Sıva", birimFiyat: 150 },
    { isim: "Seramik", birimFiyat: 200 },
    { isim: "Elektrik Tesisatı", birimFiyat: 180 },
    { isim: "Su Tesisatı", birimFiyat: 170 },
    { isim: "Boya", birimFiyat: 120 },
  ]);

  const handleFiyatDegis = (index, yeniDeger) => {
    const yeniListe = [...kalemler];
    yeniListe[index].birimFiyat = Number(yeniDeger);
    setKalemler(yeniListe);
  };

  const toplamMaliyet = kalemler.reduce(
    (acc, kalem) => acc + kalem.birimFiyat * brutAlan,
    0
  );
  const karliMaliyet = toplamMaliyet * 1.2;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
        İnşaat Maliyet Hesaplama
      </h2>

      <div className="mb-6 bg-white shadow-md rounded-xl p-4">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Toplam Brüt İnşaat Alanı (m²)
        </label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={brutAlan}
          onChange={(e) => setBrutAlan(Number(e.target.value))}
          placeholder="Örneğin: 5000"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {kalemler.map((kalem, index) => (
          <div
            key={index}
            className="bg-white shadow-sm rounded-lg p-4 border border-gray-200"
          >
            <label className="block text-sm text-gray-600 mb-1">
              {kalem.isim} (₺ / m²)
            </label>
            <input
              type="number"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={kalem.birimFiyat}
              onChange={(e) => handleFiyatDegis(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Hesap Sonucu
        </h3>
        <p className="text-gray-700">
          <strong>Toplam Maliyet:</strong> {toplamMaliyet.toLocaleString()} ₺
        </p>
        <p className="text-gray-700 text-lg">
          <strong>%20 Kâr Dahil:</strong>{" "}
          <span className="text-green-600 font-bold text-xl">
            {karliMaliyet.toLocaleString()} ₺
          </span>
        </p>
      </div>
    </div>
  );
}
