// Event listener to get city name
$('#search-button').on('click', function(event){
    event.preventDefault();
    let searchCity = $('#search-input').val();

    // Build API query
    let queryURL= "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=7ddd7e57555c4c12e3640f758afd6ed6";
   
    // Fetch API data
    fetch(queryURL)
        .then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);

        // Section variables
        let todaySection = $('#today');
        let forecastSection = $('#forecast');

        // Data category variables
        let cityName = data.city.name;
        let todayHeader = $('<h2>' + cityName + '</h2>');
        let weatherIconNum = data.list[0].weather[0].icon;
        let weatherIcon = $('<img>');

        // Append to today section
        todaySection.append(todayHeader);

        // Append to forecast cards
        let card = $('<div>');
        card.append('<h3>' + cityName + '</h3>');
        card.attr("class", "card col-sm-2");
        card.append(weatherIcon);
        weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + weatherIconNum + ".png");
        weatherIcon.attr("class", "icon");
        forecastSection.append(card);


    })

});