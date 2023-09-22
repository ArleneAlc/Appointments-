// JS for calendar functions
const calendar = document.querySelector('.calendar'),
    date = document.querySelector('.date'),
    daysContainer = document.querySelector('.days'),
    prev = document.querySelector('.prev')
    next = document.querySelector('.next'),
    todayBtn = document.querySelector('.today-btn'),
    gotoBtn = document.querySelector('.goto-btn'),
    dateInput = document.querySelector('.date-input');

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();


const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

// function to add days

function initCalendar() {
    //to get prev month days and current month all days and rem next month days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month , 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    // update date top of calendar
    date.innerHTML = months[month] + ' ' + year;

    // adding days on dom

    let days = '';

    // prev month days

    for(let x = day; x>0; x--){
        days += `<div class ='day prev-date' >${prevDays -x +1}</div>`;
    }

    // current month days

    for(let i = 1; i <= lastDate; i++){
        // if day is today add class today
        if(
            i === new Date().getDate() &&
            year ===new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            days += `<div class ='day today' >${i}</div>`;
        }
        // add remaining as it is
        else {
            days += `<div class='day'> ${i} </div>`;
    }
    }

    // next month days

    for (let j = 1; j <= nextDays; j++){
        days += `<div class ='day next-date' >${j}</div>`;
    }
    daysContainer.innerHTML = days;
}

initCalendar();

// prev month

function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

// next month

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

// add eventlistener on prev and next

prev.addEventListener('click' , prevMonth);
next.addEventListener('click' , nextMonth);


// adding goto date and goto today function

todayBtn.addEventListener('click' , ()=> {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener('keyup' , (e) => {
    // allow numerical data, remove anything else
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, '');
    if(dateInput.value.length === 2) {
        // add slash if 2 numbers are entered
        dateInput.value += '/';
    }
    if (dateInput.value.length > 7) {
        // do not allow more than 7 character
        dateInput.value = dateInput.value.slice(0, 7);
    }
    
    // if backspace is pressed
    if (e.inputType === 'deleteContentBackward') {
        if(dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener('click', gotoDate);

// function to go to input date

function gotoDate() {
    const dateArr = dateInput.value.split('/');
    // some date validation
    if(dateArr.length === 2) {
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    // if invalid date
    alert('invalid date');
};

// script for the dashboard
const body = document.querySelector('body'),
    sidebar = body.querySelector('.sidebar'),
    // toggle = body.querySelector('.toggle'),
    searchBtn = body.querySelector('.search-box'),
    // modeSwitch = body.querySelector('.toggle-switch'),
    modeText = body.querySelector('.mode-text');

// toggle.addEventListener('click', () => {
//     sidebar.classList.toggle('close');
// });

searchBtn.addEventListener('click', () => {
    sidebar.classList.remove('close');
});

// modeSwitch.addEventListener('click', () => {
//     body.classList.toggle('dark');

//     if(body.classList.contains('dark')){
//         modeText.innerText = 'Light Mode';
//     }else{
//         modeText.innerText = 'Dark Mode';
//     }
// });