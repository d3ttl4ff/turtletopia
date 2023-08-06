import { ticketCategories } from '/scripts/ticketCategories.js';

const currentDate = document.querySelector('.js-current-date');
const daysTag = document.querySelector('.js-days');
const prevNextIcon = document.querySelectorAll('.js-icons span');
const homeIcon = document.querySelector('.js-home-icon');
const calendarTime = document.querySelector('.js-calendear-time');

//getting current year and month
let date = new Date(),
currentYear = date.getFullYear(),
currentMonth = date.getMonth();

const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]

const renderCalender = () => {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(),
    lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(),
    lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay(),
    lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    let liDayTag = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        liDayTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;   
    }
    
    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === date.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? "active" : ""
        liDayTag += `<li class="${isToday} calendar-day">${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++){
        liDayTag += `<li class="inactive calendar-day">${i - lastDayOfMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liDayTag;
}
renderCalender();

prevNextIcon.forEach((icon) => {
    icon.addEventListener('click', () => {
        currentMonth = icon.id === 'prev' ? currentMonth - 1 : currentMonth + 1;

        if(currentMonth < 0 || currentMonth > 11){
            date = new Date(currentYear, currentMonth);
            currentYear = date.getFullYear(); //updating cuurent year with new date year
            currentMonth = date.getMonth(); //updating cuurent month with new date month
        }
        else{
            date = new Date();
        }

        renderCalender();
    })
});

homeIcon.addEventListener('click', () => {
    const currentDate = new Date(); //getting the current date
    console.log(currentDate);
    currentYear = currentDate.getFullYear();
    currentMonth = currentDate.getMonth();
    renderCalender();
});


/**************** storing calendar day ****************/
const calendarDays = document.querySelectorAll('.calendar-day');

const saveSelectedDay = (day) => {
    localStorage.setItem('Selected Day', day)
};

const getSelectedDay = () => {
    return localStorage.getItem('Selected Day')
};
storeDate();

function storeDate(){
    calendarDays.forEach((dayElement) => {
        dayElement.addEventListener('click', () => {
            const selectedDay = parseInt(dayElement.innerText, 10);
            const currentDay = date.getDate();
    
            //only the current day and the days after can be selected
            if(selectedDay >= currentDay){
                saveSelectedDay(selectedDay);
    
                calendarDays.forEach((element) => {
                    element.classList.remove('selected');
                });
                dayElement.classList.add('selected');

                const storedSelectedDay = getSelectedDay();
                console.log('Selected Day', storedSelectedDay);
            }
        });
    });    
}
/**************** storing calendar day ****************/

/**************** update time ****************/
function updateCurrentTime(){
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

                let ticketPrice = category.counter * category.price.normal;
                console.log(typeof ticketPrice);

                localStorage.setItem(`ticketCount_${category.id}`, category.counter);
                
            });
        });  
    });
}

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
/**************** ticket count ****************/

/**************** ticket table ****************/
// document.querySelector('.ticket-count-main-container')
//     .innerHTML = ticketCounterHTML;
/**************** ticket table ****************/



