const weddingDate = new Date('2026-08-16T10:45:00+05:30');
const gate = document.getElementById('gate');
const invitation = document.getElementById('invitation');
const audio = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

const eventData = {
  haldi: {
    ritual: 'Celebration 1', day: 'Friday, 14 August 2026', title: 'Haldi Ceremony',
    time: '10:30 AM', venue: "Groom's House", image: '../assets/haldi.png', alt: 'Haldi ceremony illustration',
    theme: 'haldi-theme', tagline: 'A joyful morning of turmeric, blessings and laughter.',
    note: 'Join us as the wedding celebrations begin with love and blessings.'
  },
  sangeeth: {
    ritual: 'Celebration 2', day: 'Saturday, 15 August 2026', title: 'Sangeeth Night',
    time: '6:00 PM', venue: 'IMA Hall, Mahabubabad', image: '../assets/sangeeth.png', alt: 'Sangeeth celebration illustration',
    theme: 'sangeeth-theme', tagline: 'A vibrant night of music, dance and celebration.',
    note: 'Bring your energy and join us for an unforgettable evening.'
  },
  wedding: {
    ritual: 'Celebration 3', day: 'Sunday, 16 August 2026', title: 'The Wedding',
    time: '10:45 AM', venue: 'Nandana A/C Gardens, Mahabubabad', image: '../assets/wedding.png', alt: 'Traditional Telugu wedding ceremony illustration',
    theme: 'wedding-theme', tagline: 'Two hearts, two families and one beautiful beginning.',
    note: 'Wedding ceremony at 10:45 AM. Lunch follows at 12:30 PM.'
  },
  reception: {
    ritual: 'Celebration 4', day: 'Tuesday, 18 August 2026', title: 'Wedding Reception',
    time: 'To be announced', venue: 'Vinova Pride, Hyderabad', image: '../assets/wedding.png', alt: 'Elegant wedding reception illustration',
    theme: 'reception-theme', tagline: 'An elegant evening celebrating the newly married couple.',
    note: 'Reception time will be announced shortly.'
  }
};

function startInvitation() {
  gate.classList.add('open', 'fade');
  invitation.hidden = false;
  setTimeout(() => gate.remove(), 1600);
  launchPetals(28);
  audio.play().then(() => musicToggle.classList.add('playing')).catch(() => {});
}

gate.addEventListener('click', startInvitation, { once: true });
gate.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') startInvitation();
}, { once: true });

musicToggle.addEventListener('click', () => {
  if (audio.paused) audio.play().then(() => musicToggle.classList.add('playing')).catch(() => {});
  else { audio.pause(); musicToggle.classList.remove('playing'); }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

function updateCountdown() {
  const diff = Math.max(0, weddingDate - Date.now());
  document.getElementById('days').textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
  document.getElementById('hours').textContent = String(Math.floor(diff / 3600000) % 24).padStart(2, '0');
  document.getElementById('minutes').textContent = String(Math.floor(diff / 60000) % 60).padStart(2, '0');
  document.getElementById('seconds').textContent = String(Math.floor(diff / 1000) % 60).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

function showEvent(key) {
  const data = eventData[key];
  const card = document.getElementById('eventCard');
  card.className = `event-card ${data.theme} changing`;
  setTimeout(() => {
    document.getElementById('eventRitual').textContent = data.ritual;
    document.getElementById('eventDay').textContent = data.day;
    document.getElementById('eventTitle').textContent = data.title;
    document.getElementById('eventTime').textContent = data.time;
    document.getElementById('eventVenue').textContent = data.venue;
    document.getElementById('eventTagline').textContent = data.tagline;
    document.getElementById('eventNote').textContent = data.note;
    const image = document.getElementById('eventImage'); image.src = data.image; image.alt = data.alt;
    card.classList.remove('changing');
  }, 160);
}

document.querySelectorAll('.event-tab').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.event-tab').forEach(tab => { tab.classList.remove('active'); tab.setAttribute('aria-selected', 'false'); });
    button.classList.add('active'); button.setAttribute('aria-selected', 'true'); showEvent(button.dataset.event);
    if (window.innerWidth < 760) document.getElementById('eventCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

document.getElementById('rsvpForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('guestName').value.trim();
  const count = document.getElementById('guestCount').value;
  const selectedEvent = document.getElementById('eventChoice').value;
  const text = `Namaste, this is ${name}. We are delighted to attend ${selectedEvent} for Mani Krishna and Dr. Sahithi. Number of guests: ${count}.`;
  window.open(`https://wa.me/918328668282?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

document.getElementById('calendarBtn').addEventListener('click', event => {
  event.preventDefault();
  const calendar = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20260816T051500Z\nDTEND:20260816T073000Z\nSUMMARY:Wedding of Mani Krishna & Dr. Sahithi\nLOCATION:Nandana A/C Gardens, Mahabubabad\nDESCRIPTION:Wedding ceremony at 10:45 AM. Lunch follows at 12:30 PM.\nEND:VEVENT\nEND:VCALENDAR`;
  const blob = new Blob([calendar], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob); const link = document.createElement('a');
  link.href = url; link.download = 'Mani-Sahithi-Wedding.ics'; link.click(); URL.revokeObjectURL(url);
});

function launchPetals(count = 20) {
  const container = document.getElementById('petals');
  for (let index = 0; index < count; index += 1) {
    const petal = document.createElement('span'); petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}vw`; petal.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
    petal.style.animationDuration = `${4 + Math.random() * 5}s`; petal.style.animationDelay = `${Math.random() * 1.2}s`;
    petal.style.background = ['#d95f7c', '#f0b33c', '#fff0e1', '#b54a68'][Math.floor(Math.random() * 4)];
    container.appendChild(petal); setTimeout(() => petal.remove(), 10000);
  }
}
setInterval(() => launchPetals(4), 2500);
