require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require('./key');
var moment = require('moment');
var request = require('request');

var spotify = new Spotify({
    id: keys.spotify.secret
});

if (process.argv[2] == 'concert-this') {

    var artist = process.argv.slice(3).join(" ");
    console.log(artist);

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
}