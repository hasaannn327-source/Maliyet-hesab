import React, { useState } from "react";

export default function MaliyetHesap() { const [brutAlan, setBrutAlan] = useState(0);

const [kalemler, setKalemler] = useState([ { ad: "Hafriyat", birim: "m³", miktar: 1.2, fiyat: 200 }, { ad: "Beton", birim: "m³", miktar: 0.3, fiyat: 1200 }, { ad: "Demir", birim: "kg", miktar: 100, fiyat: 25 }, { ad: "Kalıp", birim: "m²", miktar: 2, fiyat: 100 }, { ad: "Duvar", birim: "m²", miktar: 1.5, fiyat: 80 }, { ad: "Sıva", birim: "m²", miktar: 2, fiyat: 40 }, { ad: "Elektrik", birim: "m²", miktar: 1, fiyat: 100 }, { ad: "Mekanik", birim: "m²", miktar: 1, fiyat: 150 }, { ad: "Boya", birim: "m²", miktar: 2, fiyat: 35 }, ]);

const genelToplam = kalemler.reduce( (acc, item) => acc + item.miktar * item.fiyat, 0 );

const toplamMaliyet = genelToplam * brutAlan; const karliMaliyet = toplamMaliyet * 1.2; // %20 kar ekliyoruz

const handleChange = (index, key, value) => { const yeniKalemler = [...kalemler]; yeniKalemler[index][key] = parseFloat(value); setKalemler(yeniKalemler); };

return ( <div className="p-4 max-w-5xl mx-auto space-y-4"> <h2 className="text-xl font-bold">İnşaat Maliyet Hesabı (m² Başına)</h2>

<div className="flex gap-2 items-center">
    <label className="font-medium">Toplam Brüt İnşaat Alanı (m²):</label>
    <input
      type="number"
      value={brutAlan}
      onChange={(e) => setBrutAlan(parseFloat(e.target.value) || 0)}
      className="border p-2 w-40 rounded"
    />
  </div>

  <table className="w-full border text-sm">
    <thead>
      <tr className="bg-gray-200">
        <th className="border px-2 py-1">Kalem</th>
        <th className="border px-2 py-1">Birim</th>
        <th className="border px-2 py-1">Miktar (1 m² için)</th>
        <th className="border px-2 py-1">Birim Fiyat (TL)</th>
        <th className="border px-2 py-1">1 m² Tutar (TL)</th>
      </tr>
    </thead>
    <tbody>
      {kalemler.map((item, i) => (
        <tr key={i}>
          <td className="border px-2 py-1">{item.ad}</td>
          <td className="border px-2 py-1">{item.birim}</td>
          <td className="border px-2 py-1">
            <input
              type="number"
              value={item.miktar}
              onChange={(e) => handleChange(i, "miktar", e.target.value)}
              className="w-20 p-1 border rounded"
            />
          </td>
          <td className="border px-2 py-1">
            <input
              type="number"
              value={item.fiyat}
              onChange={(e) => handleChange(i, "fiyat", e.target.value)}
              className="w-20 p-1 border rounded"
            />
          </td>
          <td className="border px-2 py-1 text-right">
            {Number(item.miktar * item.fiyat).toFixed(2)} TL
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className="mt-4 space-y-2">
    <p className="font-medium">1 m² İnşaat Maliyeti: <b>{genelToplam.toFixed(2)} TL</b></p>
    <p className="font-medium">Toplam Maliyet ({brutAlan} m²): <b>{toplamMaliyet.toFixed(2)} TL</b></p>
    <p className="font-medium text-green-700">Genel Toplam (+%20 kar): <b>{karliMaliyet.toFixed(2)} TL</b></p>
  </div>
</div>

); }

                    
