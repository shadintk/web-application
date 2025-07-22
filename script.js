const apiKey = "1dd6dafef061ab85a95e4fb20160a5e5"; 

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById("weatherResult").innerText = "City not found.";
        return;
      }

      const weather = `
        ${data.name}: ${data.main.temp}°C, ${data.weather[0].main}
      `;
      document.getElementById("weatherResult").innerText = weather;

    
      localStorage.setItem("lastCity", city);
      showSavedCity();
    })
    .catch(err => {
      document.getElementById("weatherResult").innerText = "Error fetching data.";
    });
}

function showSavedCity() {
  const saved = localStorage.getItem("lastCity");
  if (saved) {
    document.getElementById("savedCity").innerText = `Last searched: ${saved}`;
  }
}


window.onload = showSavedCity;