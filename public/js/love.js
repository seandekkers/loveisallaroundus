var dotBody = document.querySelector('.main');
var soundOff = document.querySelector('#soundOff');
var soundOn = document.querySelector('#soundOn');
soundOn.addEventListener('click',volumeFunction);
soundOff.addEventListener('click',volumeFunction);
var logo = document.querySelector("#logo1");
var lovelinks1 = document.querySelector("#lovelinks1");
var lovelinks2 = document.querySelector("#lovelinks2");
lovelinks1.addEventListener('click',menuToggle);
lovelinks2.addEventListener('click',menuToggle);
var popDown1 = document.querySelector('#menu-pop-down1');
var popDown2 = document.querySelector('#menu-pop-down2');
var twitterIcon = document.querySelector('#twitter');
var facebookIcon = document.querySelector('#facebook');
var shareIcon = document.querySelector('#share');
var soundOnIcon = document.querySelector('#soundOn');
var soundOffIcon = document.querySelector('#soundOff');
var footer = document.querySelector('.footer');
footer.addEventListener('click', menuToggle);
// popDown1.addEventListener('click',menuToggle);
var createTweet, tweetTable, tds, tableRow, tableRow2, tableRow3, heartRow, heartImg, tweetRow, nameRow, textTweet, textName, textLocation;
var allTweets, allTweetTables, allTweetTextSize, allHearts, allHeartRows;
var width;
var animationDot;
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

var dot, tweet, child;
var closeButton;
var id ='';
var tweetsJSON = '';
var jsonGlobal;

document.addEventListener('load', resizeFunction);
document.addEventListener('click', resizeTweets);




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
window.addEventListener('load', startDots);
window.addEventListener('load', resizeFunction);
window.addEventListener("resize", resizeFunction);
window.addEventListener("resize", resizeTweets);
// setInterval(start,1000);
// setTimeout(startDots, 1000);
var allTweets;
var allTweetTables;
var allTweets2;
var allTweetTextSize;
var allHearts;

function resizeFunction(){
	width = document.body.clientWidth;
	var menuPopType = document.querySelectorAll('.menuPopType');
	var heartMenu = document.querySelectorAll('.heartMenu')
	
	logo.style.width = width / 7 + 'px';
	logo.style.height = width / 14 + 'px';
	lovelinks1.style.width = width / 6 + 'px';
	lovelinks1.style.height = width / 12 + 'px';
	lovelinks2.style.width = width / 6 + 'px';
	lovelinks2.style.height = width / 12 + 'px';
	twitterIcon.style.width = width / 60 + 'px';
	twitterIcon.style.height = width / 60 + 'px';
	facebookIcon.style.width = width / 60 + 'px';
	facebookIcon.style.height = width / 60 + 'px';
	shareIcon.style.width = width / 60 + 'px';
	shareIcon.style.height = width / 60 + 'px';
	soundOnIcon.style.width = width / 60 + 'px';
	soundOnIcon.style.height = width / 60 + 'px';
	soundOffIcon.style.width = width / 60 + 'px';
	soundOffIcon.style.height = width / 60 + 'px';
	popDown1.style.width = width / 3.5 + 'px';
	popDown1.style.height = width / 8 + 'px';
	popDown1.style.left = width / 10 + 'px';
	popDown2.style.width = width / 3.5 + 'px';
	popDown2.style.height = width / 8 + 'px';
	popDown2.style.right = width / 10 + 'px';
	for(var i = 0; i < menuPopType.length; i++){
		menuPopType[i].style.fontSize = width / 70 + 'px';
		heartMenu[i].style.width = width / 40 + 'px';
		heartMenu[i].style.height = width / 40 + 'px';
		menuPopType[i].style.padding = width / 100 + 'px';
	}


}

