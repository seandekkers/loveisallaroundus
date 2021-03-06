var dotBody = document.querySelector('.main');
var soundOff = document.querySelector('#soundOff');
var soundOn = document.querySelector('#soundOn');
soundOn.addEventListener('click',volumeFunction);
soundOff.addEventListener('click',volumeFunction);
var logo = document.querySelector("#logo1");
// logo.addEventListener('click',menuToggle);
var logoPop = document.querySelector('#logoPop');
var pop = $( logoPop );
var twitterIcon = document.querySelector('#twitterIcon');
var facebookIcon = document.querySelector('#facebookIcon');
var soundOnIcon = document.querySelector('#soundOn');
var soundOffIcon = document.querySelector('#soundOff');
var footer = document.querySelector('.footer');

var formName = document.querySelector('input.formName');
var formLocation = document.querySelector('input.formLocation');
var formMessage = document.querySelector('.formMessage');
var formSubmit = document.querySelector('.formSubmit');
var addYours = document.querySelector('.addYours');
var formType = document.querySelectorAll('.formType');
var formHeart = document.querySelector('.heartLovePop');
var personalDotCheck = false;

var helper = document.querySelector('.helper');



formName.addEventListener("focus", function(){
	if(formName.value == "Name..."){
		formName.value = "";
	}
})
formLocation.addEventListener("focus", function(){
	if(formLocation.value == "Location..."){
		formLocation.value = "";
	}
})
formMessage.addEventListener("focus", function(){
	if(formMessage.value == "Message..."){
		formMessage.value = "";
	}
})

formName.addEventListener("blur", function(){
	if(formName.value == ""){
		formName.value = "Name...";
	}
});
formLocation.addEventListener("blur", function(){
	if(formLocation.value == ""){
		formLocation.value = "Location...";
	}
});
formMessage.addEventListener("blur", function(){
	if(formMessage.value == ""){
		formMessage.value = "Message...";
	}
})
formSubmit.addEventListener('click', addLove);

footer.addEventListener('click', menuToggle);


var addLovePop = document.querySelector('#addPop');
var $addLovePop = $(addLovePop);
addYours.addEventListener('click', function(){
	if(personalDotCheck == false){
		$addLovePop.toggle();
		pop.toggle();
	}
});
var marker = document.querySelector('.marker');
marker.addEventListener('click', function(){
	if(personalDotCheck == false){
		$addLovePop.toggle();
	}
});



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

var ref = new Firebase("https://loveisallaroundus-58e78.firebaseio.com/")
ref.once('value', updateApp);


var addLove = {
			tweet: {
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
				},
};



function addLove(){
	var name = formName.value;
	var message = formMessage.value;
	var location = formLocation.value;
	console.log('Add Love');
	
	


	if( personalDotCheck == false && name != "Name..." && location != "Location..." && message != "Message..."){
		addLove.tweet.name = name;
		addLove.tweet.tweet = message;
		addLove.tweet.sn = name;
		// helper.innerHTML = "Thanks for spreading the love!"

		// getLocalLocation();
		sendCity(location);
		// console.log('okay');
	} else {

		helper.innerHTML = "Please include all fields!"
	}


}

function sendCity(location){
	// SEND LOCATION STRING TO GEOCODER
	$.getJSON('/geocoder/'+location, getCoordinates);

}
	

function getCoordinates(json){
	console.log('Get Coordinates');
	var lat = 0;
	var lng = 0;
	var place = "";
	var status = json.json.status;

	//IF CALL STATUS IS OKAY
	if( status == "OK"){
		console.log('Location Valid')
			helper.innerHTML = "Success!"
			place = json.json.results[0].address_components[0].short_name;
			lat = json.json.results[0].geometry.location.lat;
			lng = json.json.results[0].geometry.location.lng;
			
			addLove.tweet.location = place;
			addLove.tweet.lat = lat;
			addLove.tweet.lng  = lng;
			
	} else if( status == "ZERO_RESULTS"){
		console.log('location Not valid');
		helper.innerHTML = "We can't find you, please put in another place."
		

	} 	


	coordToValue(lat, lng);
}

function getLocalLocation(){
	// console.log('Get Location');
	navigator.geolocation.getCurrentPosition(function(position) {
		  // console.log('geolocation' + position);
		  addLove.lat = position.coords.latitude;
		  addLove.lng = position.coords.longitude;
		  addLove.location = ""
		});
	
		// console.log("GET LOCAL LOCATION COORDINATES" + addLove.lat, addLove.lng);
		coordToValue(addLove.lat, addLove.lng);
}

