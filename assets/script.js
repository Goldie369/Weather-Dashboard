var weatherApiKey = '1dded313c35e600dd8d8c642de17d0ef';
var forecast = ""
var animatedTitles = { Clear: '☀', Clouds: '☁', Rain: '☔', Drizzle: '☔', Thunderstorm: '⚡', Snow: '❄' };
var coords
var userinput = ""
$('#user-input').on("change", function (e) { userinput = e.target.value })
var update = ""
$("#search-btn").on("click", function () {
    console.log(userinput)
    var prevSearch = localStorage.getItem("prev-search")
    var prevArr = prevSearch?.split(";")
    localStorage.setItem("prev-search", userinput + ";")
    $.ajax({
        url: 'http://api.openweathermap.org/geo/1.0/direct?q=' + userinput.split(',')[0] + "," + userinput.split(',')[1] + ",USA" + "&apiKey=" + weatherApiKey
    }).then(function (coords) {
        coords = (coords)
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?lat=` + coords[0].lat + '&lon=' + coords[0].lon + "&apiKey=" + weatherApiKey
        })


            .then(function (res) {
                console.log("currentWeater", res)
                let { icon, description, main } = res.weather[0]
                console.log(resultsContainer)
                resultsContainer.innerHTML = `<div><div>Current</div>

              <div>${animatedTitles[main]}</div>
                <div>${description}</div>
                <div>${(((res.main.temp) - 273.15) * (9 / 5) + 32).toFixed(2)}</div>
                <div>${res.wind.speed}</div>
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




                    for (let i = 0; i < 5; i++) {
                        forecast += (`<div class="forecast-row"><div>${dates[i]}</div>
                        <div>${animatedTitles[main]}</div>
                        <div>${description}</div>
                        <div>${(((res.list[i].main.temp) - 273.15) * (9 / 5) + 32).toFixed(2)}</div>
                        <div>${res.list[i].wind.speed}</div></div>`)
                    }
                    forecastContainer.innerHTML = forecast

                })
            })
    });
})

var getWeatherBtn = document.getElementById("user-form")
var cityInput = document.getElementById("user-input")
var resultsContainer = document.getElementById("weather-container")
var forecastContainer = document.getElementById("forecast")
var searchHistory = document.getElementById("search-history")
var todayWeater = document.getElementById("today-weather")

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