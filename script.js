async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apikey = "51cb3c31b5ea4125b1e115212251706";

  if (city === "") {
    document.getElementById("loc-res").innerHTML = "_ _";
    document.getElementById("temp-res").innerHTML = "_ _";
    document.getElementById("feel-res").innerHTML = "_ _";
    document.getElementById("condi-con").innerHTML = "_ _";
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
      document.getElementById("loc-res").innerHTML = "city not found";
      document.getElementById("temp-res").innerHTML = "city not found";
      document.getElementById("feel-res").innerHTML = "city not found";
      document.getElementById("condi-con").innerHTML = "city not found";
      
      return;
    }

    const location = data.location.name + ", " + data.location.country;
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
    document.getElementById("temp-res").innerHTML = `<div>${temp} (${temp_f}˚ F)</div>
    `;
    document.getElementById("feel-res").innerHTML = `<div>${feelslike} (${feelslike_f}˚ F)</div>`;
    document.getElementById("condi-con").innerHTML = `
      <h2>Current Condition</h2>
      <div><img src="${icon}" alt="icon"></div>
      <div>${condition}</div>
    `;

    document.getElementById("other-con").innerHTML = `
    <h2>Others</h2>
          <span>💧Dewpoint ${Dewpoint} </span>
          <span>💨Wind speed ${Wind_speed} </span>
          <span>💨🔄Wind diraction ${Wind_diraction} </span>
          <span>🥵Heat Index ${Heat_Index} </span>
          <span><img src="https://static.thenounproject.com/png/2136174-200.png" alt="prassure">Pressure ${Pressure} </span>
          <span>🌡humidity ${humidity} </span>
          <span><p>⏰Last Updated ${Last_Updated} </p> </span>
    `



    const forecastHTML = data.forecast.forecastday
      .map((day) => {
        return `
        <div style="margin: 10px; padding: 10px; border: 1px solid #ccc;">
          <h4>${day.date}</h4>
          <img src="${day.day.condition.icon}" alt="icon">
          <p>Condition: ${day.day.condition.text}</p>
          <p>Max: ${day.day.maxtemp_c}°C | Min: ${day.day.mintemp_c}°C</p>
        </div>
      `;
      })
      .join("");

    document.getElementById("forecastResult").innerHTML = `
      <h3>5-Day Forecast</h3>
      <div style="display: flex; flex-wrap: wrap;">${forecastHTML}</div>
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerText = error.message;
  }
}
