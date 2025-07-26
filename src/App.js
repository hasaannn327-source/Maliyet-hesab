import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SCENARIOS = [
  { label: "En İyi", laborIncrease: 1, materialIncrease: 1 },
  { label: "Ortalama", laborIncrease: 2, materialIncrease: 2 },
  { label: "En Kötü", laborIncrease: 3, materialIncrease: 4 },
];

function numberToCurrency(number) {
  return number.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  });
}

export default function CostSimulator() {
  // Temel girişler
  const [m2, setM2] = useState("");
  const [katSayisi, setKatSayisi] = useState(1);
  const [sureAy, setSureAy] = useState(12);

  // İşçilik ve malzeme aylık artış (ortalama değer)
  const [laborIncrease, setLaborIncrease] = useState(2);
  const [materialIncrease, setMaterialIncrease] = useState(2);

  // Sonuçlar
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sabit birim fiyatlar (m² başına)
  const unitCosts = {
    labor: 1500,
    material: 320 + 1500, // Duvar + Çatı malzeme
  };

  // Hesaplama fonksiyonu
  const calculate = () => {
    if (!m2 || m2 <= 0) {
      alert("Lütfen geçerli bir m² giriniz.");
      return;
    }
    if (katSayisi <= 0) {
      alert("Kat sayısı pozitif olmalı.");
      return;
    }
    if (sureAy <= 0) {
      alert("Süre pozitif olmalı.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const m2Float = parseFloat(m2);
      const toplamM2 = m2Float * katSayisi;

      // Senaryo başına aylık maliyet dizisi
      let scenarioResults = [];

      SCENARIOS.forEach(({ label, laborIncrease, materialIncrease }) => {
        let aylikMaliyetler = [];
        let toplam = 0;
        for (let ay = 1; ay <= sureAy; ay++) {
          const laborFactor = Math.pow(1 + laborIncrease / 100, ay - 1);
          const materialFactor = Math.pow(1 + materialIncrease / 100, ay - 1);

          const laborCost = unitCosts.labor * toplamM2 * laborFactor;
          const materialCost = unitCosts.material * toplamM2 * materialFactor;
          const aylikToplam = laborCost + materialCost;

          aylikMaliyetler.push({
            ay,
            laborCost,
            materialCost,
            aylikToplam,
          });

          toplam += aylikToplam;
        }
        scenarioResults.push({
          label,
          aylikMaliyetler,
          toplam,
        });
      });

      setResults(scenarioResults);
      setLoading(false);
    }, 2000);
  };

  // Grafik için veri oluşturma
  const getChartData = () => {
    if (!results) return null;
    return {
      labels: results[0].aylikMaliyetler.map(({ ay }) => "Ay " + ay),
      datasets: results.map(({ label, aylikMaliyetler }, idx) => ({
        label,
        data: aylikMaliyetler.map((item) => item.aylikToplam),
        borderColor: ["#22c55e", "#3b82f6", "#ef4444"][idx],
        backgroundColor: "transparent",
        tension: 0.3,
      })),
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">
        İnşaat Maliyet Simülasyonu
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block font-semibold mb-1">İnşaat Alanı (m²)</label>
          <input
            type="number"
            min={1}
            value={m2}
            onChange={(e) => setM2(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Örn: 1000"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Kat Sayısı</label>
          <input
            type="number"
            min={1}
            value={katSayisi}
            onChange={(e) => setKatSayisi(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">İnşaat Süresi (Ay)</label>
          <input
            type="number"
            min={1}
            value={sureAy}
            onChange={(e) => setSureAy(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-semibold mb-1">
            İşçilik Aylık Artış Oranı (%)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={laborIncrease}
            onChange={(e) => setLaborIncrease(parseFloat(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">
            Malzeme Aylık Artış Oranı (%)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={materialIncrease}
            onChange={(e) => setMaterialIncrease(parseFloat(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full mb-8"
      >
        Hesapla
      </button>

      {loading && (
        <div className="text-center text-lg font-semibold">Yükleniyor...</div>
      )}

      {results && (
        <>
          <div className="mb-6">
            <Line data={getChartData()} options={{ responsive: true }} />
          </div>

          {results.map(({ label, aylikMaliyetler, toplam }) => (
            <div
              key={label}
              className="mb-8 border rounded p-4 bg-gray-50 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-3">{label} Senaryo</h2>
              <p className="mb-3 font-semibold">
                Toplam Maliyet: {numberToCurrency(toplam)}
              </p>

              <div className="overflow-auto max-h-64">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">Ay</th>
                      <th className="border border-gray-300 p-2">İşçilik (₺)</th>
                      <th className="border border-gray-300 p-2">Malzeme (₺)</th>
                      <th className="border border-gray-300 p-2">Aylık Toplam (₺)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aylikMaliyetler.map(({ ay, laborCost, materialCost, aylikToplam }) => (
                      <tr key={ay} className="text-center">
                        <td className="border border-gray-300 p-1">{ay}</td>
                        <td className="border border-gray-300 p-1">{laborCost.toLocaleString("tr-TR", {maximumFractionDigits:0})}</td>
                        <td className="border border-gray-300 p-1">{materialCost.toLocaleString("tr-TR", {maximumFractionDigits:0})}</td>
                        <td className="border border-gray-300 p-1 font-semibold">{aylikToplam.toLocaleString("tr-TR", {maximumFractionDigits:0})}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
              }
