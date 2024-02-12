let searchBtn = document.querySelector('.btn');
let cityName = document.querySelector('#city')
let container = document.querySelector('weatherInfo')
let fiveDayWeather = document.querySelector('#five-day-weather')







let APIKey = "f1469da06e3b734d39e1336c7f219559"

// const URL = 'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=' + APIKey;


searchBtn.addEventListener('click', function () {
    let URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName.value + '&limit=1&appid=' + APIKey;

    fetch(URL).then(function (res) {
        if(res.ok){
            return res.json()
        }
    }).then(function(data) {
        console.log('currnet', data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        getFiveDayWeather(lat, lon);
     

    });
    
});


  
function getFiveDayWeather(lat,lon) {
    let URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`

    fetch(URL).then(function (res) {
        if(res.ok){
            return res.json()
        }
    }).then(function(data) {
        for (let i = 0; i < data.list.length; i++) {
            
            let element = data.list[i];
            var currentTime = element.dt_txt.split(" ")[1].split(":")[0];
            if (currentTime == "15") {
                console.log('fiveday', element);
                var htmlCard = `
                <div class="card" style="width: 12rem;">
                <div class="card-body">
                <img src="https://openweathermap.org/img/w/${element.weather[0].icon}.png" style="width: 50%" alt="...">
                    <h5 class="card-title">Card title</h5>
                    <p class="Temp">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p class="Wind">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p class="Humidity">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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