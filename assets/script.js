var cityInputEl = document.querySelector('#cityName');
var cityInputTwoEl = document.querySelector('citySearch');
var cityEl = document.querySelector('#city');
var tempEl = document.querySelector('#temp')
var windEl = document.querySelector('#wind')
var humidityEl = document.querySelector('#humidity')
var uvIndexEl = document.querySelector('#uvIndex')



// handle displaying the time
function displayTime() {
    var rightNow = moment().format('(L)');
    $('#currentDay').text(rightNow)
    var tm = moment().add(1,'d').format('L');
    $('.card-date-1').text(tm)
    var twoDay = moment().add(2,'d').format('L');
    $('.card-date-2').text(twoDay)
    var threeDay = moment().add(3,'d').format('L');
    $('.card-date-3').text(threeDay)
    var fourDay = moment().add(4,'d').format('L');
    $('.card-date-4').text(fourDay)
    var fiveDay = moment().add(5,'d').format('L');
    $('.card-date-5').text(fiveDay)
};

displayTime() 

    







function searchButton(event) {
    event.preventDefault();
    var searchTerm = ""
    if ($(this).text() == 'Search') {
        searchTerm = cityInputEl.value

    }else {
        searchTerm = $(this).text().trim()
        
    }
   
    console.log(searchTerm)
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchTerm+'&units=imperial&appid=17f14c8a5d7576efafdf74d8974d07d3&lang=en')
    .then(response => response.json())
    .then(data => {
        console.log('first',data)
        var cityNameValue = data['name'];
        var tempValue = data['main']['temp'];
        var windValue = data['wind']['speed']
        var humidValue = data['main']['humidity']
        var iconValue = data['weather']['0']['icon']
        var lonValue = data['coord']['lon']
        var latValue = data['coord']['lat']
        cityEl.innerHTML = cityNameValue;
        tempEl.innerHTML = 'Temp: '+ tempValue + '°F';
        windEl.innerHTML = 'Wind: '+ windValue + ' MPH';
        humidityEl.innerHTML = 'Humidity: '+ humidValue + '%';
        $('#icon').attr("src",'http://openweathermap.org/img/wn/'+iconValue+'@2x.png')

        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latValue+'&lon='+lonValue+'&units=imperial&appid=17f14c8a5d7576efafdf74d8974d07d3')
        .then(response => response.json())
        .then(data => {
            var uviValue = data['current']['uvi']
            if (uviValue <= 2){
                uvIndexEl.style.background = 'green'
            }else if (uviValue <=3 && uviValue >=5){
                uvIndexEl.style.background = 'yellow'
            }else if (uviValue <=6 && uviValue >=7){
                uvIndexEl.style.background = 'orange'
            }else if (uviValue <=8 && uviValue >=10){
                uvIndexEl.style.background = 'red'
            }else if (uviValue >=11){
                uvIndexEl.style.background = 'violet'
            }
            uvIndexEl.innerHTML = uviValue

        })
        
    })
   
   
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+searchTerm+'&units=imperial&appid=17f14c8a5d7576efafdf74d8974d07d3&lang=en')
    .then(response => response.json())
    .then(data => {
        console.log('2',data)
        //one day ahead weather card
        var tempTwoValue = data['list']['0']['main']['temp']
        var windTwoValue = data['list']['0']['wind']['speed']
        var humidTwoValue = data['list']['0']['main']['humidity']
        var iconTwoValue = data['list']['0']['weather']['0']['icon']
        $('#temp-1').text('Temp: '+ tempTwoValue + '°F');
        $('#wind-1').text('Wind: '+ windTwoValue + ' MPH');
        $('#humidity-1').text('Humidity: '+ humidTwoValue + '%');
        $('#icon-1').attr("src",'http://openweathermap.org/img/wn/'+iconTwoValue+'@2x.png')

        //two days ahead weather card
        var temptThreeValue = data['list']['8']['main']['temp']
        var windtThreeValue = data['list']['8']['wind']['speed']
        var humidtThreeValue = data['list']['8']['main']['humidity']
        var iconThreeValue = data['list']['8']['weather']['0']['icon']
        $('#temp-2').text('Temp: '+ temptThreeValue + '°F');
        $('#wind-2').text('Wind: '+ windtThreeValue + ' MPH');
        $('#humidity-2').text('Humidity: '+ humidtThreeValue + '%');
        $('#icon-2').attr("src",'http://openweathermap.org/img/wn/'+iconThreeValue+'@2x.png')
        
        //three days ahead weather card
        var tempFourValue = data['list']['16']['main']['temp']
        var windFourValue = data['list']['16']['wind']['speed']
        var humidFourValue = data['list']['16']['main']['humidity']
        var iconFourValue = data['list']['16']['weather']['0']['icon']
        $('#temp-3').text('Temp: '+ tempFourValue + '°F');
        $('#wind-3').text('Wind: '+ windFourValue + ' MPH');
        $('#humidity-3').text('Humidity: '+ humidFourValue + '%');
        $('#icon-3').attr("src",'http://openweathermap.org/img/wn/'+iconFourValue+'@2x.png')

        //four days ahead weather card
        var tempFiveValue = data['list']['24']['main']['temp']
        var windFiveValue = data['list']['24']['wind']['speed']
        var humidFiveValue = data['list']['24']['main']['humidity']
        var iconFiveValue = data['list']['24']['weather']['0']['icon']
        $('#temp-4').text('Temp: '+ tempFiveValue + '°F');
        $('#wind-4').text('Wind: '+ windFiveValue + ' MPH');
        $('#humidity-4').text('Humidity: '+ humidFiveValue + '%');
        $('#icon-4').attr("src",'http://openweathermap.org/img/wn/'+iconFiveValue+'@2x.png')

        //five days ahead weather card
        var tempSixValue = data['list']['32']['main']['temp']
        var windSixValue = data['list']['32']['wind']['speed']
        var humidSixValue = data['list']['32']['main']['humidity']
        var iconSixValue = data['list']['32']['weather']['0']['icon']
        $('#temp-5').text('Temp: '+ tempSixValue + '°F');
        $('#wind-5').text('Wind: '+ windSixValue + ' MPH');
        $('#humidity-5').text('Humidity: '+ humidSixValue + '%');
        $('#icon-5').attr("src",'http://openweathermap.org/img/wn/'+iconSixValue+'@2x.png')

    }).catch(err => console.log('Location not found', searchTerm, err))

}


$('aside').on('click','button', searchButton); 








// logs history of serached cities

var logSearchData = function (cityInputEl) {
    // Add a class of .custom-card-header
    var cityNameLog = $('<button>').addClass("citySearch btn list-group-item list-group-item-action bg-custom-4 p-1 w-100 mb-2").text(cityInputEl.value);
    $('#previousSearches').append(cityNameLog);
    
};

var handleFormSubmit = function (event) {
    event.preventDefault();
    var cityNameInput = cityInputEl;
    logSearchData(cityNameInput);
};



$('button').click(handleFormSubmit)

//save history to local storage

localStorage.setItem("Hist", JSON.stringify(
    logSearchData()

));
var historylog = localStorage.getItem("Hist");
JSON.parse(historylog);