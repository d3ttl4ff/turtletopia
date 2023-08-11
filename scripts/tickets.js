import { ticketCategories } from '/scripts/ticketCategories.js';
import { peakHours } from '/scripts/peakHours.js';
import { updateSelection, updateDuration } from '/scripts/dropdown.js';

let countTicketExecuted = false;

/**************** update time ****************/
function updateCurrentTime(){
    const calendarTime = document.querySelector('.js-calendear-time');

    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

    calendarTime.textContent = timeString;
}

updateCurrentTime();
setInterval(updateCurrentTime, 1);
/**************** update time ****************/

/**************** ticket count ****************/
export function countTicket(){
    countTicketExecuted = true;
    const addRemoveIcons = document.querySelectorAll('.js-add-remove');

    ticketCategories.forEach((category) => {
        addRemoveIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                if (icon.id === category.add_id){
                    category.counter += 1;
                }
                else if(icon.id === category.remove_id && category.counter > 0){
                    category.counter -= 1;
                }
                else if(icon.id === category.reset_id){
                    category.counter = 0;
                }
        
                document.querySelector(`.${category.id}`)
                    .innerHTML = category.counter;

                localStorage.setItem(`ticketCount_${category.id}`, category.counter);

                updateSelection();
                updateTotalBillAndCounts();
                tableCategoryUpdate();
            });
        });

        updateSelection();
        updateTotalBillAndCounts();
        tableCategoryUpdate()
    });
}
/**************** ticket count ****************/

/**************** ticket table category update ****************/
function tableCategoryUpdate(){
    let noCategoriesSelected = true;

    ticketCategories.forEach((category) => {
        const rowElement = document.querySelector(`.js-table-${category.id}-count`).closest('tr');
        
        if (category.counter > 0) {
            rowElement.style.display = 'table-row';
            noCategoriesSelected = false;
        } else {
            rowElement.style.display = 'none'; 
        }
    });

    // Display the "N/A" row when no categories are selected
    const noCategoriesRow = document.querySelector('.js-table-no-categories');
    if (noCategoriesSelected) {
        noCategoriesRow.style.display = 'table-row';
    } else {
        noCategoriesRow.style.display = 'none';
    }
}
/**************** ticket table category update ****************/

/**************** ticket table ****************/
export function updateTotalBillAndCounts() {
    let totalBill = 0;
    let totalTickets = 0;
  
    ticketCategories.forEach((category) => {
        const ticketCount = parseInt(localStorage.getItem(`ticketCount_${category.id}`)) || 0;
        const ticketPrice = parseInt(localStorage.getItem(`ticketPrice_${category.id}`)) || 0;
  
        totalTickets += ticketCount;
        totalBill += ticketPrice;
  
        document.querySelector(`.js-table-${category.id}-count`).innerHTML = ticketCount;
        document.querySelector(`.js-table-${category.id}-price`).innerHTML = `$${ticketPrice}`;
    });
  
    document.querySelector(`.js-table-total-count`).innerHTML = totalTickets;
    document.querySelector(`.js-table-total-bill`).innerHTML = `$${totalBill}`;

    if (countTicketExecuted !== true) {
        ticketCategories.forEach((category) => {
            localStorage.setItem(`ticketCount_${category.id}`, 0);
        });
    }
}
/**************** ticket table ****************/

/**************** ticket count HTMl ****************/
let ticketCounterHTML = '';

ticketCategories.forEach((category) => {
    const storedCount = parseInt(localStorage.getItem(`ticketCount_${category.id}`)) || 0;
    category.counter = storedCount;

    ticketCounterHTML += `
        <div class="ticket-count-main-wrapper">
            <div class="ticket-count-category">
                <span>${category.name}</span>
                <br>
                <span class="category-tag">${category.tag}</span>
            </div>
            <div class="ticket-count-counter">
                <span id="${category.reset_id}" class="material-symbols-rounded reset-icon js-add-remove" >Refresh</span>
                <span id="${category.remove_id}" class="material-symbols-rounded js-add-remove" >Remove</span>
                <span class="count-number ${category.id}" data-ticket-counter="ticket-counter">${category.counter}</span>
                <span id="${category.add_id}" class="material-symbols-rounded js-add-remove" ">Add</span>
            </div>
        </div>
    `
});

document.querySelector('.ticket-count-main-container')
    .innerHTML = ticketCounterHTML;

countTicket();
/**************** ticket count HTMl ****************/

/**************** duration ****************/
let timeSlotsHTMl = "";
const peakIndex = [3, 4, 5, 8, 9, 10];

peakHours.forEach((timeSlot, index) => {
    if (peakIndex.includes(index)){
        timeSlotsHTMl += `
        <label>
            <input type="checkbox" name="item" value="${timeSlot.start} - ${timeSlot.end}" class="time-slot peak-slot js-selection">${timeSlot.start} - ${timeSlot.end} ${timeSlot.status}
        </label> 
        `
    }
    else{
        timeSlotsHTMl += `
        <label>
            <input type="checkbox" name="item" value="${timeSlot.start} - ${timeSlot.end}" class="time-slot js-selection">${timeSlot.start} - ${timeSlot.end}
        </label> 
        `
    }
});

document.querySelector('.dropdown-content')
    .innerHTML = timeSlotsHTMl;
/**************** duration ****************/
