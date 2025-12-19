(function () {
  /**
   * ============================================================
   * PLANTILLA: main.js (IIFE)
   * ------------------------------------------------------------
   * Objetivo:
   * - Mantener la estructura (IIFE + mismas funciones).
   * - Documentar responsabilidades y puntos de extensión.
   * - Usar mensajes genéricos y corregir caracteres.
   *
   * Dependencias (HTML):
   * - Formulario:      <form id="lead-form">
   * - Feedback global: <p id="form-feedback" class="form-feedback" role="status">
   * - Año dinámico:    <span id="year"></span>
   * - Errores por campo: <small data-error-for="name"></small> (y para email/phone)
   *
   * Notas:
   * - Este archivo NO envía datos a un servidor por defecto.
   * - Incluye validación básica y una "simulación" de envío.
   * - Si se integra backend, reemplazar el bloque de simulación.
   * ============================================================
   */

  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  const form = document.getElementById("lead-form");
  const feedback = document.getElementById("form-feedback");
  const yearEl = document.getElementById("year");

  function setupSmoothScroll() {
    smoothScrollLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  const validators = {
    name: (value) => (value.trim() ? "" : "Ingresa tu nombre."),
    email: (value) =>
      /^\S+@\S+\.\S+$/.test(value.trim()) ? "" : "Ingresa un email válido.",
    phone: (value) => (value.trim() ? "" : "Ingresa tu teléfono."),
  };

  function showFieldError(fieldName, message) {
    const errorEl = document.querySelector(`[data-error-for="${fieldName}"]`);
    const field = document.getElementById(fieldName);

    if (errorEl) errorEl.textContent = message || "";
    if (field) field.classList.toggle("input-error", Boolean(message));
  }

  function clearErrors() {
    Object.keys(validators).forEach((key) => showFieldError(key, ""));
  }

  function showFeedback(message, type = "success") {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form) return;

    clearErrors();
    showFeedback("");

    const formData = new FormData(form);
    let hasError = false;

    Object.entries(validators).forEach(([field, validate]) => {
      const value = formData.get(field) || "";
      const error = validate(String(value));

      if (error) {
        hasError = true;
        showFieldError(field, error);
      }
    });

    if (hasError) {
      showFeedback("Revisa los campos marcados.", "error");
      return;
    }

    showFeedback("Hemos recibido tu solicitud. Te contactaremos pronto.", "success");
    form.reset();
  }

  function setupFormValidation() {
    if (!form) return;
    form.addEventListener("submit", handleSubmit);
  }

  function setCurrentYear() {
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  setupSmoothScroll();
  setupFormValidation();
  setCurrentYear();
})();
