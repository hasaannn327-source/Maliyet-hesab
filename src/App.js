import React, { useState } from "react";

export default function MaliyetHesabi() { const [toplamM2, setToplamM2] = useState(5000); const [enrIndex, setEnrIndex] = useState(1250); const [m2BirimMaliyet, setM2BirimMaliyet] = useState(15000);

const toplamMaliyet = ((enrIndex / 1000) * m2BirimMaliyet * toplamM2).toFixed(2);

return ( <div className="min-h-screen bg-gray-100 p-4"> <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 transition hover:scale-[1.01]"> <h1 className="text-2xl font-bold text-gray-800 mb-4">🏗️ İnşaat Maliyet Hesaplama</h1>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Toplam Brüt İnşaat Alanı (m²)</label>
        <input
          type="number"
          className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          value={toplamM2}
          onChange={(e) => setToplamM2(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">M² Başına Maliyet (₺)</label>
        <input
          type="number"
          className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          value={m2BirimMaliyet}
          onChange={(e) => setM2BirimMaliyet(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">ENR Endeksi</label>
        <input
          type="number"
          className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          value={enrIndex}
          onChange={(e) => setEnrIndex(Number(e.target.value))}
        />
      </div>

      <div className="flex items-end">
        <div className="text-lg font-semibold text-green-700">
          💰 Toplam Maliyet: <span className="text-black">{toplamMaliyet} ₺</span>
        </div>
      </div>
    </div>
  </div>
</div>

); }

