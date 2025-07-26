import React, { useState } from "react";

const initialItems = [
  { id: 1, name: "Kazı ve Hafriyat (m³)", metrajType: "hacim", metraj: "", unitPrice: "", totalPrice: "" },
  { id: 2, name: "Temel ve Betonarme İşleri (m³)", metrajType: "hacim", metraj: "", unitPrice: "", totalPrice: "" },
  { id: 3, name: "Duvar ve Bölme İşleri (m²)", metrajType: "alan", metraj: "", unitPrice: "", totalPrice: "" },
  { id: 4, name: "Çatı İşleri (m²)", metrajType: "alan", metraj: "", unitPrice: "", totalPrice: "" },
  { id: 5, name: "Kapı, Pencere ve Doğrama (m²)", metrajType: "alan", metraj: "", unitPrice: "", totalPrice: "" },
  { id: 6, name: "Sıva ve Saten İşleri (m²)", metrajType: "alan", metraj: "", unitPrice: "", totalPrice: "" },
  { id: 7, name: "Seramik ve Zemin Kaplama (m²)", metrajType: "alan", metraj: "", unitPrice: "", totalPrice: "" },
  { id: 8, name: "Boyama ve Dekorasyon (m²)", metrajType: "alan", metraj: "", unitPrice: "", totalPrice: "" },
  { id: 9, name: "Elektrik Tesisatı (m²)", metrajType: "alan", metraj: "", unitPrice: "", totalPrice: "" },
  { id: 10, name: "Sıhhi Tesisat (m²)", metrajType: "alan", metraj: "", unitPrice: "", totalPrice: "" },
  { id: 11, name: "Isıtma ve Soğutma Sistemleri (m²)", metrajType: "alan", metraj: "", unitPrice: "", totalPrice: "" },
  { id: 12, name: "Asma Tavan ve Alçıpan İşleri (m²)", metrajType: "alan", metraj: "", unitPrice: "", totalPrice: "" },
  { id: 13, name: "Bahçe ve Çevre Düzenlemesi (m²)", metrajType: "alan", metraj: "", unitPrice: "", totalPrice: "" },
  { id: 14, name: "Genel Giderler ve Kar (%)", metrajType: "oran", metraj: "", unitPrice: "", totalPrice: "" },
];

export default function InsaatMaliyetModulu() {
  const [items, setItems] = useState(initialItems);
  const [totalAlan, setTotalAlan] = useState("");  // İnşaat alanı m²
  const [toplamHacim, setToplamHacim] = useState(""); // İnşaat hacmi m³ (örnek için)
  const [toplamMaliyet, setToplamMaliyet] = useState(null);

  // Birimi baz alan metraj girişleri için toplam alan veya hacim kullanılacak.
  // Genel gider ve kar kalemi yüzdelik olduğu için ona özel işlem var.

  const handleChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value, totalPrice: "" } : item
      )
    );
  };

  const hesapla = () => {
    const alan = parseFloat(totalAlan);
    const hacim = parseFloat(toplamHacim);

    if ((isNaN(alan) || alan <= 0) && (isNaN(hacim) || hacim <= 0)) {
      alert("Lütfen geçerli bir inşaat alanı (m²) veya hacmi (m³) girin.");
      return;
    }

    let araToplam = 0;
    let genelGiderOran = 0;

    items.forEach(({ metrajType, metraj, unitPrice }) => {
      const metrajNum = parseFloat(metraj);
      const unitPriceNum = parseFloat(unitPrice);
      if (
        (metrajType === "alan" && (!isNaN(alan) && alan > 0) && !isNaN(unitPriceNum) && unitPriceNum > 0) ||
        (metrajType === "hacim" && (!isNaN(hacim) && hacim > 0) && !isNaN(unitPriceNum) && unitPriceNum > 0) ||
        (metrajType === "oran" && !isNaN(metrajNum))
      ) {
        if (metrajType === "alan") {
          araToplam += alan * unitPriceNum;
        } else if (metrajType === "hacim") {
          araToplam += hacim * unitPriceNum;
        } else if (metrajType === "oran") {
          genelGiderOran = metrajNum / 100; // yüzde olarak alıyoruz
        }
      }
    });

    const genelGiderTutar = araToplam * genelGiderOran;
    const toplam = araToplam + genelGiderTutar;

    setToplamMaliyet(toplam);
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "30px auto",
        fontFamily: "'Poppins', sans-serif",
        padding: 20,
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        İnşaat Maliyet Modülü
      </h2>

      <label
        style={{ display: "block", marginBottom: 12, fontWeight: "600" }}
      >
        İnşaat Alanı (m²):
        <input
          type="number"
          min="0"
          value={totalAlan}
          onChange={(e) => setTotalAlan(e.target.value)}
          placeholder="Örn: 5000"
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

      <label
        style={{ display: "block", marginBottom: 12, fontWeight: "600" }}
      >
        İnşaat Hacmi (m³):
        <input
          type="number"
          min="0"
          value={toplamHacim}
          onChange={(e) => setToplamHacim(e.target.value)}
          placeholder="Örn: 15000"
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

      <hr style={{ margin: "20px 0" }} />

      {items.map(({ id, name, metrajType, metraj, unitPrice }) => (
        <div
          key={id}
          style={{
            marginBottom: 18,
            padding: 12,
            backgroundColor: "white",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <label
            style={{ fontWeight: "700", display: "block", marginBottom: 6 }}
          >
            {name}
          </label>

          {metrajType !== "oran" && (
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <label style={{ flex: 1, minWidth: 150 }}>
                Metraj ({metrajType === "alan" ? "m²" : "m³"}):
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={metraj}
                  onChange={(e) => handleChange(id, "metraj", e.target.value)}
                  placeholder={`Opsiyonel, hesap için kullanılmaz`}
                  disabled
                  style={{
                    width: "100%",
                    padding: 8,
                    marginTop: 4,
                    borderRadius: 6,
                    border: "1.5px solid #ccc",
                    fontSize: 14,
                    backgroundColor: "#f0f0f0",
                  }}
                />
              </label>

              <label style={{ flex: 1, minWidth: 150 }}>
                Birim Fiyat (TL/{metrajType === "alan" ? "m²" : "m³"}):
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={unitPrice}
                  onChange={(e) => handleChange(id, "unitPrice", e.target.value)}
                  placeholder={`Örn: 1500`}
                  style={{
                    width: "100%",
                    padding: 8,
                    marginTop: 4,
                    borderRadius: 6,
                    border: "1.5px solid #ccc",
                    fontSize: 14,
                  }}
                />
              </label>
            </div>
          )}

          {metrajType === "oran" && (
            <label style={{ flex: 1, minWidth: 150, marginTop: 8 }}>
              Yüzde (%):
              <input
                type="number"
                min="0"
                max="100"
                step="any"
                value={metraj}
                onChange={(e) => handleChange(id, "metraj", e.target.value)}
                placeholder="Örn: 10"
                style={{
                  width: "100%",
                  padding: 8,
                  marginTop: 4,
                  borderRadius: 6,
                  border: "1.5px solid #ccc",
                  fontSize: 14,
                }}
              />
            </label>
          )}
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
        <div
          style={{
            marginTop: 25,
            backgroundColor: "#e9f0ff",
            padding: 20,
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0,123,255,0.3)",
            fontWeight: "700",
            fontSize: 20,
            color: "#003366",
            textAlign: "center",
          }}
        >
          Toplam İnşaat Maliyeti: {toplamMaliyet.toFixed(2)} TL
        </div>
      )}
    </div>
  );
          }
