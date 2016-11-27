var dotBody = document.querySelector('.main');
var soundOff = document.querySelector('#soundOff');
var soundOn = document.querySelector('#soundOn');
soundOn.addEventListener('click',volumeFunction);
soundOff.addEventListener('click',volumeFunction);
var lovelinks1 = document.querySelector("#lovelinks1");
var lovelinks2 = document.querySelector("#lovelinks2");
lovelinks1.addEventListener('click',menuToggle);
lovelinks2.addEventListener('click',menuToggle);
var popDown1 = document.querySelector('#menu-pop-down1');
var popDown2 = document.querySelector('#menu-pop-down2');
var twitterData = [];
var newTwitterData = [];
var tweetObj = {};

var tweetLibrary = [];
var rawTweetCount = 0;
var counter = 0;
var dotCounter = 0;

var dot, tweet, child;
var closeButton;
var id ='';
var tweetsJSON = '';
var jsonGlobal;
// var twitterData = [];

//////////////MUSIC//////////////////////////////////

var randomSoundSet1 = 0, randomSoundSet2 = 0, randomSoundSet3 = 0;
var soundSet1 = [],
    soundSet2 = [],
    soundSet3 = [];

    var sound_totals = 51;
    var loaded_sounds = 0;

    ////////////////////////LOADING PAGE//////////
    // var sound_load = function(r) {
    //         loaded_sounds += 1
    //         if (loaded_sounds == sound_totals) {
    //             all_loaded = true
    //             $('#loading').remove()
    //             console.log('Loading complete');
    //         } else {
    //             console.log('loading incomplete');
    //             // console.log('Loading : ' + loaded_sounds + ' files out of ' + sound_totals)
    //         }
    //     }
// load soundSet1 and soundSet2
        for (var i = 1; i <= 24; i++) {
            
            if (i > 9) {
                fn = 'c0' + i;
            } else {
                fn = 'c00' + i;
            }

            var soundSet1Clip = new Howl({
                src : ['sounds/set1/' + fn + '.mp3'],
                volume : 0.2,
                // onload : console.log('loaded'),
                // sound_load(),
            });
            
            var soundSet2Clip = new Howl({
                src : ['sounds/set2/' + fn + '.mp3'],
                volume : 0.2,
                // onload : console.log('loaded'),
                // sound_load(),
            });

            soundSet1.push(soundSet1Clip);
            soundSet2.push(soundSet2Clip);

            	
        }

        // load soundSet3 
        for (var i = 1; i <= 3; i++) {
        	var soundSet3clip = new Howl({
                src : ['sounds/set3/swell' + i + '.mp3'],
                volume : 1,
                // onload : console.log('loaded'),
                // sound_load(),
            });
            
            soundSet3.push(soundSet3clip);
        }

//////////////////////END MUSIC////////////////////



window.addEventListener('load', start);
// setInterval(start,1000);
// setTimeout(startDots, 1000);




	
function start(){

	
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

	$.getJSON('/tweets', callTwitter);

	var randomInterval = Math.random() * 1000;
}

