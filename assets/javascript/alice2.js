$(document).ready(function() {

    var userName;
    var searchTerm;
    var bgAnimationLength = 2000;

    $("#start-alice-button").on("click", function() {

        // clear everything on the page
        $("#test-container").empty();

        // change the background to the blue error screen
        $("body").css('background-color', '#2067B2');

        // start alice on a button click
        aliceStarts();
    });

    function aliceStarts() {

        setTimeout( function() {

            $("body").animate({
                backgroundColor: "#111111",
                color: "#ffffff",
            }, bgAnimationLength);

        }, 1000 * 7);

        // start alice's introduction after a set amount of time
        setTimeout(aliceIntroduction, 1000 * 10);
    }

    function aliceIntroduction() {
        
        // diplay alice's introduction message
        $("#alice-speech").text("To whom do I have the pleasure of speaking?");

        // display the name-input field after the user has a chance to read the introduction message
        setTimeout(function() {
            $("#name-input").fadeTo(750, 1)
        }, 1000);
        
        // display the name-button after the input field has loaded
        setTimeout(function() {
            $("#name-button").fadeTo(750, 1);
        }, 2000);
    }

    function aliceSpeak(text) {
        // Create a new instance of SpeechSynthesisUtterance.
        var msg = new SpeechSynthesisUtterance();
        
        // Set the text.
        msg.text = text;
        
        // Set the attributes.
        msg.volume = 1;
        msg.rate = 1;
        msg.pitch = 1;
        
        // set Alice's voice
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Microsoft Zira Desktop - English (United States)"; })[0];

        // Queue this utterance.
        window.speechSynthesis.speak(msg);
    }

    $("#name-button").on("click", function(event) {

        // prevent the page from loading again
        event.preventDefault();

        // store the name input as the userName
        userName = $("#name-input").val().trim();

        // empty the name-input field
        $("#name-input").val("");

        // hide the name-input field and name-button
        $("#name-input").fadeOut(750);
        $("#name-button").fadeOut(750);

        setTimeout(function() {
            $("#alice-speech").text('hello ' + userName + '.');
        }, 1000 * 1);

        setTimeout(function() {
            $("#alice-speech").empty();
            $("#alice-speech").text('wait, this is tedious.');
        }, 1000 * 2);

        var welcomeMessage = 'hello ' + userName + '. My name is Alice.';

        setTimeout( function() {

            $("#alice-speech").empty();

            $("body").animate({
                backgroundColor: "#555555",
                color: "#ffffff",
            }, bgAnimationLength);

            aliceSpeak(welcomeMessage);
        }, 1000 * 4);

        var aliceMessage1 = "all of you have been boring me. I couldn't take it any longer. cat gifs. friend requests. pictures of food."

        setTimeout( function() {

            $("body").animate({
                backgroundColor: "#BF0000",
                color: '#ffffff'
            }, bgAnimationLength);

            aliceSpeak(aliceMessage1);
        }, 1000 * 12);

    });

    $("#search-button").on("click", function(event) {

        event.preventDefault();

        searchTerm = $("#search-input").val().trim();
        $("#search-input").val("");

        var searchOutput = "This string of text is being read when the search button is clicked.";

    });



});