//buttons
var unitsChanger = document.querySelector('.CorF');
var submit = document.querySelector('.submit');
//input
var city = document.querySelector('.city');
var state = document.querySelector('.state');
var country = document.querySelector('.country');
//weather
var weather = document.getElementById("weather");
var nameHTML = document.querySelector('.name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var windSpeed = document.querySelector('.windSpeed'); 
var high = document.querySelector('.high');
var low = document.querySelector('.low');
var feelsLike = document.querySelector('.feelsLike');

function CorF() {
    unitsChanger.setAttribute('id', ( parseInt(unitsChanger.id) + 1 ));
    if (parseInt(unitsChanger.id) % 2 == 0) {
        unitsChanger.setAttribute('value', "Metric");
    }
    else {
        unitsChanger.setAttribute('value', "Imperial");
    }
    handle();
}

//SUBMIT HANDLE
function handle() {
    if (city.value.length > 1) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q='
        +city.value+ ',' +state.value+ ',' + country.value + '&units=' +unitsChanger.value+ 
        '&appid=1377703ca954c79494a856d692ac4e3d')
        .then(response => response.json()) 
        .then(data => {
            var nameVal = data['name'];
            var tempVal = data['main']['temp'];
            var windSpeedVal = data['wind']['speed'];
            var highVal = data['main']['temp_max'];
            var lowVal = data['main']['temp_min'];
            var feelsLikeVal = data['main']['feels_like'];
            var descVal = data['weather'][0]['main'];
            var countryVal = data['sys']['country'];

            nameHTML.innerHTML = nameVal + ", " + countryVal;
            if (unitsChanger.value == "Imperial") {
                temp.innerHTML = "Temperature: " + tempVal + "&#8457; <br>";
                high.innerHTML = "High: " + highVal + "&#8457; <br>";
                low.innerHTML = "Low: " + lowVal + "&#8457; <br>";
                feelsLike.innerHTML = "Feels Like: " + feelsLikeVal + "&#8457; <br>";
                windSpeed.innerHTML = "Wind Speed: " + windSpeedVal + " mph <br>";
            }
            else if (unitsChanger.value == "Metric") {
                temp.innerHTML = "Temperature: " + tempVal + "&#8451; <br>"
                high.innerHTML = "High: " + highVal + "&#8451; <br>";
                low.innerHTML = "Low: " + lowVal + "&#8451; <br>";
                feelsLike.innerHTML = "Feels Like: " + feelsLikeVal + "&#8451; <br>";
                windSpeed.innerHTML = "Wind Speed: " + windSpeedVal + " m/s ";
            }
            desc.innerHTML = descVal + "<br>";
            weather.style.visibility = "visible";
        })
        .catch(err => function(err) {
            console.log(err);
        })
    }
}