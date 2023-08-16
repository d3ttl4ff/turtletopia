import { flagListArray } from "../js/scripts/countries.js";
import { ticketCategories } from "../js/ticket_scripts/ticketCategories.js";

const form = document.getElementById("form");
const fullname = document.getElementById("fullname");
const mobilenumber = document.getElementById("mobilenumber");
const email = document.getElementById("email");
const email2 = document.getElementById("email2");
let allFieldsValid = false;

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();

    if (allFieldsValid) {
        window.location.href = 'payment.html';
    }
});

mobilenumber.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    inputValue = inputValue.replace(/[^\d+]/g, "");
    event.target.value = inputValue;
});

mobilenumber.addEventListener("keydown", function(event) {
    if (
        !(
            event.key === "+" ||
            (event.key >= "0" && event.key <= "9") ||
            event.key === "Backspace"
        )
    ) {
        event.preventDefault();
    }
});

flagListHTML();


const selectFlagText = document.getElementById("select-flag-text");
const flagOptions = document.querySelectorAll('.flag-options');
const flagListContainer = document.getElementById("flag-list");
const flagArrow = document.querySelector('.js-flag-arrow');

flagOptions.forEach(option => {
    option.addEventListener('click', () => {
        const flagName = option.querySelector('p').textContent;
        const countryCode = Object.keys(flagListArray).find(code => flagListArray[code].country === flagName);

        if (countryCode) {
            const mobileCode = flagListArray[countryCode].mobileCode;
            const maxMobileLength = mobileCode.length === 4 ? 12 : 11;

            document.getElementById("mobilenumber").value = "+" + flagListArray[countryCode].mobileCode;
            mobilenumber.maxLength = maxMobileLength;
        }

        selectFlagText.innerHTML = flagName;
        flagListContainer.classList.toggle("show-flag-list");
        flagArrow.classList.toggle("rotate-arrow")
    });
});

mobilenumber.addEventListener('input', function(event) {
    const mobilenumberValue = mobilenumber.value.trim();
    
    if (mobilenumberValue.length > mobilenumber.maxLength) {
        mobilenumber.value = mobilenumberValue.slice(0, mobilenumber.maxLength);
    }
});


const flagSelectField = document.getElementById("flagSelectField");

flagSelectField.addEventListener('click', () => {
    flagListContainer.classList.toggle("show-flag-list");
    flagArrow.classList.toggle("rotate-arrow")
});


const genderSelectField = document.getElementById("genderSelectField");
const selectGenderText = document.getElementById("select-gender-text");
const dropdownList = document.querySelector(".dropdown-list");
const dropdownOptions = document.querySelectorAll(".dropdown-option");

genderSelectField.addEventListener("click", () => {
    dropdownList.classList.toggle("show-dropdown-list");
    flagArrow.classList.toggle("rotate-arrow");
});

dropdownOptions.forEach(option => {
    option.addEventListener("click", () => {
        const selectedGender = option.textContent;
        selectGenderText.innerHTML = selectedGender;
        dropdownList.classList.remove("show-dropdown-list");
        flagArrow.classList.remove("rotate-arrow");
    });
});
/******************funtions***********************/
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error')
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
}

const isValidPhoneNo = mobilenumber => {
    const re = /^\+?(\d{3,4})[- ]?(\d{7})$/;

    return re.test(String(mobilenumber));
}

// submitButton.disabled = true;
const validateInputs = () => {
    const fullnameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const email2Value = email2.value.trim();
    const mobilenumberValue = mobilenumber.value.trim();

    if(fullnameValue === ''){
        setError(fullname, 'Username is required')
    } else{
        setSuccess(fullname);
    }

    if (mobilenumberValue === '') {
        setError(mobilenumber, 'Mobile number is required');
    } else if (!isValidPhoneNo(mobilenumberValue)) {
        setError(mobilenumber, 'Provide a valid mobile number');
    } else {
        setSuccess(mobilenumber);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if (email2Value === '') {
        setError(email2, 'Email is required');
    } else if (!isValidEmail(email2Value)) {
        setError(email2, 'Provide a valid email address');
    } else if (email2Value !== emailValue) {
        setError(email2, 'Email addresses do not match');
    } else {
        setSuccess(email2);
    }

    if (
        fullname.parentElement.classList.contains('success') &&
        mobilenumber.parentElement.classList.contains('success') &&
        email.parentElement.classList.contains('success') &&
        email2.parentElement.classList.contains('success')
    ) {
        allFieldsValid = true;
    } else {
        allFieldsValid = false;
    }
}

function flagListHTML(){
    let flagListHTML = ""; 

    const countryCodes = Object.keys(flagListArray);

    countryCodes.forEach(countryCode => {
        const country = flagListArray[countryCode].country;
        const mobileCode = flagListArray[countryCode].mobileCode;
        const ISO2 = flagListArray[countryCode].ISO2;

        flagListHTML += `
            <li class="flag-options">
                <img src="/svgs/${ISO2}.svg" alt="${ISO2}">
                <p>${country}</p>
                <span>+${mobileCode}</span>
            </li>
        `;
    });

    document.getElementById("flag-list")
        .innerHTML = flagListHTML;
}
/******************funtions***********************/

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

fullname.addEventListener("input", function(event) {
    const inputFullName = event.target.value;
    localStorage.setItem("fullName", inputFullName);
    detailName.innerHTML = localStorage.getItem('fullName');
});

mobilenumber.addEventListener("input", function(event) {
    const inputMobileNumber = event.target.value;
    localStorage.setItem("mobileNumber", inputMobileNumber);
    detailMobile.innerHTML = localStorage.getItem('mobileNumber');
});

email2.addEventListener("input", function(event) {
    const inputEmail = event.target.value;
    localStorage.setItem("email", inputEmail);
    detailEmail.innerHTML = localStorage.getItem('email');
});

dropdownList.addEventListener("click", function(event) {
    const selectedGender = event.target.textContent;
    selectGenderText.innerHTML = selectedGender;
    localStorage.setItem("selectedGender", selectedGender);
    detailGender.innerHTML = localStorage.getItem('selectedGender');
});

const resetButton = document.getElementById("resetButton");
const submitButton = document.getElementById("submitButton");
const backButton = document.getElementById("back-button");

resetButton.addEventListener('click', () => {
    localStorage.removeItem("fullName");
    localStorage.removeItem("mobileNumber");
    localStorage.removeItem("email");
    localStorage.removeItem("selectedGender");
});

backButton.addEventListener('click', () => {
    window.location.href = 'tickets.html';
});