function callTwitter(json){
	
	json.statuses.forEach( function(originalTweet){
		// console.log(x.user);
		var location = originalTweet.user.location;
		var regExp = /[1-4]/g;

		if (location != null && location.length >= 2 && location.length <= 20 && location[0] !=" "){
			twitterData.push(x);
		}
	});

	rawTweetCount = twitterData.length;
	console.log("THERE ARE " + rawTweetCount + " UNFILTERED TWEETS");
	controller();
	
}
function controller(){
	console.log('controller');
	//FOR FIRST TWITTER CALL
	if(tweetLibrary.length == 0){
		twitterData.forEach(function(tweet){
		
			tweetObj = {
				place: "",
				lat: "",
				lng:"",
				tweet: tweet.text,
				location: tweet.user.location,
				name: tweet.user.name,
				id: tweet.user.id,
				sn: tweet.user.screen_name,
				x: "",
				y: "",
				// playCity: function(){
				// 	var location = this.location;
		  //   		sendCity(location);
		  //   	},
			}

			tweetLibrary.push(tweetObj);
			
		});

	//GET CITY DATA FOR EACH TWEET


	tweetLibrary.forEach(function(tweet){
				tweet.playCity()
			});


		

	} else {

		//PUSH NEW TWEETS TO NEW TWITTER DATA

		for(var i = (tweetLibrary.length-1); i<= (twitterData.length-1); i++){
			newTwitterData.push(twitterData[i]);
		}

		for( var newCounter = 0; newCounter < newTwitterData.length-1; newCounter++){
			
			// var newTweetId = newTwitterData[newCounter].user.id;

			for(var libCounter = 0; libCounter < tweetLibrary.length - 1; libCounter++){
				
		
				var newTweetId = newTwitterData[newCounter].user.id;
				//IF IDS ARE THE SAME, REMOVE FROM NEW TWITTER DATA
				if( newTwitterData[newCounter].user.id == tweetLibrary[libCounter].id ){
					//SPLICE MATCHES
					newTwitterData.splice(newTwitterData, 1);
				}			
			}
			
		}

			// PUSH NEW TWITTER DATA TO LIBRARY

			newTwitterData.forEach(function(tweet){
			
				tweetObj = {
				place: "",
				lat: "",
				lng:"",
				tweet: tweet.text,
				location: tweet.user.location,
				name: tweet.user.name,
				id: tweet.user.id,
				sn: tweet.user.screen_name,
				x: "",
				y: "",
				// playCity: function(){
				// 	var location = this.location;
		  //   		sendCity(location);
		  //   	},
				}
				tweetLibrary.push(tweetObj);
			});

			tweetLibrary.forEach(function(tweet){
					tweet.playCity()
				});
		}

		
	}


function sendCity(location){
	console.log(location);
	$.getJSON('/geocoder', getCoordinates);
	// console.log("send City");
	// console.log("LOCATION: " + location + ", TWEET: " + tweet + ", NAME: " + name + ", ID: " + id + ", SCREEN NAME: " + sn);
	//SEND LOCATION TO GEOCODER
}
	

function getCoordinates(json){
	console.log("getCoordinates" + " " + counter);
	tweetLibrary[counter].lat = json.json.results[0].geometry.location.lat;
	tweetLibrary[counter].lng  = json.json.results[0].geometry.location.lng;
	var lat = json.json.results[0].geometry.location.lat;
	var lng = json.json.results[0].geometry.location.lng;
	
	coordToValue(lat, lng);
	
}


function coordToValue(lat, lng){

		console.log('TO X & Y' + lat + ", " + lng + ", " + counter);
		
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

		counter++;
		
		// startDots();
		// createDot();
		//ADD ONE TO GLOBAL COUNTER

		

	// console.log(xValue + ', ' + yValue + ', ' + 'id' + ', ' +randomSoundSet1 + ', ' + randomSoundSet2 + ', ' + randomSoundSet3);
	// createDotInterval();	
}


//////////////////  START FIREBASE  //////////////////
//Setup

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD5pNPzbQX994QMJEEOO8qAduwgl5nO_qs",
    authDomain: "loveisallaroundus-58e78.firebaseapp.com",
    databaseURL: "https://loveisallaroundus-58e78.firebaseio.com",
    storageBucket: "loveisallaroundus-58e78.appspot.com",
    messagingSenderId: "51462191028"
  };
  firebase.initializeApp(config);


//establish a connection

//create a new firebase db reference


// FirebaseOptions options = new FirebaseOptions.Builder()
//   .setServiceAccount(
//     new FileInputStream("loveisallaroundus-58e78-firebase-adminsdk-vsjoj-ff3b60783c.json"))
//   .setDatabaseUrl("https://loveisallaroundus-58e78.firebaseio.com")
//   .build();

// FirebaseApp.initializeApp(options);

///// FROM https://console.firebase.google.com/project/loveisallaroundus-58e78/settings/serviceaccounts/adminsdk


