// === LOADER ===
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");

  setTimeout(() => {
    loader.style.display = "none";
    mainContent.style.display = "block";
  }, 2000); // 2 seconds loader
});

// === MODAL HANDLING ===
const openModalBtns = document.querySelectorAll(".open-modal");
const modal = document.getElementById("purchase-modal");
const closeModalBtn = document.getElementById("modal-close");

openModalBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
    resetPurchase();
  });
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// === BANK SELECTION ===
const bankSelect = document.getElementById("bank-select");
const accountDisplay = document.getElementById("account-details");
const submitTransactionBtn = document.getElementById("submit-transaction");
const countdownElement = document.getElementById("countdown");

const bankInfo = {
  kuda: {
    name: "Kuda Microfinance Bank",
    number: "2081794843",
    owner: "DUMOYE, DESTINY ABDUL QUADRI",
    whatsapp: "+2349153882605",
    colorClass: "kuda"
  },
  moniepoint: {
    name: "Moniepoint MFB",
    number: "9014690789",
    owner: "ABDUL QUADRI DESTINY DUMOYE",
    whatsapp: "+2349153882605",
    colorClass: "moniepoint"
  },
  palmpay: {
    name: "Palmpay",
    number: "9030516292",
    owner: "Miracle Chika",
    whatsapp: "+2349159529768",
    colorClass: "palmpay"
  }
};

// Reset function
function resetPurchase() {
  accountDisplay.innerHTML = "";
  countdownElement.innerText = "";
  bankSelect.value = "";
}

// Show account number after selecting bank
bankSelect.addEventListener("change", () => {
  const selectedBank = bankSelect.value;
  if (!selectedBank) return;

  const info = bankInfo[selectedBank];
  accountDisplay.innerHTML = `
    <div class="account-details ${info.colorClass}">
      <p><strong>Bank:</strong> ${info.name}</p>
      <p><strong>Account Number:</strong> ${info.number}</p>
      <p><strong>Account Name:</strong> ${info.owner}</p>
    </div>
  `;
});

// === SUBMIT TRANSACTION ===
submitTransactionBtn.addEventListener("click", () => {
  const selectedBank = bankSelect.value;
  const nameInput = document.getElementById("user-name").value.trim();

  if (!nameInput) {
    alert("Please enter your name for verification.");
    return;
  }

  if (!selectedBank) {
    alert("Please choose a bank first.");
    return;
  }

  const info = bankInfo[selectedBank];

  // Countdown from 20 → 1
  let counter = 20;
  countdownElement.innerText = `Processing: ${counter}`;

  const interval = setInterval(() => {
    counter--;
    countdownElement.innerText = `Processing: ${counter}`;
    if (counter <= 0) {
      clearInterval(interval);
      countdownElement.innerText = "Transaction Complete! Redirecting to WhatsApp...";
      // Open WhatsApp link
      const whatsappLink = `https://wa.me/${info.whatsapp}?text=Hello, I am ${nameInput}. I have made my payment of ₦7,000 to ${info.name}. Please confirm.`;
      window.open(whatsappLink, "_blank");
      modal.style.display = "none";
    }
  }, 1000); // 1 second per number
});

// === OPTIONAL: ADD GAME VIDEO LINKS DYNAMICALLY ===
const videoLinks = document.querySelectorAll(".video-iframe");
videoLinks.forEach(iframe => {
  const url = iframe.dataset.url;
  iframe.src = url;
});
