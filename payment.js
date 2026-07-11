/* ==========================================================================
   FIRE — Payment method modal (WhatsApp + Flutterwave card checkout)
   ==========================================================================

   SETUP REQUIRED BEFORE GOING LIVE:
   1. Sign up / log in at https://dashboard.flutterwave.com
   2. Go to Settings → API Keys and copy your PUBLIC key (starts with FLWPUBK_)
   3. Paste it below in place of "FLWPUBK_TEST-REPLACE-WITH-YOUR-PUBLIC-KEY"
      Never put your SECRET key in this file — it must never appear in
      code that runs in the browser.
   4. IMPORTANT: this client-only setup lets you COLLECT card payments, but
      it cannot by itself PROVE a payment is genuine — a determined user
      could fake the success callback in their browser. Before you grant
      real access to VIP content based on a card payment, verify the
      transaction server-side using your SECRET key against Flutterwave's
      "Verify Transaction" endpoint (a small serverless function is enough
      for this — happy to help you build that next).
   5. WhatsApp number below is taken from the footer of the site — update
      WHATSAPP_NUMBER if that ever changes.
*/

const FLW_PUBLIC_KEY = "FLWPUBK_TEST-REPLACE-WITH-YOUR-PUBLIC-KEY";
const WHATSAPP_NUMBER = "256783348481"; // no +, no spaces

const overlay = document.getElementById("payModalOverlay");
const modalPlan = document.getElementById("payModalPlan");
const modalAmount = document.getElementById("payModalAmount");
const closeBtn = document.getElementById("payModalClose");
const cardBtn = document.getElementById("payWithCard");
const waBtn = document.getElementById("payWithWhatsapp");

let activePlan = { plan: "", amount: 0, currency: "UGX", waMsg: "" };

function openPayModal(trigger) {
  activePlan = {
    plan: trigger.dataset.plan || "",
    amount: Number(trigger.dataset.amount || 0),
    currency: trigger.dataset.currency || "UGX",
    waMsg: trigger.dataset.waMsg || "",
  };

  modalPlan.textContent = activePlan.plan;
  modalAmount.textContent =
    activePlan.currency + " " + activePlan.amount.toLocaleString() +
    (activePlan.plan.toLowerCase().includes("weekly") ? " /week" : " /month");

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

closeBtn.addEventListener("click", closePayModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closePayModal();
});

// ---- Continue on WhatsApp (unchanged flow, just mentions card option) ----
waBtn.addEventListener("click", () => {
  const msg =
    activePlan.waMsg +
    " (I saw you also accept Visa/Mastercard on the site if that's easier.)";
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
  window.open(url, "_blank");
  closePayModal();
});

// ---- Pay with Visa/Mastercard via Flutterwave ----
cardBtn.addEventListener("click", () => {
  const email = prompt("Enter your email for the payment receipt:");
  if (!email) return;

  const txRef = "fire-" + activePlan.plan.replace(/\s+/g, "").toLowerCase() + "-" + Date.now();

  FlutterwaveCheckout({
    public_key: FLW_PUBLIC_KEY,
    tx_ref: txRef,
    amount: activePlan.amount,
    currency: activePlan.currency,
    payment_options: "card",
    customer: {
      email: email,
    },
    customizations: {
      title: "Fire Tips",
      description: activePlan.plan + " subscription",
      logo: "favicon.svg",
    },
    callback: function (data) {
      // NOTE: this fires in the browser on apparent success. Verify
      // data.transaction_id server-side with your secret key before
      // treating the subscription as active — see setup notes above.
      const confirmMsg =
        "Hi Fire! I just paid for " + activePlan.plan +
        " by card. Reference: " + txRef + ". Please activate my plan.";
      const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(confirmMsg);
      window.open(url, "_blank");
      closePayModal();
    },
    onclose: function () {
      // user closed the Flutterwave widget without paying
    },
  });
});
