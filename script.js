const btn = document.getElementById("btn");

btn.addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    document.getElementById("result").innerText = "Please enter a city";
    return;
  }

  fetch(`http://localhost:3000/weather?city=${city}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("result").innerText = data.error;
      } else {
        document.getElementById("result").innerHTML = `
          <p>🌡 Temperature: ${data.main.temp}°C</p>
          <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>☁️ Condition: ${data.weather[0].description}</p>
        `;
      }
    })
    .catch(() => {
      document.getElementById("result").innerText = "Server not running";
    });
}


