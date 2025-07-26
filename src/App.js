import React, { useState } from "react";

const initialItems = [
  { id: 1, name: "Kazı ve Hafriyat", m2Price: "", totalPrice: "" },
  { id: 2, name: "Temel ve Betonarme İşleri", m2Price: "", totalPrice: "" },
  { id: 3, name: "Duvar ve Bölme İşleri", m2Price: "", totalPrice: "" },
  { id: 4, name: "Çatı İşleri", m2Price: "", totalPrice: "" },
  { id: 5, name: "Kapı, Pencere ve Doğrama", m2Price: "", totalPrice: "" },
  { id: 6, name: "Sıva ve Saten İşleri", m2Price: "", totalPrice: "" },
  { id: 7, name: "Seramik ve Zemin Kaplama", m2Price: "", totalPrice: "" },
  { id: 8, name: "Boyama ve Dekorasyon", m2Price: "", totalPrice: "" },
  { id: 9, name: "Elektrik Tesisatı", m2Price: "", totalPrice: "" },
  { id: 10, name: "Sıhhi Tesisat", m2Price: "", totalPrice: "" },
  { id: 11, name: "Isıtma ve Soğutma Sistemleri", m2Price: "", totalPrice: "" },
  { id: 12, name: "Asma Tavan ve Alçıpan İşleri", m2Price: "", totalPrice: "" },
  { id: 13, name: "Bahçe ve Çevre Düzenlemesi", m2Price: "", totalPrice: "" },
  { id: 14, name: "Genel Giderler ve Kar", m2Price: "", totalPrice: "" },
];

export default function InsaatMaliyetModulu() {
  const [items, setItems] = useState(initialItems);
  const [totalM2, setTotalM2] = useState("");
  const [toplamMaliyet, setToplamMaliyet] = useState(null);

  // m2 fiyatı değişirse toplam fiyat sıfırlanır, tersi de geçerli
  const handleM2PriceChange = (id, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, m2Price: value, totalPrice: "" }
          : item
      )
    );
  };

  const handleTotalPriceChange = (id, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, totalPrice: value, m2Price: "" }
          : item
      )
    );
  };

  const hesapla = () => {
    const arsaM2 = parseFloat(totalM2);
    if (isNaN(arsaM2) || arsaM2 <= 0) {
      alert("Lütfen geçerli bir toplam m² değeri girin.");
      return;
    }

    let toplam = 0;
    items.forEach(({ m2Price, totalPrice }) => {
      const m2F = parseFloat(m2Price);
      const totF = parseFloat(totalPrice);
      if (!isNaN(m2F) && m2F > 0) {
        toplam += m2F * arsaM2;
      } else if (!isNaN(totF) && totF > 0) {
        toplam += totF;
      }
    });

    setToplamMaliyet(toplam);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg font-sans">
      <h2 className="text-3xl font-semibold mb-8 text-center text-blue-700">İnşaat Maliyet Modülü</h2>

      <label className="block mb-6">
        <span className="text-gray-700 font-medium">Toplam İnşaat Alanı (m²)</span>
        <input
          type="number"
          min="0"
          value={totalM2}
          onChange={(e) => setTotalM2(e.target.value)}
          placeholder="Örnek: 5000"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                     placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-300
                     focus:ring-opacity-50 transition"
        />
      </label>

      {items.map(({ id, name, m2Price, totalPrice }) => (
        <div key={id} className="mb-6 p-4 bg-gray-50 rounded-md shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">{name}</h4>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex-1">
              <span className="block text-gray-600 mb-1">M² Başına Fiyat (TL)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={m2Price}
                onChange={(e) => handleM2PriceChange(id, e.target.value)}
                placeholder="Örn: 1500"
                className="w-full rounded border border-gray-300 px-3 py-2
                           placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-blue-400"
              />
            </label>
            <label className="flex-1">
              <span className="block text-gray-600 mb-1">Toplam Fiyat (TL)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={totalPrice}
                onChange={(e) => handleTotalPriceChange(id, e.target.value)}
                placeholder="Örn: 100000"
                className="w-full rounded border border-gray-300 px-3 py-2
                           placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-blue-400"
              />
            </label>
          </div>
        </div>
      ))}

      <button
        onClick={hesapla}
        className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold
                   rounded-md shadow-md transition-colors"
      >
        Toplam Maliyeti Hesapla
      </button>

      {toplamMaliyet !== null && (
        <div className="mt-8 p-6 bg-blue-50 text-blue-900 rounded-md text-center
                        font-semibold text-xl shadow-md">
          Toplam İnşaat Maliyeti: {toplamMaliyet.toFixed(2)} TL
        </div>
      )}
    </div>
  );
            }
