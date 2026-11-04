// Inicializa las interacciones compartidas del sitio informativo.
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.querySelectorAll(".sidenav");

  if (window.M && mobileMenu.length) {
    window.M.Sidenav.init(mobileMenu, { edge: "left" });
  }

  const collapsibles = document.querySelectorAll(".collapsible");
  if (window.M && collapsibles.length) {
    window.M.Collapsible.init(collapsibles, { accordion: true });
  }

  const currentYear = document.getElementById("current-year");
  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  const searchForm = document.getElementById("site-search-form");
  if (searchForm) {
    const searchInput = document.getElementById("site-search");
    const searchResults = document.getElementById("site-search-results");
    const compactSearch = window.matchMedia("(max-width: 600px)");
    const updateSearchPlaceholder = () => {
      searchInput.placeholder = compactSearch.matches ? "Buscar..." : "Buscar en el sitio";
    };
    updateSearchPlaceholder();
    compactSearch.addEventListener("change", updateSearchPlaceholder);
    const searchIndex = [
      {
        title: "Inicio · La propuesta",
        description: "Qué es Trueque de Conocimiento y cómo busca conectar estudiantes.",
        keywords: "proyecto propuesta trueque conocimiento estudiantes idea",
        href: "index.html#inicio-propuesta",
      },
      {
        title: "Inicio · Tutorías entre pares",
        description: "Compartir saberes y recibir apoyo académico entre estudiantes.",
        keywords: "tutoría tutorias pares apoyo clases aprender",
        href: "index.html#inicio-tutorias",
      },
      {
        title: "Inicio · Recursos de estudio",
        description:
          "Materiales académicos y recursos de aprendizaje contemplados por la propuesta.",
        keywords: "material materiales recursos estudio apuntes",
        href: "index.html#inicio-recursos",
      },
      {
        title: "Nosotros · Misión y visión",
        description:
          "Propósito del proyecto y visión de una comunidad que aprende colaborativamente.",
        keywords: "nosotros mision misión vision visión propósito comunidad",
        href: "nosotros.html#nosotros-proposito",
      },
      {
        title: "Nosotros · Equipo y funciones sugeridas",
        description: "Integrantes, foto grupal y funciones propuestas para presentar el trabajo.",
        keywords: "equipo integrantes nombres foto roles funciones aura valentina miguel",
        href: "nosotros.html#nosotros-equipo",
      },
      {
        title: "Objetivos · Objetivo general",
        description: "Promover el intercambio organizado de conocimientos entre estudiantes.",
        keywords: "objetivo general intercambio organizado conocimientos",
        href: "objetivos.html#objetivos-content",
      },
      {
        title: "Objetivos · Apoyo académico",
        description: "Facilitar tutorías entre pares, resolver dudas y compartir conocimientos.",
        keywords: "objetivos especificos apoyo académico tutorias dudas",
        href: "objetivos.html#objetivos-content",
      },
      {
        title: "Objetivos · Recursos de estudio",
        description: "Promover materiales académicos organizados por asignatura.",
        keywords: "objetivo recursos catalogo materiales asignaturas estudio",
        href: "objetivos.html#objetivos-content",
      },
      {
        title: "Objetivos · Aprendizaje colaborativo",
        description: "Fortalecer una comunidad estudiantil que aprende en conjunto.",
        keywords: "objetivos aprendizaje colaborativo comunidad",
        href: "objetivos.html#objetivos-content",
      },
      {
        title: "Avances · Estado actual",
        description: "Etapa vigente del sitio informativo y su desarrollo local.",
        keywords: "avance avances estado actual desarrollo etapa sitio web local",
        href: "avances.html#advance-timeline",
      },
      {
        title: "Avances · Interacciones",
        description: "Revisar las etapas con controles para mostrar detalles y cambiar colores.",
        keywords: "avances interaccion interacciones javascript mostrar ocultar cambiar color",
        href: "avances.html#advance-timeline",
      },
      {
        title: "Contacto · Formulario",
        description: "Validar nombre, correo y mensaje en el sitio local.",
        keywords: "contacto formulario nombre correo email mensaje escribir",
        href: "contacto.html#contact-form",
      },
    ];
    const normalize = (value) =>
      value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const renderSearchResults = () => {
      const query = normalize(searchInput.value.trim());
      searchResults.replaceChildren();

      if (!query) {
        searchResults.hidden = true;
        return;
      }

      searchResults.hidden = false;
      if (query.length < 2) {
        const hint = document.createElement("p");
        hint.className = "search-empty";
        hint.textContent = "Escribe al menos dos letras para buscar.";
        searchResults.append(hint);
        return;
      }

      const terms = query.split(/\s+/);
      const matches = searchIndex.filter((item) => {
        const content = normalize(`${item.title} ${item.description} ${item.keywords}`);
        return terms.every((term) => content.includes(term));
      });

      if (!matches.length) {
        const empty = document.createElement("p");
        empty.className = "search-empty";
        empty.textContent =
          "No encontramos coincidencias. Prueba con «tutorías», «objetivos», «avances» o «contacto».";
        searchResults.append(empty);
        return;
      }

      matches.slice(0, 6).forEach((item) => {
        const link = document.createElement("a");
        link.className = "search-result";
        link.href = item.href;
        const title = document.createElement("strong");
        title.textContent = item.title;
        const description = document.createElement("span");
        description.textContent = item.description;
        link.append(title, description);
        searchResults.append(link);
      });
    };

    let searchDebounce;
    searchInput.addEventListener("input", () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(renderSearchResults, 140);
    });

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      renderSearchResults();
      if (!searchInput.value.trim()) {
        const prompt = document.createElement("p");
        prompt.className = "search-empty";
        prompt.textContent = "Escribe una palabra para buscar en las secciones del sitio.";
        searchResults.replaceChildren(prompt);
        searchResults.hidden = false;
        searchInput.focus();
      }
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        clearTimeout(searchDebounce);
        searchResults.hidden = true;
      }
    });
    document.addEventListener("click", (event) => {
      if (!searchForm.contains(event.target)) searchResults.hidden = true;
    });
  }

  const detailsToggle = document.getElementById("toggle-advance-details");
  const timeline = document.getElementById("advance-timeline");
  if (detailsToggle && timeline) {
    detailsToggle.addEventListener("click", () => {
      const shouldShow = detailsToggle.getAttribute("aria-expanded") !== "true";
      timeline.querySelectorAll(".advance-detail").forEach((detail) => {
        detail.hidden = !shouldShow;
      });
      detailsToggle.setAttribute("aria-expanded", String(shouldShow));
      detailsToggle.textContent = shouldShow ? "Ocultar detalles" : "Mostrar detalles";
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const fields = [
      { input: document.getElementById("nombre"), error: document.getElementById("nombre-error") },
      { input: document.getElementById("correo"), error: document.getElementById("correo-error") },
      {
        input: document.getElementById("mensaje"),
        error: document.getElementById("mensaje-error"),
      },
    ];
    const status = document.getElementById("form-status");

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let firstInvalidField = null;

      fields.forEach(({ input, error }) => {
        const value = input.value.trim();
        let message = "";

        if (!value) {
          message = "Este campo es obligatorio.";
        } else if (input.name === "correo" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          message = "Escribe un correo válido, por ejemplo nombre@dominio.com.";
        } else if (input.minLength > 0 && value.length < input.minLength) {
          message = `Escribe al menos ${input.minLength} caracteres.`;
        } else if (input.maxLength > 0 && value.length > input.maxLength) {
          message = `El máximo permitido es ${input.maxLength} caracteres.`;
        }

        error.textContent = message;
        input.setAttribute("aria-invalid", String(Boolean(message)));
        if (message && !firstInvalidField) firstInvalidField = input;
      });

      if (firstInvalidField) {
        status.textContent = "Revisa los campos señalados antes de continuar.";
        firstInvalidField.focus();
        return;
      }

      status.textContent = "Validación completada. Este sitio local todavía no envía correos.";
    });

    fields.forEach(({ input, error }) => {
      input.addEventListener("input", () => {
        error.textContent = "";
        input.removeAttribute("aria-invalid");
        status.textContent = "";
      });
    });
  }
});
