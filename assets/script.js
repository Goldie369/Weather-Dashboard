//-- Adding a API Key, forecast data, animated weather titles, coordinates, and user input--//
//-- Adding changes in the user input field and updates the userinput variable accordingly--//
//-- Adding a click event handler to the search button (search-btn)--//
//-- to the search button (search-btn)--//
//-- When the search button is clicked, it retrieves the user input, stores it in the browser's local storage as part of a search history, and makes an AJAX request to the OpenWeatherMap API--//
//-- Once the coordinates are obtained, it makes another AJAX request to retrieve the current weather info--//
//-- The received weather data is then used to update the HTML elements--//
//-- After retrieving the current weather, it makes another AJAX request to retrieve the 5-day forecast for the location--//
//-- The forecast data is used to generate HTML elements for each forecasted day, including the date, weather icon, description, temperature, and wind speed--//
//-- The search history is retrieved from local storage, and the search terms are displayed in a separate HTML container--//

var weatherApiKey = '1dded313c35e600dd8d8c642de17d0ef';
var forecast = ""
var animatedTitles = { Clear: '☀', Clouds: '☁', Rain: '☔', Drizzle: '☔', Thunderstorm: '⚡', Snow: '❄' };
var coords
var userinput = ""
$('#user-input').on("change", function (e) { userinput = e.target.value })
var update = ""
$("#search-btn").on("click", function () {
    console.log(userinput)
    var prevSearch = localStorage.getItem("prev-search")|| ""
    var prevArr = prevSearch?.split(";")
    prevArr.push(userinput)
    localStorage.setItem("prev-search", prevArr.join(";"))
    $.ajax({
        url: 'http://api.openweathermap.org/geo/1.0/direct?q=' + userinput + "&limit=1&apiKey=" + weatherApiKey
    }).then(function (coords) {
        coords = (coords)
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?lat=` + coords[0].lat + '&lon=' + coords[0].lon + "&apiKey=" + weatherApiKey
        })


            .then(function (res) {
                console.log("currentWeater", res)
                let { icon, description, main } = res.weather[0]
                console.log(resultsContainer)
                resultsContainer.innerHTML = `<div class ="current-container"><h3>Current</h3>

                <div class = "img-style">${animatedTitles[main]}</div>
                <div>${description}</div>
                <div>${(((res.main.temp) - 273.15) * (9 / 5) + 32).toFixed(0)}&deg;F</div>
                <div>${Math.round(res.wind.speed)} mph</div>
                </div>`
                $.ajax({
                    url: 'http://api.openweathermap.org/data/2.5/forecast?lat=' + coords[0].lat + '&lon=' + coords[0].lon + "&apiKey=" + weatherApiKey
                }).then(function (res) {
                    let { icon, description, main } = res.list[0].weather[0]
                    var today = dayjs()
                    const dates = []
                    for (let i = 1; i < 6; i++) {
                        dates.push(today.add(i, 'day').format('dddd'));
                    }


                    forecast = ""

                    for (let i = 0; i < 5; i++) {
                        forecast += (`<div class="current-container"><div>${dates[i]}</div>
                        <div>${animatedTitles[main]}</div>
                        <div class="font-class">${description}</div>
                        <div class="font-class">${(((res.list[i].main.temp) - 273.15) * (9 / 5) + 32).toFixed(0)}&deg;F</div>
                        <div class="font-class">${Math.round(res.list[i].wind.speed)} mph</div></div>`)
                    }
                    forecastContainer.innerHTML = forecast
                    var searches = localStorage.getItem("prev-search")
                    var searcharr = searches.split(";")
                    searcharr = searcharr.filter(term => term !== "")
                    searchdivs = searcharr.map(term => `<div>${term}</div>`)
                    searchHistory.innerHTML = searchdivs.join("")

                })
            })
    });
})

var getWeatherBtn = document.getElementById("user-form")
var cityInput = document.getElementById("user-input")
var resultsContainer = document.getElementById("weather-container")
var forecastContainer = document.getElementById("forecast")
var searchHistory = document.getElementsByClassName("history-container")[0]
var todayWeater = document.getElementById("today-weather")


var searches = localStorage.getItem("prev-search")
var searcharr = searches.split(";")
searcharr = searcharr.filter(term => term !== "")
searchdivs = searcharr.map(term => `<div>${term}</div>`)
searchHistory.innerHTML = searchdivs.join("")



   // `<div><div>Current</div>
//<div>${description}</div>
//<div>${(((data.list[0].main.temp) - 273.15) * (9 / 5) + 32).toFixed(2)}</div>
//<div>${data.list[0].wind.speed}
//</div>`

// let { icon, description } = data.list[i].weather[0]
// icon1.src = "https://openweathermap.org/img/wn/" + icon + ".png"
// temperature.textContent = (((data.list[i].main.temp) - 273.15) * (9 / 5) + 32).toFixed(2)
// windSpeed.textContent = data.list[i].wind.speed;
// humidity.textContent = data.list[i].main.humidity;
// weatherDescription.textContent = description

// temp	287.44
// feels_like	286
// temp_min	282.99
// temp_max	287.44
// pressure	1010
// sea_level	1010
// grnd_level	988
// humidity	41
// temp_kf	4.45