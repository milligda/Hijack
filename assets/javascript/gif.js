$(document).ready(function() {

    var quotes = ["We're all mad down here", "I'm late, I'm late! For a very important date!", "Off with their heads!", "Why is a raven like a writing desk?"];
    var gifs0 = ["https://media.giphy.com/media/4uGeJzUSCKKeQ/giphy.gif", "https://media.giphy.com/media/UZOEGrs3w3tao/giphy.gif", "https://media.giphy.com/media/EZELNssmfIzni/giphy.gif", "https://media.giphy.com/media/xIJLgO6rizUJi/giphy.gif"]
    var gifs1 = ["https://media.giphy.com/media/SUHaymtGhrASA/giphy.gif","https://media.giphy.com/media/oxIsjfvGh3GCI/giphy.gif", "https://media.giphy.com/media/136ZNSzsbthZM4/giphy.gif","https://media.giphy.com/media/ATmBdBQGgLXSU/giphy.gif"]
    var gifs2 = ["https://media.giphy.com/media/8bFFkoiQ2Evf2/giphy.gif","https://media.giphy.com/media/6ZHUmnZdVQB9K/giphy.gif", "https://media.giphy.com/media/CFLKtdbDw1Kgg/giphy.gif", "https://media.giphy.com/media/mzdJ0g0Gqlj8c/giphy.gif"];
    var gifs3 = ["https://media.giphy.com/media/BAYZwXqJ3zQnC/giphy.gif","https://media.giphy.com/media/4BgQaxfQfeqys/giphy.gif", "https://media.giphy.com/media/EZELNssmfIzni/giphy.gif","https://media.giphy.com/media/C67ihtpViTICk/giphy.gif"];
    var count = 0;
    
    // displays the buttons on the page
    function displayQuoteButtons() {

        for (var i = 0; i < quotes.length; i++) {
            
            // create the button element
            var button = $("<button>");

            // add the class and ID's to the buttons
            button.addClass('quote-button');
            button.attr('id', count);
            
            // set the text for the button
            button.text(quotes[i]);

            // add the button to the correct container on the page
            button.appendTo('.quote-buttons-container');
            //increase the count for the ID's
            count++;
        }
    }

//function to add gifs from the different gif arrays
  
    function displayGifs0(event) {
        var gifTile = $("<div>");
        gifTile.addClass("gif-tile");
        gifTile.appendTo(".gifs-container");
            for (var i = 0; i < gifs0.length; i++) {
                          
                var gifImage = $("<img>");
                gifImage.addClass("gif-image");
                gifImage.attr('src', gifs0[i]);
                gifImage.appendTo(".gif-tile");
 
            }        
        };
    
    function displayGifs1(event) {
        var gifTile = $("<div>");
        gifTile.addClass("gif-tile");
        gifTile.appendTo(".gifs-container");
            for (var i = 0; i < gifs1.length; i++) {
        
                var gifImage = $("<img>");
                gifImage.addClass("gif-image");
                gifImage.attr('src', gifs1[i]);
                gifImage.appendTo(".gif-tile");
 
            }        
        };
    
    function displayGifs2(event) {
        var gifTile = $("<div>");
        gifTile.addClass("gif-tile");
        gifTile.appendTo(".gifs-container");
            for (var i = 0; i < gifs2.length; i++) {
        
                var gifImage = $("<img>");
                gifImage.addClass("gif-image");
                gifImage.attr('src', gifs2[i]);
                gifImage.appendTo(".gif-tile");
 
            }        
        };
    
    function displayGifs3(event) {
        var gifTile = $("<div>");
        gifTile.addClass("gif-tile");
        gifTile.appendTo(".gifs-container");
            for (var i = 0; i < gifs3.length; i++) {
           
                var gifImage = $("<img>");
                gifImage.addClass("gif-image");
                gifImage.attr('src', gifs3[i]);
                gifImage.appendTo(".gif-tile");
 
            }        
        };

    // event listener for when the user clicks a quote button
    $(document).on("click", "#0", function() {
        
        $(".gifs-container").empty();
        displayGifs0();
    });

    $(document).on("click", "#1", function() {
        
        $(".gifs-container").empty();
        displayGifs1();
    });

    $(document).on("click", "#2", function() {
        
        $(".gifs-container").empty();
        displayGifs2();
    });
    
    $(document).on("click", "#3", function() {
        
        $(".gifs-container").empty();
        displayGifs3();
    });

    // populate the initial buttons on the page when the page loads
    displayQuoteButtons();

});