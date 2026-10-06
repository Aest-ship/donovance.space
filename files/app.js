/* =========================================================
   app.js — behaviour. Project data lives in data.js.
   Sections: 1 helpers · 2 state · 3 grid · 4 clock ·
             5 views · 6 slideshow · 7 panel · 8 routing · 9 theme
   ========================================================= */

/* ---------- 1. HELPERS ---------- */
const $ = s => document.querySelector(s);
const root = document.documentElement;

function fillList(el, items) {
  el.textContent = "";
  items.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    el.appendChild(li);
  });
}

/* ---------- 2. STATE ---------- */
let currentView = "work";   // "work" | "about"
let clickPoint = null;      // where the panel's circle reveal starts
let panelIndex = 0;         // which project is open

/* ---------- 3. PROJECT GRID ---------- */
function buildGrid() {
  const list = $("#list");
  PROJECTS.forEach(p => {
    const btn = document.createElement("button");
    btn.className = "row";
    btn.dataset.id = p.id;
    btn.innerHTML = '<span class="n"></span><span class="t"></span><span class="k"></span>';
    btn.children[0].textContent = p.n;
    btn.children[1].textContent = p.t;
    btn.children[2].textContent = p.k.slice(0, 3).join(", ");
    btn.addEventListener("click", e => {
      clickPoint = [e.clientX, e.clientY];
      location.hash = "#/project/" + p.id;
    });
    list.appendChild(btn);
  });
  $("#foot").textContent = "© " + new Date().getFullYear() + " Donovance Otieno Alonge";
}

/* ---------- 4. CLOCK ---------- */
const clockEl = $("#clock");
let lastTime = "";
const pad = n => String(n).padStart(2, "0");

function tickClock() {
  const d = new Date();
  const s = pad(d.getHours()) + ":" + pad(d.getMinutes());

  if (!clockEl.children.length) {
    [...s].forEach(ch => {
      const span = document.createElement("span");
      span.className = ch === ":" ? "c" : "d";
      span.textContent = ch;
      clockEl.appendChild(span);
    });
  } else {
    [...s].forEach((ch, i) => {
      const span = clockEl.children[i];
      if (ch !== lastTime[i]) {
        span.textContent = ch;
        span.classList.remove("tick");
        void span.offsetWidth;          // restart the animation
        span.classList.add("tick");
      }
    });
  }
  lastTime = s;

  $("#date").textContent = d
    .toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })
    .toLowerCase();
}

/* ---------- 5. VIEWS (work / about) + WIPE ---------- */
function showView(v) {
  document.querySelectorAll(".view").forEach(el => el.classList.toggle("on", el.id === "v-" + v));
  document.querySelectorAll("nav.top button[data-go]").forEach(b => b.classList.toggle("on", b.dataset.go === v));
  scrollTo(0, 0);
  currentView = v;
}

function switchView(v) {
  const wipe = $("#wipe");
  $("#wl").textContent = v;
  wipe.className = "wipe in";
  setTimeout(() => {
    showView(v);
    wipe.className = "wipe out";
    setTimeout(() => (wipe.className = "wipe"), 600);
  }, 520);
}

/* ---------- 6. SLIDESHOW ---------- */
const SLIDE_MS = 3500;
let slides = [];
let slideIdx = 0;
let slideTimer = null;

function showSlide(n) {
  if (!slides.length) return;
  slideIdx = (n + slides.length) % slides.length;
  const s = slides[slideIdx];
  $("#simg").src = s.src;
  $("#simg").alt = s.cap;
  $("#scap").textContent = (slideIdx + 1) + " / " + slides.length + " · " + s.cap;
}
function stopSlides()  { clearInterval(slideTimer); }
function startSlides() {
  stopSlides();
  if (slides.length > 1) slideTimer = setInterval(() => showSlide(slideIdx + 1), SLIDE_MS);
}
function setSlides(list) {
  stopSlides();
  slides = list || [];
  const box = $("#show");
  if (slides.length) {
    box.classList.add("on");
    showSlide(0);
    startSlides();
  } else {
    box.classList.remove("on");
  }
}

$("#sprev").onclick = () => { showSlide(slideIdx - 1); startSlides(); };
$("#snext").onclick = () => { showSlide(slideIdx + 1); startSlides(); };

/* ---------- 7. PROJECT PANEL ---------- */
const panel = $("#panel");

function loadProject(i) {
  panelIndex = i;
  const p = PROJECTS[i];
  panel.classList.add("swap");

  $("#pn").textContent = p.n;
  $("#ps").textContent = p.s;
  $("#pt").textContent = p.t;
  fillList($("#pk"), p.k);
  fillList($("#ph"), p.h);

  const cover = $("#pimg");
  if (p.img) {
    cover.src = p.img;
    cover.alt = p.n + " cover";
    cover.classList.add("on");
  } else {
    cover.removeAttribute("src");
    cover.classList.remove("on");
  }

  setSlides(p.imgs);

  const demo = $("#pdemo");
  if (p.demo) {
    demo.href = p.demo;
    demo.hidden = false;
  } else {
    demo.removeAttribute("href");
    demo.hidden = true;
  }

  void panel.offsetWidth;               // flush so the reveal replays
  panel.classList.remove("swap");
}

function openPanel(id) {
  const i = PROJECTS.findIndex(p => p.id === id);
  if (panel.classList.contains("open")) { loadProject(i); return; }

  const [x, y] = clickPoint || [innerWidth / 2, innerHeight / 2];
  panel.style.setProperty("--x", x + "px");
  panel.style.setProperty("--y", y + "px");
  loadProject(i);
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
  setTimeout(() => $("#close").focus(), 300);
}

function closePanel() {
  stopSlides();
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lock");
  clickPoint = null;
}

const goProject = i => { location.hash = "#/project/" + PROJECTS[(i + PROJECTS.length) % PROJECTS.length].id; };
$("#close").onclick = () => { location.hash = "#/work"; };
$("#next").onclick  = () => goProject(panelIndex + 1);
$("#prev").onclick  = () => goProject(panelIndex - 1);
addEventListener("keydown", e => {
  if (e.key === "Escape" && panel.classList.contains("open")) location.hash = "#/work";
});

/* ---------- 8. ROUTING (#/work, #/about, #/project/<id>) ---------- */
function route() {
  const [a, b] = (location.hash.replace(/^#\/?/, "") || "work").split("/");

  if (a === "project" && PROJECTS.some(p => p.id === b)) { openPanel(b); return; }

  closePanel();
  const v = a === "about" ? "about" : "work";
  if (v !== currentView) switchView(v);
}
addEventListener("hashchange", route);

document.querySelectorAll("[data-go]").forEach(btn =>
  btn.addEventListener("click", () => {
    const target = "#/" + btn.dataset.go;
    location.hash = target;
    if (location.hash === target && currentView === btn.dataset.go) scrollTo({ top: 0, behavior: "smooth" });
  })
);

/* ---------- 9. THEME ---------- */
const isLight = () =>
  root.dataset.theme ? root.dataset.theme === "light" : matchMedia("(prefers-color-scheme:light)").matches;
$("#inv").onclick = () => { root.dataset.theme = isLight() ? "dark" : "light"; };

/* ---------- START ---------- */
buildGrid();
tickClock();
setInterval(tickClock, 1000);
route();
