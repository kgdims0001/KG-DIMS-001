// BANKS data
const BANKS = {
  MoneyPoint: {color:'#1E90FF', name:'ABDUL QUADRI DESTINY DUMOYE', number:'+2349153882605'},
  Palmpay: {color:'#9b59b6', name:'Miracle Chika', number:'+2349159529768'},
  Kuda: {color:'#8e44ad', name:'DUMOYE, DESTINY ABDUL QUADRI', number:'+2342081794843'}
};

let currentProduct = '';

// Open buy modal
function buyProduct(product) {
  currentProduct = product;
  document.getElementById('modalTitle').innerText = 'Buy ' + product;
  document.getElementById('buyModal').classList.remove('hidden');
  document.getElementById('bankDetails').classList.add('hidden');
}

// Select a bank
function selectBank(bank) {
  const info = BANKS[bank];
  document.getElementById('bankInfo').innerHTML = `
    Bank: ${bank}<br>
    Account Name: ${info.name}<br>
    WhatsApp: ${info.number}
  `;
  document.getElementById('bankDetails').classList.remove('hidden');
}

// Confirm transfer
function confirmTransfer() {
  const payer = document.getElementById('payerName').value.trim();
  if(!payer){ alert('Enter your name'); return; }
  document.getElementById('buyModal').classList.add('hidden');
  startCountdown(20);
}

// Close modal
function closeModal() {
  document.getElementById('buyModal').classList.add('hidden');
}

// Countdown before WhatsApp opens
function startCountdown(seconds) {
  const overlay = document.getElementById('countdownOverlay');
  const text = document.getElementById('countdownText');
  overlay.classList.remove('hidden');
  let counter = seconds;
  text.innerText = counter;
  const interval = setInterval(() => {
    counter--;
    text.innerText = counter;
    if(counter <= 0){
      clearInterval(interval);
      overlay.classList.add('hidden');
      openWhatsApp();
    }
  }, 1000);
}

// Open WhatsApp to send confirmation message
function openWhatsApp() {
  const bankInfo = document.getElementById('bankInfo').innerText;
  const payer = document.getElementById('payerName').value.trim();
  const message = encodeURIComponent(`Hello, I made a transfer for ${currentProduct}. My name: ${payer}. ${bankInfo}`);
  let number = '';
  if(bankInfo.includes('MoneyPoint')) number = BANKS.MoneyPoint.number;
  else if(bankInfo.includes('Palmpay')) number = BANKS.Palmpay.number;
  else number = BANKS.Kuda.number;
  window.open('https://wa.me/' + number + '?text=' + message, '_blank');
}
