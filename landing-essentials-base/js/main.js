(function () {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  const form = document.getElementById("lead-form");
  const feedback = document.getElementById("form-feedback");
  const yearEl = document.getElementById("year");

  // Smooth scroll for internal links
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Form validation
  const validators = {
    name: (value) => (value.trim() ? "" : "Nombre es requerido."),
    email: (value) =>
      /^\S+@\S+\.\S+$/.test(value.trim()) ? "" : "Email no es válido.",
    phone: (value) => (value.trim() ? "" : "Teléfono es requerido."),
  };

  function setFieldError(fieldName, message) {
    const errorEl = document.querySelector(`[data-error-for="${fieldName}"]`);
    if (errorEl) errorEl.textContent = message || "";
  }

  function clearErrors() {
    Object.keys(validators).forEach((key) => setFieldError(key, ""));
  }

  function showFeedback(message, type = "success") {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;
  }

  function handleSubmit(event) {
    if (!form) return;
    event.preventDefault();
    clearErrors();
    showFeedback("");

    const formData = new FormData(form);
    let hasError = false;

    Object.entries(validators).forEach(([field, validate]) => {
      const value = formData.get(field) || "";
      const error = validate(String(value));
      if (error) {
        hasError = true;
        setFieldError(field, error);
      }
    });

    if (hasError) {
      showFeedback("Revisa los campos marcados.", "error");
      return;
    }

    // Simulated submit for static template
    showFeedback("Solicitud recibida. Te contactaremos pronto.", "success");
    form.reset();
  }

  if (form) {
    form.addEventListener("submit", handleSubmit);
  }

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
