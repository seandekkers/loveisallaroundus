require('dotenv').config();

var express = require('express');
// var Howl = require('howler');
var app = express();
var router = express.Router();



var firebase = require('firebase');
var fireApp = firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
  });

// var queueRef = new Firebase('https://loveisallaroundus-58e78.firebaseio.com/queue');
// var options = {endpoint: 'jobs'};

// var cron = new Cron(ref, queueRef, options);

var Twitter = require('twitter');
var client = new Twitter({

   consumer_key: process.env.CONSUMER_KEY,
   consumer_secret: process.env.CONSUMER_SECRET,
   access_token_key: process.env.ACCESS_TOKEN_KEY,
   access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var googleMapsClient = require('@google/maps').createClient({
  key: process.env.key
});





// TWITTER
// ---------------------------------------------------
router.get('/tweets/:q', function (req, res) {
	client.get('search/tweets', req.params, function(error, tweets, response) {
     res.send(tweets);
	});
});

//Google Maps


router.get('/geocoder/:address', function (req, res) {
 googleMapsClient.geocode(req.params, function(err, response) {
   res.send(response);
 });
});



//FIREBASE

  // var config = {
  //   apiKey: process.env.apiKey,
  //   authDomain: process.env.authDomain,
  //   databaseURL: process.env.databaseURL,
  //   storageBucket: process.env.storageBucket,
  //   messagingSenderId: process.env.messagingSenderId
  // };
  // firebase.initializeApp(config);


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