
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "51cb3c31b5ea4125b1e115212251706";

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);


    if (data.error) {
      document.getElementById("weatherResult").innerText = data.error.message;
      return;
    }

    const location = data.location.name + ", " + data.location.country;
    const temp = data.current.temp_c;
    const feelslike = data.current.feelslike_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    document.getElementById("loc-res").innerHTML = location;
    document.getElementById("temp-res").innerHTML = temp;
    document.getElementById("feel-res").innerHTML = feelslike;
    document.getElementById("condi-con").innerHTML = `
      <h2>Current Condition</h2>
      <div><img src="${icon}" alt="icon"></div>
      <div>${condition}</div>
    `;

    const forecastHTML = data.forecast.forecastday.map(day => {
      return `
        <div style="margin: 10px; padding: 10px; border: 1px solid #ccc;">
          <h4>${day.date}</h4>
          <img src="${day.day.condition.icon}" alt="icon">
          <p>Condition: ${day.day.condition.text}</p>
          <p>Max: ${day.day.maxtemp_c}°C | Min: ${day.day.mintemp_c}°C</p>
        </div>
      `;
    }).join("");

    document.getElementById("forecastResult").innerHTML = `
      <h3>5-Day Forecast</h3>
      <div style="display: flex; flex-wrap: wrap;">${forecastHTML}</div>
    `;

  } catch (error) {
    document.getElementById("weatherResult").innerText = error.message;
  }
}

