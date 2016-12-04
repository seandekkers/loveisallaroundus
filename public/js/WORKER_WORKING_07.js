require('dotenv').config();
var express = require('express');
var request = require('request');

///FIREBASE///

var admin = require("firebase-admin");
var serviceAccount = require("loveisallaroundus-58e78-firebase-adminsdk-vsjoj-ff3b60783c.json");
var removeId = [];
var extraTweetAmount = 0;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loveisallaroundus-58e78.firebaseio.com"
});

	var db = admin.database();
	var ref = db.ref();
	var postsRef = ref.child("/");

	// var test1 = ref.child("-KY6wA95vOBRJDgNMbUM");
	

// var remove = ref.child("tweet/removeId[0]");
// remove.on('value', function(snapshot){
// 	console.log(snapshot.val())
// });



	


	postsRef.once('value', function(snapshot){
		var fireBaseCount = snapshot.numChildren();
		console.log('TWEETS IN FIREBASE' + fireBaseCount);

		var max = 202;
		if(fireBaseCount >= max){
			console.log('DELETE EXTRA TWEETS');
			extraTweetAmount = fireBaseCount - max;
			console.log("EXTRA TWEET AMOUNT: " + extraTweetAmount);

			removeTweets(); 
		} else{
			console.log('START');
			start();
		}

 	});
	
var extra = admin.database().ref("/");
	extra.limitToFirst(15).on("child_added", function(snapshot) {
		// console.log('TWEETS IN TEST1' + snapshot.numChildren());
		// console.log(snapshot.key);
		var id = snapshot.key;
		removeId.push(id);
	});

function removeTweets() {


	console.log("REMOVING: " + extraTweetAmount + " TWEETS");
	for(var i = 0; i<= extraTweetAmount; i++){
			var key = removeId[i];
			var remove = ref.child(key);
			remove.on('value', function(snapshot){
				remove.remove()
			});
		}
	console.log('START');
	start();
}



	// var tweetRef = admin.database().ref("/tweet");
	// tweetRef.once("value")
	// 	.then(function(snapshot){
	// 		console.log(snapshot.val();)

	// 	});



 // }

	// postsRef.on('child_added', function(snapshot){
	// 	console.log('CHILDE ADDED_TRIGGERED');
	// 	if( fireBaseCount >= 150 ){ 
	// 	console.log("FIREBASECOUNT: " + fireBaseCount);

	// 	console.log('TRIGGER REMOVE OLD TWEETS');
	// 	// REMOVE OLDEST TWEETS
	// 	// ref.once('child_added', function(snapshot){
	// 	//   snapshot.ref().remove();  
	// 	// });

	// }

	// });


// start();

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

// INTERVAL TIME LENGTH //
var intervalLength = 9000;


// function database(){

// 	var runDatabase = function(){

// 		console.log('RUN TWITTER API AND ADD TO DATABASE: ' + intervalCounter);

// 		intervalCounter++

// 		if (intervalCounter >= 2){
// 			clearInterval(databaseInterval);
		
// 		}

// 		start();
// 	}

	
// 	var databaseInterval = setInterval(runDatabase,intervalLength);
	
// }




function start(){
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
	var geoCoderUrl = "http://localhost:5000/geocoder/" + location;
	request.get(geoCoderUrl, getCoordinates);

}
	
function getCoordinates(error, response, body){
	if (!error && response.statusCode == 200) {
		var json = JSON.parse(body);

		console.log('getCoordinates Counter: ' + counter);
		var lat = 0;
		var lng = 0;

		var status = json.json.status;

		//IF CALL STATUS IS OKAY
		if( status == "OK"){
				place = json.json.results[0].address_components[0].short_name;
				lat = json.json.results[0].geometry.location.lat;
				lng = json.json.results[0].geometry.location.lng;
				console.log('OKAY RESULTS COUNTER:' + counter);
				tweetLibrary[counter].location = place;
				tweetLibrary[counter].lat = lat;
				tweetLibrary[counter].lng  = lng;
				
		} else if( status == "ZERO_RESULTS"){
				console.log('ZERO RESULTS COUNTER: ' + counter);
				tweetLibrary[counter].location = "";
				tweetLibrary[counter].lat = 0;
				tweetLibrary[counter].lng  = 0;
			console.log('zero results');

		} 	


		coordToValue(lat, lng);
	}
}


function coordToValue(lat, lng ){
	console.log('COORDINATES TO ARRAY NUMBER: ' + counter);
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
	// console.log(fireBaseTweet);
	postsRef.push(fireBaseTweet);
	// clearAllArrays();
	if(filterCounter == filteredTweets.length){
		clearAllArrays();
	}
	

	

	// ADD TWEET TO FIREBASE
	// ref.push(fireBaseTweet);
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


}



// function removeFromDataBase(){






	

// }