function coordToValue(lat, lng ){
	console.log('Coord to X,Y' + lat);
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
			addLove.tweet.x = xValue;
			addLove.tweet.y = yValue;
			addPersonalDot();
			// console.log(xValue, yValue);

		}
}




function addPersonalDot(){


	console.log("Add personal Dot");
	// console.log('CREATE DOT NUMBER: ' + dotCounter);
	var tweet = addLove.tweet;
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
		createTweet.id = tweetObj.id;
		createTweet.style.display = "none";
		createDotImg.appendChild(createTweet);
		

		if (tweet.x > 10 && tweet.x < 50 && tweet.y < 50){
			createTweet.className = "tweet";
			createTweet.style.top = 18 + "px";
			createTweet.style.left = -196 + "px";

		} else if (tweet.x < 10 && tweet.y < 50){
			// console.log('HAWAII');
			createTweet.className = "tweet3";
			createTweet.style.top = 18 + "px";
			createTweet.style.left = -196 + "px";

		} else if (tweet.x < 50 && tweet.y > 50){
			// console.log('lower left');
			createTweet.className = "tweet2";
			createTweet.style.top = -410 + "px";
			createTweet.style.left = -196 + "px";

		} else if (tweet.x > 50 && tweet.x < 86 && tweet.y > 50){
			// console.log('lower right');
			createTweet.className = "tweet2";
			createTweet.style.top = -410 + "px";
			createTweet.style.left = -196 + "px";

		} else if (tweet.x > 50 && tweet.y < 50){
			// console.log('upper right');
			createTweet.className = "tweet";
			createTweet.style.top = 18 + "px";
			createTweet.style.left = -196 + "px";

		} else if (tweet.x > 86 && tweet.y > 50){
			// console.log('NZ & AUS');
			createTweet.className = "tweet4";
			createTweet.style.top = -410 + "px";
			createTweet.style.left = -196 + "px";

		}
		
	
		//handlebars
		var tweetTemplate = document.querySelector("#tweet-template");
		var templateFunction = Handlebars.compile(tweetTemplate.innerHTML);
		html = templateFunction(addLove.tweet);
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
		personalDotCheck = true;
		var $addLovePop = $(addLovePop);
		$addLovePop.toggle();
	
		ref.push(addLove);
}




function updateApp(snapshot) {

	fireBaseCount = snapshot.numChildren();
	// console.log("THERE ARE " + fireBaseCount + 'TWEETS');

	snapshot.forEach(function(childSnapshot) {
      // childData will be the actual contents of the child
      fireBaseTweets.push(childSnapshot.val());
  })

	// if( fireBaseCount >= 500 ){ 
	// 	// REMOVE OLDEST TWEETS
	// 		ref.once('child_added', function(snapshot){
	// 	  snapshot.ref().remove();  
	// 	});

	// }

}



//RESIZE TO SCREEN SIZE
window.addEventListener('load', resizeFunction);

////START PLAYING DOTS
window.addEventListener('load', startDots);

//----------------------------------------


//RESIZE TWEETS ON CLICK
window.addEventListener('click', resizeTweet);

// ON RESIZE
window.addEventListener('resize', resizeFunction);
window.addEventListener('resize', resizeTweets);







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
        for (var i = 1; i <= 32; i++) {
            
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
            

            soundSet1.push(soundSet1Clip);

            	
        }

        // load soundSet2 
        // for (var i = 1; i <= 3; i++) {
        // 	var soundSet2clip = new Howl({
        //         src : ['sounds/set2/swell' + i + '.mp3'],
        //         volume : .0,
                // onload : console.log('loaded'),
                // sound_load(),
            // });
            
            // soundSet2.push(soundSet2clip);
        // }

  function makeSound(){

	randomSoundSet1 = Math.round((Math.random()*30));
	randomSoundSet2 = Math.round((Math.random()*2));
	// console.log('SOUND TRIGGER' + randomSoundSet1 + ", " + randomSoundSet2 + ", " + randomSoundSet3);
	// if (soundCounter % 2 == 0){
	// 	console.log("SWELL SOUND:" + randomSoundSet2);
	// 	// console.log("instrument 3 " + randomSoundSet3);
	// 	soundSet1[randomSoundSet2].play();
	// }

	soundSet1[randomSoundSet1].play();
	// console.log("SOUND:" + randomSoundSet1);
	
	soundCounter++;
	

}

//////////////////////END MUSIC////////////////////


var allTweets;
var allTweetTables;
var allTweets2;
var allTweetTextSize;
var allHearts;

