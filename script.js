const calendarDates = document.getElementById('calendarDates');
const monthYear = document.getElementById('monthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

let currentDate = new Date();

function renderCalendar() {
    calendarDates.innerHTML = '';
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Update the header with the current month and year
    monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    // Determine the first day of the month and number of days in the month
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Sunday = 0, Monday = 1, etc.
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the current month

    // Create empty divs for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement('div');
        calendarDates.appendChild(emptyDiv);
    }

    // Create divs for each day in the month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;

        // Highlight the current day
        if (i === new Date().getDate() && 
            month === new Date().getMonth() && 
            year === new Date().getFullYear()) {
            dayDiv.classList.add('current-day');
        }

        calendarDates.appendChild(dayDiv);
    }

    // Fill the remaining cells in the last row with empty divs if necessary
    const totalCells = firstDayOfMonth + daysInMonth;
    if (totalCells % 7 !== 0) {
        const remainingCells = 7 - (totalCells % 7);
        for (let i = 0; i < remainingCells; i++) {
            const emptyDiv = document.createElement('div');
            calendarDates.appendChild(emptyDiv);
        }
    }
}

prevMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

searchButton.addEventListener('click', () => {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        const [searchMonth, searchYear] = searchValue.split('/');
        const parsedMonth = parseInt(searchMonth, 10) - 1;
        const parsedYear = parseInt(searchYear, 10);

        if (!isNaN(parsedMonth) && !isNaN(parsedYear) && parsedMonth >= 0 && parsedMonth <= 11) {
            currentDate.setMonth(parsedMonth);
            currentDate.setFullYear(parsedYear);
            renderCalendar();
        } else {
            alert('Please enter a valid date in MM/YYYY format.');
        }
    } else {
        alert('Please enter a date.');
    }
});

renderCalendar();
