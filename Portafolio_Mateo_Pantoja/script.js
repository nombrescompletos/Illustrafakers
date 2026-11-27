// PANTOJA DESIGN — interacciones de la página
// Personaliza estos datos antes de publicar tu portafolio:
const CONFIG = {
  email: "tu-correo@ejemplo.com",
  roles: ["Diseño Multimedia", "Diseño UI / UX", "Desarrollo web"]
};

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Menú adaptable para celulares
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  menuToggle?.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(opened));
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  // Cambio entre tema oscuro y claro
  const themeToggle = document.getElementById("themeToggle");
  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const light = document.body.classList.contains("light");
    themeToggle.textContent = light ? "☾" : "☼";
    showToast(light ? "Tema claro activado" : "Tema oscuro activado");
  });

  // Texto animado del encabezado
  const roleElement = document.getElementById("typedRole");
  let roleIndex = 0, charIndex = 0, deleting = false;
  function typeRole() {
    if (!roleElement) return;
    const current = CONFIG.roles[roleIndex];
    roleElement.textContent = current.substring(0, charIndex);
    if (!deleting && charIndex < current.length) {
      charIndex++;
      setTimeout(typeRole, 85);
    } else if (deleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeRole, 42);
    } else {
      deleting = !deleting;
      if (!deleting) roleIndex = (roleIndex + 1) % CONFIG.roles.length;
      setTimeout(typeRole, deleting ? 1250 : 350);
    }
  }
  typeRole();

  // Animación de aparición al desplazarse
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Filtro de proyectos
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      projectCards.forEach(card => {
        const show = filter === "todos" || card.dataset.category === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  // Botón de contacto: abre el programa de correo del visitante
  const emailButton = document.getElementById("emailButton");
  if (emailButton) {
    emailButton.href = `mailto:${CONFIG.email}`;
    emailButton.addEventListener("click", event => {
      if (CONFIG.email.includes("ejemplo.com")) {
        event.preventDefault();
        showToast("Edita tu correo en script.js para activar este botón.");
      }
    });
  }

  // Resalta el enlace de navegación según la sección visible
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle(
          "active", link.getAttribute("href") === `#${entry.target.id}`
        ));
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => sectionObserver.observe(section));
});

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}