function resizeFunction(){
	width = document.body.clientWidth;
	var menuPopType = document.querySelectorAll('.menuPopType');
	var menuPopTypeLogo = document.querySelector('.menuPopTypeLogo');
	var heartMenu = document.querySelectorAll('.heartMenu');
	var email = document.querySelector('.email');

	

	logo.style.width = width / 8 + 'px';
	logo.style.height = width / 16 + 'px';

	addLovePop.style.width = width / 4 + 'px';
	addLovePop.style.height = width / 3.8 + 'px';

	formHeart.style.width = width / 25 + 'px';
	formHeart.style.height = width / 25 + 'px';

	formSubmit.style.width = width / 7 + 'px';
	formSubmit.style.fontSize = width / 70 + 'px';
	addYours.style.width = width / 7 + 'px';
	addYours.style.fontSize = width / 70 + 'px';

	formName.style.fontSize = width / 70 + 'px';
	formLocation.style.fontSize = width / 70 + 'px';
	formMessage.style.fontSize = width / 70 + 'px';
	helper.style.fontSize = width / 70 + 'px';

	
	for(var i = 0; i < formType.length; i++){
	formType[i].style.fontSize = width / 70 + 'px';
	}



	
	twitterIcon.style.width = width / 60 + 'px';
	twitterIcon.style.height = width / 60 + 'px';
	twitterIcon.style.right = width / 25 + 'px';

	facebookIcon.style.width = width / 65 + 'px';
	facebookIcon.style.height = width / 65 + 'px';
	facebookIcon.style.right = width / 15 + 'px';

	marker.style.width = width / 30 + 'px';
	marker.style.height = width / 30 + 'px';
	marker.style.right = width / 75 + 'px';

	soundOnIcon.style.width = width / 60 + 'px';
	soundOnIcon.style.height = width / 60 + 'px';
	soundOnIcon.style.right = width / 75 + 'px';

	soundOffIcon.style.width = width / 60 + 'px';
	soundOffIcon.style.height = width / 60 + 'px';
	soundOffIcon.style.right = width / 75 + 'px';

	logoPop.style.width = width / 3.1 + 'px';
	logoPop.style.height = width / 2.9 + 'px';
	logoPop.style.left = width / 3.1 + 'px';

	menuPopTypeLogo.style.fontSize = width / 60 + 'px';
	menuPopTypeLogo.style.paddingTop = width / 70 + 'px';
	email.style.fontSize = width / 90 + 'px';

	for(var i = 0; i < heartMenu.length; i++){
		heartMenu[i].style.width = width / 25 + 'px';
		heartMenu[i].style.height = width / 25 + 'px';
	}

	for(var i = 0; i < menuPopType.length; i++){
		menuPopType[i].style.fontSize = width / 70 + 'px';
		menuPopType[i].style.padding = width / 100 + 'px';
	}
}

