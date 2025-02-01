const monthYear = document.getElementById("monthYear");
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

let today = new Date(2025, 2, 5);
let selDate = new Date();

console.log(new Date(2025, 2, 0).getDay());

function showDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let firstDay = new Date(year, month, 1).getDay();
  let lastDay = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${months[month]} ${year}`;

  daysGrid.innerHTML = "";
  const lastMonthLastDay = new Date(year, month, 0).getDate();
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
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayEl.classList.add("today");
    }
    daysGrid.appendChild(dayEl);
  }

  const presMonthLastDay = 6 - new Date(year, month + 1, 0).getDay();
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
  let prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  showDate(prevMonth);
});

let next = document.getElementById("right");
next.addEventListener("click", function () {
  let nexMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  showDate(nexMonth);
});
