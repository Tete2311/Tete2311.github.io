/* =========================================================
   Portfolio — interacciones (sin dependencias)
   ========================================================= */

/* ---- Skills (editá esta lista a gusto) ---- */
const SKILLS = [
  { name: "HTML", icon: "🌐" },
  { name: "CSS", icon: "🎨" },
  { name: "JavaScript", icon: "⚡" },
  { name: "Python", icon: "🐍" },
  { name: "Git", icon: "🔧" },
  { name: "GitHub", icon: "🐙" },
];

const skillsGrid = document.getElementById("skills-grid");
if (skillsGrid) {
  skillsGrid.innerHTML = SKILLS.map(
    (s) => `<div class="skill"><span class="skill-ico">${s.icon}</span><span>${s.name}</span></div>`
  ).join("");
}

/* ---- Año en el footer ---- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- Tema claro/oscuro (recordado) ---- */
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) document.body.setAttribute("data-theme", savedTheme);
themeToggle?.addEventListener("click", () => {
  const next = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("portfolio-theme", next);
});

/* ---- Nav: sombra al scrollear + menú hamburguesa ---- */
const nav = document.getElementById("nav");
const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const burger = document.getElementById("nav-burger");
const navLinks = document.querySelector(".nav-links");
burger?.addEventListener("click", () => navLinks?.classList.toggle("open"));
navLinks?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

/* ---- Reveal on scroll ---- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}
