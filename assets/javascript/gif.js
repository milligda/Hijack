$(document).ready(function() {

    var quotes = ["We're all mad down here", "I'm late, I'm late! For a very important date!", "Off with their heads!", "Why is a raven like a writing desk?"];
    var gifs0 = ["https://media.giphy.com/media/4uGeJzUSCKKeQ/giphy.gif", "https://media.giphy.com/media/UZOEGrs3w3tao/giphy.gif", "https://media.giphy.com/media/EZELNssmfIzni/giphy.gif", "https://media.giphy.com/media/xIJLgO6rizUJi/giphy.gif"]
    var gifs1 = ["https://media.giphy.com/media/SUHaymtGhrASA/giphy.gif","https://media.giphy.com/media/oxIsjfvGh3GCI/giphy.gif", "https://media.giphy.com/media/136ZNSzsbthZM4/giphy.gif","https://media.giphy.com/media/ATmBdBQGgLXSU/giphy.gif"]
    var gifs2 = ["https://media.giphy.com/media/8bFFkoiQ2Evf2/giphy.gif","https://media.giphy.com/media/6ZHUmnZdVQB9K/giphy.gif", "https://media.giphy.com/media/CFLKtdbDw1Kgg/giphy.gif", "https://media.giphy.com/media/mzdJ0g0Gqlj8c/giphy.gif"];
    var gifs3 = ["https://media.giphy.com/media/BAYZwXqJ3zQnC/giphy.gif","https://media.giphy.com/media/4BgQaxfQfeqys/giphy.gif", "https://media.giphy.com/media/EZELNssmfIzni/giphy.gif","https://media.giphy.com/media/C67ihtpViTICk/giphy.gif"];
    var count = 0;
    var gifSet = [gifs0, gifs1, gifs2, gifs3];
    // displays the buttons on the page
    function displayQuoteButtons() {

        for (var i = 0; i < quotes.length; i++) {
            
            // create the button element
            var button = $("<button>");

            // add the class and ID's to the buttons
            button.addClass('btn btn-light quoteButton');
            button.attr('value', i);
            // set the text for the button
            button.text(quotes[i]);

            // add the button to the correct container on the page
            button.appendTo(".jumbotron-fluid");
        }
    }

    // event listener for when the user clicks a quote button
    $(document).on("click", ".quoteButton", function() {
        
        $(".gifs-container").empty();
        var gifSetNumber = $(this).val();
        for (var i = 0; i < gifSet[gifSetNumber].length; i++) {

            var gifImage = $("<img>");
            gifImage.addClass("rounded float-left gifButton");
            gifImage.appendTo(".gifs-container");
            gifImage.attr('src', (gifSet[gifSetNumber])[i]);
            
        }        

    });

    // populate the initial buttons on the page when the page loads
    displayQuoteButtons();

});