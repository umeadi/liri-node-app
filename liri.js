// node liri.js moviethis "boss baby"
var request = require("request");
var axios = require("axios");
var moment = require("moment");


var arg1 = process.argv[2];
var arg2 = process.argv.slice(3).join(" ");




console.log("arg1: " + arg1);

console.log("arg2: " + arg2);



var startProg = function (arg1, arg2) {
    switch (arg1) {
        case "concert-this": getConcertInfo(arg2);
            break;
        case "movie-this": getMovieInfo(arg2);
            break;
        case "spotify-this-song" :getSongInfo(arg2);
            break;
        case "do-what-is-says" :getWhatItSays(arg2);
            break;
        default:
            console.log("enter the right action")
    }
}

function getMovieInfo(movieName) {
    console.log("get movie");
    if (movieName === undefined) {
        movieName = "Mr Nobody";
    }

    var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    axios.get(movieUrl)
        .then(function (response) {

        var jsonData = response.data

        var movieData = [
            "Title: " + jsonData.Title,
            "Year: " + jsonData.Year,
            "IMDB Rating: " + jsonData.imdbRating,
            "Rotten Tomatoes Rating: " + jsonData.tomatoRating,
            "Country where movie was produced: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Actors: " + jsonData.Actors
        ].join("\n\n");
            // console.log(response);
            console.log(movieData);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {

        });

    

}



function getConcertInfo(artist){
    console.log("get band info");
    
    
    var concertUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(concertUrl)
    .then(function(response){
        // console.log(response);
        var jsonData = response.data[0];
        var concertTime = jsonData.datetime;

        var concertData = [
            "Venue: " + jsonData.venue.name,
            "Location: " + jsonData.venue.city,
            "Time of Event: " + moment(concertTime).format("MM/DD/YYYY h:mm:ss a")
            
        ].join("\n\n");

        console.log(concertData);
    })
   

};


startProg(arg1, arg2);