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

    if (statusElement) {
      statusElement.textContent = warning;
    } else {
      alert(warning);
    }

    return;
  }

  window.open(
    buildWhatsappUrl(message),
    "_blank",
    "noopener,noreferrer"
  );
};


// ======================================================
// LINKS WHATSAPP
// ======================================================

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const message =
    link.dataset.message ||
    "Hola, quiero información sobre Nuvacore.";

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


// ======================================================
// FORMULARIO
// ======================================================

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
      notes
        ? `Comentarios: ${notes}`
        : "Comentarios: Sin comentarios adicionales.",
      "",
      "¿Me pueden compartir disponibilidad para una primera consulta?"
    ].join("\n");

    openWhatsapp(message, status);
  });
}


// ======================================================
// MENÚ
// ======================================================

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-nav");

if (menuButton && menu) {

  const setMenuState = (open) => {
    menu.classList.toggle("open", open);
    menuButton.classList.toggle("active", open);
    document.body.classList.toggle("menu-open", open);

    menuButton.setAttribute(
      "aria-expanded",
      String(open)
    );

    menuButton.setAttribute(
      "aria-label",
      open ? "Cerrar menú" : "Abrir menú"
    );
  };


  menuButton.addEventListener("click", () => {
    setMenuState(
      !menu.classList.contains("open")
    );
  });


  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });


  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });


  window.addEventListener("resize", () => {
    if (window.innerWidth > 1020) {
      setMenuState(false);
    }
  });
}


// ======================================================
// ANIMACIONES
// ======================================================

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.12
  }
);


document
  .querySelectorAll(".reveal")
  .forEach((element) => {
    revealObserver.observe(element);
  });


const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}


// ======================================================
// POPUP
// ======================================================

const popup = document.querySelector("#exit-popup");

const popupClosedKey =
  "nuvacore-exit-popup-closed";

let popupShown = false;


const showPopup = (force = false) => {

  if (!popup) {
    return;
  }


  if (
    !force &&
    (
      popupShown ||
      sessionStorage.getItem(
        popupClosedKey
      ) === "1"
    )
  ) {
    return;
  }


  popupShown = true;

  popup.classList.add("is-open");

  popup.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "popup-open"
  );
};


const closePopup = () => {

  if (!popup) {
    return;
  }


  popup.classList.remove(
    "is-open"
  );

  popup.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "popup-open"
  );

  sessionStorage.setItem(
    popupClosedKey,
    "1"
  );
};


if (popup) {

  popup
    .querySelectorAll(
      "[data-close-popup]"
    )
    .forEach((element) => {

      element.addEventListener(
        "click",
        closePopup
      );

    });


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        popup.classList.contains(
          "is-open"
        )
      ) {
        closePopup();
      }

    }
  );


  // Desktop: detectar intención de salida

  document.addEventListener(
    "mouseout",
    (event) => {

      if (
        window.innerWidth <= 900 ||
        popupShown
      ) {
        return;
      }


      if (
        !event.relatedTarget &&
        event.clientY <= 8
      ) {
        showPopup();
      }

    }
  );


  // Móvil: mostrar aproximadamente a mitad de página

  let mobilePopupTriggered = false;


  const mobileIntentTrigger = () => {

    if (
      window.innerWidth > 900 ||
      mobilePopupTriggered ||
      popupShown
    ) {
      return;
    }


    const pageHeight =
      Math.max(
        document.documentElement.scrollHeight,
        1
      );


    const progress =
      (
        window.scrollY +
        window.innerHeight
      ) / pageHeight;


    if (progress >= 0.48) {

      mobilePopupTriggered = true;

      showPopup();

    }

  };


  window.addEventListener(
    "scroll",
    mobileIntentTrigger,
    {
      passive: true
    }
  );


  // Respaldo después de 12 segundos

  setTimeout(() => {

    showPopup();

  }, 12000);


  // Prueba manual:
  // nuvacore.mx/?popup=1

  const params =
    new URLSearchParams(
      window.location.search
    );


  if (
    params.get("popup") === "1"
  ) {

    setTimeout(() => {

      showPopup(true);

    }, 250);

  }

}


// ======================================================
// CARRUSELES MÓVILES
// SOLO:
// - 5 PILARES
// - CÓMO PODEMOS AYUDARTE
// - TESTIMONIOS
// ======================================================

const mobileSliderTargets = [

  {
    selector: ".pillars-5",
    label:
      "Desliza para ver los cinco pilares"
  },

  {
    selector:
      "#ayuda .benefit-list",
    label:
      "Desliza para ver más"
  },

  {
    selector:
      "#testimonios .testimonial-grid",
    label:
      "Desliza para leer más testimonios"
  }

];


const initMobileSlider = (
  slider,
  label
) => {

  if (
    !slider ||
    slider.dataset.mobileSliderReady === "1"
  ) {
    return;
  }


  const cards =
    Array
      .from(slider.children)
      .filter(
        (child) =>
          child.nodeType === 1
      );


  if (cards.length < 2) {
    return;
  }


  // UI inferior

  const ui =
    document.createElement("div");

  ui.className =
    "mobile-slider-ui";

  ui.setAttribute(
    "aria-hidden",
    "true"
  );


  // Puntitos

  const dots =
    document.createElement("div");

  dots.className =
    "mobile-slider-dots";


  cards.forEach(
    (_, index) => {

      const dot =
        document.createElement("span");


      dot.className =
        "mobile-slider-dot" +
        (
          index === 0
            ? " is-active"
            : ""
        );


      dots.appendChild(dot);

    }
  );


  // Texto desliza

  const hint =
    document.createElement("span");

  hint.className =
    "mobile-slider-hint";

  hint.textContent =
    label;


  ui.append(
    dots,
    hint
  );


  slider.insertAdjacentElement(
    "afterend",
    ui
  );


  // Actualizar punto activo

  const updateDots = () => {

    const first =
      cards[0];


    const firstRect =
      first.getBoundingClientRect();


    const styles =
      getComputedStyle(slider);


    const gap =
      parseFloat(
        styles.columnGap ||
        styles.gap ||
        "14"
      ) || 14;


    const step =
      firstRect.width + gap;


    const active =
      Math.max(
        0,
        Math.min(
          cards.length - 1,
          Math.round(
            slider.scrollLeft / step
          )
        )
      );


    dots
      .querySelectorAll(
        ".mobile-slider-dot"
      )
      .forEach(
        (dot, index) => {

          dot.classList.toggle(
            "is-active",
            index === active
          );

        }
      );

  };


  slider.addEventListener(
    "scroll",
    () => {

      requestAnimationFrame(
        updateDots
      );

    },
    {
      passive: true
    }
  );


  slider.dataset.mobileSliderReady =
    "1";
};


// Inicializar los tres

mobileSliderTargets.forEach(
  ({
    selector,
    label
  }) => {

    initMobileSlider(
      document.querySelector(
        selector
      ),
      label
    );

  }
);


// ======================================================
// FAQ
// TODAS CERRADAS AL CARGAR
// SOLO UNA ABIERTA A LA VEZ
// ======================================================

const faqItems =
  Array.from(
    document.querySelectorAll(
      "#faq details"
    )
  );


faqItems.forEach((item) => {

  item.open = false;


  item.addEventListener(
    "toggle",
    () => {

      if (!item.open) {
        return;
      }


      faqItems.forEach(
        (other) => {

          if (other !== item) {
            other.open = false;
          }

        }
      );

    }
  );

});
