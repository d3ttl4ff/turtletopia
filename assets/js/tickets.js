/**************** ticket categories ****************/
let ticketCategories = [
    {
        id: "sla-1000",
        name: "Sri Lankan Adult",
        tag: "Above 18yrs",
        remove_id: "sla-1000-remove",
        add_id: "sla-1000-add",
        reset_id: "sla-1000-reset",
        counter: 0,
        price: {
            regular_ticket: 4,
            peak_ticket: 6
        }
    },
    {
        id: "slc-1001",
        name: "Sri Lankan Child",
        tag: "5 to 17yrs",
        remove_id: "slc-1001-remove",
        add_id: "slc-1001-add",
        reset_id: "slc-1001-reset",
        counter: 0,
        price: {
            regular_ticket: 2,
            peak_ticket: 3
        }
    },
    {
        id: "fa-2000",
        name: "Foreigner Adult",
        tag: "Above 18yrs",
        remove_id: "fa-2000-remove",
        add_id: "fa-2000-add",
        reset_id: "fa-2000-reset",
        counter: 0,
        price: {
            regular_ticket: 10,
            peak_ticket: 13
        }
    },
    {
        id: "fc-2001",
        name: "Foreigner Child",
        tag: "5 to 17yrs",
        remove_id: "fc-2001-remove",
        add_id: "fc-2001-add",
        reset_id: "fc-2001-reset",
        counter: 0,
        price: {
            regular_ticket: 5,
            peak_ticket: 8
        }
    },
    {
        id: "inf-3000",
        name: "Infant",
        tag: "Under 4yrs",
        remove_id: "inf-3000-remove",
        add_id: "inf-3000-add",
        reset_id: "inf-3000-reset",
        counter: 0,
        price: {
            regular_ticket: 0,
            peak_ticket: 0
        }
    }
]
/**************** ticket categories ****************/

/**************** peak hours ****************/
const peakHours = [
    { 
    start: "07:00 AM", 
    end: "08:00 AM" 
},
{
    start: "08:00 AM", 
    end: "09:00 AM"
},
{
    start: "09:00 AM", 
    end: "10:00 AM"
},
{
    start: "10:00 AM", 
    end: "11:00 AM",
    status: "(peak hour)"
},
{
    start: "11:00 AM", 
    end: "12:00 AM",
    status: "(peak hour)"
},
{
    start: "12:00 AM", 
    end: "01:00 PM",
    status: "(peak hour)"
},
{
    start: "01:00 PM", 
    end: "02:00 PM"
},
{
    start: "02:00 PM", 
    end: "03:00 PM"
},
{
    start: "03:00 PM", 
    end: "04:00 PM",
    status: "(peak hour)"
},
{
    start: "04:00 PM", 
    end: "05:00 PM",
    status: "(peak hour)"
},
{
    start: "05:00 PM", 
    end: "06:00 PM",
    status: "(peak hour)"
}
]
/**************** peak hours ****************/

