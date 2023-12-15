$('#search-button').on('click', function(event){
    event.preventDefault();
    let searchCity = $('#search-input').val();
    
    // let startDate = $('#start-year').val();
    // console.log(startDate)
    // let endDate = $('#end-year').val();
    // console.log(endDate);
    // &begin_date=20040101
    // &end_date=20060101

    
    let queryURL= "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=7ddd7e57555c4c12e3640f758afd6ed6";
   

    fetch(queryURL)
        .then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
        let cityName = data.city.name;

        let forecastSection = $('#forecast');

        let card = $('<div>');
        card.append('<h3>' + cityName + '</h3>');
        card.attr("class", "card col-sm-2");

        forecastSection.append(card);


    })

});