// ------------ Configuration ------------
const BANKS = {
  kuda: { color: "#7C4DFF", name: "Kuda Microfinance Bank", account: "2081794843", owner: "DUMOYE, DESTINY ABDUL QUADRI", whatsapp: "+2349153882605" },
  moniepoint: { color: "#2196F3", name: "Moniepoint MFB", account: "9014690789", owner: "ABDUL QUADRI DESTINY DUMOYE", whatsapp: "+2349153882605" },
  palmpay: { color: "#FF5722", name: "Palmpay", account: "9030516292", owner: "Miracle Chika", whatsapp: "+2349159529768" }
};

// ------------ DOM Elements ------------
const buyButtons = document.querySelectorAll(".buyBtn");
const productInput = document.getElementById("productName");
const priceInput = document.getElementById("priceInput");
const nameInput = document.getElementById("verifName");
const bankSelect = document.getElementById("bankSelect");
const showAccountBtn = document.getElementById("showAccountBtn");
const accountDetailsDiv = document.getElementById("accountDetails");
const transferBtn = document.getElementById("transferBtn");
const countdownOverlay = document.getElementById("countdownOverlay");
const countdownNumber = document.getElementById("countNum");
const youtubeFrame = document.getElementById("youtubeFrame");

// ------------ State ------------
let selectedProduct = null;
let selectedPrice = null;
let selectedBank = null;

// ------------ Buy button click ------------
buyButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedProduct = btn.dataset.product;
    selectedPrice = btn.dataset.price;
    productInput.value = selectedProduct;
    priceInput.value = selectedPrice;
    nameInput.value = "";
    bankSelect.value = "";
    accountDetailsDiv.innerHTML = "";
    accountDetailsDiv.style.display = "none";
  });
});

// ------------ Bank select ------------
bankSelect.addEventListener("change", () => {
  const bankKey = bankSelect.value;
  selectedBank = BANKS[bankKey] || null;
  if(selectedBank) {
    bankSelect.style.backgroundColor = selectedBank.color;
    bankSelect.style.color = "#fff";
  } else {
    bankSelect.style.backgroundColor = "";
    bankSelect.style.color = "#000";
  }
});

// ------------ Show Account Number ------------
showAccountBtn.addEventListener("click", () => {
  if(!nameInput.value.trim()) {
    alert("Please enter your name for verification.");
    return;
  }
  if(!selectedBank) {
    alert("Please select a bank first.");
    return;
  }
  accountDetailsDiv.style.display = "block";
  accountDetailsDiv.innerHTML = `
    <p><strong>Bank:</strong> ${selectedBank.name}</p>
    <p><strong>Account Number:</strong> ${selectedBank.account}</p>
    <p><strong>Account Name:</strong> ${selectedBank.owner}</p>
    <p><strong>WhatsApp:</strong> ${selectedBank.whatsapp}</p>
  `;
});

// ------------ Transfer Button / Countdown ------------
transferBtn.addEventListener("click", () => {
  if(!nameInput.value.trim()) {
    alert("Please enter your name for verification.");
    return;
  }
  if(!selectedBank) {
    alert("Please select a bank first.");
    return;
  }
  // Start countdown
  let seconds = 20; // realistic countdown
  countdownNumber.textContent = seconds;
  countdownOverlay.style.display = "flex";

  const interval = setInterval(() => {
    seconds--;
    countdownNumber.textContent = seconds;
    if(seconds <= 0) {
      clearInterval(interval);
      countdownOverlay.style.display = "none";
      // Open WhatsApp
      const msg = encodeURIComponent(`Hello Admin, I have made the transfer.\nProduct: ${selectedProduct}\nPrice: ₦${selectedPrice}\nBank: ${selectedBank.name}\nPayer Name: ${nameInput.value}`);
      window.open(`https://wa.me/${selectedBank.whatsapp.replace(/\D/g,'')}?text=${msg}`, "_blank");
    }
  }, 1000);
});

// ------------ YouTube Video ------------
function setYouTubeVideo(url) {
  youtubeFrame.src = url;
}
