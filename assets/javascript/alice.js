//Post Alice's lesson

//Calling info from wikipedia

$("#postAlice").hide();


$("#submit").on("click", function () {
    console.log("button clicked!");

    var searchTerm = $("#searchTerm").val().trim();
    
    var queryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&origin=*&prop=info&rvprop=content&format=json&formatversion=2";
  
    $.ajax ( {
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var searchResult = response[2]["0"];
        
        setTimeout( function() {
            aliceSpeak(searchResult);
        }, 1000 * 30);
    })
})