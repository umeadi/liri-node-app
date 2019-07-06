// node liri.js moviethis "boss baby"
var request = require("request");
var axios = require("axios");
var arg1 = process.argv[2];
var arg2 = process.argv[3];


console.log("arg1: " + arg1);

console.log("arg2: " + arg2);



var startProg = function (arg1, arg2) {
    switch (arg1) {
        case "my-bands": getMyBands(arg2);
            break;
        case "movie-this": getMovieInfo(arg2);
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

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    axios.get(queryUrl)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {

        });

    // if(error){
    //     console.log(error);
    // }
    // var data = response;
    // console.log(data);

}




startProg(arg1, arg2);