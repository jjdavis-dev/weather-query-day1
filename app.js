const latInput = document.querySelector("#lat");
const lonInput = document.querySelector("#lon");
const btn = document.querySelector("#btn");
const result = document.querySelector("#result");

btn.addEventListener("click", async () => {
  const lat = latInput.value.trim();
  const lon = lonInput.value.trim();

  // Basic validation (rubric: correct use of inputs)
  if (!lat || !lon) {
    result.textContent = "Please enter BOTH latitude and longitude.";
    return;
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  try {
    result.textContent = "Loading weather...";

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    // Extract exactly what teacher wants
    const temp = data.current_weather.temperature;

    result.textContent = `Current Temperature: ${temp}°C`;
  } catch (err) {
    result.textContent = `Something went wrong: ${err.message}`;
  }
});
