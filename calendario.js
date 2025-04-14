





const calendar = document.querySelector('.calendar');
const currentMonth = document.getElementById('current-month');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const calendarContainer = document.querySelector('.calendar-container');

let currentDate = new Date(2025, 0); // Enero de 2025

function generateCalendar(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    let dayCounter = 1;
    let html = '';

    for (let i = 0; i < 6; i++) {
        html += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < startDay) {
                html += '<td></td>';
            } else if (dayCounter > daysInMonth) {
                html += '<td></td>';
            } else {
                const isCurrentDay = (date.getFullYear() === new Date().getFullYear() &&
                    date.getMonth() === new Date().getMonth() &&
                    dayCounter === new Date().getDate());
                const isWeekend = (j === 0 || j === 6);

                html += `<td class="${isCurrentDay ? 'current-day' : ''} ${isWeekend ? 'weekend' : ''}" data-day="${dayCounter}">
                    ${dayCounter}
                </td>`;
                dayCounter++;
            }
        }
        html += '</tr>';
    }

    calendar.querySelector('tbody').innerHTML = html;
    currentMonth.textContent = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    // Evento click en los días
    const days = document.querySelectorAll('.calendar td');
    days.forEach(day => {
        day.addEventListener('click', () => {
            const dayNumber = day.dataset.day;
            alert(`¡Hola! Hiciste clic en el día ${dayNumber} de ${currentMonth.textContent}`);
        });
    });
}

generateCalendar(currentDate);

prevMonthButton.addEventListener('click', () => {
    calendarContainer.classList.add('slide-right');
    setTimeout(() => {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        generateCalendar(currentDate);
        calendarContainer.classList.remove('slide-right');
    }, 500); // Aumento el tiempo de espera para la animación
});

nextMonthButton.addEventListener('click', () => {
    calendarContainer.classList.add('slide-left');
    setTimeout(() => {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        generateCalendar(currentDate);
        calendarContainer.classList.remove('slide-left');
    }, 500); // Aumento el tiempo de espera para la animación
});




