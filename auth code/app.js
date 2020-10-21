var express = require("express");
var app = express();
const path = require("path");
var SpotifyWebApi = require("spotify-web-api-node");
const SpotifyStrategy = require('passport-spotify').Strategy;


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/main.html"));
});

app.get("/login", (req, res) => {
  var scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-modify-public",
    "playlist-read-private",
  ];
  var redirectUrl = "http://localhost:3000/";
  var client_id = "5127a73ed1d04f14beb7b492421a1f92";
  var client_secret = "aa4c1eac5f444bf1ac5f4f2e52158d02";

  var spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUrl,
    clientId: client_id,
  });

  var state = "spotify_auth_state";
  var responseType = "code";
  var showDialogue = "true";
  var authorizeURL = spotifyApi.createAuthorizeURL(
    scopes,
    state,
    showDialogue,
    responseType
  );

res.redirect(authorizeURL);
  
  spotifyApi.setAccessToken('BQBilGnxaXDS2HjMl8y6r6Lwk3dbn1IYcoQ3raCTNjHm8Z2qLqOUSsabpNmqkasYrNXI2EmTVKYWQ3o30sc7oPu9J-FMnuJQ5A8vxHLfJebr2ha6k4dI8uqN4t9ozTMSjRZqGxSvd5gaiSyhnNXsGMkPTRmT6ZGrBIHHgZSXYVQ9m7URYKNLRDUHH-dxkCNnhTjNeuSwG3Z06qi2JSYCHGxjshGAsx_3llJrSXVi1q2PZzXeVbEMPi8eO_5q2LE');
  //create playlist
  spotifyApi.createPlaylist('Youtube', { 'description': 'Youtube Liked Songs', 'public': false })
  .then(function(data) {
    console.log('Created playlist!');
    console.log(data.playlistId);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  //add songs to playlist
  /*spotifyApi.addTracksToPlaylist('Youtube', ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"])
  .then(function(data) {
    console.log('Added tracks to playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });*/
});

//console.log(location.search);

app.get("/callback", function (req, res) {
    
});
console.log("listening on 3000");
app.listen(3000);
