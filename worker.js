require('dotenv').config();
var express = require('express');
var request = require('request');

///FIREBASE///
//MAXIUMUM DATABASE COUNT
var max = 500;

var admin = require("firebase-admin");
var serviceAccount = require("loveisallaroundus-58e78-firebase-adminsdk-vsjoj-ff3b60783c.json");
var removeId = [];
var extraTweetAmount = 0;
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

var CronJob = require('cron').CronJob;


new CronJob({
  cronTime: "30 */2 * * * *",//15 seconds after every minute
  onTick: manageDataBase,
  start: true,
  timeZone: "America/Los_Angeles"
});

new CronJob({
  cronTime: "1 */2 * * * *",//1 second after every minute
  onTick: clearAllArrays,
  start: true,
  timeZone: "America/Los_Angeles"
});


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loveisallaroundus-58e78.firebaseio.com"
});

var db = admin.database();
var ref = db.ref();
var postsRef = ref.child("/");


// manageDataBase();

	
function manageDataBase(){
	console.log('CALL MANAGER');
	
	postsRef.once('value', function(snapshot){
		
		var fireBaseCount = snapshot.numChildren();
		console.log('TWEETS IN FIREBASE: ' + fireBaseCount);

		
		if(fireBaseCount > max){
			console.log('DELETE EXTRA TWEETS');
			extraTweetAmount = fireBaseCount - max;
			console.log("EXTRA TWEET AMOUNT: " + extraTweetAmount);
			removeTweets(); 
		} else{
			console.log('NO TWEETS TO DELETE');
		}

 	});
	
	var extra = admin.database().ref("/");
	extra.limitToFirst(50).on("child_added", function(snapshot) {
		// console.log('TWEETS IN REMOVE ARRAY: ' + snapshot.numChildren());
		// console.log(snapshot.key);
		var id = snapshot.key;
		removeId.push(id);
	});
}

function removeTweets() {
	if(extraTweetAmount <= 49){
		console.log("REMOVING: " + extraTweetAmount + " TWEETS");
		for(var i = 0; i<= extraTweetAmount; i++){
				var key = removeId[i];
				var remove = ref.child(key);
				remove.on('value', function(snapshot){
					remove.remove();
				});
			}
	} else {
		console.log("REMOVING: " + 50 + " TWEETS");
		for(var i = 0; i<= 49; i++){
				var key = removeId[i];
				var remove = ref.child(key);
				remove.on('value', function(snapshot){
					remove.remove();
				});

		}
	}
	
	removeId = [];
	extraTweetAmount = 0;
	console.log('RESTET REMOVE ID: ' + removeId.length + ' & EXTRA TWEET AMOUNT: ' + extraTweetAmount);

	
}




function clearAllArrays(){
	// CLEAR ALL ARRAYS
	console.log('CLEAR ALL ARRAYS');
	counter = 0;
	twitterData = [];
	newTwitterData = [];
	filteredTweets = [];
	tweetLibrary = [];
	// removeFromDataBase();
	buildTweet();
}

function buildTweet(){
	console.log('START GET TWEETS');
	console.log('start: ' + counter);

	
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

var twitterUrl = "http://loveisallaroundus.herokuapp.com/tweets/" + tweetSearch;
 
request.get(twitterUrl, callTwitter);



	var randomInterval = Math.random() * 1000;
}


function callTwitter(error, response, body){
	console.log('CALL TWITTER');

if (!error && response.statusCode == 200) {
		var json = JSON.parse(body);



		console.log('callTwitter');
		
		
		json.statuses.forEach( function(originalTweet){
			// console.log(x.user);
			var location = originalTweet.user.location;

			if (location != null && location.length >= 2 && location.length <= 20 && location[0] !=" "){
				//PUSH TO TWITTERDATA
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
			// console.log('TWEETLIBRARY LENGTH: ' + tweetLibrary.length);
			// DEBUGGER TO GET RAW DATA
			// debugger
		})
		
		//REMOVE RAW TWEETS
		twitterData.splice(0,twitterData.length);

		tweetLibrary.forEach(function(tweet){
				var location = tweet.location;
				console.log('SEND LOCATION: ' + location);
				sendCity(location);
			});

	}



function sendCity(location){
	// SEND LOCATION STRING TO GEOCODER
	var geoCoderUrl = "http://loveisallaroundus.herokuapp.com/geocoder/" + location;
	request.get(geoCoderUrl, getCoordinates);

}
	
function getCoordinates(error, response, body){
	if (!error && response.statusCode == 200) {
		var json = JSON.parse(body);

		// console.log('getCoordinates Counter: ' + counter);
		var lat = 0;
		var lng = 0;

		var status = json.json.status;

		//IF CALL STATUS IS OKAY
		if( status == "OK"){
				place = json.json.results[0].address_components[0].short_name;
				lat = json.json.results[0].geometry.location.lat;
				lng = json.json.results[0].geometry.location.lng;
				// console.log('OKAY RESULTS COUNTER:' + counter);
				tweetLibrary[counter].location = place;
				tweetLibrary[counter].lat = lat;
				tweetLibrary[counter].lng  = lng;
				
		} else if( status == "ZERO_RESULTS"){
				console.log('ZERO RESULTS COUNTER: ' + counter);
				tweetLibrary[counter].location = "";
				tweetLibrary[counter].lat = 0;
				tweetLibrary[counter].lng  = 0;
			// console.log('zero results');

		} 	


		coordToValue(lat, lng);
	}
}


function coordToValue(lat, lng ){
	// console.log('COORDINATES TO ARRAY NUMBER: ' + counter);
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
		console.log(counter + ' : COUNTER: ' + ' == TWEET LIBRARY LENGTH: ' + tweetLibrary.length);
		// debugger
		// console.log('COUNTER: '+ counter +' ' + 'LIBRARY LENGTH: ' + tweetLibrary.length);
		
		if ( tweetLibrary.length >= 10){

			if ( counter == tweetLibrary.length-2){
				//SEND LIBRARY TO FILTER
				console.log('>10');
				filterTweets();	
			}
		} else if (tweetLibrary.length >= 6 && tweetLibrary.length <= 9 ){

			if ( counter == tweetLibrary.length-1){
				//SEND LIBRARY TO FILTER
				console.log('>7<9');
				filterTweets();	
			}
		} else if ( tweetLibrary.length >= 5){
			console.log('<5');

			if ( counter == tweetLibrary.length){
				//SEND LIBRARY TO FILTER
				filterTweets();	
			}
		} else {

			if ( counter == tweetLibrary.length){
				//SEND LIBRARY TO FILTER
				filterTweets();	
			}

		}
		
}

var tweetDatabase = {
	tweet:"",
}

var clearLibrary = 0;

function filterTweets(){
	
	filteredTweets = tweetLibrary.filter(function(tweet){
		return tweet.x != 0;
	});

	// ADD FILTERED TWEETS TO DATABASE
	console.log('FILTERED TWEETS: ' + filteredTweets.length);

	filteredTweets.forEach(function(filteredTweet){
		tweetDatabase.tweet = filteredTweet;
		addToDataBase(tweetDatabase);
	})
	// EMPTY TWEET LIBRARY
	
}
	

 
var filterCounter = 1;
function addToDataBase(fireBaseTweet){
	
	console.log('ADD TO FIREBASE');
	filterCounter++;
	// ADD TWEET TO FIREBASE
	postsRef.push(fireBaseTweet);

}




// function removeFromDataBase(){






	

// }


