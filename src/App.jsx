import React, { useState, useEffect } from "react";

export default function App() {
  const [lang, setLang] = useState("pt");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const car = {
    title: "Škoda Octavia Combi RS 2.0 TDI DSG (2014)",
    priceEUR: 13000,
    negotiable: true,
    location: "São Martinho, Madeira",
    features: [
      "RS sport seats (red/black)",
      "Heated front seats",
      "Dual-zone climate control",
      "Cruise control",
      "Tow hitch",
      "Roof rack",
      "No warning lights",
      "Regularly serviced",
    ],
    images: [
      "https://i.imgur.com/ZTBx7nL.jpg",
      "https://i.imgur.com/Gl6ZyqX.jpg",
      "https://i.imgur.com/fNg829A.jpg",
      "https://i.imgur.com/rtyk011.jpg",
      "https://i.imgur.com/2QOfVK2.jpg",
      "https://i.imgur.com/FI2Ze1F.jpg",
      "https://i.imgur.com/sviE9l9.jpg",
    ],
    contact: {
      phone: "+351 935 035 611",
      email: "matusdnl@gmail.com",
    },
    description: {
      pt: `
**Em excelente estado geral!** Sempre bem cuidado, limpo e com manutenção feita regularmente.  
Perfeito tanto para o uso diário como para viagens longas.

Motor **2.0 TDI (1968 cm³, 184 cv / 135 kW)** com caixa automática **DSG**, oferecendo uma condução potente, suave e económica — tudo o que se espera de um verdadeiro **RS**.

Bancos desportivos RS em vermelho e preto, aquecimento dianteiro, ar condicionado bi-zona, cruise control, engate de reboque e bagageiro de tejadilho — tudo funcional e em ótimo estado.

✅ Sem avisos no painel. Inspeção válida e documentação em dia. Pronto a conduzir!
`,
      en: `
**In excellent overall condition!** Always well looked after, clean, and regularly serviced.  
Perfect for both everyday use and long road trips.

Powered by a **2.0 TDI (1968 cm³, 184 hp / 135 kW)** with **DSG automatic gearbox**, offering a smooth, strong and efficient drive — everything you’d expect from a true **RS**.

RS sport seats in red and black, heated front seats, dual-zone climate control, cruise control, tow hitch, and roof rack — all fully functional and in great condition.

✅ No warning lights. Inspection valid and paperwork in order. Ready to drive!
`,
    },
  };

  const euro = (n) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(n);

  useEffect(() => {
    const onKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight")
        setSelectedIndex((prev) => (prev + 1) % car.images.length);
      if (e.key === "ArrowLeft")
        setSelectedIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", selectedIndex !== null);
  }, [selectedIndex]);

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-900 relative">
      {/* RS Stripe */}
      <div
        className="fixed top-0 left-0 w-full h-[10px] flex justify-end items-center px-3 z-40"
        style={{
          background: "linear-gradient(90deg, #7a0000 0%, #d10000 50%, #7a0000 100%)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.25)",
        }}
      >
        <span className="text-white/90 text-[9px] italic font-semibold tracking-wide">
          RS Edition
        </span>
      </div>

      <main className="max-w-5xl mx-auto px-4 pt-10 pb-14">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg px-6 py-10">
          <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold">
                <span className="text-red-600">Škoda</span> Octavia Combi RS 2.0 TDI DSG (2014)
              </h1>
              <p className="text-gray-600 mt-1">{car.location}</p>
              <p className="text-2xl font-bold mt-1">
                <span className="text-red-600">{euro(car.priceEUR)}</span>{" "}
                {car.negotiable && (
                  <span className="text-gray-500 text-sm align-middle">(Negotiable)</span>
                )}
              </p>
            </div>

            <div className="flex gap-2 mt-4 sm:mt-0">
              <button
                onClick={() => setLang("pt")}
                className={`px-3 py-2 rounded-lg border text-sm ${
                  lang === "pt" ? "bg-gray-900 text-white" : "bg-white"
                }`}
              >
                PT
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-2 rounded-lg border text-sm ${
                  lang === "en" ? "bg-gray-900 text-white" : "bg-white"
                }`}
              >
                EN
              </button>
            </div>
          </header>

          <section className="text-lg text-gray-800 whitespace-pre-line">
            {car.description[lang]}
          </section>

          {/* Gallery */}
          {car.images.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold mb-4">
                {lang === "pt" ? "Galeria" : "Gallery"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {car.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Car photo ${i + 1}`}
                    onClick={() => setSelectedIndex(i)}
                    className="w-full h-64 object-cover rounded-xl cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  />
                ))}
              </div>
            </section>
          )}

          {/* Lightbox */}
          {selectedIndex !== null && (
            <div
              className="fixed inset-0 bg-black/80 flex flex-col justify-center items-center z-50 overflow-hidden"
              onClick={() => setSelectedIndex(null)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(
                    (selectedIndex - 1 + car.images.length) % car.images.length
                  );
                }}
                className="absolute left-4 text-black text-xl bg-white/70 hover:bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
              >
                ‹
              </button>

              <div
                className="relative max-w-5xl w-full px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-3 right-2 text-black text-sm bg-white/70 hover:bg-white/90 rounded-full w-7 h-7 flex items-center justify-center shadow-md"
                  onClick={() => setSelectedIndex(null)}
                >
                  ×
                </button>

                <img
                  src={car.images[selectedIndex]}
                  alt={`Full view ${selectedIndex + 1}`}
                  className="max-w-[95vw] h-auto max-h-[90vh] rounded-lg shadow-lg object-contain mx-auto"
                />

                <div className="mt-3 text-center text-white/80 text-sm">
                  {selectedIndex + 1} / {car.images.length}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((selectedIndex + 1) % car.images.length);
                }}
                className="absolute right-4 text-black text-xl bg-white/70 hover:bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
              >
                ›
              </button>
            </div>
          )}

          {/* Equipment */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-1">
              {lang === "pt" ? "Equipamento" : "Equipment"}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {car.features.map((f, i) => (
                <li key={i} className="bg-gray-100 rounded-xl px-4 py-2 border">
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-1">
              {lang === "pt" ? "Contactos" : "Contacts"}
            </h2>
            <p>
              <strong>Telefone:</strong>{" "}
              <a href="tel:+351935035611" className="underline">
                +351 935 035 611
              </a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:matusdnl@gmail.com" className="underline">
                matusdnl@gmail.com
              </a>
            </p>
          </section>

          <footer className="text-xs text-gray-500 mt-10 text-center">
            © {new Date().getFullYear()} Private sale — info provided in good faith.
          </footer>
        </div>
      </main>
    </div>
  );
}
