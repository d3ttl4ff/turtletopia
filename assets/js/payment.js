import { ticketCategories } from "../js/ticketCategories.js";

const form = document.querySelector("#credit-card");

const cardNumber = document.querySelector("#card-number");
const cardHolder = document.querySelector("#name-text");
const cardExpiration = document.querySelector("#valid-thru-text");
const cardCVV = document.querySelector("#cvv-text");

const cardNumberText = document.querySelector(".number-vl");
const cardHolderText = document.querySelector(".name-vl");
const cardExpirationText = document.querySelector(".expiration-vl");
const cardCVVText = document.querySelector(".cvv-vl");

cardNumber.addEventListener("keyup", (e) =>{
  if (!e.target.value){
    cardNumberText.innerText = "1234 1234 1234 1234";
  } else {
    const valuesOfInput = e.target.value.replaceAll(" ","");

    if (e.target.value.length > 14) {
      e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
      cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
    } else if (e.target.value.length > 9) {
      e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
      cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
    } else if (e.target.value.length > 4) {
      e.target.value = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
      cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
    } else {
      e.target.value = cardNumberText.innerHTML = valuesOfInput
    }
  }
})

cardHolder.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    cardHolderText.innerHTML = "Elliot Alderson";
  } else {
    cardHolderText.innerHTML = e.target.value.toUpperCase();
  }
})

cardExpiration.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    cardExpirationText.innerHTML = "01/30"
  } else {
    const valuesOfInput = e.target.value.replace("/", "");

    if (e.target.value.length) {
      e.target.value = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
      cardExpirationText.innerHTML = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2")
    } else {
      cardExpirationText.innerHTML = valuesOfInput
    }
  }
})

cardCVV.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardCVVText.innerHTML = "123";
    } 
    else {
        cardCVVText.innerHTML = e.target.value;
    }
})

const backDetailsButton = document.getElementById("back-details-button");

backDetailsButton.addEventListener('click', () => {
    window.location.href = 'details.html';
});

const detailDate = document.querySelector('.js-table-date');
const detailTime = document.querySelector('.js-table-time');
const detailDuration = document.querySelector('.js-table-duration');
const detailTotalTickets = document.querySelector('.js-table-total-count');
const detailTotalBill = document.querySelector('.js-table-total-bill');
const detailName = document.querySelector('.js-table-name');
const detailMobile = document.querySelector('.js-table-mobile');
const detailEmail = document.querySelector('.js-table-email');
const detailGender = document.querySelector('.js-table-gender');

detailDate.innerHTML = localStorage.getItem('selected_DD_MM_YY') || 'N/A';
detailTime.innerHTML = localStorage.getItem('duration') || 'N/A';
detailDuration.innerHTML = localStorage.getItem('time_slots') || 'N/A';
detailTotalTickets.innerHTML = localStorage.getItem('totalCount') || 'N/A';
detailTotalBill.innerHTML = "$" + (localStorage.getItem('totalBill') || 'N/A');
detailMobile.innerHTML = localStorage.getItem('mobileNumber') || 'N/A';
detailName.innerHTML = localStorage.getItem('fullName') || 'N/A';
detailEmail.innerHTML = localStorage.getItem('email') || 'N/A';
detailGender.innerHTML = localStorage.getItem('selectedGender') || 'N/A';

ticketCategories.forEach((category) => {
    const ticketCount = document.querySelector(`.js-table-${category.id}-count`);
    const ticketPrice = document.querySelector(`.js-table-${category.id}-price`);

    ticketCount.innerHTML = localStorage.getItem(`ticketCount_${category.id}`) || 'N/A';

    if(category.id == 'inf-3000'){
        ticketPrice.innerHTML = `Free`
    }
    else{
      const storedTicketPrice = localStorage.getItem(`ticketPrice_${category.id}`);
      ticketPrice.innerHTML = storedTicketPrice ? `$${storedTicketPrice}` : 'N/A';
    }
})

const creditCardForm = document.getElementById("credit-card");

creditCardForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (validateCreditCardForm()) {
        window.location.href = 'thankyou.html';
    }
});

function validateCreditCardForm() {
    const cardNumberValue = cardNumber.value.trim();
    const cardHolderValue = cardHolder.value.trim();
    const cardExpirationValue = cardExpiration.value.trim();
    const cardCVVValue = cardCVV.value.trim();

    console.log(cardExpirationValue.length);

    if (cardNumberValue.length < 19 || cardHolderValue === '' || cardExpirationValue.length < 5 || cardCVVValue.length < 4) {
        return false;
    }

    return true;
}

const totalBill = localStorage.getItem('totalBill');
const payButton = document.getElementById('add');
payButton.value = `PAY $${totalBill}`;
