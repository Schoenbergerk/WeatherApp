let searchBtn = document.querySelector('.btn');
let cityName = document.querySelector('#city');
let container = document.querySelector('weatherInfo');
let fiveDayWeather = document.querySelector('#five-day-weather');
let currentWeather = document.querySelector('#current-weather');







let APIKey = "f1469da06e3b734d39e1336c7f219559"

// const URL = 'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=' + APIKey;


searchBtn.addEventListener('click', function () {
    let URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName.value + '&limit=1&appid=' + APIKey + "&units=imperial";

    fetch(URL).then(function (res) {
        if (res.ok) {
            return res.json()
        }
    }).then(function (data) {
        console.log('current', data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        getCurrentWeather(lat, lon);
        getFiveDayWeather(lat, lon);

    });

});

function getCurrentWeather(lat, lon) {
    let URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`

    fetch(URL).then(function (res) {
        if (res.ok) {
            return res.json()
        }
    }).then(function (data) {
            let i = 0
            let element = data.list[i];
            var htmlCard = `
                <div class="card" style="width: 12rem;">
                <div class="card-body">
                <img src="https://openweathermap.org/img/w/${element.weather[0].icon}.png" style="width: 50%" alt="...">
                    <h5>Today</h5>
                    <p>Temp: ${element.main.temp}°F</p>
                    <p>Wind: ${element.wind.speed}mph</p>
                    <p>Humidity: ${element.main.humidity}%</p>
                </div>
                </div>
                `;
            var cardSection = document.createElement('section');
            cardSection.innerHTML = htmlCard;
            currentWeather.appendChild(cardSection)
        
    });

};




function getFiveDayWeather(lat, lon) {
    let URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`

    fetch(URL).then(function (res) {
        if (res.ok) {
            return res.json()
        }
    }).then(function (data) {
        for (let i = 0; i < data.list.length; i++) {
            let element = data.list[i];
            var currentTime = element.dt_txt.split(" ")[1].split(":")[0];
            if (currentTime == "15") {
                console.log('fiveday', element);
                var htmlCard = `
                <div class="card" style="width: 12rem;">
                <div class="card-body">
                <img src="https://openweathermap.org/img/w/${element.weather[0].icon}.png" style="width: 50%" >
                    <h5>(${element.dt_txt.split(" ")[0]})</h5>
                    <p>Temp: ${element.main.temp}°F</p>
                    <p>Wind: ${element.wind.speed}mph</p>
                    <p>Humidity: ${element.main.humidity}%</p>
                </div>
                </div>
                `;
                var cardSection = document.createElement('section');
                cardSection.innerHTML = htmlCard;
                fiveDayWeather.appendChild(cardSection)
            }

        }


    });
}