function resizeTweets(){
//GRAB ALL ELEMENTS FOR RESIZE
	width = document.body.clientWidth;
	allTweets2 = document.querySelectorAll('.tweet2');
	allTweets = document.querySelectorAll('.tweet');
	allTweetTables = document.querySelectorAll(".tweetTable");
	allHeartRows = document.querySelectorAll(".heartRow");
	allTweetTextSize = document.querySelectorAll('.textTweet');
	allNameTextSize = document.querySelectorAll('.textName');
	allLocationTextSize = document.querySelectorAll('.textLocation');
	allHearts = document.querySelectorAll('.heart');

	for(var i = 0; i < allTweets.length; i++){
		allTweets[i].style.width = width / 5 + 'px';
		allTweets[i].style.height = width / 5 + 'px';
		allTweets[i].style.left = (-1* ((width / 5) / 2)) + 'px';
	}

	for(var i = 0; i < allTweets2.length; i++){
		allTweets2[i].style.width = width / 5 + 'px';
		allTweets2[i].style.height = width / 5 + 'px';
		allTweets[i].style.left = (-1* ((width / 5) / 2)) + 'px';
	}

	
	for(var i = 0; i < allHeartRows.length; i++){
		// allHeartRows[i].style.width = width / 5 + 'px';
		allHeartRows[i].style.height = width / 20 + 'px';
	}
	
	for(var i = 0; i < allTweetTextSize.length; i++){
		allTweetTextSize[i].style.fontSize = width / 70 + 'px';
		allNameTextSize[i].style.fontSize = width / 90 + 'px';
		allLocationTextSize[i].style.fontSize = width / 120 + 'px';
	}
	for(var i = 0; i < allHearts.length; i++){
		allHearts[i].style.width = width / 30 + 'px';
		allHearts[i].style.height = width / 30 + 'px';
		// allHeartRows[i].style.left = ((width / 20) / 2) + 'px';
	}
	


}

	
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
	

	$.getJSON('/tweets/'+tweetSearch, callTwitter);

	var randomInterval = Math.random() * 1000;
}

function callTwitter(json){
	
	
	json.statuses.forEach( function(originalTweet){
		// console.log(x.user);
		var location = originalTweet.user.location;
		var regExp = /[1-4]/g;

		if (location != null && location.length >= 2 && location.length <= 20 && location[0] !=" "){
			twitterData.push(originalTweet);
		}
	});

	rawTweetCount = twitterData.length;
	console.log("THERE ARE " + rawTweetCount + " UNFILTERED TWEETS");
	controller();
	
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
	console.log("SEND TO GEOCODER" + location);
	$.getJSON('/geocoder/'+location, getCoordinates);

}
	

function getCoordinates(json){
	var lat = 0;
	var lng = 0;
	
	console.log("getCoordinates" + " " + counter);

	var status = json.json.status;
	// console.log(status);

	if( status == "OK"){
			place = json.json.results[0].address_components[0].short_name;
			lat = json.json.results[0].geometry.location.lat;
			lng = json.json.results[0].geometry.location.lng;
			console.log('CALL OKAY');
			tweetLibrary[counter].location = place;
			tweetLibrary[counter].lat = lat;
			tweetLibrary[counter].lng  = lng;
			
	} else if( status == "ZERO_RESULTS"){
		console.log('CALL ZERO RESULTS');

	} 	


	coordToValue(lat, lng);
}


function coordToValue(lat, lng ){

		if ( lat != 0 ){


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

		}

	counter++;

		// debugger

		

		console.log('COUNTER: '+ counter +' ' + 'LIBRARY LENGTH: ' + tweetLibrary.length)
		

		if ( counter == tweetLibrary.length){
			console.log('FILTER TWEETS');
			filterTweets();	
		}
		

}

var tweetDatabase = {
	tweet:"",
}

var clearLibrary = 0;

function filterTweets(){
	
	console.log('FILTER TWEETS');
	// var emptyCounter = 0;
	filteredTweets = tweetLibrary.filter(function(tweet){
		return tweet.x != 0;
	});
	// EMPTY TWEET LIBRARY

	filteredTweets.forEach(function(filteredTweet){
		tweetDatabase.tweet = filteredTweet;
		addToDataBase(tweetDatabase);
	})

	clearAllArrays();
}
	
