require('dotenv').config();

var express = require('express');
// var Howl = require('howler');
var app = express();
var router = express.Router();

// Firebase

// var admin = require('firebase');

//   admin.initializeApp({
//   credential: admin.credential.cert("./loveisallaroundus-58e78-firebase-adminsdk-vsjoj-ff3b60783c.json"),
//   databaseURL: "https://loveisallaroundus-58e78.firebaseio.com"
// });

// var admin = require("firebase");

// var serviceAccount = require("./loveisallaroundus-58e78-firebase-adminsdk-vsjoj-ff3b60783c.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://loveisallaroundus-58e78.firebaseio.com"
// });

// 

var Twitter = require('twitter');
var client = new Twitter({

   consumer_key: process.env.CONSUMER_KEY,
   consumer_secret: process.env.CONSUMER_SECRET,
   access_token_key: process.env.ACCESS_TOKEN_KEY,
   access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyA5pkHEld7sx1FsMzxxghfxPTQmJFuW0NY'
  // key: process.env.GOOGLE_MAPS_API_KEY
});





// TWITTER
// ---------------------------------------------------
router.get('/tweets', function (req, res) {
	client.get('search/tweets', {q: 'love'}, function(error, tweets, response) {
     res.send(tweets);
	});
});

//Google Maps


router.get('/geocoder', function (req, res) {
 googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View'
 }, function(err, response) {
    res.send(response);
   // if (!err) { 
    // res.send(response);
   // }
 });
});



app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

// routes
router.get('/', function(req, res) {
    res.render('home');
});

router.get('/contacts', function(req, res) {
    res.render('contacts');
});

app.use('/', router);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});