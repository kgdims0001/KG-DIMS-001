/* --------- Configuration --------- */
const ADMIN_WHATSAPP = "2349153882605"; // main admin
const PAYMENT_METHODS = {
  kuda: { label: "Kuda Microfinance Bank", verificationWA: "2349153882605", color: "#8a2be2" },
  moniepoint: { label: "Moniepoint MFB", verificationWA: "2349153882605", color: "#1e90ff" },
  palmpay: { label: "Palmpay", verificationWA: "2349159529768", color: "#b84dff" }
};

/* --------- Helpers --------- */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
function openWA(number, message) {
  const text = encodeURIComponent(message || "");
  window.open(`https://wa.me/${number}?text=${text}`, "_blank");
}

/* --------- DOM Elements --------- */
const introPopup = $("#introPopup");
const typedArea = $("#typedArea");
const continueBtn = $("#continueBtn");
const contactBtn = $("#contactBtn");
const siteWrap = $("#siteWrap");

const buyCallBtn = $("#buyCallBtn");
const dmBtn = $("#dmBtn");
const shopNowBtn = $("#shopNowBtn");
const contactNowBtn = $("#contactNowBtn");

const checkoutModal = $("#checkoutModal");
const closeModal = $("#closeModal");
const productNameInput = $("#productName");
const amountInput = $("#amountInput");
const payerNameInput = $("#payerName");
const paymentMethodSelect = $("#paymentMethod");
const accountDetails = $("#accountDetails");
const transferBtn = $("#transferBtn");
const dmModalBtn = $("#dmModalBtn");

const countdownOverlay = $("#countdownOverlay");
const countNum = $("#countNum");
const countdownMessage = $("#countdownMessage");

/* --------- Intro Typed Animation --------- */
const introLines = [
  "Welcome to KG^DIMS¥ — the official gaming & services store.",
  "Premium digital packages and showcase accounts for serious players.",
  "Choose a product, choose a payment method, then contact admin to complete payment."
];

function runTyped(lines, el, charDelay = 22) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = lines.join(" ");
    return;
  }
  let index = 0, pos = 0, out = "";
  function step() {
    if (index >= lines.length) return;
    const line = lines[index];
    if (pos <= line.length) {
      out = line.slice(0, pos);
      el.textContent = out;
      pos++;
      setTimeout(step, charDelay);
    } else {
      setTimeout(() => { index++; pos = 0; step(); }, 700);
    }
  }
  step();
}

/* --------- Page Load --------- */
document.addEventListener("DOMContentLoaded", () => {
  runTyped(introLines, typedArea);
  siteWrap.setAttribute("aria-hidden", "true");
});

/* --------- Popup Buttons --------- */
continueBtn.addEventListener("click", () => {
  introPopup.style.display = "none";
  siteWrap.setAttribute("aria-hidden", "false");
  setTimeout(()=>{ $("#shopNowBtn").focus(); }, 200);
});
contactBtn.addEventListener("click", () => openWA(ADMIN_WHATSAPP, "Hello Admin, I want to contact KG^DIMS¥."));

/* --------- Header Buttons --------- */
buyCallBtn?.addEventListener("click", () => openCheckout("Proxy (Unlimited Edition)", 7000));
dmBtn?.addEventListener("click", () => openWA(ADMIN_WHATSAPP, "Hello Admin, I want the best price."));
shopNowBtn?.addEventListener("click", () => document.getElementById("products").scrollIntoView({behavior:"smooth"}));
contactNowBtn?.addEventListener("click", () => openWA(ADMIN_WHATSAPP, "Hello Admin, I need help."));

/* --------- Product Buttons --------- */
$$('button[data-action="buy"]').forEach(btn => {
  btn.addEventListener("click", () => {
    const prod = btn.getAttribute("data-product");
    const price = btn.getAttribute("data-price");
    openCheckout(prod, price);
  });
});
$$('.dm').forEach(btn => {
  btn.addEventListener("click", () => {
    const prod = btn.getAttribute("data-product") || "product";
    openWA(ADMIN_WHATSAPP, `Hello Admin, I am interested in ${prod}. Please give me the best price and payment details.`);
  });
});

/* --------- Checkout Modal --------- */
function openCheckout(product, price) {
  productNameInput.value = product;
  amountInput.value = price;
  payerNameInput.value = "";
  paymentMethodSelect.value = "";
  accountDetails.innerHTML = "";
  accountDetails.classList.remove("visible");
  checkoutModal.setAttribute("aria-hidden", "false");
  checkoutModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}
function closeCheckout() {
  checkoutModal.setAttribute("aria-hidden", "true");
  checkoutModal.style.display = "none";
  document.body.style.overflow = "";
}
closeModal.addEventListener("click", closeCheckout);
document.addEventListener("keydown", e => { if(e.key === "Escape") closeCheckout(); });

/* --------- Payment Method Selection --------- */
paymentMethodSelect.addEventListener("change", () => {
  const v = paymentMethodSelect.value;
  if (!v || !PAYMENT_METHODS[v]) {
    accountDetails.classList.remove("visible");
    accountDetails.innerHTML = "";
    return;
  }
  const method = PAYMENT_METHODS[v];
  accountDetails.classList.add("visible");
  accountDetails.innerHTML = `
    <strong style="color:${method.color}">${method.label}</strong>
    <p style="margin-top:6px;color:#aaa">For safety, account numbers are revealed after confirming transfer.</p>
    <p style="margin-top:6px;font-size:13px;color:#aaa">Verification WhatsApp: <strong>${method.verificationWA}</strong></p>
  `;
});

/* --------- Transfer Button --------- */
transferBtn.addEventListener("click", () => {
  const bank = paymentMethodSelect.value;
  if (!bank || !PAYMENT_METHODS[bank]) { alert("Please choose a bank."); return; }
  const payer = payerNameInput.value.trim();
  if (!payer) { alert("Enter your payer name used in transfer."); return; }

  const prod = productNameInput.value || "Product";
  const amount = amountInput.value || "";

  const method = PAYMENT_METHODS[bank];
  const message = `Hello Admin, I have made a transfer.
Product: ${prod}
Amount: ₦${amount}
Payment Method: ${method.label}
Payer Name: ${payer}
Transaction ID: [optional]`;

  // Start countdown (20 seconds) animation
  startCountdownAnimation(20, () => {
    openWA(method.verificationWA, message);
    closeCheckout();
  });
});

/* --------- DM from Modal --------- */
dmModalBtn.addEventListener("click", () => {
  const prod = productNameInput.value || "Product";
  openWA(ADMIN_WHATSAPP, `Hello Admin, I am interested in ${prod}. Please give me the best price and payment details.`);
  closeCheckout();
});

/* --------- Countdown Animation --------- */
function startCountdownAnimation(seconds, callback) {
  let s = seconds;
  countNum.textContent = s;
  countdownOverlay.classList.add("active");
  countdownOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  countdownMessage.textContent = `Processing payment...`;

  const t = setInterval(() => {
    s--;
    countNum.textContent = s;
    if (s <= 0) {
      clearInterval(t);
      countdownOverlay.classList.remove("active");
      countdownOverlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      callback && callback();
    }
  }, 1000);
}
