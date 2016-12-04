require('dotenv').config();
var express = require('express');
var request = require('request');

///FIREBASE///
var admin = require("firebase-admin");
var serviceAccount = require("loveisallaroundus-58e78-firebase-adminsdk-vsjoj-ff3b60783c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loveisallaroundus-58e78.firebaseio.com"
});

	var db = admin.database();
	var ref = db.ref("/");
	var postsRef = ref.child("/");


start();



var twitterData = [];
var newTwitterData = [];
var filteredTweets = [];
var fireBaseTweets = [];
var fireBaseCount;
var tweetObj = {};
var tweetSearch = 'love';

var tweetLibrary = [];
var rawTweetCount = 0;
var counter = 0;
var dotCounter = 0;
var intervalCounter=0;


function database(){

	var runDatabase = function(){

		console.log('RUN TWITTER API AND ADD TO DATABASE: ' + intervalCounter);

		intervalCounter++

		if (intervalCounter >= 2){
			clearInterval(databaseInterval);
		
		}

		start();
	}

	
	var databaseInterval = setInterval(runDatabase,3000);
	
}


// START MASTER DATABASE FUNCTION
// database();

// start();



function start(){
	console.log('start');

	
	tweetObj = {
		    place: "",
		    lat: "",
		    lng:"",
		    tweet: "",
		    location: "",
		    name: "",
		    id: "",
		    sn: "",
		    x: "",
		    y: "",
		   //  playCity: function(){
					// var location = this.location;
		   //  		sendCity(location);
		   //  },
			};
			
			// tweetObj.play = function(){
			// 	console.log("PLAY");
			// };

	//Call Twitter

var twitterUrl = "http://localhost:5000/tweets/" + tweetSearch;
 
request.get(twitterUrl, callTwitter);



	var randomInterval = Math.random() * 1000;
}


function callTwitter(error, response, body){

if (!error && response.statusCode == 200) {
		var json = JSON.parse(body);



		console.log('callTwitter');
		
		
		json.statuses.forEach( function(originalTweet){
			// console.log(x.user);
			var location = originalTweet.user.location;
			var regExp = /[1-4]/g;

			if (location != null && location.length >= 2 && location.length <= 20 && location[0] !=" "){
				twitterData.push(originalTweet);
			}
		});

		rawTweetCount = twitterData.length;
		controller();
	}
	
}


function controller(){
	console.log('controller');


		twitterData.forEach(function(tweet){
		
			tweetObj = {
				place: "",
				lat: "",
				lng:"",
				img:tweet.user.profile_background_image_url,
				tweet: tweet.text,
				location: tweet.user.location,
				name: tweet.user.name,
				id: tweet.user.id,
				sn: tweet.user.screen_name,
				x: "",
				y: "",
			}
			tweetLibrary.push(tweetObj);
			// DEBUGGER TO GET RAW DATA
			// debugger
		})
		//REMOVE RAW TWEETS
		
		twitterData.splice(0,twitterData.length);

		tweetLibrary.forEach(function(tweet){
				var location = tweet.location;
				

///////////////////FAKE CITY FOR TEST /////////////////////

				sendCity(location);
				// sendFakeCity(location);
			});

	}



function sendCity(location){
	// SEND LOCATION STRING TO GEOCODER
	// $.getJSON('/geocoder/'+location, getCoordinates);
	var geoCoderUrl = "http://localhost:5000/geocoder/" + location;

	request.get(geoCoderUrl, getCoordinates);

}
	

function getCoordinates(error, response, body){
	if (!error && response.statusCode == 200) {
		var json = JSON.parse(body);

		console.log('getCoordinates');
		var lat = 0;
		var lng = 0;

		var status = json.json.status;

		//IF CALL STATUS IS OKAY
		if( status == "OK"){
				place = json.json.results[0].address_components[0].short_name;
				lat = json.json.results[0].geometry.location.lat;
				lng = json.json.results[0].geometry.location.lng;
				
				tweetLibrary[counter].location = place;
				tweetLibrary[counter].lat = lat;
				tweetLibrary[counter].lng  = lng;
				
		} else if( status == "ZERO_RESULTS"){
			console.log('zero results');

		} 	


		coordToValue(lat, lng);
	}
}


function coordToValue(lat, lng ){

		if ( lat != 0 ){


		// CONVERT COORDINATES TO X,Y VALUE
		
		var xValue = 0;
		var yValue = 0;

		xValue = ((180 + lng) / 360)*100;

		if(lat >= 0) { 
			yValue = ((90 - lat) / 180) * 100; 
		} else {
			yValue = ((90 + (lat * -1)) / 180) * 100;
		}
		tweetLibrary[counter].x = xValue;
		tweetLibrary[counter].y = yValue;

		}

	counter++;

		// debugger
		// console.log('COUNTER: '+ counter +' ' + 'LIBRARY LENGTH: ' + tweetLibrary.length);
		if ( counter == tweetLibrary.length){
			//SEND LIBRARY TO FILTER
			filterTweets();	
		}
}

var tweetDatabase = {
	tweet:"",
}

var clearLibrary = 0;

function filterTweets(){
	
	//FILTER TWEETS
	filteredTweets = tweetLibrary.filter(function(tweet){
		//RETURN ALL TWEETS WITH X AND Y COORDINATES
		return tweet.x != 0;
	});

	// ADD FILTERED TWEETS TO DATABASE

	filteredTweets.forEach(function(filteredTweet){
		tweetDatabase.tweet = filteredTweet;
		addToDataBase(tweetDatabase);
	})
	// EMPTY TWEET LIBRARY
	clearAllArrays();
}
	
function clearAllArrays(){
	// CLEAR ALL ARRAYS
	twitterData = [];
	newTwitterData = [];
	filteredTweets = [];
	tweetLibrary = [];

}
 

function addToDataBase(fireBaseTweet){
	
	console.log(fireBaseTweet);
	postsRef.push(fireBaseTweet);

	// ADD TWEET TO FIREBASE
	// ref.push(fireBaseTweet);
}


