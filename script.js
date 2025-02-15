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

let jumpToday = document.getElementById("jumpToday");
jumpToday.classList.add("hide");
jumpToday.textContent = today.getDate();

jumpToday.addEventListener("click", function () {
  showCalan(today);
  dumDate = new Date();
  todayDate.innerHTML = "";
  userDate.innerHTML = "";
  jumpToday.classList.add("hide");
});

function ballJT(tracker) {
  if (
    tracker.getDate() !== today.getDate() ||
    tracker.getMonth() !== today.getMonth() ||
    tracker.getFullYear() !== today.getFullYear()
  ) {
    jumpToday.classList.remove("hide");
  } else {
    jumpToday.classList.add("hide");
  }
}

function displayDates(dumDate) {
  let todayDate = document.getElementById("todayDate");
  todayDate.innerHTML =
    'Today: <span style="color: #f0f8ff;">' +
    today.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) +
    "</span>";
  let userDate = document.getElementById("userDate");
  userDate.innerHTML =
    'Selected: <span style="color: #f0f8ff;">' +
    dumDate.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) +
    "</span>";
  ballJT(dumDate);
}

function showCalan(date) {
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
    let dateShow = document.querySelector(".dates-show");
    dateShow.style.visibility = "hidden";
    dayEl.addEventListener("click", function () {
      dumDate = new Date(yearNow, monthNow, i);
      dateShow.style.visibility = "visible";
      displayDates(dumDate);

      const allDayElements = document.querySelectorAll(".caldays div.active");
      allDayElements.forEach((element) => {
        element.classList.remove("active");
      });
      dayEl.classList.add("active");

      const todayEl = document.querySelectorAll(".caldays .today");
      todayEl.forEach((item) => {
        item.classList.remove("today");
        item.classList.add("todaylite");
      });
    });
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

showCalan(today);

let prev = document.getElementById("left");
prev.addEventListener("click", function () {
  dumDate.setMonth(dumDate.getMonth() - 1);
  showCalan(dumDate);
  ballJT(dumDate);
});

let next = document.getElementById("right");
next.addEventListener("click", function () {
  dumDate.setMonth(dumDate.getMonth() + 1);
  showCalan(dumDate);
  ballJT(dumDate);
});

let allMonths = document.getElementById("allMonths");

for (let each in months) {
  let eachDiv = document.createElement("div");
  eachDiv.textContent = months[each].slice(0, 3);
  eachDiv.addEventListener("click", function () {
    dumDate.setMonth(each);
    showCalan(dumDate);
    ballJT(dumDate);
    allMonths.classList.add("hide");
  });
  if (each == today.getMonth()) {
    eachDiv.classList.add("today");
  }
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
      showCalan(dumDate);
      ballJT(dumDate);
      listYears.classList.add("hide");
    });
    if (i === today.getFullYear()) {
      eachDiv.classList.add("today");
    }
    allYears.appendChild(eachDiv);
  }
}

let upBtn = document.getElementById("up");
upBtn.addEventListener("click", function () {
  showYears((startYear -= 12));
});

let downBtn = document.getElementById("down");
downBtn.addEventListener("click", function () {
  showYears((startYear += 12));
});

yearPlace.addEventListener("click", function () {
  listYears.classList.toggle("hide");
  showYears((startYear = today.getFullYear()-6));
});

document.body.addEventListener("click", function (e) {
  if (!listYears.contains(e.target) && !yearPlace.contains(e.target)) {
    listYears.classList.add("hide");
  }
});
