var weatherApiKey = '1dded313c35e600dd8d8c642de17d0ef';

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
                let { icon, description } = res.weather[0]
                console.log(resultsContainer)
                resultsContainer.innerHTML = `<div><div>Current</div>

                
                <div>${description}</div>
                <div>${(((res.main.temp) - 273.15) * (9 / 5) + 32).toFixed(2)}</div>
                <div>${res.wind.speed}</div>
                </div>`
                $.ajax({
                    url: 'http://api.openweathermap.org/data/2.5/forecast?lat=' + coords[0].lat + '&lon=' + coords[0].lon + "&apiKey=" + weatherApiKey
                }).then(function (res) {
                    console.log(res)
                    console.log("date", res.list[0].dt_txt.split(" ")[0])
                    for (leti = 0; i < 4; i++) {
                        resultsContainer.append(`<div><div>${res.list[i].dt_txt.split(" ")[0]}</div><div>${res.list[i].main.temp

                            }</div><div>${res.list[i].wind.speed}</div></div>`)
                    }
                    //resultsContainer.innerHTML = update
                })
            })
    });
})