import React, { useState } from "react";

export default function MaliyetModulu({ insaatAlani, catiAlani, arsaAlani }) {
  // --- SABİT BİRİM FİYATLAR ---
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

  // --- KABA MALİYET HESABI ---
  const kabaMaliyet =
    insaatAlani * 0.35 * birimFiyat.beton +
    insaatAlani * 40 * birimFiyat.demir +
    insaatAlani * birimFiyat.kalipIscilik +
    insaatAlani * birimFiyat.duvar +
    catiAlani * birimFiyat.cati +
    arsaAlani * birimFiyat.zeminIyilestirme +
    insaatAlani * birimFiyat.temelPerdeIzolasyon +
    2 * birimFiyat.asansorBoslugu + // 2 adet asansör sabit
    1 * birimFiyat.sarnic; // 1 adet sarnıç sabit

  // --- İNCE MALİYET HESABI ---
  const inceMaliyet =
    insaatAlani * birimFiyat.sivaBoya +
    insaatAlani * birimFiyat.seramikZemin +
    insaatAlani * birimFiyat.kapi +
    insaatAlani * birimFiyat.mutfakDolabi +
    insaatAlani * birimFiyat.banyo +
    insaatAlani * birimFiyat.elektrik +
    insaatAlani * birimFiyat.suTesisati +
    insaatAlani * birimFiyat.isitma +
    insaatAlani * birimFiyat.camPencere;

  // --- TOPLAM MALİYET ---
  const toplamMaliyet = kabaMaliyet + inceMaliyet;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">🏗️ İnşaat Maliyet Hesaplama</h2>

      <div className="mb-4">
        <div>
          <span className="font-semibold">İnşaat Alanı (m²): </span> {insaatAlani}
        </div>
        <div>
          <span className="font-semibold">Çatı Alanı (m²): </span> {catiAlani}
        </div>
        <div>
          <span className="font-semibold">Arsa Alanı (m²): </span> {arsaAlani}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Kaba Maliyet Kalemleri</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Beton: {(insaatAlani * 0.35).toFixed(2)} m³ x {birimFiyat.beton} TL/m³</li>
          <li>Demir: {(insaatAlani * 40).toFixed(2)} kg x {birimFiyat.demir} TL/kg</li>
          <li>Kalıp & İşçilik: {insaatAlani} m² x {birimFiyat.kalipIscilik} TL/m²</li>
          <li>Duvar: {insaatAlani} m² x {birimFiyat.duvar} TL/m²</li>
          <li>Çatı: {catiAlani} m² x {birimFiyat.cati} TL/m²</li>
          <li>Zemin İyileştirme: {arsaAlani} m² x {birimFiyat.zeminIyilestirme} TL/m²</li>
          <li>Temel Perde İzolasyonu: {insaatAlani} m² x {birimFiyat.temelPerdeIzolasyon} TL/m²</li>
          <li>Asansör Boşluğu: 2 adet x {birimFiyat.asansorBoslugu} TL</li>
          <li>Sarnıç / Su Deposu: 1 adet x {birimFiyat.sarnic} TL</li>
        </ul>
        <div className="mt-2 font-semibold text-green-700">
          Kaba Maliyet Toplamı: {kabaMaliyet.toLocaleString()} TL
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">İnce Maliyet Kalemleri</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Sıva & Boya: {insaatAlani} m² x {birimFiyat.sivaBoya} TL/m²</li>
          <li>Seramik & Zemin Kaplama: {insaatAlani} m² x {birimFiyat.seramikZemin} TL/m²</li>
          <li>Kapı (İç + Dış): {insaatAlani} m² x {birimFiyat.kapi} TL/m²</li>
          <li>Mutfak Dolabı: {insaatAlani} m² x {birimFiyat.mutfakDolabi} TL/m²</li>
          <li>Banyo Donanımı: {insaatAlani} m² x {birimFiyat.banyo} TL/m²</li>
          <li>Elektrik Tesisatı: {insaatAlani} m² x {birimFiyat.elektrik} TL/m²</li>
          <li>Su Tesisatı: {insaatAlani} m² x {birimFiyat.suTesisati} TL/m²</li>
          <li>Isıtma Sistemi: {insaatAlani} m² x {birimFiyat.isitma} TL/m²</li>
          <li>Cam & Pencere: {insaatAlani} m² x {birimFiyat.camPencere} TL/m²</li>
        </ul>
        <div className="mt-2 font-semibold text-green-700">
          İnce Maliyet Toplamı: {inceMaliyet.toLocaleString()} TL
        </div>
      </div>

      <div className="mt-6 text-xl font-bold border-t pt-4 text-blue-700">
        Genel Toplam Maliyet: {toplamMaliyet.toLocaleString()} TL
      </div>
    </div>
  );
}