function clearAllArrays(){
	console.log('////CLEAR ALL ARRAYS////')
	twitterData = [];
	newTwitterData = [];
	filteredTweets = [];
	tweetLibrary = [];

}
 
// Initialize Firebase

var ref = new Firebase("https://loveisallaroundus-58e78.firebaseio.com/")
ref.on('value', updateApp);




function addToDataBase(fireBaseTweet){
	
	console.log('ADD TWEET TO FIREBASE');
	ref.push(fireBaseTweet);
}




function updateApp(snapshot) {

	fireBaseCount = snapshot.numChildren();
	// postTweet2 = snapshot.child("tweet");

	console.log("THERE ARE " + fireBaseCount + 'TWEETS');

	snapshot.forEach(function(childSnapshot) {
      // childData will be the actual contents of the child
      fireBaseTweets.push(childSnapshot.val());
  })

	if( fireBaseCount >= 500 ){ 


		console.log('REMOVE OLDEST TWEET')
			ref.once('child_added', function(snapshot){
		  snapshot.ref().remove();  
		});

	}

}






//////////////////  END FIREBASE  //////////////////




function startDots(){
	soundSet3[0].play();
	
	var interval = Math.random()*1500;
	//CREATE DOTS EVERY RANDOM * 3 SECONDS
	var intervalometer = function(){
		if ( dotCounter < fireBaseCount ){
			
			createDot();


		    clearInterval(interval);
		    interval = Math.random()*1500;
		    interval = setInterval(intervalometer, interval);
		}
	}

	var interval = setInterval(intervalometer, interval);

}


var $dot;
var createDotImg;

function createDot(){
	// console.log('CREATE DOT NUMBER: ' + dotCounter);
	var img = fireBaseTweets[dotCounter].img;
	var tweet = fireBaseTweets[dotCounter].tweet;
	var randomDotColor = Math.ceil((Math.random()*5));
	// console.log('RANDOM DOT COLOR' + randomDotColor);

	createDotImg = document.createElement('div');

	if(randomDotColor == 1){
		createDotImg.className = "dot1";
	} else if (randomDotColor == 2){
		createDotImg.className = "dot2";
	} else if (randomDotColor == 3){
		createDotImg.className = "dot3";
	} else if (randomDotColor == 4){
		createDotImg.className = "dot4";
	} else if (randomDotColor == 5){
		createDotImg.className = "dot5";

	} 
		// createDot.className = "dot";
		createDotImg.id = tweetObj.id;

		
		dotBody.appendChild(createDotImg);
		
		createDotImg.style.top = tweet.y + "%";
		createDotImg.style.left = tweet.x + "%";
		


	if( tweet.tweet.length > 80){
		createDotImg.style.height = tweet.tweet.length / 10 + 'px';
		createDotImg.style.width = tweet.tweet.length / 10 + 'px';
	}
	var offset = (tweet.tweet.length / 10) /2;
		

	
		// CREATE TWEET

		createTweet = document.createElement('div');
		createTweet.className = "tweet";
		createTweet.id = tweetObj.id;
		createTweet.style.display = "none";
		createDotImg.appendChild(createTweet);
		

		if (tweet.x < 50 && tweet.y < 50){
			createTweet.style.top = 18 + "px";
			createTweet.style.left = -196 + "px";

		} else if (tweet.x < 50 && tweet.y > 50){
			// console.log('lower left');
			createTweet.className = "tweet2";
			createTweet.style.top = -410 + "px";
			createTweet.style.left = -196 + "px";

		} else if (tweet.x > 50 && tweet.y > 50){
			// console.log('lower right');
			createTweet.className = "tweet2";
			createTweet.style.top = -410 + "px";
			createTweet.style.left = -196 + "px";

		} else if (tweet.x > 50 && tweet.y < 50){
			// console.log('upper right');
			createTweet.style.top = 18 + "px";
			createTweet.style.left = -196 + "px";

		}
		
	
		//handlebars
		var tweetTemplate = document.querySelector("#tweet-template");
		var templateFunction = Handlebars.compile(tweetTemplate.innerHTML);
		html = templateFunction(fireBaseTweets[dotCounter].tweet);
		createTweet.innerHTML = html;



		var dot = document.querySelector('.dot');
		var tweet = document.querySelector('.tweet');
		// var tweet2 = document.querySelector('.tweet2');

		dotBody.addEventListener('click', toggleTweet);
		
		//ANIMATE DOT
		createAnimDot = document.createElement('div');
		createAnimDot.className = "animDot";
		createDotImg.appendChild(createAnimDot);



		
		animateDot(createAnimDot,offset,createDotImg);
		makeSound();
		dotCounter++;



}
var soundCounter = 0;
function makeSound(){
	//GENERATE RANDOM SOUND

	randomSetSelector = Math.round((Math.random()*2));
	randomSoundSet1 = Math.round((Math.random()*23));
	randomSoundSet2 = Math.round((Math.random()*23));
	randomSoundSet3 = Math.round((Math.random()*2));
	// console.log('SOUND TRIGGER' + randomSoundSet1 + ", " + randomSoundSet2 + ", " + randomSoundSet3);
	if (soundCounter % 7 == 0){
		// console.log("instrument 3 " + randomSoundSet3);
		soundSet3[randomSoundSet3].play();
	}

	if (randomSetSelector == 1){
		// console.log("instrument 1 " + randomSoundSet1);
		soundSet1[randomSoundSet1].play();
	} else if ( randomSetSelector == 2){
		// console.log("instrument 2 " + randomSoundSet2);
		soundSet2[randomSoundSet2].play();
	} 
	soundCounter++;
	

}
function animateDot(animDot, offset, createDotImg){

	var size = 0;
	var alpha = .65;
	
	
	var animationIntervalometer = function(){
		animDot.style.top = -(size * .5) + offset + "px";
		animDot.style.left =  -(size * .5) + offset +  "px";
		animDot.style.width = size + 'px';
		animDot.style.height = size + 'px';
		animDot.style.opacity = alpha;
		size += 2.5;
		alpha -= .015;
		// debugger

		if (alpha <= .015){
			createDotImg.removeChild(animDot);
			clearInterval(animation);
			// debugger
		}
	}
	
	var animation = setInterval(animationIntervalometer, 40);

}



