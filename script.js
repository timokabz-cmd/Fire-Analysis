/* ==========================================================================
   FIRE — Site Script
   ========================================================================== */

// ---- Config -----------------------------------------------------------
const WHATSAPP_NUMBER = "256783348481"; // international format, no + or spaces

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ---- Helpers ------------------------------------------------------------
function flameString(count) {
  const total = 5;
  let out = "";
  for (let i = 0; i < total; i++) {
    out += i < count ? "🔥" : '<span class="dim">🔥</span>';
  }
  return out;
}

function statusLabel(status) {
  if (status === "won") return "Won";
  if (status === "lost") return "Lost";
  if (status === "live") return "Live";
  return "Pending";
}

// ---- Ticket card builder --------------------------------------------------
function ticketCard(tip, opts = {}) {
  const { featured = false } = opts;
  const extra = featured ? " featured-ticket" : "";
  const probabilityMeter = typeof tip.probability === "number" ? `
    <div class="meter"><span style="width:${tip.probability}%"></span></div>
    <div class="meter-label"><span>Model confidence</span><span>${tip.probability}%</span></div>
  ` : "";

  return `
    <article class="ticket${extra}">
      <div class="ticket-top">
        <span class="league-tag">${tip.league}</span>
        <span>${tip.kickoff}</span>
      </div>
      <div class="ticket-match">${tip.home}<span class="vs">vs</span>${tip.away}</div>
      <div class="ticket-divider"><span class="notch left"></span><span class="notch right"></span></div>
      <div class="ticket-pick">
        <div class="pick-info">
          <span class="pick-label">Pick</span>
          <span class="pick-value">${tip.pick}</span>
        </div>
        <div class="odds-badge">${tip.odds}</div>
      </div>
      ${probabilityMeter}
      <div class="ticket-bottom">
        <span class="flames">${flameString(tip.flames)}</span>
        <span class="status ${tip.status}">${statusLabel(tip.status)}</span>
      </div>
    </article>
  `;
}

function renderGrid(containerId, tips) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = tips.map((t) => ticketCard(t)).join("");
}

function renderFeatured(containerId, tip) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = ticketCard(tip, { featured: true });
}

// ---- Ticker ---------------------------------------------------------------
function renderTicker() {
  const track = document.getElementById("tickerTrack");
  if (!track || typeof recentResults === "undefined") return;
  const items = recentResults.map((r) => `
    <span class="ticker-item">
      <span class="${r.result === "won" ? "tick-won" : "tick-lost"}">${r.result === "won" ? "✅" : "❌"}</span>
      <b>${r.label}</b> @ ${r.odds} — ${r.result === "won" ? '<span class="tick-won">WON</span>' : '<span class="tick-lost">LOST</span>'}
    </span>
  `).join("");
  // duplicate content so the CSS marquee loop is seamless
  track.innerHTML = items + items;
}

// ---- Countdown to next Banker (resets every Monday 00:00) -----------------
function startCountdown() {
  const el = document.getElementById("bankerCountdown");
  if (!el) return;

  function nextMonday() {
    const now = new Date();
    const result = new Date(now);
    const day = now.getDay(); // 0 = Sunday
    const daysUntilMonday = (8 - day) % 7 || 7;
    result.setDate(now.getDate() + daysUntilMonday);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  function tick() {
    const target = nextMonday();
    const diff = Math.max(0, target - new Date());
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    el.querySelector('[data-d]').textContent = String(d).padStart(2, "0");
    el.querySelector('[data-h]').textContent = String(h).padStart(2, "0");
    el.querySelector('[data-m]').textContent = String(m).padStart(2, "0");
    el.querySelector('[data-s]').textContent = String(s).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}

// ---- Banker form strip ------------------------------------------------
function renderForm() {
  const el = document.getElementById("bankerForm");
  if (!el || typeof bankerOfTheWeek === "undefined") return;
  el.innerHTML = bankerOfTheWeek.form
    .map((r) => `<span class="${r}">${r === "w" ? "W" : "L"}</span>`)
    .join("");
}

// ---- Nav mobile toggle ------------------------------------------------
function initNavToggle() {
  const btn = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!btn || !links) return;
  btn.addEventListener("click", () => {
    const isOpen = links.style.display === "flex";
    links.style.display = isOpen ? "none" : "flex";
    links.style.flexDirection = "column";
    links.style.position = "absolute";
    links.style.top = "76px";
    links.style.left = "0";
    links.style.right = "0";
    links.style.background = "var(--bg-alt)";
    links.style.padding = "20px 24px";
    links.style.borderBottom = "1px solid var(--line)";
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => { links.style.display = "none"; })
  );
}

// ---- FAQ accordion ------------------------------------------------------
function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    q.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
}

// ---- Wire up WhatsApp links with pre-filled messages -----------------
function initWhatsappLinks() {
  document.querySelectorAll("[data-wa-msg]").forEach((el) => {
    el.setAttribute("href", waLink(el.getAttribute("data-wa-msg")));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

// ---- Init -----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderFeatured("tipOfTheDayContainer", tipOfTheDay);
  renderFeatured("bankerContainer", bankerOfTheWeek);
  renderGrid("basketballGrid", basketballTips);
  renderGrid("oversGrid", oversTips);
  renderGrid("liveGrid", liveTips);
  renderForm();
  renderTicker();
  startCountdown();
  initNavToggle();
  initFaq();
  initWhatsappLinks();

  document.getElementById("year").textContent = new Date().getFullYear();
});
