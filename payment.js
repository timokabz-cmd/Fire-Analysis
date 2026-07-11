/* ==========================================================================
   FIRE — Payment method modal (WhatsApp + card checkout preview)
   ==========================================================================

   CURRENT STATE: no live payment gateway is connected yet. The "Pay with
   Visa/Mastercard" flow below is a DEMO PREVIEW ONLY — it shows a realistic
   card entry screen so you can illustrate the checkout experience (e.g. to
   partners or investors), but it never actually charges a card, and it does
   not transmit, log, or store anything the person types into the card
   fields. It always ends on an honest "this is a preview" screen rather
   than a fake success message, so nobody is misled into thinking they've
   paid if this ever goes live before a real gateway is connected.

   TO MAKE IT REAL LATER (e.g. with Flutterwave):
   1. Sign up at https://dashboard.flutterwave.com and grab your PUBLIC key
   2. Replace the card-entry screen's submit handler with a call to
      FlutterwaveCheckout({ public_key: ..., amount, currency, ... })
      (the <script src="https://checkout.flutterwave.com/v3.js"> tag is
      already included in index.html, ready for this)
   3. Verify the transaction server-side with your SECRET key before
      granting VIP access — a client-only "success" callback can be faked,
      so never trust it alone. Happy to help you build that step.

   WhatsApp number below is taken from the footer — update if it changes.
*/

const WHATSAPP_NUMBER = "256783348481"; // no +, no spaces

const overlay = document.getElementById("payModalOverlay");
const screenChoice = document.getElementById("payScreenChoice");
const screenCard = document.getElementById("payScreenCard");
const screenDone = document.getElementById("payScreenDone");

const modalPlan = document.getElementById("payModalPlan");
const modalAmount = document.getElementById("payModalAmount");
const cardScreenAmount = document.getElementById("cardScreenAmount");
const cardSubmitAmount = document.getElementById("cardSubmitAmount");

const closeBtn = document.getElementById("payModalClose");
const cardScreenClose = document.getElementById("cardScreenClose");
const cardScreenBack = document.getElementById("cardScreenBack");
const doneScreenClose = document.getElementById("doneScreenClose");
const doneScreenOk = document.getElementById("doneScreenOk");

const cardBtn = document.getElementById("payWithCard");
const waBtn = document.getElementById("payWithWhatsapp");
const cardForm = document.getElementById("cardForm");
const cardSubmitBtn = document.getElementById("cardSubmitBtn");
const cardSubmitLabel = document.getElementById("cardSubmitLabel");

const cardNumberInput = document.getElementById("cardNumber");
const cardExpiryInput = document.getElementById("cardExpiry");
const cardNameInput = document.getElementById("cardName");

const cardPreviewNumber = document.getElementById("cardPreviewNumber");
const cardPreviewName = document.getElementById("cardPreviewName");
const cardPreviewExpiry = document.getElementById("cardPreviewExpiry");
const cardBrandLogo = document.getElementById("cardBrandLogo");

let activePlan = { plan: "", amount: 0, currency: "UGX", period: "", waMsg: "" };

// ---- Footer copyright year ----
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- General WhatsApp buttons across the page (header, hero, footer, float) ----
// Excludes .js-pay-trigger buttons (they open the payment modal instead — see
// below) and the modal's own WhatsApp button (handled separately).
document.querySelectorAll("[data-wa-msg]").forEach((el) => {
  if (el.id === "payWithWhatsapp" || el.classList.contains("js-pay-trigger")) return;
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const msg = el.getAttribute("data-wa-msg") || "";
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
  });
});

// ---- Modal open/close + screen switching ----
function showScreen(screen) {
  [screenChoice, screenCard, screenDone].forEach((s) => (s.style.display = "none"));
  screen.style.display = "block";
}

function openPayModal(trigger) {
  activePlan = {
    plan: trigger.dataset.plan || "",
    amount: Number(trigger.dataset.amount || 0),
    currency: trigger.dataset.currency || "UGX",
    period: trigger.dataset.period || "",
    waMsg: trigger.dataset.waMsg || "",
  };

  const amountLabel = activePlan.currency + " " + activePlan.amount.toLocaleString() + " " + activePlan.period;
  modalPlan.textContent = activePlan.plan;
  modalAmount.textContent = amountLabel;
  cardScreenAmount.textContent = amountLabel;
  cardSubmitAmount.textContent = activePlan.currency + " " + activePlan.amount.toLocaleString();

  cardForm.reset();
  updateCardPreview();
  showScreen(screenChoice);
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closePayModal() {
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".js-pay-trigger").forEach((btn) => {
  btn.addEventListener("click", () => openPayModal(btn));
});

[closeBtn, cardScreenClose, doneScreenClose, doneScreenOk].forEach((btn) => {
  btn.addEventListener("click", closePayModal);
});
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closePayModal();
});

cardScreenBack.addEventListener("click", () => showScreen(screenChoice));

// ---- Continue on WhatsApp ----
waBtn.addEventListener("click", () => {
  const msg = activePlan.waMsg + " (I saw you also accept Visa/Mastercard on the site if that's easier.)";
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
  window.open(url, "_blank");
  closePayModal();
});

// ---- Open the card entry screen ----
cardBtn.addEventListener("click", () => {
  showScreen(screenCard);
});

// ---- Live card preview formatting ----
function updateCardPreview() {
  const raw = cardNumberInput.value.replace(/\D/g, "");
  const grouped = raw.replace(/(.{4})/g, "$1 ").trim();
  cardPreviewNumber.textContent = (grouped || "•••• •••• •••• ••••").padEnd(19, "•").slice(0, 19);

  cardPreviewName.textContent = cardNameInput.value.trim().toUpperCase() || "YOUR NAME";
  cardPreviewExpiry.textContent = cardExpiryInput.value || "MM/YY";

  cardBrandLogo.className = "card-brand-logo";
  if (/^4/.test(raw)) cardBrandLogo.classList.add("visa");
  else if (/^(5[1-5]|2[2-7])/.test(raw)) cardBrandLogo.classList.add("mastercard");
}

cardNumberInput.addEventListener("input", () => {
  let digits = cardNumberInput.value.replace(/\D/g, "").slice(0, 16);
  cardNumberInput.value = digits.replace(/(.{4})/g, "$1 ").trim();
  updateCardPreview();
});

cardExpiryInput.addEventListener("input", () => {
  let digits = cardExpiryInput.value.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) digits = digits.slice(0, 2) + "/" + digits.slice(2);
  cardExpiryInput.value = digits;
  updateCardPreview();
});

cardNameInput.addEventListener("input", updateCardPreview);

// ---- Submit: honest demo confirmation, nothing is sent or stored ----
cardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  cardSubmitBtn.disabled = true;
  cardSubmitLabel.textContent = "Processing…";

  setTimeout(() => {
    cardSubmitBtn.disabled = false;
    cardSubmitLabel.innerHTML = 'Pay <span id="cardSubmitAmount">' +
      activePlan.currency + " " + activePlan.amount.toLocaleString() + "</span>";
    cardForm.reset();
    showScreen(screenDone);
  }, 1400);
});