function menuToggle(event){

	if(event.target.className == "menuPop" ){
		var tweetMenu = $( event.target ).toggle();
	}
	if(event.target.className == "heartMenu" || event.target.className == "menuPopType"){
		var tweetMenu = $( event.target ).closest(".menuPop").toggle();
	}
	if (event.target.id == "lovelinks1"){
		var pop = $( popDown1 );
		pop.toggle();
	} else if (event.target.id == "lovelinks2"){
		var pop = $( popDown2 );
		pop.toggle();
	}
}

function volumeFunction(event){

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

}




function toggleTweet(event){
	// console.log(event.target.className);
	var $target = $(event.target);
	
	if(event.target.className == "dot1" || event.target.className == "dot2" || event.target.className == "dot3" || event.target.className == "dot4" || event.target.className == "dot5"){
		// console.log('DOTS');
		var child = $( event.target ).children();
		child.toggle();
	}
	if(event.target.className == "heart" || event.target.className == "textTweet" || event.target.className == "textName" || event.target.className == "textLocation" ){
		// console.log('CONTENTS');
		var parent = $( event.target ).closest( ".tweet" );
		parent.toggle();
		var parent2 = $( event.target ).closest( ".tweet2" );
		parent2.toggle();

	}
	if(event.target.className == "tweet" || event.target.className == "tweet2" || event.target.className == "tweetRow" || event.target.className == "nameRow" || event.target.className == "heartRow" ){
		// var parent = $( event.target ).closest( ".tweet" );
		// console.log(parent);
		// console.log('TABLE');
		var tweetTable2 = $( event.target ).closest( ".tweet2" );
		var tweetTable = $( event.target ).closest( ".tweet" );
		tweetTable2.toggle();
		tweetTable.toggle();


	}
	

}




