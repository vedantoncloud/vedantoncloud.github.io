document.addEventListener('DOMContentLoaded', function () {
const calendarEl = document.getElementById('calendar');


const calendar = new FullCalendar.Calendar(calendarEl, {
initialView: 'dayGridMonth',
initialDate: '2026-01-01',


events: [
{ title: '🪔 Makar Sankranti', date: '2026-01-14' },
{ title: '🌈 Holi', date: '2026-03-04' },
{ title: '🕉️ Ram Navami', date: '2026-03-26' },
{ title: '🪔 Diwali', date: '2026-11-08' },
{ title: '🙏 Dussehra', date: '2026-10-19' }
]
});


calendar.render();
});