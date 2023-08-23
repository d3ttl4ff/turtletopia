const currentMonthYear = document.querySelector('.js-current-date');
const daysContainer = document.querySelector('.days');
let currentDate = new Date();
const prevNextIcon = document.querySelectorAll('.js-icons span');

currentMonthYear.textContent = `${new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate)}`;

export const renderCalendar = () => {
    currentMonthYear.textContent = `${new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate)}`;

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const prevMonthDays = firstDayOfMonth.getDay();
    const nextMonthDays = 6 - lastDayOfMonth.getDay();

    let daysHTML = '';
    for (let i = prevMonthDays; i > 0; i--) {
        const date = new Date(prevMonthLastDay.getFullYear(), prevMonthLastDay.getMonth(), prevMonthLastDay.getDate() - i + 1);
        daysHTML += `<li class="inactive-prev fade-in">${date.getDate()}</li>`; 
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);

        let dayElement = document.createElement("li");
        dayElement.textContent = i;

        if (date < new Date()) {
            daysHTML += `<li class="inactive-prev fade-in" calendar-day">${i}</li>`;
        } 
        else{
            daysHTML += `<li class="calendar-day js-select-day fade-in">${i}</li>`;
        }
    }
    
    for (let i = 1; i <= nextMonthDays; i++) {
        const date = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth() + 1, i);
        daysHTML += `<li class="inactive-next calendar-day">${i}</li>`
    }

    daysContainer.innerHTML = daysHTML;
    selectedDay();
    selectedDayEffect();
}
// renderCalendar();

prevNextIcon.forEach((icon) => {
    icon.addEventListener('click', () => {
        if(icon.id === 'home'){
            homeMonth();
        }
        else if (icon.id === 'prev') {
            const currentDay = new Date();

            if(currentDate > currentDay){
                prevMonth();
            }
            else{
                return;
            }
        } 
        else if (icon.id === 'next'){
            nextMonth();
        }

        renderCalendar();
    })
});

function selectedDayEffect(){
    const calendarDays = document.querySelectorAll(".calendar-day");

    calendarDays.forEach(function(day) {
        day.addEventListener("click", () => {
            calendarDays.forEach(function(day) {
                day.classList.remove("clicked");
            });

            day.classList.add("clicked");
        });
    });
}

function homeMonth() {
    currentDate = new Date();
    // renderCalendar();
}

function prevMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    // renderCalendar();
}

function nextMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    // renderCalendar();
}
  
function selectDate(day) {
    const selectedDDMMYY = day + " " + currentMonthYear.textContent;

    document.querySelector('.js-table-date')
        .innerHTML = selectedDDMMYY;
    
    localStorage.setItem('selected_DD_MM_YY', selectedDDMMYY);
}

function selectedDay(){
    const selectDayElements = document.querySelectorAll('.js-select-day');

    selectDayElements.forEach((element) => {
    const day = element.innerHTML;

    element.addEventListener('click', () => {
        selectDate(day);
        })
    });
}

const tableCurrentMonthYear = document.querySelector('.js-table-date');

const day = currentDate.getDate();
tableCurrentMonthYear.textContent =`${day} ${currentMonthYear.textContent}`;
localStorage.setItem('selected_DD_MM_YY', tableCurrentMonthYear.textContent);

renderCalendar();








