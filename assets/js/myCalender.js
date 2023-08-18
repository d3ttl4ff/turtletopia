const r = document.querySelector(".js-current-date")
  , f = document.querySelector(".days");
let e = new Date;
const M = document.querySelectorAll(".js-icons span");
r.textContent = `${new Intl.DateTimeFormat("en-US",{
    month: "long",
    year: "numeric"
}).format(e)}`;
const s = ()=>{
    const a = new Date(e.getFullYear(),e.getMonth(),1)
      , n = new Date(e.getFullYear(),e.getMonth() + 1,0)
      , c = new Date(e.getFullYear(),e.getMonth(),0)
      , i = n.getDate()
      , u = a.getDay()
      , D = 6 - n.getDay();
    let l = "";
    for (let t = u; t > 0; t--) {
        const o = new Date(c.getFullYear(),c.getMonth(),c.getDate() - t + 1);
        l += `<li class="inactive-prev fade-in">${o.getDate()}</li>`
    }
    for (let t = 1; t <= i; t++) {
        const o = new Date(e.getFullYear(),e.getMonth(),t + 1);
        let y = document.createElement("li");
        y.textContent = t,
        o < new Date ? l += `<li class="inactive-prev fade-in" calendar-day">${t}</li>` : l += `<li class="calendar-day js-select-day fade-in">${t}</li>`
    }
    for (let t = 1; t <= D; t++)
        new Date(n.getFullYear(),n.getMonth() + 1,t),
        l += `<li class="inactive-next calendar-day">${t}</li>`;
    f.innerHTML = l,
    w(),
    h()
}
;
M.forEach(a=>{
    a.addEventListener("click", ()=>{
        if (a.id === "home")
            g();
        else if (a.id === "prev")
            if (e > new Date)
                m();
            else
                return;
        else
            a.id === "next" && Y();
        s()
    }
    )
}
);
function h() {
    const a = document.querySelectorAll(".calendar-day");
    a.forEach(function(n) {
        n.addEventListener("click", ()=>{
            a.forEach(function(c) {
                c.classList.remove("clicked")
            }),
            n.classList.add("clicked")
        }
        )
    })
}
function g() {
    e = new Date
}
function m() {
    e = new Date(e.getFullYear(),e.getMonth() - 1)
}
function Y() {
    e = new Date(e.getFullYear(),e.getMonth() + 1)
}
function v(a) {
    const n = a + " " + r.textContent;
    document.querySelector(".js-table-date").innerHTML = n,
    localStorage.setItem("selected_DD_MM_YY", n)
}
function w() {
    document.querySelectorAll(".js-select-day").forEach(n=>{
        const c = n.innerHTML;
        n.addEventListener("click", ()=>{
            v(c)
        }
        )
    }
    )
}
const d = document.querySelector(".js-table-date")
  , E = e.getDate();
d.textContent = `${E} ${r.textContent}`;
localStorage.setItem("selected_DD_MM_YY", d.textContent);
s();