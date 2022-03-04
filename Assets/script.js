var APIKey = "07a5fce6974956268351636ee14cf6ae";
var searchBtn = document.querySelector(".btn");

function weatherSearch() {
  var city = document.querySelector("#cityInput");
  var searchInputValue = city.value;
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchInputValue +
    "&units=imperial&appid=07a5fce6974956268351636ee14cf6ae";
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchInputValue +
    "&cnt=&units=imperial&appid=07a5fce6974956268351636ee14cf6ae";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      // console.log(data)
      var today = document.querySelector("#todayDate");
      var temp = document.querySelector("#currentTemp");
      var feels = document.querySelector("#feelsLike");
      var icon = data.weather[0].icon;
      var iconUrl =
        "<img src ='http://openweathermap.org/img/wn/" +
        icon +
        ".png' alt='weather icon'>";

      document.querySelector("#conditionsIcon").innerHTML = iconUrl;
      var humidity = document.querySelector("#humidity");
      var speed = document.querySelector("#windSpeed");

      today.textContent = moment().format("MMM Do YY") + data.name;
      temp.textContent = "Current Temperature" + data.main.temp;
      feels.textContent = "Feels like " + data.main.feels_like;
      humidity.textContent = "Humidity " + data.main.humidity + "%";
      speed.textContent = "Wind" + data.wind.speed;
    });

  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.list.length; i += 8) {
        var forecastContainer = document.querySelector("#forecastCont");
        var card = document.createElement("div");
        card.setAttribute("style", "width:16rem");
        card.setAttribute("class", "card forecast");

        var ul = document.createElement("ul");
        var forecastDay = document.createElement("li");
        var forecastIcon = data.list[i].weather[0].icon;
        var iconUrl =
          "<img src ='http://openweathermap.org/img/wn/" +
          forecastIcon +
          ".png' alt='Icon depicting current weather.'>";
        document.createElement("li").innerHTML = iconUrl;
        var forecastTemp = document.createElement("li");
        var forecastWind = document.createElement("li");
        var forecastHumidity = document.createElement("li");

        forecastDay.textContent = "For " + data.list[i].clouds.dt_txt;

        forecastTemp.textContent = "Temp " + data.list[i].main.temp;
        forecastWind.textContent = "Wind " + data.list[i].wind.speed;
        forecastHumidity.textContent =
          "Humidity" + data.list[i].main.humidity + "%";

        ul.append(forecastDay);
        ul.append(forecastIcon);
        ul.append(forecastTemp);
        ul.append(forecastWind);
        ul.append(forecastHumidity);
        card.append(ul);
        forecastContainer.append(card);
      }
    });
}
searchBtn.addEventListener("click", weatherSearch);
