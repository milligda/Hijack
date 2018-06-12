var carousel = $(".alice-carousel").flickity({
    freeScroll: true,
    wrapAround: true,
    autoPlay: 1500,
    imagesLoaded: true
});

var flickrURL = 'https://api.flickr.com/services/rest/?';
var flickrMethod = 'flickr.photos.search';
var flickrAPI = '9211405c4f5ed9a022c7191358a98c98';
var flickrSort = 'relevance';
var flickrExtras = 'url_m';
var flickrImages = 10;
var flickrFormat = 'json';
var flickrCallback = "nojsoncallback=1";

var queryURL = flickrURL + 
    "method=" + flickrMethod + 
    "&api_key=" + flickrAPI + 
    "&text=" + searchInput + 
    "&sort=" + flickrSort +
    "&extras=" + flickrExtras + 
    "&per_page=" + flickrImages + 
    "&format=" + flickrFormat + 
    "&" + flickrCallback;

function getFlickrImages() {

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
    
        var imagesArr = response.photos.photo;
    
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