//RESIZE SINGLE TWEETS ON CLICK
function resizeTweet(element){
	
	if(element.target.className == "dot1" || element.target.className == "dot2" || element.target.className == "dot3" || element.target.className == "dot4" || element.target.className == "dot5"){
		var children = element.target.childNodes;

		if (children[0].className == "tweet2"){
			var singleTweet2 = children[0];
			singleTweet2.style.width = width / 5 + 'px';
			singleTweet2.style.height = width / 5 + 'px';
			singleTweet2.style.left = (-1* ((width / 5.15) / 2)) + 'px';
			singleTweet2.style.top = (-1 * ((width / 24) / .2)) + 'px';
		} else if (children[0].className == "tweet"){
			var singleTweet = children[0];
			singleTweet.style.width = width / 5 + 'px';
			singleTweet.style.height = width / 5 + 'px';
			singleTweet.style.left = (-1* ((width / 5.25) / 2)) + 'px';
		} else if (children[0].className == "tweet3"){
			//HAWAII
			var singleTweet = children[0];
			singleTweet.style.width = width / 5 + 'px';
			singleTweet.style.height = width / 5 + 'px';
			singleTweet.style.left = (1 * ((width / 200) / 1)) + 'px';
		} else if (children[0].className == "tweet4"){
			//NZ
			var singleTweet2 = children[0];
			singleTweet2.style.width = width / 5 + 'px';
			singleTweet2.style.height = width / 5 + 'px';
			singleTweet2.style.left = (-1* ((width / 5.2) / 1)) + 'px';
			singleTweet2.style.top = (-1 * ((width / 24) / .2)) + 'px';
		}

		
		var singleHeart = children[0].childNodes[1].childNodes[1].childNodes[1].childNodes[0];
		var singleHeartRow = children[0].childNodes[1].childNodes[1].childNodes[1];
		var singleTweetText = children[0].childNodes[1].childNodes[1].childNodes[3];
		var singleName = children[0].childNodes[1].childNodes[1].childNodes[5];
		var singleLocation = children[0].childNodes[1].childNodes[1].childNodes[7];

			
		singleHeartRow.style.height = width / 32 + 'px';
		singleHeartRow.style.paddingBottom = width / 80 + 'px';

		singleName.style.fontSize = width / 90 + 'px';
		singleName.style.paddingTop = width / 115 + 'px';

		singleName.style.fontSize = width / 90 + 'px';
		singleName.style.paddingTop = width / 115 + 'px';

		singleLocation.style.fontSize = width / 130 + 'px';

		singleHeart.style.width = width / 30 + 'px';
		singleHeart.style.height = width / 30 + 'px';


		if(singleTweetText.innerText.length >= 140){
				singleTweetText.style.fontSize = width / 90 + 'px';
		} else {
			singleTweetText.style.fontSize = width / 80 + 'px';
		}
	}
		
}
// RESIZE ALL TWEETS ON RESIZE
function resizeTweets(){
//GRAB ALL ELEMENTS FOR RESIZE
	width = document.body.clientWidth;
	allTweets4 = document.querySelectorAll('.tweet4');
	allTweets3 = document.querySelectorAll('.tweet3');
	allTweets2 = document.querySelectorAll('.tweet2');
	allTweets = document.querySelectorAll('.tweet');
	allTweetTables = document.querySelectorAll(".tweetTable");
	allHeartRows = document.querySelectorAll(".heartRow");
	allTweetTextSize = document.querySelectorAll('.textTweet');
	allNameTextSize = document.querySelectorAll('.textName');
	allLocationTextSize = document.querySelectorAll('.textLocation');
	allHearts = document.querySelectorAll('.heart');
	allGroups = document.querySelectorAll('.group');

	
	

	for(var i = 0; i < allTweets.length; i++){
		allTweets[i].style.width = width / 5 + 'px';
		allTweets[i].style.height = width / 5 + 'px';
		allTweets[i].style.left = (-1* ((width / 5.25) / 2)) + 'px';
	}

	for(var i = 0; i < allTweets2.length; i++){
		allTweets2[i].style.width = width / 5 + 'px';
		allTweets2[i].style.height = width / 5 + 'px';
		allTweets2[i].style.left = (-1* ((width / 5.15) / 2)) + 'px';
		allTweets2[i].style.top = (-1 * ((width / 24) / .2)) + 'px';
		//VERTICALLY CENTER TWEET2'S
		var group = allTweets2[i].childNodes;
		group[1].style.top = 0;
	}
	for(var i = 0; i < allTweets3.length; i++){
		allTweets3[i].style.width = width / 5 + 'px';
		allTweets3[i].style.height = width / 5 + 'px';
		allTweets3[i].style.left = (1 * ((width / 200) / 1)) + 'px';
		// allTweets3[i].style.top = (-1 * ((width / 24) / .2)) + 'px';
		//VERTICALLY CENTER TWEET2'S
		var group = allTweets3[i].childNodes;
		group[1].style.top = 0;
	}

	for(var i = 0; i < allTweets4.length; i++){
		allTweets4[i].style.width = width / 5 + 'px';
		allTweets4[i].style.height = width / 5 + 'px';
		allTweets4[i].style.left = (-1* ((width / 5.2) / 1)) + 'px';
		allTweets4[i].style.top = (-1 * ((width / 24) / .2)) + 'px';
		//VERTICALLY CENTER TWEET2'S
		var group = allTweets4[i].childNodes;
		group[1].style.top = 0;
	}

	
	for(var i = 0; i < allHeartRows.length; i++){
		// allHeartRows[i].style.width = width / 5 + 'px';
		allHeartRows[i].style.height = width / 32 + 'px';
		allHeartRows[i].style.paddingBottom = width / 80 + 'px';
	}
	
	for(var i = 0; i < allTweetTextSize.length; i++){
		if(allTweetTextSize[i].innerText.length >= 140){
			allTweetTextSize[i].style.fontSize = width / 90 + 'px';
		} else {
			allTweetTextSize[i].style.fontSize = width / 80 + 'px';
		}
		allNameTextSize[i].style.fontSize = width / 90 + 'px';
		allNameTextSize[i].style.paddingTop = width / 115 + 'px';
		allLocationTextSize[i].style.fontSize = width / 130 + 'px';
		// allLocationTextSize[i].style.paddingTop = width / 400 + 'px';
		
	}
	for(var i = 0; i < allHearts.length; i++){
		allHearts[i].style.width = width / 30 + 'px';
		allHearts[i].style.height = width / 30 + 'px';
		// allHeartRows[i].style.left = ((width / 20) / 2) + 'px';
	}
	


}

	



