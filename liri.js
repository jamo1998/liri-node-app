require("dotenv").config();


var request = require("request");
var fs = require("fs");
var keys = require("./key.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var userInput = process.argv[2]; 
var inputParameter = process.argv[3];


UserInputs(userInput, inputParameter);


function UserInputs (userInput, inputParameter){
    switch (userInput) {
    case 'concert-this':
        showConcertInfo(inputParameter);
        break;
    case 'spotify-this-song':
        showSongInfo(inputParameter);
        break;
    case 'movie-this':
        showMovieInfo(inputParameter);
        break;
    case 'do-what-it-says':
        showSomeInfo();
        break;
    default: 
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

//Funtion for Concert Info: Bands in Town
function showConcertInfo(inputParameter){
    var queryUrl = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
    request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
        var concerts = JSON.parse(body);
        for (var i = 0; i < concerts.length; i++) {  
            console.log("**********EVENT INFO*********");  
            console.log(i);
            console.log("Name of the Venue: " + concerts[i].venue.name);
            console.log("Venue Location: " +  concerts[i].venue.city);
            console.log("Date of the Event: " +  concerts[i].datetime);
            console.log("*****************************");
        }
    } else{
      console.log('Error occurred.');
    }
});}


function showSongInfo(inputParameter) {
    if (inputParameter === undefined) {
        inputParameter = "The Sign";
    }
    spotify.search(
        {
            type: "track",
            query: inputParameter
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("**********SONG INFO*********");
                console.log(i);
                console.log("Song name: " + songs[i].name);
                console.log("Preview song: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
                console.log("Artist(s): " + songs[i].artists[0].name);
                console.log("*****************************");  
            }
        }
    );
};

function showMovieInfo(inputParameter){
    if (inputParameter === undefined) {
        inputParameter = "Mr. Nobody"
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=short&apikey=b3c0b435";
    request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
        var movies = JSON.parse(body);
        console.log("**********MOVIE INFO*********");  
        console.log("Title: " + movies.Title);
        console.log("Release Year: " + movies.Year);
        console.log("IMDB Rating: " + movies.imdbRating);
        console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
        console.log("Country of Production: " + movies.Country);
        console.log("Language: " + movies.Language);
        console.log("Plot: " + movies.Plot);
        console.log("Actors: " + movies.Actors);
        console.log("*****************************");  
    } else {
      console.log('Error occurred.');
    }

});}

//function to get proper Rotten Tomatoes Rating
function getRottenTomatoesRatingObject (data) {
    return data.Ratings.find(function (item) {
       return item.Source === "Rotten Tomatoes";
    });
  }
  
  function getRottenTomatoesRatingValue (data) {
    return getRottenTomatoesRatingObject(data).Value;
  }

//function for reading out of random.txt file  
function showSomeInfo(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
	});
}