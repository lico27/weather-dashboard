// Event listener to get city name
$("#search-button").on("click", function(event){
    event.preventDefault();
    let searchCity = $("#search-input").val();

    // Build forecast API query
    let queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=metric&appid=7ddd7e57555c4c12e3640f758afd6ed6";
   
    // Fetch forecast API data
    fetch(queryURL)
        .then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);

        // Section variables
        let forecastSection = $("#forecast");
        forecastSection.empty();

        // Data category variables
        let cityName = data.city.name;
        let weatherIconNum = data.list[0].weather[0].icon
        let weatherIconCard = $("<img>");
        let weatherType = data.list[0].weather[0].main;
        let temp = Math.round(data.list[0].main.temp);
        let wind = data.list[0].wind.speed;
        let humidity = data.list[0].main.humidity;

        // Append to forecast cards
        let card = $("<div>");
        card.attr("class", "card col-sm-2");
        card.append("<h3>" + cityName + "</h3>");
        card.append("<p>" + weatherType + "</p>");
        card.append(weatherIconCard.attr("src", "https://openweathermap.org/img/wn/" + weatherIconNum + ".png").attr("class", "icon-card"));
        card.append("<p>" + "Temp: " + temp + "°C" + "</p>");
        card.append("<p>" + "Wind: " + wind + " m/s" + "</p>");
        card.append("<p>" + "Humidity: " + humidity + "%" + "</p>");
        forecastSection.append(card);
        
    })

    // Build today API query
    let queryURLToday = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=metric&appid=7ddd7e57555c4c12e3640f758afd6ed6";

    // Fetch API data
    fetch(queryURLToday)
        .then(function(responseToday){
        return responseToday.json();
    }).then(function(dataToday){
        console.log(dataToday);

        // Section variables
        let todaySection = $("#today");
        todaySection.empty();

        // Data category variables
        let cityName = dataToday.name;
        let weatherIconNum = dataToday.weather[0].icon
        let todayDate = dayjs();
        let weatherIconHeader = $("<img>");
        let todayHeader = $("<h2>" + cityName + " (" + todayDate.format("DD/MM/YYYY") + ")" + "</h2>");
        let weatherType = dataToday.weather[0].main;
        let temp = Math.round(dataToday.main.temp);
        let wind = dataToday.wind.speed;
        let humidity = dataToday.main.humidity;

        // Append to today section
        todaySection.empty();
        todaySection.append(todayHeader);
        todayHeader.append(weatherIconHeader.attr("src", "https://openweathermap.org/img/wn/" + weatherIconNum + ".png").attr("class", "icon-header"));
        todayHeader.append("<p>" + "Temp: " + temp + "°C" + "</p>");
        todayHeader.append("<p>" + "Wind: " + wind + " m/s" + "</p>");
        todayHeader.append("<p>" + "Humidity: " + humidity + "%" + "</p>");
        
    })
});