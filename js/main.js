const API_KEY = "34383e7b10e62f60e2f9068e5e03cf5c";
const icon = name => `http://openweathermap.org/img/wn/${name}@2x.png`;

let _celsius =          document.querySelector("#celsius"),
    _farenheit =        document.querySelector("#farenheit"),
    _locationTimezone = document.querySelector("#location-timezone"),
    _city =             document.querySelector('#city'),
    _flCelsius =        document.querySelector('#fl-celsius'),
    _flFarenheit =      document.querySelector("#fl-farenheit"),
    _windSpeed =        document.querySelector("#wind-speed"),
    _humidity =         document.querySelector("#humidity"),
    _pressure =         document.querySelector("#pressure"),
    _icon =             document.querySelector("#icon");

window.addEventListener('load', async () => {
    // Fetching the coordonates.
    let response = await fetch("http://ip-api.com/json/");
    let ipData = await response.json();

    // Getting the latitude and longitude.
    const { lat, lon } = ipData;

    // Fetching the meteo.
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    let data = await response.json();

    const degree = parseInt(data.main.temp);
    const degreeFarenheit = parseInt(convertCtoF(degree));

    const flCelsius = parseInt(data.main.feels_like);
    const flFarenheit = parseInt(convertCtoF(flCelsius));

    const iconName = data.weather[0].icon;
    const windSpeed = parseInt(data.wind.speed);
    const pressure = parseInt(data.main.pressure);
    const humidity = parseInt(data.main.humidity);

    // Updating the user interface.
    _locationTimezone.textContent = ipData.timezone;
    _city.textContent = ipData.city;

    _celsius.textContent = `${degree} °c`;
    _farenheit.textContent = `${degreeFarenheit} °f`;

    _flCelsius.textContent = `${flCelsius} °c`;
    _flFarenheit.textContent = `${flFarenheit} °f`;
    _windSpeed.textContent = `${windSpeed} mps`;
    _humidity.textContent = `${humidity}%`;
    _pressure.textContent = `${pressure} hpa`;
    _icon.innerHTML = `<img src="${icon(iconName)}" />`;

});

const convertCtoF = temp => temp * 5/9 + 32;
