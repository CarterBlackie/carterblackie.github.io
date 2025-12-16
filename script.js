// Year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

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
  const delay = (-rand(0, 10)).toFixed(2) + "s";
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

  // prevents duplicates if Live Server hot reloads
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

/* Back to top (safe even if button doesn't exist on some pages) */
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
