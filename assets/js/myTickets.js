import{ticketCategories as s}from"/assets/js/ticketCategories.js";import{peakHours as $}from"/assets/js/peakHours.js";import{updateSelection as c}from"/assets/js/dropdown.js";function d(){const n=document.querySelector(".js-calendear-time"),t=new Date;let e=t.getHours();const o=t.getMinutes().toString().padStart(2,"0"),i=t.getSeconds().toString().padStart(2,"0"),m=e>=12?"PM":"AM";e=e%12,e=e||12;const p=`${e}:${o}:${i} ${m}`;n.textContent=p}d();setInterval(d,1);let u=!1;function f(){const n=document.querySelectorAll(".js-add-remove");s.forEach(t=>{n.forEach(e=>{e.addEventListener("click",()=>{e.id===t.add_id?t.counter+=1:e.id===t.remove_id&&t.counter>0?t.counter-=1:e.id===t.reset_id&&(t.counter=0),document.querySelector(`.${t.id}`).innerHTML=t.counter,localStorage.setItem(`ticketCount_${t.id}`,t.counter),c(),a(),r()})}),c(),a(),r()}),u=!0}function r(){let n=!0;s.forEach(e=>{const o=document.querySelector(`.js-table-${e.id}-count`).closest("tr");e.counter>0?(o.style.display="table-row",n=!1):o.style.display="none"});const t=document.querySelector(".js-table-no-categories");n?t.style.display="table-row":t.style.display="none"}function a(){let n=0,t=0;document.querySelector(".js-table-date").innerHTML,s.forEach(e=>{const o=parseInt(localStorage.getItem(`ticketCount_${e.id}`))||0,i=parseInt(localStorage.getItem(`ticketPrice_${e.id}`))||0;t+=o,n+=i,document.querySelector(`.js-table-${e.id}-count`).innerHTML=o,e.id==="inf-3000"?document.querySelector(`.js-table-${e.id}-price`).innerHTML="Free":document.querySelector(`.js-table-${e.id}-price`).innerHTML=`$${i}`,localStorage.setItem("totalCount",t)}),document.querySelector(".js-table-total-count").innerHTML=t,document.querySelector(".js-table-total-bill").innerHTML=`$${n}`,b(n),u!==!0&&s.forEach(e=>{localStorage.setItem(`ticketCount_${e.id}`,0),document.querySelector(`.${e.id}`).innerHTML=0}),localStorage.setItem("totalBill",n)}const l=document.querySelector(".js-confirm-button");l.addEventListener("click",()=>{window.location.href="details.html"});function b(n){n>0?l.removeAttribute("disabled"):l.setAttribute("disabled","disabled")}function k(){let n="";s.forEach(t=>{const e=parseInt(localStorage.getItem(`ticketCount_${t.id}`))||0;t.counter=e,n+=`
            <div class="ticket-count-main-wrapper">
                <div class="ticket-count-category">
                    <span>${t.name}</span>
                    <br>
                    <span class="category-tag">${t.tag}</span>
                </div>
                <div class="ticket-count-counter">
                    <span id="${t.reset_id}" class="material-symbols-rounded reset-icon js-add-remove" >Refresh</span>
                    <span id="${t.remove_id}" class="material-symbols-rounded js-add-remove" >Remove</span>
                    <span class="count-number ${t.id}" data-ticket-counter="ticket-counter">${t.counter}</span>
                    <span id="${t.add_id}" class="material-symbols-rounded js-add-remove" ">Add</span>
                </div>
            </div>
        `}),document.querySelector(".ticket-count-main-container").innerHTML=n}function S(){let n="";const t=[3,4,5,8,9,10];$.forEach((e,o)=>{t.includes(o)?n+=`
            <label>
                <input type="checkbox" name="item" value="${e.start} - ${e.end}" class="time-slot peak-slot js-selection">${e.start} - ${e.end} ${e.status}
            </label> 
            `:n+=`
            <label>
                <input type="checkbox" name="item" value="${e.start} - ${e.end}" class="time-slot js-selection">${e.start} - ${e.end}
            </label> 
            `}),document.querySelector(".dropdown-content").innerHTML=n}k();S();f();
