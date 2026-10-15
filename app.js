// Base de datos simulada con todos los campos acordes al whitepaper
const dbMiel = {
  "LOTE-2026-01": {
    lote: "LOTE-2026-01",
    estado: "Auténtico (Verificado)",
    fechaCosecha: "10 de Feb, 2026",
    variedad: "Multifloral de Pradera",
    calidad: "Miel Premium de Abeja",
    apicultor: "Establecimiento Azahares",
    ubicacion: "Los Toldos, Junin - Buenos Aires",
    renapa: "RN-30291-BA",
    humedad: "17.2 %",
    hmf: "8.5 mg/kg",
    antibioticos: "Negativo(Certificado)",
    tamboresAsociados: "TB-001, TB-002, TB-003",
    hashBlockchain: "0x48f93ac912b74d81f9a201c843e91823bc9",
  },
  "LOTE-2026-02": {
    lote: "LOTE-2026-02",
    estado: "Auténtico (Verificado)",
    fechaCosecha: "18 de Feb, 2026",
    variedad: "Monofloral de Eucalipto",
    calidad: "Miel Premium de Abeja",
    apicultor: "Apiarios del Sur S.A.",
    ubicacion: "Necochea, Buenos Aires",
    renapa: "RN-41920-BA",
    humedad: "16.8 %",
    hmf: "6.2 mg/kg",
    antibioticos: "Negativo (Certificado)",
    tamboresAsociados: "TB-010, TB-011",
    hashBlockchain: "0x91823bc991af48f93ac912b74d81f9a201c8",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const loteId = urlParams.get("lote") || "LOTE-2026-01"; // Por defecto carga el 01 si entras directo

  const loadingEl = document.getElementById("loading");
  const contentEl = document.getElementById("content-container");
  const errorEl = document.getElementById("error-container");

  setTimeout(() => {
    loadingEl.classList.add("hidden");
    const data = dbMiel[loteId];

    if (data) {
      // Rellenar elementos visuales existentes
      document.getElementById("lbl-lote").textContent = data.lote;
      document.getElementById("lbl-estado").textContent = data.estado;
      document.getElementById("lbl-fecha").textContent = data.fechaCosecha;
      document.getElementById("lbl-variedad").textContent = data.variedad;
      document.getElementById("lbl-apicultor").textContent = data.apicultor;
      document.getElementById("lbl-ubicacion").textContent = data.ubicacion;
      document.getElementById("lbl-renapa").textContent = data.renapa;
      document.getElementById("lbl-calidad").textContent = data.calidad;
      document.getElementById("lbl-humedad").textContent = data.humedad;
      document.getElementById("lbl-hmf").textContent = data.hmf;
      document.getElementById("lbl-antibioticos").textContent =
        data.antibioticos;
      document.getElementById("lbl-tambores").textContent =
        data.tamboresAsociados;
      document.getElementById("lbl-hash").textContent = data.hashBlockchain;

      // --- LÓGICA DE DETECCIÓN DE ESCANEOS PREVIOS (LocalStorage) ---
      const storageKey = `escraneado_${loteId}`;
      const yaFueLeido = localStorage.getItem(storageKey);
      const alertaContainer = document.getElementById(
        "alerta-escaneo-container",
      );

      const alertaBox = document.createElement("div");
      alertaBox.className = "p-4 rounded-2xl text-sm shadow-sm border";

      if (!yaFueLeido) {
        // Primer escaneo en este dispositivo
        localStorage.setItem(storageKey, "true");
        alertaBox.classList.add(
          "bg-emerald-50",
          "border-emerald-200",
          "text-emerald-900",
        );
        alertaBox.innerHTML = `
                    <p class="font-bold flex items-center gap-1">✨ ¡Primer escaneo en este dispositivo!</p>
                    <p class="mt-1 text-xs text-emerald-700">Este código QR es genuino. Ningún otro dispositivo había consultado este lote anteriormente mediante tu sesión.</p>
                `;
      } else {
        // Ya fue leído antes en este teléfono
        alertaBox.classList.add(
          "bg-amber-50",
          "border-amber-200",
          "text-amber-900",
        );
        alertaBox.innerHTML = `
                    <p class="font-bold flex items-center gap-1">⚠️ Aviso: Código ya escaneado previamente</p>
                    <p class="mt-1 text-xs text-amber-700">Este frasco ya fue verificado antes desde este teléfono. Si estás en la tienda y ves este aviso, comprueba que el precinto físico de seguridad esté intacto.</p>
                `;
      }

      alertaContainer.appendChild(alertaBox);
      contentEl.classList.remove("hidden");
    } else {
      errorEl.classList.remove("hidden");
    }
  }, 400);
});
