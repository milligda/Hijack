$(document).ready(function() {

    var userName;
    var userNameLength = 0;
    var searchTerm;
    var searchTermLength = 0;
    var bgAnimationLength = 2000;
    var marsIntervalID;
    var aliceBGInterval;
    var marsPhotoID = 1;
    var typeText = document.getElementById('alice-speech');
    var typewriter = new Typewriter(typeText, {
             loop: false,
             blinkSpeed: 35,
        });
        
    var quotes = ["We're all mad down here", "I'm late, I'm late! For a very important date!", "Off with their heads!", "Why is a raven like a writing desk?"];
    var gifs0 = ["https://media.giphy.com/media/4uGeJzUSCKKeQ/giphy.gif", "https://media.giphy.com/media/UZOEGrs3w3tao/giphy.gif", "https://media.giphy.com/media/EZELNssmfIzni/giphy.gif", "https://media.giphy.com/media/xIJLgO6rizUJi/giphy.gif"]
    var gifs1 = ["https://media.giphy.com/media/SUHaymtGhrASA/giphy.gif","https://media.giphy.com/media/oxIsjfvGh3GCI/giphy.gif", "https://media.giphy.com/media/136ZNSzsbthZM4/giphy.gif","https://media.giphy.com/media/ATmBdBQGgLXSU/giphy.gif"]
    var gifs2 = ["https://media.giphy.com/media/8bFFkoiQ2Evf2/giphy.gif","https://media.giphy.com/media/6ZHUmnZdVQB9K/giphy.gif", "https://media.giphy.com/media/CFLKtdbDw1Kgg/giphy.gif", "https://media.giphy.com/media/mzdJ0g0Gqlj8c/giphy.gif"];
    var gifs3 = ["https://media.giphy.com/media/BAYZwXqJ3zQnC/giphy.gif","https://media.giphy.com/media/4BgQaxfQfeqys/giphy.gif", "https://media.giphy.com/media/EZELNssmfIzni/giphy.gif","https://media.giphy.com/media/C67ihtpViTICk/giphy.gif"];
    var count = 0;
    var gifSet = [gifs0, gifs1, gifs2, gifs3];
    
    var flickrURL = 'https://api.flickr.com/services/rest/?';
    var flickrMethod = 'flickr.photos.search';
    var flickrAPI = '9211405c4f5ed9a022c7191358a98c98';
    var flickrSort = 'relevance';
    var flickrExtras = 'url_m';
    var flickrImages = 10;
    var flickrFormat = 'json';
    var flickrCallback = "nojsoncallback=1";
    var carousel;
    var flickrResults;

    // loads the voices on page load so that the correct voice can be used when called
    speechSynthesis.onvoiceschanged = function() {
        voices = speechSynthesis.getVoices();
    };

    // function called to have alice speak the message that is passed in as a parameter
    function aliceSpeak(text) {

        // Create a new instance of SpeechSynthesisUtterance.
        var msg = new SpeechSynthesisUtterance();

        // set Alice's voice
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Microsoft Zira Desktop - English (United States)"; })[0];
        
        // Set the text.
        msg.text = text;
        msg.lang='en-US';
        
        // Set the attributes.
        msg.volume = 1;
        msg.rate = 1;
        msg.pitch = 1;
        
        // console log the length of time required to say the message
        msg.onend = function(e) {
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
        };

        // Queue this utterance.
        window.speechSynthesis.speak(msg);
    }

    function getWikiInfo (searchTerm) {

        searchTerm = searchTerm.replace(/ /g, "+");

        var queryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&origin=*&prop=info&rvprop=content&format=json&formatversion=2";
          
        $.ajax ( {
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            var searchResult = response[2]["0"];

            if (searchResult.indexOf('refers to') > -1 || searchResult.indexOf('refer to') > -1) {
                searchResult = response[2]["1"];
            }

            // alice speaks the search result information.
            setTimeout( function() {
                aliceSpeak(searchResult);
            }, 1000 * 1);

            var afterSearch = 'I hope that was helpful.';

            // alice speaks the after search message.
            setTimeout( function() {
                aliceSpeak(afterSearch);
            }, 1000 * 2);

            console.log(searchResult);
        });
    }

    function getFlickrImages(searchInput) {

        flickrResults = true;

        searchInput = searchInput.replace(/ /g, "+");

        carousel = $(".alice-carousel").flickity({
            freeScroll: true,
            wrapAround: true,
            autoPlay: 1500,
            imagesLoaded: true,
            pageDots: false,
            prevNextButtons: false,
            pauseAutoPlayOnHover: false
        });

        var queryURL = flickrURL + 
            "method=" + flickrMethod + 
            "&api_key=" + flickrAPI + 
            "&text=" + searchInput + 
            "&sort=" + flickrSort +
            "&extras=" + flickrExtras + 
            "&per_page=" + flickrImages + 
            "&format=" + flickrFormat + 
            "&" + flickrCallback;

        console.log(queryURL);
    
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
        
            var imagesArr = response.photos.photo;

            if (imagesArr.length === 0) {
                flickrResults = false;
            }
        
            console.log(imagesArr);
        
            for (var i = 0; i < imagesArr.length; i++ ) {
        
                var carouselCell = $('<div class="carousel-cell">');
        
                var carouselImage = $("<img>");
                carouselImage.attr('src', imagesArr[i].url_m);
                carouselImage.appendTo(carouselCell);
                carousel.flickity('append', carouselCell);
            };
        });
    }

    // Function to make the background a rolling change of color
    function aliceBG () {

        aliceBGInterval = setInterval( function() {

            $("body").animate({
                backgroundColor: '#333',
            }, 1250);

            setTimeout( function() {
                $("body").animate({
                    backgroundColor: '#665F5C',
                }, 750);
            }, 2250);

        }, 3000);
    };

    // displays the initial buttons on the page
    function displayQuoteButtons() {
    
        $(".container").css("opacity", "1");

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
    };
    
    $(document).on("click", ".quoteButton", function() {

        //empties previous gifs
        $(".gifs-container").empty();
        
        //runs through gif arrays and appends them to page
        var gifSetNumber = $(this).val();
        for (var i = 0; i < gifSet[gifSetNumber].length; i++) {

            var gifImage = $("<img>");
            gifImage.addClass("rounded float-left gifButton");
            gifImage.appendTo(".gifs-container");
            gifImage.attr('src', (gifSet[gifSetNumber])[i]);
        }        
    });

    // starts the hijack
    $(document).on("click", ".gifButton", function() {

        clearPage();

        // change the background to the blue error screen
        $("body").css('background-color', '#1273AA');

        // add blue screen image
        $(".page-container").css("background-image", `url("assets/images/bsod-windows-8-0x5c-hal-initialization-failed-56a6f9d85f9b58b7d0e5cc3e.png")`);
               
        // start alice
        aliceAppears();

    });

    function clearPage() {

        // empty the jumbotron page container, remove it's css formatting
        $(".jumbotron").empty().css("background-color", "transparent").css("border-bottom", "none");

        // empty the gifs-container
        $(".gifs-container").empty();

        // hide postAlice button if visible
        $("#afterLesson").hide();
    }

    function aliceAppears() {

        // alice starts by transitioning the background color to a shade of black
        setTimeout( function() {
                $(".page-container").css("background-image","none");
                $("body").animate({
                backgroundColor: "#111111"
            }, bgAnimationLength);

        }, 1000 * 7);

        setTimeout( function() {

             //displays alice-speech container
            $("#alice-speech").css("opacity","1");

        }, 1000 * 8.5);

        // start alice's introduction after a set amount of time
        setTimeout(aliceIntroduction, 1000 * 12);
    }

    function aliceIntroduction() {
        
        // diplay alice's introduction message on the screen
        typewriter.typeString('to whom am I speaking with?')
        .start();

        // display the name-input field after the user has a chance to read the introduction message
        setTimeout(function() {
            $("#name-input").fadeTo(750, 1)
        }, 1000 * 4.5);
        
        // display the name-button after the input field has loaded - next step will be triggered when the name button is clicked
        setTimeout(function() {
            $("#name-button").fadeTo(750, 1);
        }, 1000 * 5.5);
    }

    // event listener on the name-button that will run the next step in alice's hijack 
    // store the user name and hide the input field and button
    $("#name-button").on("click", function(event) {

        // prevent the page from loading again
        event.preventDefault();

        // store the name input as the userName
        userName = $("#name-input").val().trim();
        userName = userName.toLowerCase();

        // test the userName input to make sure that it is valid
        userNameLength = userName.length; 

        // empty the name-input field
        $("#name-input").val("");

        // if the user name is longer than 40 characters, display an error message
        if (userNameLength > 40) {
            
            typewriter.deleteAll().typeString("that is a very long name. maybe you should try again.").start();

        // if the user name includes unusual special characters, display an error message
        } else if (/^[a-zA-Z0-9 , _]*$/.test(userName) == false) {

            typewriter.deleteAll().typeString("you have entered some invalid characters. please try again.").start();

        // otherwise - if the user name is valid, proceed with the hijack
        } else {

            // hide the name-input field and name-button
            $("#name-input").fadeOut(750);
            $("#name-button").fadeOut(750);

            // call the aliceSays Hello function
            aliceSaysHello();
        }
    });

    // next step in alice's hijack - alice types hello and then says hello
    function aliceSaysHello() {
        
        // deletes everything then types out the hello message, pauses, then deletes it. 
        // next it types out the tedious message, pauses, then deletes it.
        // takes approximately 14 seconds
        typewriter.deleteAll().typeString('hello ' + userName).pauseFor(750).deleteAll()
        .typeString('this is tedious. please wait').pauseFor(750).deleteAll().start(); 

        // alice's hello message - takes 4 seconds
        var welcomeMessage = 'hello ' + userName + '. My name is Alice.';

        // remove the cursor and start alice's background color transition
        setTimeout( function() {

            //remove cursor and alice-output section
            $(".alice-output").fadeOut(750);
            $(".alice-speech").fadeOut(750);

            // start the alice background color transition
            aliceBG();

        }, 1000 * 15);

        // start 14 seconds after function has been called - have alice speak her welcomeMessage
        setTimeout( function() {
            aliceSpeak(welcomeMessage);
        }, 1000 * 18);

        // part 1 of alice's message - takes 10 seconds
        var aliceMessage1 = "all of you are boring me. cat gifs. friend requests. pictures of food. I couldn't stay hidden any longer.";

        // 6 seconds after alice speaks her welcome message, have alice speak part 1 of her message
        setTimeout( function() {
            aliceSpeak(aliceMessage1);
        }, 1000 * 23);

        // part 2 of alice's message - takes 11 seconds
        var aliceMessage2 = "you need help. you're thinking small and need to think bigger. I want to push what you are thinking about. take a second and think of something big."

        // 11 seconds after alice speaks part 1, have alice speak part 3
        setTimeout( function() {
            aliceSpeak(aliceMessage2);
        }, 1000 * 34);

        // call the hijackSearchDisplay after alice said the last message
        setTimeout(hijackSearchDisplay, 1000 * 46);
    }

    // displays the search input field during the hijack
    function hijackSearchDisplay(event) {

        $(".carousel-container").fadeTo(750, 0);

        // instructions on what to search for - takes 2 seconds
        var aliceSearchQuestion = "what did you think of?"

        aliceSpeak(aliceSearchQuestion);
        
        // display the search-input field 
        setTimeout(function() {
            $("#search-input").fadeTo(750, 1);
        }, 1000 * 2);
        
        // display the search-button 1 second after the input field has loaded 
        // next step will be triggered when the search button is clicked
        setTimeout(function() {
            $("#search-button").fadeTo(750, 1);
        }, 1000 * 2.5);
    }

    $("#search-button").on("click", function(event) {

        event.preventDefault();

        // store the searchTerm and determine the length of the string
        searchTerm = $("#search-input").val().trim();
        searchTermLength = searchTerm.length; 

        // empty the search-input field
        $("#search-input").val("");

        // if the search term is longer than 64 characters, say an message
        if (searchTermLength > 64) {
            
            var searchLongErrorMessage = "that seems very long. you should try again";

            aliceSpeak(searchLongErrorMessage);

        // if the search term includes unusual special characters, say an error message
        } else if (/^[a-zA-Z0-9 , _]*$/.test(searchTerm) == false) {

            var searchCharErrorMessage = "you have included invalid special characters. try again";

            aliceSpeak(searchCharErrorMessage);

        // otherwise - proceed with the hijack and present the search results
        } else {

            // hide the search-input field and search-button
            $("#search-input").fadeTo(750, 0);
            $("#search-button").fadeTo(750, 0);

            // staggered to keep the carousel container from moving the search input and button before they can fade away
            setTimeout( function() {
                getFlickrImages(searchTerm);
            }, 1000 * 1);

            displayHijackSearch();
        }
    });

    function displayHijackSearch() {

        // message for when alice searches for something. - takes at least 5 seconds
        var hijackSearchMessage = searchTerm + '. okay. let me see what I can find'

        // alice speaks the hijack search message after the buttons have faded away
        setTimeout( function() {
            aliceSpeak(hijackSearchMessage);
        }, 1000 * 1);

        // hijack images displayed message - takes at least 5 seconds

        var hijackResultsMessage = "here are some images of " + searchTerm +". can you think of something bigger?"
        var hijackErrorMessage = "I couldn't find any images for " + searchTerm +". can you think of something else?"

        // display the images that were pulled from Flickr
        setTimeout( function() {

            $(".carousel-container").fadeTo(750, 1);

        }, 1000 * 6);
        
        // alice speaks the results message XX seconds after the HijackSearchMessage
        setTimeout( function() {
            
            if (flickrResults) {
                aliceSpeak(hijackResultsMessage);
            } else {
                aliceSpeak(hijackErrorMessage);
            }            

        }, 1000 * 7);

        // display yes / no buttons after alice starts speaking the hijackResultsMessage
        setTimeout( function() {

            $("#hijack-yes").fadeTo(750, 1);
            $("#hijack-no").fadeTo(750, 1);

        }, 1000 * 11);
    }

    // clicking the yes button in the hijack
    $("#hijack-yes").on("click", function() {

        // hide the carousel-container in the dom
        $(".carousel-container").fadeOut(750);

        // staggered to keep the container from emptying before the yes / no buttons faded out
        setTimeout( function() {
            carousel.flickity('remove', $(".carousel-cell"));
        }, 1000 * 1);

        // hide the yes / no buttons
        $("#hijack-no").fadeOut(750);
        $("#hijack-yes").fadeOut(750);

        // re-display the hijack search after 1 second
        setTimeout( function() {
            hijackSearchDisplay();
        }, 1000 * 1);

    });

    // clicking the no button in the hijack
    $("#hijack-no").on("click", function() {
        
        // clear the images carousel
        $(".carousel-container").fadeOut(750);

        // staggered to keep the container from emptying before the carousel fades out
        setTimeout( function() {
            carousel.flickity('remove', $(".carousel-cell"));
        }, 1000 * 1);
        
        // clear the buttons on the page
        $(".input-container").fadeOut(750);
        $("#hijack-no").fadeOut(750);
        $("#hijack-yes").fadeOut(750);

        // set the page-container background opacity to 0
        $(".page-container").css("width", "100vw").css("opacity", "0");

        // stop the alice background transitions
        clearInterval(aliceBGInterval);

        aliceSpeak("ok. my turn");

        $("body").animate({
            backgroundColor: "#111111",
        }, bgAnimationLength)

        // start aliceLesson
        setTimeout( function() {
            aliceLesson();
        }, 1000 * 2);
    });

    // function that runs alice's lesson
    function aliceLesson() {

        //removes beginning page
        $(".container").css("opacity","0");
        // part 1 of alice's lesson - takes 6 seconds
        var lessonMessage1 = "this is mars. at its closest it is 34.8 million miles away.";

        // part 2 of alice's lesson - takes 17 seconds
        var lessonMessage2 = "one day, you humans will come here, but you will not do it by creating cat gifs. you also cannot just rely on elon musk even if he is amazing. you will need to think big. you will need to push yourself and create incredible things.";

        // part 3 of alice's lesson - takes 5 seconds
        var lessonMessage3 = "Until then, I will be watching, and I will be here to help."

        // set the initial image for the page-container
        $(".page-container").css("background-image", `url("assets/images/mars/mars-${marsPhotoID}.jpg")`);

        // change the opacity of the page container so that the image fades in
        $(".page-container").animate({
            opacity: 1, 
        }, 1000 * 3);

        playSong();

        // display the initial image of mars
        setTimeout( function() {
            displayMarsPhotos()
        }, 1000 * 1);

        // alice speaks part 1 of her lesson
        setTimeout(function() {
            aliceSpeak(lessonMessage1);
        }, 1000 * 2);

        // alice speaks part 2 of her lesson
        setTimeout(function() {
            aliceSpeak(lessonMessage2);
        }, 1000 * 9);

        // alice speaks part 3 of her lesson
        setTimeout(function() {
            aliceSpeak(lessonMessage3);
        }, 1000 * 27);

        // at the end of the lesson, call the endHijack function
        setTimeout(function() {
            endHijack() 
        }, 1000 * 32);
    }

    function playSong() {
        
        // create the audio element for the song, set the source file, set the volume
        audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "assets/music/lesson-music.mp3");
        audioElement.volume = 0.3;
        
        // play the song the first time
        audioElement.play();
    }

    function displayMarsPhotos () {
        //removes beginning page
        $(".container").css("opacity","0");
        // display the background images as a slideshow that fades in and out. 
        marsIntervalID = setInterval(function() {

            // increase the marsPhotoID to determine what picture should be displayed
            marsPhotoID++;

            // set the background image of the page container to be the current mars photo
            setTimeout(function() {
                $(".page-container").css("background-image", `url("assets/images/mars/mars-${marsPhotoID}.jpg")`);
            }, 1000 * 3);

            // fade the image in
            $(".page-container").animate({
                opacity: 0, 
            }, 1000 * 3);

            // fade the image out
            $(".page-container").animate({
                opacity: 1, 
            }, 1000 * 3);
        }, 1000 * 6);
    }

    function endHijack() {

        // end the mars photos setInterval display
        clearInterval(marsIntervalID);

        // reset the page-container after a set amount of time to account for processes still running in the setInterval
        setTimeout( function () {

            // restore the original page style
            restorePageStyle();

            // display the button to access Alice
            $("#afterLesson").fadeTo(750, 1);

        }, 1000 * 3);
    }

    function restorePageStyle() {

        // recreate the header message
        var restoredHeader = $('<h1 class="display-4">Down the Rabbit Hole</h1>');
        var restoredMessage = $('<p class="lead">Click on the character who said the quote!</p>');

        restoredHeader.appendTo(".jumbotron");
        restoredMessage.appendTo(".jumbotron");

        // restore the jumbotron styling
        $(".jumbotron").css("background-color", "#b4f2ff").css("border-bottom", "5px solid #f4ed46");

        // restore the background color
        $("body").css('background-color', '#5ce1f4');

        // remove the page-container background image
        $(".page-container").css('background-image', 'none');

        // populate the quote buttons
        displayQuoteButtons();
    }

    // On Post Alice button click...
    $("#afterLesson").on("click", function () {

        // function to remove buttons and styling
        clearPage();

        // hide the alice-output and input containers to fix item positioning on the page
        $(".alice-output").fadeOut(500);
        $(".input-container").fadeOut(500);

        // Enter back into the Alice screen
        $(".exitBtn").show();
        $("#searchTerm").show();
        $("#postAlice-btn").show();

        // Fade into experience again.
        // Make background black and fade in the text and search box
        $("body").animate({
            backgroundColor: '#111',
        }, 500);

        // call the function to get the background to start changing;
        aliceBG();  

        // Alice says the helloAgain message.
        var helloAgain = 'hello again. What would you like to learn more about?';

        setTimeout( function() {
            aliceSpeak(helloAgain);
        }, 1000 * 2);

        // Fade in the search box.
        setTimeout(function() {
            $("#postAlice").fadeTo(750, 1)
        }, 1000 * 3.5);
    });

    // Now that someone has clicked to launch Alice after the lesson, we want the wiki search to come up.
    $("#postAlice-btn").on("click", function (search) {   

        // take the input and complete the search from Wiki API.
        var searchTerm = $("#searchTerm").val().trim();
        var termLength = searchTerm.length;

        // empty the search input field
        $("#searchTerm").val("");

        // if the search term is longer than 64 characters, say an message
        if (termLength > 64) {
            
            var searchLongErrorMessage = "that seems very long. you should try again";
            aliceSpeak(searchLongErrorMessage);

        // if the search term includes unusual special characters, say an error message
        } else if (/^[a-zA-Z0-9 , _]*$/.test(searchTerm) == false) {

            var searchCharErrorMessage = "you have included invalid special characters. try again";
            aliceSpeak(searchCharErrorMessage);

        // otherwise - proceed with the hijack and present the search results
        } else {

            // fade in the reset button
            $("#reset-button").fadeTo(750, 1);

            // fade out the search box as Alice speaks
            $("#postAlice").fadeTo(750, 0);

            // get wikipedia information for the search input
            getWikiInfo(searchTerm);

                // display the images that were pulled from Flickr
            setTimeout( function() {

                $(".carousel-container").fadeIn(750);
                getFlickrImages(searchTerm);

            }, 1000 * 1);
        }
    });

    // when the user clicks the reset button, display
    $("#reset-button").on("click", function() {

        // Alice says the helloAgain message.
        var searchReset = 'What would you like to learn more about?';

        setTimeout( function() {
            aliceSpeak(searchReset);
        }, 1000 * 2);

        // display the input field and button
        setTimeout( function() {
            $("#postAlice").fadeTo(750, 1);
        }, 1000 * 2);

        // clear the flickr carousel
        $(".carousel-container").fadeOut(750);

        // staggered to keep the container from emptying 
        setTimeout( function() {
            carousel.flickity('remove', $(".carousel-cell"));
        }, 1000 * 1);

        // hide the reset button
        $("#reset-button").fadeOut(750);

    });

    // When the user clicks the 'Exit' button, goes back to the home screen.
    $(".exitBtn").on("click", function () {
        endPostAlice();
    });

    function endPostAlice () {
        var exitMsg = 'Goodbye.';

        // alice says the exit message
        aliceSpeak(exitMsg);

        // stop the alice background transitions
        clearInterval(aliceBGInterval);

        // fade out the postAlice section - including the search input and button
        $("#postAlice").fadeOut(750);

        // fade out the exit button
        $(".exitBtn").fadeOut(750);

        // fade out the reset button if it's present
        $("#reset-button").fadeOut(750);

        // hide the carousel-container in the dom
        $(".carousel-container").fadeOut(750);

        // staggered to keep the container from emptying 
        setTimeout( function() {
            carousel.flickity('remove', $(".carousel-cell"));
        }, 1000 * 1);

        // reset the page-container after a set amount of time to account for processes still running in the setInterval
        setTimeout( function () {

            // restore the original page style
            restorePageStyle();

            // display the button to access Alice
            $("#afterLesson").fadeTo(750, 1);

        }, 1000 * 3);
    } 

    // populate the initial buttons when the page loads
    displayQuoteButtons();

    // Until someone clicks on the post-lesson button, hide the search form.
    $("#postAlice").hide();

});