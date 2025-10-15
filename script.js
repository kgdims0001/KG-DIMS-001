// Intro typed animation
const introLines = [
  "Welcome to KG^DIMS¥ — the official gaming & services store.",
  "Premium digital packages and showcase accounts for serious players.",
  "Choose a product, select a bank, then contact admin to complete payment."
];

const typedArea = document.getElementById('typedArea');
let i = 0, j = 0;
function runTyped() {
  if (i < introLines.length) {
    if (j < introLines[i].length) {
      typedArea.textContent += introLines[i][j];
      j++;
      setTimeout(runTyped, 25);
    } else {
      typedArea.textContent += '\n';
      i++; j=0;
      setTimeout(runTyped, 700);
    }
  }
}
runTyped();

// Popup / Continue
const continueBtn = document.getElementById('continueBtn');
const introPopup = document.getElementById('introPopup');
const siteWrap = document.getElementById('siteWrap');

continueBtn.addEventListener('click', () => {
  introPopup.style.display = 'none';
  siteWrap.setAttribute('aria-hidden','false');
});

// Buy buttons
const buyButtons = document.querySelectorAll('.buy-btn');
const bankModal = document.getElementById('bankModal');
const accountDetails = document.getElementById('accountDetails');
const confirmTransfer = document.getElementById('confirmTransfer');
const productVideo = document.getElementById('productVideo');

let selectedBank = '';
let currentProduct = '';

buyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentProduct = btn.dataset.product;
    productVideo.src = btn.dataset.video;
    bankModal.style.display = 'flex';
    accountDetails.style.display = 'none';
  });
});

// Bank buttons
const bankButtons = document.querySelectorAll('.bank-btn');
bankButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedBank = btn.dataset.bank;
    accountDetails.className = `account-details ${selectedBank}`;
    let info = '';
    if(selectedBank === 'moniepoint') info = 'Moniepoint MFB\nOwner: ABDUL QUADRI DESTINY DUMOYE\nWhatsApp: +2349153882605';
    if(selectedBank === 'kuda') info = 'Kuda Bank\nOwner: DUMOYE, DESTINY ABDUL QUADRI\nWhatsApp: +2349153882605';
    if(selectedBank === 'palmpay') info = 'Palmpay\nOwner: MIRACLE CHIKA\nWhatsApp: +2349159529768';
    accountDetails.textContent = info;
    accountDetails.style.display = 'block';
  });
});

// Confirm transfer
confirmTransfer.addEventListener('click', () => {
  if(!selectedBank) { alert("Please select a bank."); return; }
  let number = '';
  if(selectedBank === 'moniepoint') number = '2349153882605';
  if(selectedBank === 'kuda') number = '2349153882605';
  if(selectedBank === 'palmpay') number = '2349159529768';
  window.open(`https://wa.me/${number}?text=I have made transfer for ${currentProduct}`, '_blank');
  bankModal.style.display = 'none';
  accountDetails.style.display = 'none';
  selectedBank = '';
});
