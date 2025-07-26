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

  // Güncelleme: m2 fiyatı değişirse toplam fiyat sıfırlanacak ve tersi de geçerli
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

  // Toplam maliyeti hesapla
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
    <div style={{
      maxWidth: 600,
      margin: "30px auto",
      fontFamily: "'Poppins', sans-serif",
      padding: 20,
      backgroundColor: "#f9f9f9",
      borderRadius: 12,
      boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>İnşaat Maliyet Modülü</h2>

      <label style={{ display: "block", marginBottom: 10, fontWeight: "600" }}>
        Toplam İnşaat Alanı (m²):
        <input
          type="number"
          min="0"
          value={totalM2}
          onChange={(e) => setTotalM2(e.target.value)}
          placeholder="Örnek: 500"
          style={{
            width: "100%",
            padding: 10,
            marginTop: 6,
            borderRadius: 6,
            border: "1.5px solid #ccc",
            fontSize: 16,
          }}
        />
      </label>

      {items.map(({ id, name, m2Price, totalPrice }) => (
        <div
          key={id}
          style={{
            marginBottom: 15,
            padding: 10,
            backgroundColor: "white",
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <h4 style={{ marginBottom: 8 }}>{name}</h4>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <label style={{ flex: 1, minWidth: 150 }}>
              M² Başına Fiyat (TL):
              <input
                type="number"
                min="0"
                step="0.01"
                value={m2Price}
                onChange={(e) => handleM2PriceChange(id, e.target.value)}
                placeholder="Örn: 1500"
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 6,
                  border: "1.5px solid #ccc",
                  fontSize: 14,
                  marginTop: 4,
                }}
              />
            </label>
            <label style={{ flex: 1, minWidth: 150 }}>
              Toplam Fiyat (TL):
              <input
                type="number"
                min="0"
                step="0.01"
                value={totalPrice}
                onChange={(e) => handleTotalPriceChange(id, e.target.value)}
                placeholder="Örn: 100000"
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 6,
                  border: "1.5px solid #ccc",
                  fontSize: 14,
                  marginTop: 4,
                }}
              />
            </label>
          </div>
        </div>
      ))}

      <button
        onClick={hesapla}
        style={{
          width: "100%",
          padding: 14,
          backgroundColor: "#007bff",
          color: "white",
          fontWeight: "700",
          fontSize: 18,
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          marginTop: 10,
          boxShadow: "0 4px 12px rgba(0,123,255,0.6)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Toplam Maliyeti Hesapla
      </button>

      {toplamMaliyet !== null && (
        <div style={{
          marginTop: 20,
          backgroundColor: "#e9f0ff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 4px 12px rgba(0,123,255,0.3)",
          fontWeight: "700",
          fontSize: 20,
          color: "#003366",
          textAlign: "center"
        }}>
          Toplam İnşaat Maliyeti: {toplamMaliyet.toFixed(2)} TL
        </div>
      )}
    </div>
  );
                  }
