import React, { useState } from "react";

export default function MaliyetModulu() {
  const [insaatAlani, setInsaatAlani] = useState("");
  const [catiAlani, setCatiAlani] = useState("");
  const [arsaAlani, setArsaAlani] = useState("");

  const birimFiyat = {
    beton: 3000,
    demir: 45,
    kalipIscilik: 1500,
    duvar: 320,
    cati: 1500,
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

  // Girdi değerlerini float yap
  const insaat = parseFloat(insaatAlani) || 0;
  const cati = parseFloat(catiAlani) || 0;
  const arsa = parseFloat(arsaAlani) || 0;

  // Kaba maliyet hesaplama
  const kabaMaliyet =
    insaat * 0.35 * birimFiyat.beton +
    insaat * 40 * birimFiyat.demir +
    insaat * birimFiyat.kalipIscilik +
    insaat * birimFiyat.duvar +
    cati * birimFiyat.cati +
    arsa * birimFiyat.zeminIyilestirme +
    insaat * birimFiyat.temelPerdeIzolasyon +
    2 * birimFiyat.asansorBoslugu +
    1 * birimFiyat.sarnic;

  // İnce maliyet hesaplama
  const inceMaliyet =
    insaat * birimFiyat.sivaBoya +
    insaat * birimFiyat.seramikZemin +
    insaat * birimFiyat.kapi +
    insaat * birimFiyat.mutfakDolabi +
    insaat * birimFiyat.banyo +
    insaat * birimFiyat.elektrik +
    insaat * birimFiyat.suTesisati +
    insaat * birimFiyat.isitma +
    insaat * birimFiyat.camPencere;

  const toplamMaliyet = kabaMaliyet + inceMaliyet;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">İnşaat Maliyet Hesaplama</h1>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">İnşaat Alanı (m²)</label>
        <input
          type="number"
          value={insaatAlani}
          onChange={(e) => setInsaatAlani(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Örn: 1200"
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Çatı Alanı (m²)</label>
        <input
          type="number"
          value={catiAlani}
          onChange={(e) => setCatiAlani(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Örn: 1200"
          min="0"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-semibold">Arsa Alanı (m²)</label>
        <input
          type="number"
          value={arsaAlani}
          onChange={(e) => setArsaAlani(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Örn: 1500"
          min="0"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Kaba Maliyet</h2>
        <ul className="list-disc list-inside text-gray-700 mb-2">
          <li>Beton: {(insaat * 0.35).toFixed(2)} m³ x {birimFiyat.beton} TL</li>
          <li>Demir: {(insaat * 40).toFixed(2)} kg x {birimFiyat.demir} TL</li>
          <li>Kalıp & İşçilik: {insaat} m² x {birimFiyat.kalipIscilik} TL</li>
          <li>Duvar: {insaat} m² x {birimFiyat.duvar} TL</li>
          <li>Çatı: {cati} m² x {birimFiyat.cati} TL</li>
          <li>Zemin İyileştirme: {arsa} m² x {birimFiyat.zeminIyilestirme} TL</li>
          <li>Temel Perde İzolasyonu: {insaat} m² x {birimFiyat.temelPerdeIzolasyon} TL</li>
          <li>Asansör Boşluğu: 2 adet x {birimFiyat.asansorBoslugu} TL</li>
          <li>Sarnıç / Su Deposu: 1 adet x {birimFiyat.sarnic} TL</li>
        </ul>
        <div className="font-bold text-green-700 text-lg">
          Toplam Kaba Maliyet: {kabaMaliyet.toLocaleString()} TL
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">İnce Maliyet</h2>
        <ul className="list-disc list-inside text-gray-700 mb-2">
          <li>Sıva & Boya: {insaat} m² x {birimFiyat.sivaBoya} TL</li>
          <li>Seramik & Zemin Kaplama: {insaat} m² x {birimFiyat.seramikZemin} TL</li>
          <li>Kapı (İç + Dış): {insaat} m² x {birimFiyat.kapi} TL</li>
          <li>Mutfak Dolabı: {insaat} m² x {birimFiyat.mutfakDolabi} TL</li>
          <li>Banyo Donanımı: {insaat} m² x {birimFiyat.banyo} TL</li>
          <li>Elektrik Tesisatı: {insaat} m² x {birimFiyat.elektrik} TL</li>
          <li>Su Tesisatı: {insaat} m² x {birimFiyat.suTesisati} TL</li>
          <li>Isıtma Sistemi: {insaat} m² x {birimFiyat.isitma} TL</li>
          <li>Cam & Pencere: {insaat} m² x {birimFiyat.camPencere} TL</li>
        </ul>
        <div className="font-bold text-green-700 text-lg">
          Toplam İnce Maliyet: {inceMaliyet.toLocaleString()} TL
        </div>
      </div>

      <div className="mt-8 text-center text-2xl font-extrabold text-blue-800 border-t pt-4">
        Genel Toplam Maliyet: {toplamMaliyet.toLocaleString()} TL
      </div>
    </div>
  );
            }
