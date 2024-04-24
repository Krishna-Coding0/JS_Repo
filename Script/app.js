const apiKey = "d394b8a7084a3a62b3f13844ff7eeb99";
const btn = document.getElementById("btn-get-location");
const cityname = document.getElementById("City-name");
const list = document.getElementById("list");

btn.addEventListener("click", fetchLocation);

async function fetchLocation() {
  if (cityname.value) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname.value}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      renderWeatherData(data,cityname.value);
      btn.disabled = true;
    } catch (error) {
      console.log(error);
    }
  } else {
    getGeolocation();
  }
}

async function getGeolocation(temp) {
  let latitude, longitude;
  try {
    const position = await getCurrentPosition();
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    if (latitude && longitude) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      renderWeatherData(data,'Current ');
      btn.disabled = true;
    }
  } catch (error) {
    alert("Sorry Can't Fetch Data");
    return;
  }
}

async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function renderWeatherData(data,UserDefine) {
  list.innerHTML += `<h1>${UserDefine} User Weather Location Data</h1>
                        <li>Logitude: ${data["coord"]["lon"]}</li>
                        <li>Latitude: ${data["coord"]["lat"]}</li>
                        <h1>Weather:</h1>
                        <li>Main:${data["weather"][0].main}</li>
                        <li>Description:${data["weather"][0].description}</li>
                        <h1>Main:</h1>
                        <li>Temp:${data["main"]["temp"] - 273.15}</li>
                        <li>Feels Like:${data["main"]["feels_like"]}</li>
                        <li>Minimum Tempreture :${data["main"]["temp_min"]}</li>
                        <li>Maximum Tempreture :${data["main"]["temp_max"]}</li>
                        <li>Pressure:${data["main"]["pressure"]}</li>
                        <li>Humidity:${data["main"]["humidity"]}</li>
                        <li>Sea Level:${data["main"]["sea_level"]}</li>
                        <li>Grand level:${data["main"]["grnd_level"]}</li>
                        <li>Visibility:${data["visibility"]}</li>
                        <h1>Wind:</h1>
                        <li>Speed:${data["wind"]["speed"]}</li>
                        <li>Degree:${data["wind"]["deg"]}</li>
                        <li>Gust:${data["wind"]["gust"]}</li>
                        <h1>clouds:</h1>
                        <li>All:${data["clouds"]["all"]}</li>
                        <li>UTC:${data["dt"]}</li>
                        <h1>Country Other Details:</h1>
                        <li>UTC:${data["sys"]["country"]}</li>
                        <li>UTC:${data["sys"]["sunrise"]}</li>
                        <li>UTC:${data["sys"]["sunset"]}</li>
                        <li>UTC:${data["name"]}</li>
                        <li>UTC:${data["cod"]}</li>`;
}
