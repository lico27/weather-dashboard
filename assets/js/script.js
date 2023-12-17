// Retrieve any saved cities from storage


// Clear saved and visible data
$("#btnClearHistory").on("click", function(event){
    event.preventDefault();
    $("#history").empty();
    $("#today").empty();
    $("#forecast").empty();
    localStorage.clear();
});

// Variables for search history
let arrCities = [];
let historySection = $("#history");

// Event listener to call API and render info
$("#search-button").on("click", function(event){
    event.preventDefault();
    let searchCity = $("#search-input").val();
    $("#search-input").val("");  

    // Function to build search history
    function buildHistory() {
        arrCities.push(searchCity);
        localStorage.setItem("city", arrCities);
        let storedCity = $("<button>" + searchCity + "</button>").attr("class", "card btnHistory");
        historySection.prepend(storedCity);  
    };
    buildHistory();

    // Function to build 'today' section
    function buildToday() {
    // Build today API query
    let queryURLToday = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=metric&appid=7ddd7e57555c4c12e3640f758afd6ed6";
    // Fetch API data
    fetch(queryURLToday)
        .then(function(responseToday){
        return responseToday.json();
    }).then(function(dataToday){

        // Section variables
        let todaySection = $("#today");
        todaySection.empty();

        // Data category variables
        let cityName = dataToday.name;
        let weatherIconNum = dataToday.weather[0].icon
        let todayDate = dayjs();
        let weatherIconHeader = $("<img>");
        let todayHeader = $("<h2>" + "Today in " + cityName + " (" + todayDate.format("DD/MM/YYYY") + ")" + "</h2>");
        let weatherType = dataToday.weather[0].main;
        let temp = Math.round(dataToday.main.temp);
        let wind = dataToday.wind.speed;
        let humidity = dataToday.main.humidity;

        // Append to today section
        todaySection.append(todayHeader);
        todayHeader.append(weatherIconHeader.attr("src", "https://openweathermap.org/img/wn/" + weatherIconNum + ".png").attr("class", "icon-header"));
        todaySection.append("<h4>" + weatherType + "</h4>");
        todaySection.append("<p>" + "Temp: " + temp + "°C" + "</p>");
        todaySection.append("<p>" + "Wind: " + wind + " m/s" + "</p>");
        todaySection.append("<p>" + "Humidity: " + humidity + "%" + "</p>");
        
    })
    };
    buildToday();

    // Function to build forecast cards
    function buildForecast() {
    // Build forecast API query
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=metric&appid=7ddd7e57555c4c12e3640f758afd6ed6";
   
    // Fetch forecast API data
    fetch(queryURL)
        .then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);

        // Section variables
        let forecastSection = $("#forecast");
        forecastSection.empty();
        let forecastTitle = "Five-day forecast";
        forecastSection.append("<h2>" + forecastTitle + "</h2>");

        // Data category variables
        let cityName = data.city.name;
        let fiveDays = data.list;

        // For loop to make forecast cards
        for (let i = 0; i < fiveDays.length; i++) {

            // Date and time variables
            let cardHead = dayjs(fiveDays[i].dt_txt).format("DD/MM/YYYY");
            let cardTime = dayjs(fiveDays[i].dt_txt).format("HH");

            // If loop to show only one card per day
            if (cardTime === "12") {                
                let weatherIconNum = fiveDays[i].weather[0].icon
                let weatherIconCard = $("<img>");
                let weatherType = fiveDays[i].weather[0].main;
                let temp = Math.round(fiveDays[i].main.temp);
                let wind = fiveDays[i].wind.speed;
                let humidity = fiveDays[i].main.humidity;
        
                // Append to forecast cards
                let card = $("<div>");
                card.attr("class", "card col-md-2");
                card.append("<h3>" + cardHead + "</h3>");
                card.append(weatherIconCard.attr("src", "https://openweathermap.org/img/wn/" + weatherIconNum + ".png").attr("class", "icon-card"));
                card.append("<h4>" + weatherType + "</h4>");
                card.append("<p>" + "Temp: " + temp + "°C" + "</p>");
                card.append("<p>" + "Wind: " + wind + " m/s" + "</p>");
                card.append("<p>" + "Humidity: " + humidity + "%" + "</p>");
                forecastSection.append(card);
            };

        }

    });
    };
    buildForecast();

});

