// WhatsApp público de Nuvacore. Formato internacional, sin espacios ni signos.
const WHATSAPP_NUMBER = "5219995929228";
const IS_PLACEHOLDER_NUMBER = WHATSAPP_NUMBER === "5210000000000";

const buildWhatsappUrl = (message) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

const openWhatsapp = (message, statusElement = null) => {
  if (IS_PLACEHOLDER_NUMBER) {
    const warning = "El número de WhatsApp no está configurado correctamente.";
    if (statusElement) statusElement.textContent = warning;
    else alert(warning);
    return;
  }
  window.open(buildWhatsappUrl(message), "_blank", "noopener,noreferrer");
};

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const message = link.dataset.message || "Hola, quiero información sobre Nuvacore.";
  if (!IS_PLACEHOLDER_NUMBER) {
    link.href = buildWhatsappUrl(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  link.addEventListener("click", (event) => {
    if (IS_PLACEHOLDER_NUMBER) {
      event.preventDefault();
      openWhatsapp(message);
    }
  });
});

const form = document.querySelector("#appointment-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const modality = String(data.get("modality") || "").trim();
    const goal = String(data.get("goal") || "").trim();
    const notes = String(data.get("message") || "").trim();
    const status = form.querySelector(".form-status");

    const message = [
      "Hola, me gustaría perder peso y recuperar mi salud. Quiero información para agendar una valoración con Nuvacore.",
      "",
      `Nombre: ${name}`,
      `Mi WhatsApp: ${phone}`,
      `Modalidad preferida: ${modality}`,
      `Objetivo principal: ${goal}`,
      notes ? `Comentarios: ${notes}` : "Comentarios: Sin comentarios adicionales.",
      "",
      "¿Me pueden compartir disponibilidad para una primera consulta?"
    ].join("\n");

    openWhatsapp(message, status);
  });
}

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-nav");
if (menuButton && menu) {
  const setMenuState = (open) => {
    menu.classList.toggle("open", open);
    menuButton.classList.toggle("active", open);
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  menuButton.addEventListener("click", () => {
    setMenuState(!menu.classList.contains("open"));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1020) setMenuState(false);
  });
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();


// Popup de salida con una sola aparición por sesión.
const popup = document.querySelector('#exit-popup');
const popupClosedKey = 'nuvacore-exit-popup-closed';
let popupShown = false;

const showPopup = () => {
  if (!popup || popupShown || sessionStorage.getItem(popupClosedKey) === '1') return;
  popupShown = true;
  popup.classList.add('is-open');
  popup.setAttribute('aria-hidden', 'false');
  document.body.classList.add('popup-open');
};

const closePopup = () => {
  if (!popup) return;
  popup.classList.remove('is-open');
  popup.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('popup-open');
  sessionStorage.setItem(popupClosedKey, '1');
};

if (popup) {
  popup.querySelectorAll('[data-close-popup]').forEach((el) => {
    el.addEventListener('click', closePopup);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && popup.classList.contains('is-open')) closePopup();
  });

  document.addEventListener('mouseout', (event) => {
    if (window.innerWidth <= 900 || popupShown) return;
    if (!event.relatedTarget && event.clientY <= 10) {
      showPopup();
    }
  });

  let mobilePopupTriggered = false;
  const mobileIntentTrigger = () => {
    if (window.innerWidth > 900 || mobilePopupTriggered || popupShown) return;
    const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    if (scrolled > 0.6) {
      mobilePopupTriggered = true;
      showPopup();
    }
  };
  window.addEventListener('scroll', mobileIntentTrigger, { passive: true });
  setTimeout(() => {
    if (window.innerWidth <= 900 && !popupShown) showPopup();
  }, 25000);

  const params = new URLSearchParams(window.location.search);
  if (params.get('popup') === '1') {
    setTimeout(showPopup, 350);
  }
}