function startDots(){
	// soundSet2[0].play();
	
	var interval = Math.random()*1200;
	//CREATE DOTS EVERY RANDOM * 3 SECONDS
	var intervalometer = function(){
		if ( dotCounter < fireBaseCount ){
			
			createDot();


		    clearInterval(interval);
		    interval = Math.random()*1200;
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
		createTweet.id = tweetObj.id;
		createTweet.style.display = "none";
		createDotImg.appendChild(createTweet);
		

		if (tweet.x > 10 && tweet.x < 50 && tweet.y < 50){
			createTweet.className = "tweet";
			createTweet.style.top = 18 + "px";
			createTweet.style.left = -196 + "px";

		} else if (tweet.x < 10 && tweet.y < 50){
			// console.log('HAWAII');
			createTweet.className = "tweet3";
			createTweet.style.top = 18 + "px";
			createTweet.style.left = -196 + "px";

		} else if (tweet.x < 50 && tweet.y > 50){
			// console.log('lower left');
			createTweet.className = "tweet2";
			createTweet.style.top = -410 + "px";
			createTweet.style.left = -196 + "px";

		} else if (tweet.x > 50 && tweet.x < 86 && tweet.y > 50){
			// console.log('lower right');
			createTweet.className = "tweet2";
			createTweet.style.top = -410 + "px";
			createTweet.style.left = -196 + "px";

		} else if (tweet.x > 50 && tweet.y < 50){
			// console.log('upper right');
			createTweet.className = "tweet";
			createTweet.style.top = 18 + "px";
			createTweet.style.left = -196 + "px";

		} else if (tweet.x > 86 && tweet.y > 50){
			// console.log('NZ & AUS');
			createTweet.className = "tweet4";
			createTweet.style.top = -410 + "px";
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
		// $addLovePop.toggle();

	}

	if(event.target.className == "heartMenu" || event.target.className == "menuPopType" || event.target.className == "menuPopTypeLogo"){
		
		var tweetMenu = $( event.target ).closest(".menuPop").toggle();

	}
	
	if (event.target.id == "logo1"){

			pop.toggle();

		// if(personalDotCheck == false){
		// 	$addLovePop.toggle();

		// } else {

		// 	var pop = $( logoPop );
		// 	pop.toggle();
		// }
	}
	if(event.target.className == "addLove" || event.target.className == "heartLovePop" || event.target.className == "loveForm"){
		console.log('ADD_LOVE');
		$addLovePop.toggle();

	} 
}

function volumeFunction(event){

	var $soundOff = $( soundOff );
	var $soundOn = $( soundOn );
	
	$soundOn.toggle();
	$soundOff.toggle();

	if(event.target.id =="soundOn"){
		Howler.volume(0.0);
	} else if ( event.target.id =="soundOff" ){
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
	if(event.target.className == "heart" || event.target.className == "textTweet" || event.target.className == "textName" || event.target.className == "textLocation" ||  event.target.className == "group" ){
		// console.log('CONTENTS');
		var parent = $( event.target ).closest( ".tweet" );
		parent.toggle();
		var parent2 = $( event.target ).closest( ".tweet2" );
		parent2.toggle();
		var parent3 = $( event.target ).closest( ".tweet3" );
		parent3.toggle();
		var parent4 = $( event.target ).closest( ".tweet4" );
		parent4.toggle();

	}
	if(event.target.className == "tweet" || event.target.className == "tweet2" || event.target.className == "tweet3" || event.target.className == "tweet4" || event.target.className == "tweetRow" || event.target.className == "nameRow" || event.target.className == "heartRow" || event.target.className == "tweetTable" ){
		// var parent = $( event.target ).closest( ".tweet" );
		// console.log(parent);
		// console.log('TABLE');
		var tweetTable = $( event.target ).closest( ".tweet" );
		var tweetTable2 = $( event.target ).closest( ".tweet2" );
		var tweetTable3 = $( event.target ).closest( ".tweet3" );
		var tweetTable4 = $( event.target ).closest( ".tweet4" );
		tweetTable.toggle();
		tweetTable2.toggle();
		tweetTable3.toggle();
		tweetTable4.toggle();


	}
	

}




