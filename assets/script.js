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