// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the child img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	console.log('swap photo');
}


var mCurrentIndex = 0;
var request = new XMLHttpRequest();

//Use this array to hold objects which contain the following:
//location, description, date and an actual Image element.
var mImages = [];
var json;
var url = 'insert_url_here_to_image_json';


//This is probably seems confusing, but in javascript there is a concept known as closures. Closures allows
//variables to remain in scope after a method finishes executing. You can read about it here: http://stackoverflow.com/a/2803496
//All you need to know is that you should use the following function as your event callback for loading the source of Images from your json data.

//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object.
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

function testClosureExample() {
	for (var i = 0; i < 4; i++) {
		var input = document.createElement("input");
		input.type = "button";
		input.value = "Button " + i;
		//trying to access the value i like the click listener is doing will lead to bad results.
		input.onclick = function(e) {
			console.log("The variable i will always equal 4. i = " + i);
		}
		
		//using a closure to fight a closure gives us what we would expect.
		input.onmouseup = testClosureExampleMouseUpHandler(i);
		document.body.appendChild(input);
	}
}

function testClosureExampleMouseUpHandler(i) {
	return function(e) {
		console.log("The variable is will be what you expect, and match the value the button has. i = " + i);
	}
}

$(document).ready( function() {
	$('.details').eq(0).hide();
});

window.addEventListener('load', function() {
	console.log('window loaded');
	testClosureExample();
}, false);


