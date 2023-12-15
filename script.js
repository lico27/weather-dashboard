// Event listener to get city name
$("#search-button").on("click", function(event){
    event.preventDefault();
    let searchCity = $("#search-input").val();


    // Build API query
    let queryURL= "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=metric&appid=7ddd7e57555c4c12e3640f758afd6ed6";
   
    // Fetch API data
    fetch(queryURL)
        .then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);

        // Section variables
        let todaySection = $("#today");
        let forecastSection = $("#forecast");

        // Data category variables
        let cityName = data.city.name;
        let todayHeader = $("<h2>" + cityName + "</h2>");
        let weatherType = data.list[0].weather[0].main;
        let weatherIconNum = data.list[0].weather[0].icon;
        let weatherIcon = $("<img>");
        let temp = data.list[0].main.temp;
        let wind = data.list[0].wind.speed;
        let humidity = data.list[0].main.humidity;
        console.log(temp);

        // Append to today section
        todaySection.empty();
        todaySection.append(todayHeader);

        // Append to forecast cards
        let card = $("<div>");
        card.append("<h3>" + cityName + "</h3>");
        card.attr("class", "card col-sm-2");
        card.append(weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + weatherIconNum + ".png").attr("class", "icon"));
        card.append("<p>" + weatherType + "</p>");
        card.append("<p>" + "Temp: " + temp + "°C" + "</p>");
        card.append("<p>" + "Wind: " + wind + " m/s" + "</p>");
        card.append("<p>" + "Humidity: " + humidity + "%" + "</p>");

        forecastSection.append(card);
        

    })

});