var searchBtn = document.getElementById("#search-button");
var cards = document.querySelectorAll("card");

$(document).ready(function () {
  $("#search-button").on("click", function () {
    $("#weather-card").removeClass("hidden");
    $("#card-hide").removeClass("hidden");
    var searchInput = $("#citySearch").val();
    $("#citySearch").val("");

    getlongandlat(searchInput);
  });

  function getlongandlat(searchInput) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=7b2be6a1e4a8ba837b735dd2308a21ce`
    )
      .then(function (response) {
        if (response.status === 404 || response.status === 400) {
          window.alert("Not a city");
          location.reload();
        } else return response.json();
      })
      .then(function (data) {
        // console.log(data);
        var lat = data.coord.lat;
        var long = data.coord.lon;
        var cityName = data.name;

        $(".city-name").text(cityName);
        $(".city-date").text(moment().format("MMMM Do YYYY"));

        oneCallForecast(lat, long);
      });
  }

  function oneCallForecast(lat, long) {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=7b2be6a1e4a8ba837b735dd2308a21ce&units=imperial`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);

        var currentTemp = data.current.temp;
        var humidity = data.current.humidity;
        var wind = data.current.wind_speed;
        var uvIndex = data.current.uvi;
        var weatherIcon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;

        $("#weather-icon").attr("src", weatherIcon);
        $(".current-temp").text(
          "The current temperature is " + currentTemp + " \u00B0 F"
        );
        $(".humidity").text("The current humidity is " + humidity + "%");
        $(".wind").text("The current wind speed is " + wind + "MPH");
        $(".uv-index").text("The current UV index is " + uvIndex);

        $(".forecast-cards").empty();

        for (var i = 1; i < 6; i++) {
          var forecastCard = $("<card>");

          var forecastDate = $("<h4>").text(
            moment(data.daily[i].dt, "X").format("MM/DD/YYYY")
          );
          var forecastIcon = $("<img>").attr(
            "src",
            `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`
          );
          var forecastTemp = $("<p>").text(
            "Temp: " + data.daily[i].temp.max + " \u00B0 F"
          );
          var forecastWind = $("<p>").text(
            "Wind Speed: " + data.daily[i].wind_speed + " MPH"
          );
          var forecastHumidity = $("<p>").text(
            "Humidity: " + data.daily[i].humidity + "%"
          );

          forecastCard.append(
            forecastDate,
            forecastIcon,
            forecastTemp,
            forecastWind,
            forecastHumidity
          );

          $(".forecast-cards").append(forecastCard);
        }
      });
  }
});
function searchInput(cityName) {
  // console.log(searchCity);
  var storage = [];
  var parseLocalStorage = JSON.parse(localStorage.getItem(".city-name"));
  if(parseLocalStorage){
    storage = parseLocalStorage
  }
  storage.push(cityName);
  var stingifyStorageObj = JSON.stringify(storage);
  localStorage.setItem(".city-name", stingifyStorageObj);
  
}