const API_KEY = "0U7D9wfke1uQ0leQL4gOYVIN3PDJqyTeMxAI5DxS";
const datePicker = document.getElementById("date-picker");
const fetchButton = document.getElementById("fetch-button");

datePicker.value = getTodayDate(); // Set default date to today

fetchButton.addEventListener("click", () => {
    const selectedDate = datePicker.value;
    fetchAsteroids(selectedDate);
  });

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

async function fetchAsteroids(date) {
    const API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayAsteroids(data.near_earth_objects[date]);
  } catch (error) {
    console.error("Error fetching asteroid data:", error);
  }
}

function displayAsteroids(asteroids) {
  const container = document.getElementById("asteroid-list");
  container.innerHTML = "";

  if (!asteroids) {
    container.innerHTML = "<p class='text-red-500'>No asteroids found for this date.</p>";
    return;
  }

  asteroids.forEach(asteroid => {
    const card = `
      <div class="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold">${asteroid.name}</h2>
        <p><strong>Diameter:</strong> ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
        <p><strong>Velocity:</strong> ${parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2)} km/h</p>
        <p><strong>Closest Approach:</strong> ${asteroid.close_approach_data[0].close_approach_date}</p>
      </div>
    `;
    container.innerHTML += card;
  });
}

fetchAsteroids(getTodayDate());
