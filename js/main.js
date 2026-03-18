/**
 * Main application logic for the Home page
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Auth UI
  Auth.updateUI();

  // 2. Populate Station Dropdowns
  const fromSelect = document.getElementById('from-station');
  const toSelect = document.getElementById('to-station');

  if (fromSelect && toSelect) {
    window.STATIONS.forEach(station => {
      const option1 = document.createElement('option');
      option1.value = station.code;
      option1.textContent = `${station.name} (${station.code})`;
      fromSelect.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = station.code;
      option2.textContent = `${station.name} (${station.code})`;
      toSelect.appendChild(option2);
    });
  }

  // Set min date to today for the date picker
  const dateInput = document.getElementById('travel-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }

  // 3. Handle Search Form Submission
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const source = document.getElementById('from-station').value;
      const destination = document.getElementById('to-station').value;
      const date = document.getElementById('travel-date').value;

      if (source === destination) {
        alert("Source and destination cannot be the same.");
        return;
      }

      performSearch(source, destination, date);
    });
  }
});

function performSearch(source, destination, date) {
  // In a real app, this would be an API call.
  // Here we filter the mock TRAINS array.
  
  const results = window.TRAINS.filter(t => t.source === source && t.destination === destination);
  
  renderResults(results, source, destination, date);
}

function renderResults(trains, sourceCode, destCode, date) {
  const resultsSection = document.getElementById('results-section');
  const trainsList = document.getElementById('trains-list');
  const searchSummary = document.getElementById('search-summary');

  resultsSection.classList.remove('hidden');
  trainsList.innerHTML = ''; // Clear previous results

  const sourceName = window.STATIONS.find(s => s.code === sourceCode)?.name || sourceCode;
  const destName = window.STATIONS.find(s => s.code === destCode)?.name || destCode;
  
  searchSummary.textContent = `${trains.length} Trains found from ${sourceName} to ${destName} on ${date}`;

  if (trains.length === 0) {
    trainsList.innerHTML = `
      <div style="text-align: center; padding: 3rem; background: white; border-radius: 0.5rem; border: 1px dashed var(--border);">
        <h3 style="color: var(--text-muted);">No trains found for this route.</h3>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Try NDLS to MMCT or NDLS to LKO for mock results.</p>
      </div>
    `;
    return;
  }

  trains.forEach(train => {
    // Determine lowest fare for display
    const fares = Object.values(train.fares);
    const minFare = Math.min(...fares);

    const card = document.createElement('div');
    card.className = 'train-card';
    card.innerHTML = `
      <div class="train-info">
        <div class="train-header">
          <span class="train-name">${train.name}</span>
          <span class="train-no">${train.trainNo}</span>
        </div>
        <div class="train-route">
          <div class="route-point">
            <span class="route-time">${train.departureTime}</span>
            <span class="route-station">${train.source}</span>
          </div>
          <div class="route-duration">
            <span style="background: white; padding: 0 0.5rem;">${train.duration}</span>
          </div>
          <div class="route-point">
            <span class="route-time">${train.arrivalTime}</span>
            <span class="route-station">${train.destination}</span>
          </div>
        </div>
      </div>
      <div class="train-actions">
        <div class="class-tags">
          ${train.classes.map(c => `<span class="class-tag">${c}</span>`).join('')}
        </div>
        <span style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin: 0.5rem 0;">₹${minFare} <span style="font-size: 0.75rem; font-weight:400; color:var(--text-muted)">onwards</span></span>
        <button class="btn btn-primary" onclick="initiateBooking('${train.trainNo}', '${date}')">Book Now</button>
      </div>
    `;
    trainsList.appendChild(card);
  });
}

function initiateBooking(trainNo, date) {
  // Check if user is logged in
  if (!Auth.getCurrentUser()) {
    // Save search context to return after login
    sessionStorage.setItem('pendingBooking', JSON.stringify({ trainNo, date }));
    alert('Please log in to book a ticket.');
    window.location.href = 'login.html';
    return;
  }

  // Redirect to booking page with URL parameters
  window.location.href = `book.html?trainNo=${trainNo}&date=${date}`;
}
