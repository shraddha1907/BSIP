window.onload = function () {
    document.getElementById("search-btn").addEventListener("click", () => {
      const city = document.getElementById("city-input").value.trim();
      if (city !== "") {
        getWeather(city);
      } else {
        alert("Please enter a city name.");
      }
    });
  
    document.getElementById("refresh-btn").addEventListener("click", () => {
      const city = document.getElementById("city-input").value.trim();
      if (city !== "") {
        getWeather(city);
      } else {
        alert("Please enter a city name.");
      }
    });

    document.getElementById("dark-mode-toggle").addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
    
  
    getWeather("Nashik"); 
  };
  
  function getWeather(city) {
    const apiKey = "2932349d67cd1ef7cab41a64fbef4d62"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
    console.log("📡 Fetching weather for:", city);
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          const temp = data.main.temp;
          const humidity = data.main.humidity;
          const wind = data.wind.speed;
          const description = data.weather[0].description;
          const emoji = getWeatherEmoji(description);
  
          document.getElementById("temperature").textContent = `Temperature: ${temp}°C`;
          document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
          document.getElementById("wind").textContent = `Wind: ${wind} km/h`;
          document.getElementById("description").textContent = `Condition: ${description} ${emoji}`;
        } else {
          showError("City not found 😞");
        }
      })
      .catch((error) => {
        console.error("❌ API error:", error);
        showError("Error fetching weather data");
      });
  }
  
  function showError(message) {
    document.getElementById("temperature").textContent = message;
    document.getElementById("humidity").textContent = "";
    document.getElementById("wind").textContent = "";
    document.getElementById("description").textContent = "";
  }
  
  function getWeatherEmoji(description) {
    description = description.toLowerCase();
    if (description.includes("cloud")) return "☁️";
    if (description.includes("rain") || description.includes("drizzle")) return "🌧️";
    if (description.includes("thunder")) return "⛈️";
    if (description.includes("snow")) return "❄️";
    if (description.includes("clear")) return "☀️";
    if (description.includes("mist") || description.includes("fog") || description.includes("haze")) return "🌫️";
    return "🌈";
  }
  
  