var ref = new Firebase("https://loveisallaroundus-58e78.firebaseio.com/")
ref.on('value', updateApp);



function saveChanges(element){
	
	console.log('saveChanges');
	ref.push(tweetLibrary[0]);
}


function updateApp(snapshot) {
	var value = snapshot.val();
	console.log('SNAPSHOT' + value);
}

//////////////////  END FIREBASE  //////////////////




function startDots(){
	
	var interval = Math.random()*3000;

	var intervalometer = function(){
			// if ( dotCounter <= counter ){
			createDot();
		    clearInterval(interval);
		    interval = Math.random()*3000;
		    console.log("///////CREATE DOT////////" + dotCounter);
		    interval = setInterval(intervalometer, interval);
		// }
	}

	var interval = setInterval(intervalometer, interval);

}


var $dot;
var createDotImg;

function createDot(){
	console.log('create dot' + " " + dotCounter);
	var tweet = tweetLibrary[dotCounter];
	console.log(tweet);
	var randomDotColor = Math.ceil((Math.random()*3));
	// console.log('RANDOM DOT COLOR' + randomDotColor);

	createDotImg = document.createElement('div');

	if(randomDotColor == 1){
		// var $dot = $(createDot);
		// $dot.css({background: "none"});
		// $dot.css({background: 'url("img/BlueDot.gif")'});
		// createDot.className = "dot1";
		// createDot.className = "none";
		//TURN ON CSS
		// console.log('call blue');
		createDotImg.className = "dot1";
		// createDot.style.backgroundImage = "../img/BlueDot.gif";
		// $dot = $(createDotImg);
		// $dot.css('background-image', 'url("../img/BlueDot.gif")');

	} else if (randomDotColor == 2){
		
		// createDot.className = "none";
		// console.log('call pink');

		createDotImg.className = "dot2";

		// createDot.style.backgroundImage = "../img/BlueDot.gif";

	} else if (randomDotColor == 3){
		// createDot.className = "none";
		//TURN ON CSS
		// console.log('call yellow');
		createDotImg.className = "dot3";

		




		// createDot.style.backgroundImage = "../img/BlueDot.gif";
		// console.log(createDot.style.backgroundImage);

	}
		// createDot.className = "dot";
		createDotImg.id = tweetObj.id;
		dotBody.appendChild(createDotImg);
		createDotImg.style.top = tweet.y + "%";
		createDotImg.style.left = tweet.x + "%";
		var createTweet = document.createElement('div');
		createTweet.className = "tweet";
		createTweet.id = tweetObj.id;
		createTweet.style.display = "none";
		
		if (tweetObj.x < 50 && tweetObj.y < 50){
			// console.log('upper left');
			createTweet.style.top = tweetObj.y + 0 + "%";
			createTweet.style.left = tweetObj.x + 1 + "%";

		} else if (tweetObj.x < 50 && tweetObj.y > 50){
			// console.log('lower left');
			createTweet.style.top = tweetObj.y - 50 + "%";
			createTweet.style.left = tweetObj.x + 1.3 + "%";

		} else if (tweetObj.x > 50 && tweetObj.y > 50){
			// console.log('lower right');
			createTweet.style.top = tweetObj.y - 45 + "%";
			createTweet.style.left = tweetObj.x - 30 + "%";

		} else if (tweetObj.x > 50 && tweetObj.y < 50){
			// console.log('upper right');
			createTweet.style.top = tweetObj.y + 0 + "%";
			createTweet.style.left = tweetObj.x - 30 + "%";

		}
		// createTweet.style.top = y - 25 + "%";
		// createTweet.style.left = x - 8.4 + "%";
		createTweet.innerHTML = tweetObj.tweet;
		createDotImg.appendChild(createTweet);
	
		//handlebars Step #1
		var tweetTemplate = document.querySelector("#tweet-template");

		//handlebars  Step #2 - Compile
		var templateFunction = Handlebars.compile(tweetTemplate.innerHTML);

		//step 3
		html = templateFunction(jsonGlobal);
		createTweet.innerHTML = html;



		var dot = document.querySelector('.dot');
		var tweet = document.querySelector('.tweet');
		// closeButton = document.querySelector('.x');
		// closeButton.addEventListener('click',toggleTweet);
		
		dotBody.addEventListener('click', toggleTweet);
		makeSound();
		dotCounter++;



}

