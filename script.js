$('#run-search').on('click', function(event){
    event.preventDefault();
    let searchTerm = $('#search-term').val();
    console.log(searchTerm);
    
    // let startDate = $('#start-year').val();
    // console.log(startDate)
    // let endDate = $('#end-year').val();
    // console.log(endDate);
    // &begin_date=20040101
    // &end_date=20060101

    let queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=hJP5156LDdzIzu1Y12NLJ9TnCQbxYz1X";
    

   

    fetch(queryURL)
        .then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);

        let articleTitle = data.response.docs[0].headline.main;
        let byLine = data.response.docs[0].byline.original;
        let url = data.response.docs[0].web_url;
        console.log(url);


        let articleDiv = $('#article-section');
        let heading = $('<h2>');
        heading.text(articleTitle);

        let author = $('<p>');
        author.text(byLine);

        let webURL = $('<a>');
        webURL.text(url);
        webURL.attr("href", url);

        articleDiv.append(heading, author, webURL);
        
    })

});