/**************** update selection ****************/
function updateSelection() {
    const selectedRegularTimeSlots = [];
    const selectedPeakTimeSlots = [];
    const selectedTotalTimeSlots = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let lastSelectedIndex = -1;

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            if(lastSelectedIndex === -1 || lastSelectedIndex === index - 1){
                if(checkbox.classList.contains('peak-slot')){
                    selectedPeakTimeSlots.push(checkbox.value);
                    selectedTotalTimeSlots.push(checkbox.value);
                }
                else{
                    selectedRegularTimeSlots.push(checkbox.value);
                    selectedTotalTimeSlots.push(checkbox.value);
                }
                lastSelectedIndex = index;
            }
            else{
                checkbox.checked = false;
            }
        }
        else if (index === lastSelectedIndex) {
            lastSelectedIndex = -1;
        } 
    });
    
    ticketCategories.forEach((category) => {
        const ticketCount = parseInt(localStorage.getItem(`ticketCount_${category.id}`)) || 0;

        const regularTicketPrice = ticketCount * selectedRegularTimeSlots.length * category.price.regular_ticket;
        const peakTicketPrice = ticketCount * selectedPeakTimeSlots.length * category.price.peak_ticket;
        const totalTicketPrice = regularTicketPrice + peakTicketPrice;
    
        localStorage.setItem(`ticketPrice_${category.id}`, totalTicketPrice);
    });

    if (selectedRegularTimeSlots.length > 0 || selectedPeakTimeSlots.length > 0) {
        const startTime = selectedTotalTimeSlots[0].split(" - ")[0]; // Get start time of the top-most item
        const endTime = selectedTotalTimeSlots[selectedTotalTimeSlots.length - 1].split(" - ")[1]; // Get end time of the bottom-most item
        const selectedText = `${startTime} - ${endTime}`;

        const regular = selectedRegularTimeSlots.length;
        const peak = selectedPeakTimeSlots.length;
        const total = selectedTotalTimeSlots.length;

        document.querySelector('.selected-text').textContent = selectedText;
        document.querySelector('.js-table-time').innerHTML = selectedText;
        document.querySelector('.js-table-duration').innerHTML = `${total} hrs (${regular} Normal : ${peak} Peak)`;
    } 
    else {
        document.querySelector('.selected-text').textContent = 'Select Time Slots';
        document.querySelector('.js-table-time').innerHTML = 'N/A';
        document.querySelector('.js-table-duration').innerHTML = 'N/A';
    }  

    let timeSlots = document.querySelector('.js-table-duration').innerHTML;
    let duration = document.querySelector('.js-table-time').innerHTML;
    localStorage.setItem('time_slots', timeSlots);
    localStorage.setItem('duration', duration);
};
/**************** update selection ****************/

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
let countTicketExecuted = false;
function countTicket(){
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
        tableCategoryUpdate();  
    });
    countTicketExecuted = true;
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

    const noCategoriesRow = document.querySelector('.js-table-no-categories');
    if (noCategoriesSelected) {
        noCategoriesRow.style.display = 'table-row';
    } else {
        noCategoriesRow.style.display = 'none';
    }
}
/**************** ticket table category update ****************/

/**************** ticket table ****************/
function updateTotalBillAndCounts() {
    let totalBill = 0;
    let totalTickets = 0;
    const tableDate = document.querySelector('.js-table-date').innerHTML;
  
    
    ticketCategories.forEach((category) => {
        const ticketCount = parseInt(localStorage.getItem(`ticketCount_${category.id}`)) || 0;
        const ticketPrice = parseInt(localStorage.getItem(`ticketPrice_${category.id}`)) || 0;
  
        totalTickets += ticketCount;
        totalBill += ticketPrice;
  
        document.querySelector(`.js-table-${category.id}-count`).innerHTML = ticketCount;

        if (category.id === "inf-3000"){
            document.querySelector(`.js-table-${category.id}-price`).innerHTML = `Free`;
        }
        else{
            document.querySelector(`.js-table-${category.id}-price`).innerHTML = `$${ticketPrice}`;
        }
        
        localStorage.setItem('totalCount',totalTickets);
    });
  
    document.querySelector(`.js-table-total-count`).innerHTML = totalTickets;
    document.querySelector(`.js-table-total-bill`).innerHTML = `$${totalBill}`;

    updateConfirmButtonButtonStatus(totalBill, tableDate);

    if (countTicketExecuted !== true) {
        ticketCategories.forEach((category) => {
            localStorage.setItem(`ticketCount_${category.id}`, 0);
            document.querySelector(`.${category.id}`).innerHTML = 0;
        });
    }

    localStorage.setItem('totalBill',totalBill);
}
/**************** ticket table ****************/

/**************** confirm button ****************/
const confirmButton = document.querySelector('.js-confirm-button');

confirmButton.addEventListener('click', () => {
    window.location.href = 'details.html';
});

function updateConfirmButtonButtonStatus(totalBill) {
    if (totalBill > 0) {
        confirmButton.removeAttribute('disabled');
    } else {
        confirmButton.setAttribute('disabled', 'disabled');
    }
}
/**************** confirm button ****************/

/**************** ticket count HTMl ****************/
function ticketCountHTML(){
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
};
/**************** ticket count HTMl ****************/

/**************** duration ****************/
function timeSlotsHTML(){
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
}
/**************** duration ****************/
ticketCountHTML();
timeSlotsHTML();
countTicket();