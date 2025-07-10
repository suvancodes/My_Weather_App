async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apikey = "51cb3c31b5ea4125b1e115212251706";
  const loader = document.getElementById("loader");
  loader.style.display = "block";

  if (city === "") {
    loader.style.display = "none";
    document.getElementById("loc-res").innerHTML = "_ _";
    document.getElementById("temp-res").innerHTML = "_ _";
    document.getElementById("feel-res").innerHTML = "_ _";
    document.getElementById("condi-con").innerHTML = `
      <h2>Condition</h2>
      <div id="condi-res">_ _</div>
    `;
    return;
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=5`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.error) {
      loader.style.display = "none";
      document.getElementById("loc-res").innerHTML = "city not found";
      document.getElementById("temp-res").innerHTML = "city not found";
      document.getElementById("feel-res").innerHTML = "city not found";
      document.getElementById("condi-con").innerHTML = "city not found";
      return;
    }

    const location = `${data.location.name}, ${data.location.country}`;
    const temp = data.current.temp_c;
    const temp_f = data.current.temp_f;
    const feelslike = data.current.feelslike_c;
    const feelslike_f = data.current.feelslike_f;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;
    const Dewpoint = data.current.dewpoint_c;
    const Wind_speed = data.current.wind_kph;
    const Wind_diraction = data.current.wind_dir;
    const Heat_Index = data.current.heatindex_c;
    const Pressure = data.current.pressure_mb;
    const humidity = data.current.humidity;
    const Last_Updated = data.current.last_updated;

    document.getElementById("loc-res").innerHTML = location;
    document.getElementById("temp-res").innerHTML = `<div>${temp} (${temp_f}˚ F)</div>`;
    document.getElementById("feel-res").innerHTML = `<div>${feelslike} (${feelslike_f}˚ F)</div>`;
    document.getElementById("condi-con").innerHTML = `
      <h2>Current Condition</h2>
      <div><img src="${icon}" alt="icon"></div>
      <div>${condition}</div>
    `;

    document.getElementById("other-con").innerHTML = `
      <h2>Others</h2>
      <span>💧Dewpoint: <span class="s">${Dewpoint}</span></span>
      <span>💨Wind speed: <span class="s">${Wind_speed}</span></span>
      <span>💨🔄Wind direction: <span class="s">${Wind_diraction}</span></span>
      <span>🥵Heat Index: <span class="s">${Heat_Index}</span></span>
      <span><img src="https://static.thenounproject.com/png/2136174-200.png" alt="pressure" class="img1"> Pressure: <span class="s">${Pressure}</span></span>
      <span>🌡Humidity: <span class="s">${humidity}</span></span>
      <span><p>⏰Last Updated: <span class="s">${Last_Updated}</span></p></span>
    `;

    const forecastHTML = data.forecast.forecastday.map(day => `
      <div>
        <h4>${day.date}</h4>
        <img src="${day.day.condition.icon}" alt="icon">
        <p>${day.day.condition.text}</p>
        <p>Max: ${day.day.maxtemp_c}°C</p>
        <p>Min: ${day.day.mintemp_c}°C</p>
      </div>
    `).join("");

    document.getElementById("forecastResult").innerHTML = `
      <h3>5-Day Forecast</h3>
      <div>${forecastHTML}</div>
    `;

    const hourlyHTML = data.forecast.forecastday[0].hour.map(hour => {
      const time = hour.time.split(" ")[1];
      return `
        <div>
          <h4>${time}</h4>
          <img src="${hour.condition.icon}" alt="icon">
          <p>${hour.condition.text}</p>
          <p>🌡 ${hour.temp_c}°C</p>
        </div>
      `;
    }).join("");

    document.getElementById("hourlyResult").innerHTML = `
      <h3>Today’s Hourly Forecast</h3>
      <div>${hourlyHTML}</div>
    `;

  } catch (error) {
    document.getElementById("weatherResult").innerText = error.message;
  } finally {
    loader.style.display = "none";
  }
}

document.getElementById("cityInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeather();
});
