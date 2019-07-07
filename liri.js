// node liri.js moviethis "boss baby"
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");
var axios = require("axios");
var moment = require("moment");
var fs = require('fs');


var arg1 = process.argv[2];
var arg2 = process.argv.slice(3).join(" ");




console.log("Program: " + arg1);

console.log("Search Query: " + arg2);



var startProg = function (arg1, arg2) {
    switch (arg1) {
        case "concert-this": getConcertInfo(arg2);
            break;
        case "movie-this": getMovieInfo(arg2);
            break;
        case "spotify-this-song" :getSongInfo(arg2);
            break;
        case "do-what-it-says" :getWhatItSays(arg2);
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
    var divider = "\n-----------------------------------------------------------------------------------------------------------------------------------------------------------";


    axios.get(movieUrl)
        .then(function (response) {

        var jsonData = response.data

        var movieData = [
            divider,
            "Title: " + jsonData.Title,
            "Year: " + jsonData.Year,
            "IMDB Rating: " + jsonData.imdbRating,
            "Rotten Tomatoes Rating: " + jsonData.tomatoRating,
            "Country where movie was produced: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Actors: " + jsonData.Actors,
            divider
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



function getConcertInfo(artist, concertTime){
    console.log("get band info");

    // if (concertTime === undefined) {
    //     console.log("---------------------------------------------")
    //     console.log("\n---------------------------------------------");
    //     console.log("Artist doesn't appear to have any tour dates. \nPlease search a different artist.");
    //     console.log("---------------------------------------------");
    //     console.log("\n---------------------------------------------")
    // }
    
    
    var concertUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    var divider = "\n--------------------------------------------------------------------";

    axios.get(concertUrl)
    .then(function(response){
        // console.log(response);
        var jsonData = response.data[0];
        var concertTime = jsonData.datetime;

        var concertData = [
            divider,
            "Venue: " + jsonData.venue.name,
            "Location: " + jsonData.venue.city,
            "Time of Event: " + moment(concertTime).format("MM/DD/YYYY h:mm:ss a"),
            divider
        ].join("\n\n");

        console.log(concertData);
    })
   

};

function getSongInfo(arg2) {
    var divider = "\n--------------------------------------------------------------------";
    var Spotify = require("node-spotify-api");
    var track = arg2;
    var spotify = new Spotify({
      id: "8866202a6eb14d1eb27ea164a7f9f481",
      secret: "cb3e89d8ff274f6c93153316d08d1fc5"
    });

spotify
.search({ type: "track", query: track, limit: 1 })
.then(function(response) {

    // console.log(response);
    var response = response.tracks.items[0];
    var musicData = [
        divider,
    "Album Name: " + response.album.name,
    "Song Name: " + response.name,
    "Artist Name: " + response.artists[0].name,
    "Preview Link: " + response.external_urls.spotify,
    divider
  ].join("\n\n");
  console.log(musicData);
})
.catch(function(error) {
  console.log(error);
  getSongInfo("The Sign Ace of Base")
});
};

function getWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, data) {
   
       if (error) {
           return console.log(error);
       }
       console.log(data);
   
       var dataArr = data.split(","); 
   
       console.log(dataArr);
   
       var action = dataArr[0];
       var query = dataArr[1];
   
       switch(action) {
           case "concert-this": getMyBands(query);
           break;
           case "movie-this": getMovieInfo(query);
           break;
           case "spotify-this-song": getSongInfo(query);
           break;
       }
   
   
    });

}


startProg(arg1, arg2);