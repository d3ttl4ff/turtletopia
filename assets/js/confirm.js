import { ticketCategories } from "assets/js/ticketCategories.js";

const detailDate = document.querySelector('.js-table-date');
const detailTime = document.querySelector('.js-table-time');
const detailDuration = document.querySelector('.js-table-duration');
const detailTotalTickets = document.querySelector('.js-table-total-count');
const detailTotalBill = document.querySelector('.js-table-total-bill');
const detailName = document.querySelector('.js-table-name');
const detailMobile = document.querySelector('.js-table-mobile');
const detailEmail = document.querySelector('.js-table-email');
const detailGender = document.querySelector('.js-table-gender');

detailDate.innerHTML = localStorage.getItem('selected_DD_MM_YY');
detailTime.innerHTML = localStorage.getItem('duration');
detailDuration.innerHTML = localStorage.getItem('time_slots');
detailTotalTickets.innerHTML = localStorage.getItem('totalCount');
detailTotalBill.innerHTML = "$" + localStorage.getItem('totalBill');
detailMobile.innerHTML = localStorage.getItem('mobileNumber');
detailName.innerHTML = localStorage.getItem('fullName');
detailEmail.innerHTML = localStorage.getItem('email');
detailGender.innerHTML = localStorage.getItem('selectedGender');

ticketCategories.forEach((category) => {
    const ticketCount = document.querySelector(`.js-table-${category.id}-count`);
    const ticketPrice = document.querySelector(`.js-table-${category.id}-price`);

    ticketCount.innerHTML = localStorage.getItem(`ticketCount_${category.id}`);

    if(category.id == 'inf-3000'){
        ticketPrice.innerHTML = `Free`
    }
    else{
        ticketPrice.innerHTML = '$' + localStorage.getItem(`ticketPrice_${category.id}`);
    }
})

const backPaymentButton = document.getElementById("back-payment-button");
const backHikkaduwaButton = document.getElementById("back-hikkaduwa-button");

backPaymentButton.addEventListener('click', () => {
    window.location.href = 'payment.html';
});

backHikkaduwaButton.addEventListener('click', () => {
    window.location.href = 'hikkaduwa.html';
});