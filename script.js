// WhatsApp público de Nuvacore. Formato internacional, sin espacios ni signos.
const WHATSAPP_NUMBER = "5219995929228";
const IS_PLACEHOLDER_NUMBER = WHATSAPP_NUMBER === "5210000000000";

const buildWhatsappUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

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
// LINKS DE WHATSAPP
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
});


// ======================================================
// FORMULARIO DE VALORACIÓN
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
// MENÚ MÓVIL
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
// ANIMACIONES AL HACER SCROLL
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
    threshold: 0.10
  }
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => {
    revealObserver.observe(element);
  });


// Año automático

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}


// ======================================================
// CARRUSELES HORIZONTALES EN MÓVIL
// ======================================================

const initMobileSliders = () => {

  document
    .querySelectorAll(".mobile-swipe")
    .forEach((slider) => {

      // Evitar inicializar dos veces

      if (slider.dataset.sliderReady === "1") {
        return;
      }

      const cards = Array
        .from(slider.children)
        .filter((child) => child.nodeType === 1);

      if (cards.length < 2) {
        return;
      }


      // Contenedor de indicadores

      const ui = document.createElement("div");

      ui.className = "mobile-slider-ui";
      ui.setAttribute("aria-hidden", "true");


      // Puntitos

      const dots = document.createElement("div");

      dots.className = "mobile-slider-dots";


      cards.forEach((_, index) => {

        const dot = document.createElement("span");

        dot.className =
          `mobile-slider-dot${
            index === 0
              ? " is-active"
              : ""
          }`;

        dots.appendChild(dot);

      });


      // Texto "Desliza"

      const hint = document.createElement("span");

      hint.className = "mobile-slider-hint";

      hint.textContent =
        slider.dataset.sliderLabel ||
        "Desliza horizontalmente";


      ui.append(dots, hint);

      slider.insertAdjacentElement(
        "afterend",
        ui
      );


      // Actualizar indicador activo

      const update = () => {

        const firstCard =
          cards[0].getBoundingClientRect();

        const gap = 14;

        const cardWidth =
          firstCard.width + gap;

        const active =
          Math.max(
            0,
            Math.min(
              cards.length - 1,
              Math.round(
                slider.scrollLeft / cardWidth
              )
            )
          );


        dots
          .querySelectorAll(".mobile-slider-dot")
          .forEach((dot, index) => {

            dot.classList.toggle(
              "is-active",
              index === active
            );

          });

      };


      slider.addEventListener(
        "scroll",
        () => {
          window.requestAnimationFrame(update);
        },
        {
          passive: true
        }
      );


      slider.dataset.sliderReady = "1";

    });

};

initMobileSliders();


// ======================================================
// PREGUNTAS FRECUENTES
// Todas empiezan cerradas.
// Solo una puede estar abierta.
// ======================================================

const faqItems = Array.from(
  document.querySelectorAll("#faq details")
);

faqItems.forEach((item) => {

  // Siempre cerrada al cargar

  item.open = false;


  item.addEventListener("toggle", () => {

    if (!item.open) {
      return;
    }


    // Cerrar las demás

    faqItems.forEach((other) => {

      if (other !== item) {
        other.open = false;
      }

    });

  });

});


// ======================================================
// POPUP DE SALIDA
// ======================================================

const popup =
  document.querySelector("#exit-popup");

const popupClosedKey =
  "nuvacore-exit-popup-closed";

let popupShown = false;


// ?popup=1 permite probarlo manualmente

const params =
  new URLSearchParams(
    window.location.search
  );

const forcePopup =
  params.get("popup") === "1";


// Mostrar popup

const showPopup = (force = false) => {

  if (!popup || popupShown) {
    return;
  }


  // Si ya lo cerró durante esta sesión,
  // no lo volvemos a molestar.

  if (
    !force &&
    sessionStorage.getItem(
      popupClosedKey
    ) === "1"
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


// Cerrar popup

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


  // Recordar únicamente durante la sesión

  sessionStorage.setItem(
    popupClosedKey,
    "1"
  );

};


if (popup) {

  // Botón X, overlay y "No gracias"

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


  // ESC

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


  // ==========================================
  // DESKTOP:
  // detectar intención de salir por arriba
  // ==========================================

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
        event.clientY <= 10
      ) {
        showPopup();
      }

    }
  );


  // ==========================================
  // MÓVIL:
  // mostrar al avanzar ~48% de la página
  // ==========================================

  let mobilePopupTriggered = false;


  window.addEventListener(
    "scroll",
    () => {

      if (
        window.innerWidth > 900 ||
        mobilePopupTriggered ||
        popupShown
      ) {
        return;
      }


      const pageHeight =
        document.documentElement
          .scrollHeight;


      const progress =
        (
          window.scrollY +
          window.innerHeight
        ) / pageHeight;


      if (progress > 0.48) {

        mobilePopupTriggered = true;

        showPopup();

      }

    },
    {
      passive: true
    }
  );


  // ==========================================
  // RESPALDO:
  // aparece después de 12 segundos
  // ==========================================

  setTimeout(() => {

    showPopup();

  }, 12000);


  // ==========================================
  // PRUEBA MANUAL
  //
  // nuvacore.mx/?popup=1
  // ==========================================

  if (forcePopup) {

    setTimeout(() => {

      showPopup(true);

    }, 350);

  }

}