function makeSound(){
	//GENERATE RANDOM SOUND
	randomSetSelector = Math.round((Math.random()*3));
	randomSoundSet1 = Math.round((Math.random()*23));
	randomSoundSet2 = Math.round((Math.random()*23));
	randomSoundSet3 = Math.round((Math.random()*2));
	// console.log('SOUND TRIGGER' + randomSoundSet1 + ", " + randomSoundSet2 + ", " + randomSoundSet3);

	if (randomSetSelector == 1){
		// console.log("instrument 1 " + randomSoundSet1);
		soundSet1[randomSoundSet1].play();
	} else if ( randomSetSelector == 2){
		// console.log("instrument 2 " + randomSoundSet2);
		soundSet2[randomSoundSet2].play();
	} else if (randomSetSelector == 3){
		// console.log("instrument 3 " + randomSoundSet3);
		soundSet3[randomSoundSet3].play();
	}

}





function menuToggle(event){

	if (event.target.id == "lovelinks1"){
		var pop = $( popDown1 );
		pop.toggle();
	} else if (event.target.id == "lovelinks2"){
		var pop = $( popDown2 );
		pop.toggle();
	}
}

function volumeFunction(event){
	// var soundOn = document.querySelector('#soundOn');
	// var soundOff = document.querySelector('#soundOff');
	// var soundOff = $( event.target ).closest( "#soundOff" );
	// soundOff.toggle();
	// soundOn.toggle();



	var $soundOff = $( soundOff );
	var $soundOn = $( soundOn );
	
	$soundOn.toggle();
	$soundOff.toggle();

	if(event.target.id =="soundOn"){
		console.log('Sound off');
		Howler.volume(0.0);
	} else if ( event.target.id =="soundOff" ){
		console.log('Sound on');
		Howler.volume(1.0);

	}
	




	// soundOn.hide();
	// soundOff.show();
	// if (soundOn.style.visibility == "visible"){
		// console.log('Volume Off')
		// soundOn.css('visibility', 'hidden');;
		// soundOff.css('visibility', 'visible');
	// } else if (soundOff.style.visibility == "visible"){
	// 	conslole.log('Volume On')
	// 	soundOn.css('visibility', 'visible');
	// 	soundOff.css('visibility', 'hidden');
	// }
}



function generateRandom(){
	// GENERATE RANDOM NUMBER
	var randomX = Math.random()*100;
	var randomY = Math.random()*100;
	console.log(randomX + randomY);

	createDot(randomX, randomY, id);

}




function toggleTweet(event){
	console.log('TOGGLE TWEET, click dot id: ' + event.target.id);

	var $target = $(event.target);
	var child = $( event.target ).children();
	// console.log("EVENT.TARGET.CLASSNAME: " + event.target.className);
	child.toggle();
	

	if(event.target.className == "x"){
		// var $parent = $(event.target);
		var parent = $( event.target ).closest( ".tweet" );
		// var parent = $( event.target).parent(".tweet");
		// var parent = $( event.target);
		// var parent2 = parent.parent();
		console.log(parent);
		parent.toggle();

	}

	// console.log('click button: ' + $target.className);
	

	// console.log(child);

	
	//child.css( "visibility", "visible" );

	// .css( "visbility", "hidden" );

	  // if( $target.is(".dot") ) {
	  //  child =  $target.children("div");
	  //  console.log('tweet id' + child.id);
	  //   // $target.children('.tweet').style.visibility = "hidden";
	  // }
	
	// $("ul").click(handler).find("ul").hide();

}




