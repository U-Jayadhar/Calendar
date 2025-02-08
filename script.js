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
let dumDate = new Date();

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
  dumDate.setMonth(dumDate.getMonth() - 1);
  showDate(dumDate);
});

let next = document.getElementById("right");
next.addEventListener("click", function () {
  console.log(dumDate.getMonth);
  dumDate.setMonth(dumDate.getMonth() + 1);
  showDate(dumDate);
});

function hideShowBox(place, cbox) {
  place.addEventListener("click", function () {
    cbox.classList.toggle("hide");
  });

  document.body.addEventListener("click", function (e) {
    if (!cbox.contains(e.target) && !place.contains(e.target)) {
      cbox.classList.add("hide");
    }
  });
}

let allMonths = document.getElementById("allMonths");

for (let each in months) {
  let eachDiv = document.createElement("div");
  eachDiv.textContent = months[each].slice(0, 3);
  eachDiv.addEventListener("click", function () {
    dumDate.setMonth(each);
    showDate(dumDate);
    allMonths.classList.add("hide");
  });
  if (each == today.getMonth()) {
    eachDiv.classList.add("today");
  }
  allMonths.appendChild(eachDiv);
}

hideShowBox(monthPlace, allMonths);

let listYears = document.getElementById("listYears");
let allYears = document.getElementById("allYears");
var startYear = today.getFullYear();

function showYears(startYear) {
  allYears.innerHTML = "";
  for (let i = startYear; i < startYear + 12; i++) {
    let eachDiv = document.createElement("div");
    eachDiv.textContent = i;
    eachDiv.addEventListener("click", function () {
      dumDate.setFullYear(i);
      showDate(dumDate);
      listYears.classList.add("hide");
    });
    if (i === today.getFullYear()) {
      eachDiv.classList.add("today");
    }
    allYears.appendChild(eachDiv);
  }
}
showYears(startYear);

let upBtn = document.getElementById("up");
upBtn.addEventListener("click", function () {
  showYears((startYear -= 12));
});

let downBtn = document.getElementById("down");
downBtn.addEventListener("click", function () {
  showYears((startYear += 12));
});
hideShowBox(yearPlace, listYears);

let jumpToday = document.getElementById("jumpToday");

jumpToday.textContent = today.getDate();
if (
  dumDate.getDate() !== today.getDate() ||
  dumDate.getMonth() !== today.getMonth() ||
  dumDate.getFullYear() !== today.getFullYear()
) {
  jumpToday.classList.remove("hide");
}
jumpToday.addEventListener("click", function () {
  showDate(today);
  jumpToday.classList.add("hide");
});
