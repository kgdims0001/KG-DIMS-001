// Popup
const popup = document.getElementById('popup');
const popupBtn = document.getElementById('popupBtn');
popupBtn.addEventListener('click', () => popup.style.display = 'none');

// Modal
const buyButtons = document.querySelectorAll('.buy-btn');
const modal = document.getElementById('bankModal');
const modalClose = document.getElementById('modalClose');
const bankSelect = document.getElementById('bankSelect');
const confirmBank = document.getElementById('confirmBank');
const accountDetails = document.getElementById('accountDetails');
const bankInfo = document.getElementById('bankInfo');

// Countdown
const countdownOverlay = document.getElementById('countdownOverlay');
const countdownNum = document.getElementById('countdownNum');

let selectedProduct = '';

buyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedProduct = btn.dataset.product;
    bankSelect.value = '';
    accountDetails.style.display = 'none';
    modal.style.display = 'flex';
  });
});

modalClose.addEventListener('click', () => modal.style.display = 'none');

confirmBank.addEventListener('click', () => {
  const bank = bankSelect.value;
  if(!bank) return alert('Please select a bank');

  // Show account details
  let info = '';
  let colorClass = '';
  switch(bank){
    case 'moniepoint':
      info = 'Bank: Moniepoint\nAccount Name: ABDUL QUADRI DESTINY DUMOYE\nWhatsApp: +2349153882605';
      colorClass = 'moniepoint';
      break;
    case 'palmpay':
      info = 'Bank: Palmpay\nAccount Name: Miracle Chika\nWhatsApp: +2349159529768';
      colorClass = 'palmpay';
      break;
    case 'kuda':
      info = 'Bank: Kuda Microfinance\nAccount Name: DUMOYE, DESTINY ABDUL QUADRI\nWhatsApp: +2349153882605';
      colorClass = 'kuda';
      break;
  }
  accountDetails.className = `account-details ${colorClass}`;
  bankInfo.textContent = info;
  accountDetails.style.display = 'block';

  // Start countdown animation
  modal.style.display = 'none';
  countdownOverlay.style.display = 'flex';
  let count = 20;
  countdownNum.textContent = count;
  const interval = setInterval(() => {
    count--;
    countdownNum.textContent = count;
    if(count <= 0){
      clearInterval(interval);
      countdownOverlay.style.display = 'none';
      // Redirect to WhatsApp automatically
      let phone = '';
      if(bank === 'moniepoint') phone='+2349153882605';
      else if(bank === 'palmpay') phone='+2349159529768';
      else if(bank === 'kuda') phone='+2349153882605';
      window.open(`https://wa.me/${phone}`, '_blank');
    }
  }, 1000);
});
