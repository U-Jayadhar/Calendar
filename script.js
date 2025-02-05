const monthPlace = document.getElementById("monthPlace");
const yearPlace = document.getElementById("yearPlace");
const daysGrid = document.getElementById("calDays");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let today = new Date();
let selDate = new Date();

function showDate(date) {
  let yearNow = date.getFullYear();
  let monthNow = date.getMonth();
  let firstDay = new Date(yearNow, monthNow, 1).getDay();
  let lastDay = new Date(yearNow, monthNow + 1, 0).getDate();

  monthPlace.textContent = `${months[monthNow]}`;
  yearPlace.textContent = `${yearNow}`;

  daysGrid.innerHTML = "";
  const lastMonthLastDay = new Date(yearNow, monthNow, 0).getDate();
  for (let i = firstDay; i > 0; i--) {
    const dayEl = document.createElement("div");
    dayEl.textContent = lastMonthLastDay - i + 1;
    dayEl.classList.add("dim");
    daysGrid.appendChild(dayEl);
  }

  for (let i = 1; i <= lastDay; i++) {
    const dayEl = document.createElement("div");
    dayEl.textContent = i;

    if (
      i === today.getDate() &&
      monthNow === today.getMonth() &&
      yearNow === today.getFullYear()
    ) {
      dayEl.classList.add("today");
    }
    daysGrid.appendChild(dayEl);
  }

  const presMonthLastDay = 6 - new Date(yearNow, monthNow + 1, 0).getDay();
  for (let i = 1; i <= presMonthLastDay; i++) {
    const dayEl = document.createElement("div");
    dayEl.textContent = i;
    dayEl.classList.add("dim");
    daysGrid.appendChild(dayEl);
  }
}

showDate(today);

let prev = document.getElementById("left");
prev.addEventListener("click", function () {
  selDate.setMonth(selDate.getMonth() - 1);
  showDate(selDate);
});

let next = document.getElementById("right");
next.addEventListener("click", function () {
  console.log(selDate.getMonth);
  selDate.setMonth(selDate.getMonth() + 1);
  showDate(selDate);
});

let allMonths = document.getElementById("allMonths");

for (let each in months) {
  let eachDiv = document.createElement("div");
  eachDiv.textContent = months[each].slice(0, 3);
  eachDiv.addEventListener("click", function () {
    selDate.setMonth(each);
    showDate(selDate);
    allMonths.classList.add("hide");
  });
  allMonths.appendChild(eachDiv);
}
monthPlace.addEventListener("click", function () {
  allMonths.classList.toggle("hide");
});

document.body.addEventListener("click", function (e) {
  if (!allMonths.contains(e.target) && !monthPlace.contains(e.target)) {
    allMonths.classList.add("hide");
  }
});
