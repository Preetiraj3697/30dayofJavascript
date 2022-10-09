// set variables
let today = new Date();
let dayInt = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();
// body of the calendar
let calendarBody = document.getElementById("days");

let months = [
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
	"December"
];

// next and previous functionality
let nextbtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");

nextbtn.onclick = function() {
	next();
};
prevBtn.onclick = function() {
	previous();
};

// on select of date
// let selectDay = document.getElementsByClassName("singleDay");

// init calendar
showCalendar(month, year);

function showCalendar(month, year) {
	// gets the day of the week for this date
	let firstDay = new Date(year, month).getDay();
	// clearing all previous cells
	calendarBody.innerHTML = "";
	// checking the mount of days in this month to control the loop
	let totalDays = daysInMonth(month, year);

	// adding the blank boxes so that date start on correct day of the week
	blankDates(firstDay);
	// adding the dates to the calendar
	for (let day = 1; day <= totalDays; day++) {
		// create li node with text content & apend to body
		let cell = document.createElement("li");
		let cellText = document.createTextNode(day);
		// adding active class if day matches today
		if (
			dayInt === day &&
			month === today.getMonth() &&
			year === today.getFullYear()
		) {
			cell.classList.add("active");
		}

		// appending date attributes to single date li element
		cell.setAttribute("data-day", day);
		cell.setAttribute("data-month", month);
		cell.setAttribute("data-year", year);

		//appending li to body of calendar
		cell.classList.add("singleDay");
		cell.appendChild(cellText);
		calendarBody.appendChild(cell);
	}

	// set month string value
	document.getElementById("month").innerHTML = months[month];
	// set year string value
	document.getElementById("year").innerHTML = year;
}

function daysInMonth(month, year) {
	// day 0 here returns the last day of the PREVIOUS month
	return new Date(year, month + 1, 0).getDate();
}

function blankDates(count) {
	// looping to add the correct amount of blank days to the calendar
	for (let x = 0; x < count; x++) {
		let cell = document.createElement("li");
		let cellText = document.createTextNode("");
		cell.appendChild(cellText);
		calendarBody.appendChild(cell);
	}
}

function next() {
	year = month === 11 ? year + 1 : year;
	month = (month + 1) % 12;
	showCalendar(month, year);
}

function previous() {
	year = month === 0 ? year - 1 : year;
	month = month === 0 ? 11 : month - 1;
	showCalendar(month, year);
}

// function select(d, m, y) {
// 	document.getElementById("select").innerHTML = new Date(y, m, d);
// }
