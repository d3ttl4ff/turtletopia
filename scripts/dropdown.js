import { ticketCategories } from '/scripts/ticketCategories.js';

function toggleDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}
  
function updateSelection() {
    const selectedRegularTimeSlots = [];
    const selectedPeakTimeSlots = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let lastSelectedIndex = -1;

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            if(lastSelectedIndex === -1 || lastSelectedIndex === index - 1){
                if(checkbox.classList.contains('peak-slot')){
                    selectedPeakTimeSlots.push(checkbox.value);
                }
                else{
                    selectedRegularTimeSlots.push(checkbox.value);
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

        // console.log("regular price:  " + regularTicketPrice);
        // console.log("peak price " + peakTicketPrice);
        // console.log("total price: " + totalTicketPrice);
        // console.log();
    
        // localStorage.setItem(`ticketPrice_${category.id}`, totalTicketPrice);
    });
    
    
    if (selectedRegularTimeSlots.length > 0) {
        const startTime = selectedRegularTimeSlots[0].split(" - ")[0]; // Get start time of the top-most item
        const endTime = selectedRegularTimeSlots[selectedRegularTimeSlots.length - 1].split(" - ")[1]; // Get end time of the bottom-most item
        const selectedText = `${startTime} - ${endTime}`;

        document.querySelector('.selected-text').textContent = selectedText;
        document.querySelector('.js-table-time').innerHTML = selectedText;
    } 
    else {
        document.querySelector('.selected-text').textContent = 'Select Time Slots';
        document.querySelector('.js-table-time').innerHTML = 'N/A';
    }
}

export function updateDuration(){
    const toggle = document.querySelector('.select-box');
    const checkbox = document.querySelectorAll('.js-selection');

    toggle.addEventListener('click', () => {
        toggleDropdown();
    })

    checkbox.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            updateSelection();
        })
    })
}
updateDuration();



