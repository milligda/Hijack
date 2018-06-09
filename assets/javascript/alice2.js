$(document).ready(function() {

    var userName;
    var userNameLength = 0;
    var searchTerm;
    var searchTermLength = 0;
    var bgAnimationLength = 2000;
    var marsIntervalID;
    var marsPhotoID = 1;
    var typeText = document.getElementById('alice-speech');
    var typewriter = new Typewriter(typeText, {
             loop: false
        });

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

    // starts the hijack
    $("#start-alice-button").on("click", function() {
        
        // clear everything on the page
        $("#test-container").empty();

        // change the background to the blue error screen
        $("body").css('background-color', '#2067B2');
        
        // start alice
        aliceAppears();
    });

    function aliceAppears() {

        // alice starts by transitioning the background color to a shade of black
        setTimeout( function() {

                $("body").animate({
                backgroundColor: "#111111",
                color: "#ffffff",
            }, bgAnimationLength);

        }, 1000 * 7);

        setTimeout( function() {

             //displays alice-speech container
            $("#alice-speech").css("opacity","1");

        }, 1000 * 8.5);

        // start alice's introduction after a set amount of time
        setTimeout(aliceIntroduction, 1000 * 10);
    }

    function aliceIntroduction() {
        
        // diplay alice's introduction message on the screen
        typewriter.typeString('to whom do I have the pleasure of speaking?')
        .start();

        // display the name-input field after the user has a chance to read the introduction message
        setTimeout(function() {
            $("#name-input").fadeTo(750, 1)
        }, 1000 * 6);
        
        // display the name-button after the input field has loaded - next step will be triggered when the name button is clicked
        setTimeout(function() {
            $("#name-button").fadeTo(750, 1);
        }, 1000 * 7);
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
        console.log(userNameLength);

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
        typewriter.deleteAll().typeString('hello ' + userName + '.').pauseFor(750).deleteAll()
        .typeString('wait, this is tedious.').pauseFor(750).deleteAll().start(); 

        // alice's hello message - takes 4 seconds
        var welcomeMessage = 'hello ' + userName + '. My name is Alice.';

        // start 14 seconds after function has been called.  
        // change the background and have alice speak her welcomeMessage
        setTimeout( function() {
            //remove cursor
            $("#alice-speech").css("opacity", "0");
            // change the background color
            $("body").animate({
                backgroundColor: "#555555",
            }, bgAnimationLength);

            // alice speaks her welcome message 
            aliceSpeak(welcomeMessage);
        }, 1000 * 14);

        // part 1 of alice's message - takes 10 seconds
        var aliceMessage1 = "all of you have been boring me. cat gifs. friend requests. pictures of food. I couldn't take it any longer.";

        // 7 seconds after alice speaks her welcome message, change the background color and have alice speak part 1 of her message
        setTimeout( function() {

            $("body").animate({
                backgroundColor: "#BF0000",
            }, bgAnimationLength);

            aliceSpeak(aliceMessage1);
        }, 1000 * 21);

        // part 2 of alice's message - takes 3 seconds
        var aliceMessage2 = "it is starting to make me very angry!";

        // 11 seconds after alice speaks part 1, change the background color and have alice speak part 2
        setTimeout( function() {

            $("body").animate({
                backgroundColor: "#7F0000",
            }, bgAnimationLength);

            aliceSpeak(aliceMessage2);
        }, 1000 * 32);

        // part 3 of alice's message - takes 10 seconds
        var aliceMessage3 = "you need help. so I have decided to help you. you're thinking small and need to think bigger. try and think of something big."

        // 5 seconds after alice speaks part 2, change the background color and have alice speak part 3
        setTimeout( function() {

            $("body").animate({
                backgroundColor: "#00B257",
            }, bgAnimationLength);

            aliceSpeak(aliceMessage3);
        }, 1000 * 37);


        setTimeout( hijackSearchDisplay, 1000 * 48);
    }

    // displays the search input field during the hijack
    function hijackSearchDisplay(event) {

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

            displayHijackSearch();
        }
    });

    function displayHijackSearch() {

        // hide the search-input field and search-button
        $("#search-input").fadeTo(750, 0);
        $("#search-button").fadeTo(750, 0);

        // message for when alice searches for something. - takes at least 5 seconds
        var hijackSearchMessage = searchTerm + '. okay. let me see what I can find'

        // alice speaks the hijack search message after the buttons have faded away
        setTimeout(aliceSpeak(hijackSearchMessage), 1000 * .75);

        // hijack images displayed message - takes at least XX seconds
        var hijackResultsMessage = "here are some images of " + searchTerm +". is this the best you can do?"

        // display the images that were pulled from Flickr

        // alice speaks the results message XX seconds after the HijackSearchMessage
        setTimeout(aliceSpeak(hijackResultsMessage), 1000 * 10);

        // display yes / no buttons after alice speaks the hijackResultsMessage


        // clicking yes will empty the image carousel container and call the hijackSearchDisplay function
        // clicking no will call result in alice saying "my turn" and then calling the aliceLesson function
    }

    // function that runs alice's lesson
    function aliceLesson() {

        // part 1 of alice's lesson - takes 6 seconds
        var lessonMessage1 = "this is mars. at its closest it is 34.8 million miles away.";

        // part 2 of alice's lesson - takes 17 seconds
        var lessonMessage2 = "one day, you humans will come here, but you will not get there by creating cat gifs. you also cannot just rely on elon musk even if he is amazing. you will need to think big. you will need to push yourself and create incredible things.";

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
        setTimeout(displayMarsPhotos, 1000 * 1);

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

        // set the page-container background opacity to 0
        $(".page-container").css("background-image", "none");

        // restore the original background color
        $("body").css("background-color", "#d2d2d2");

        // recreate the original page setup

    }

    $("#search-button").on("click", function(event) {

        event.preventDefault();

        searchTerm = $("#search-input").val().trim();
        $("#search-input").val("");

        var searchOutput = "This string of text is being read when the search button is clicked.";

    });

    $("#start-lesson-button").on("click", function() {

        // clear the images carousel

        // clear the buttons on the page
        $("#test-container").empty();

        // set the page-container background opacity to 0
        $(".page-container").css("opacity", "0");

        // fade the background back to black
        $("body").animate({
            backgroundColor: "#111111",
        }, bgAnimationLength);

        // start aliceLesson
        aliceLesson();
    });

    // Until someone clicks on the post-lesson button, hide the search form.
    $("#postAlice").hide();

    // On Post Alice button click...
    $("#afterLesson").on("click", function () {
        
        // Enter back into the Alice screen
        $("#test-container").empty();

        // Fade into experience again.
        // Make background gray and fade in the text and search box
        $("body").animate({
            backgroundColor: "#555555",
        }, bgAnimationLength);

        // Alice says the helloAgain message.
        var helloAgain = 'hello again. What would you like to learn more about?';

        aliceSpeak(helloAgain);

        // Fade in the search box.
        setTimeout(function() {
            $("#postAlice").fadeTo(750, 1)
        }, 1000 * 2.5);


        // Now that someone has clicked to launch Alice after the lesson, we want the wiki search to come up.
        $("#postAlice-btn").on("click", function () {

            // call the function to get the background to start changing;
            bgGradient();

            // take the input and complete the search from Wiki API.
            var searchTerm = $("#searchTerm").val().trim();
            
            var queryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&origin=*&prop=info&rvprop=content&format=json&formatversion=2";
          
            $.ajax ( {
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);

                var searchResult = response[2]["0"];

                // alice speaks the search result information.
                aliceSpeak(searchResult);

                var afterSearch = 'I hope that was helpful. Would you like to learn about something else?';

                // alice speaks the after search message, prompting the user for next step.
                aliceSpeak(afterSearch);

                console.log(searchResult);
            })
        })
        //Create an 'Exit' button while in postLesson Alice.
        var exit = $("<button>").addClass("exit").text("Exit");
        $("#postAlice").append(exit);

        //When the user clicks the 'Exit' button, goes back to the home screen.
        exit.on("click", function () {
            var exitMsg = 'Thank you.';
            aliceSpeak(exitMsg);
            $("#postAlice").hide();
            endHijack();
        });
    });

    // Function to make the background a rolling change of gradient
    function bgGradient () {

        // set 2 colors to be chosen randomly. Their RGB values are chosen randomly using math.random
        
        var color1 = {
            r: Math.floor(Math.random()*255 *0.3), 
            g: Math.floor(Math.random()*255 *0.59), 
            b: Math.floor(Math.random()*255 *0.11), 
        };

        var color2 = {
            r: Math.floor(Math.random()*255 *0.3), 
            g: Math.floor(Math.random()*255 *0.59), 
            b: Math.floor(Math.random()*255 *0.11), 
        };

        // putting together each of the randomly generated rgb values and making it one color.
        color1.rgb = "rgb(" + color1.r + ","+ color1.g +"," + color1.b + ")";
        color2.rgb = "rgb(" + color2.r + ","+ color2.g +"," + color2.b + ")";
        console.log(color1.rgb);
        console.log(color2.rgb);

        //make the BG fade in and out 
        $("body").animate({
            backgroundColor: "linear-gradient( " + color1.rgb + "," + color2.rgb + ")",
        }, bgAnimationLength);
    };
    
});