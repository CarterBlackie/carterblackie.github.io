document.getElementById("year").textContent = new Date().getFullYear();

/* Sakura petals generator */
const petalsRoot = document.getElementById("petals");
const PETAL_COUNT = 28;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function makePetal() {
  const p = document.createElement("span");
  p.className = "petal";

  const x = rand(0, 100).toFixed(2) + "vw";
  const drift = rand(-20, 20).toFixed(2) + "vw";
  const d = rand(9, 17).toFixed(2) + "s";
  const delay = rand(0, 10).toFixed(2) + "s";
  const r = rand(0, 360).toFixed(2) + "deg";
  const s = rand(0.75, 1.25).toFixed(2);

  p.style.setProperty("--x", x);
  p.style.setProperty("--drift", drift);
  p.style.setProperty("--d", d);
  p.style.setProperty("--delay", delay);
  p.style.setProperty("--r", r);
  p.style.setProperty("--s", s);

  const w = rand(12, 20);
  const h = rand(9, 16);
  p.style.width = w + "px";
  p.style.height = h + "px";
  p.style.opacity = rand(0.55, 0.95).toFixed(2);

  return p;
}

function seedPetals() {
  if (!petalsRoot) return;
  petalsRoot.innerHTML = "";
  for (let i = 0; i < PETAL_COUNT; i++) {
    petalsRoot.appendChild(makePetal());
  }
}

seedPetals();

let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(seedPetals, 200);
});

/* Scroll reveal */
const revealTargets = [
  ...document.querySelectorAll(".section"),
  ...document.querySelectorAll(".hero"),
  ...document.querySelectorAll(".card")
];

revealTargets.forEach(el => el.classList.add("reveal"));

const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) entry.target.classList.add("in");
  }
}, { threshold: 0.12 });

revealTargets.forEach(el => io.observe(el));

/* Active nav highlight */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActive() {
  let currentId = "";
  sections.forEach(sec => {
    const r = sec.getBoundingClientRect();
    if (r.top <= 120 && r.bottom >= 120) currentId = sec.id;
  });

  navLinks.forEach(a => {
    const isActive = a.getAttribute("href") === `#${currentId}`;
    a.classList.toggle("active", isActive);
  });
}

window.addEventListener("scroll", setActive);
setActive();

/* Back to top */
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (!toTop) return;
  toTop.classList.toggle("show", window.scrollY > 600);
});

if (toTop) {
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
