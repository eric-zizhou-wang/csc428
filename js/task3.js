/* context canvas and base variabls */
var context;
var canvas;
var HEIGHT = document.body.clientHeight;
var WIDTH = document.body.clientHeight;
var offsetX = 0;
var offsetY = 0;
var backgroundImage = "../img/background/task1.png";
var PART = 1;
var TOTALPARTS = 1;
var TRACK = false;
var ATTEMPT = 1;

var circle = {
	"1": {
		"parts": 4,
		"first": 1,
		"last": 1,
		"1": {
			"startX": 350,
			"startY": 250,
			"radius": 10,
		},
		"2": {
			"startX": 550,
			"startY": 250,
			"radius": 10,
		},
		"3": {
			"startX": 550,
			"startY": 450,
			"radius": 10,
		},
		"4": {
			"startX": 350,
			"startY": 450,
			"radius": 10,
		},
	},
}

window.onload = function() {};

/* global variables */
function initializeGlobalVariables() {
}


/** draw()
 * this function does all the drawing on the canvas
 */
function draw() {
	resetScreen();

	for(var i = 1; i <= circle[PART].parts; i++) {
		var start = i;
		var end = i == circle[PART].parts ? 1 : i + 1;
		drawStraightLine(
			circle[PART][start].startX,
			circle[PART][start].startY,
			circle[PART][end].startX,
			circle[PART][end].startY,
			5
		);
		drawCircle(circle[PART][i].startX, circle[PART][i].startY, circle[PART][i].radius);
	}

	drawCircle(circle[PART]["1"].startX, circle[PART]["1"].startY, circle[PART]["1"].radius);
	
}

/**
 * circle
 */
function drawCircle(startX, startY, radius) {
	context.beginPath();
	context.arc(startX, startY, radius, 0, 2 * Math.PI, false);
	context.fillStyle = 'purple';
	context.fill();
	context.lineWidth = 3;
	context.strokeStyle = '#000000';
	context.stroke();
}

/**
 * straight line
 */
function drawStraightLine(startX, startY, endX, endY, lineWidth) {
	context.beginPath();
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.lineWidth = lineWidth;
	context.stroke();
}

/*
 * verifyClick
 * Used to verify if the click happened within the circle
 */
function verifyClick(x, y, circle) {
	if(
		x >= circle.startX - circle.radius &&
		x <= circle.startX + circle.radius &&
		y >= circle.startY - circle.radius &&
		y <= circle.startY + circle.radius 
	) {
		return true;
	}
}

/**
 * Event Listeners
 */
addEventListener("mousedown", function(click){
	console.log(click);
	if (verifyClick(click.layerX - offsetX, click.layerY - offsetY, circle[PART][circle[PART].first])) {
		console.log('Start tracking information: Task 2, Part ' + PART + ', Attempt ' + ATTEMPT);
		TRACK = true;
	}
}, false);

addEventListener("mouseup", function(click){
	if (verifyClick(click.layerX - offsetX, click.layerY - offsetY, circle[PART][circle[PART].last])) {
		console.log('Stop tracking information: Task 2, Part ' + PART + ' completed in ' + ATTEMPT + ' attempt[s].');
		ATTEMPT = 1;
		if (PART < TOTALPARTS) {
			PART = PART + 1;
		}
	} else {
		console.log('Stop tracking information: Task 2, Part ' + PART + ', Attempt ' + ATTEMPT + ' failed.');
		ATTEMPT = ATTEMPT + 1;
	}
	TRACK = false;
}, false);

addEventListener("mousemove", function(click){
	if (TRACK) {
		console.log('Timestamp: ' + click.timeStamp + ': x:' + click.x + ', y:' + click.y);
	}
}, false);

/*
 * Setup
 */
function setup() {
	initializeGlobalVariables();
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	var background = new Image();
	background.src = backgroundImage;
	context.drawImage(background, 0, 0);
}

/*
 * Reset Screen
 */
function resetScreen() {
	if(context) {
		context.fillRect(0, 0, WIDTH, HEIGHT);

		var background = new Image();
		background.src = backgroundImage;
		context.drawImage(background, 0, 0, WIDTH, HEIGHT);
	} else {
		console.log('no context');
	}
}

setup();
var listener = setInterval(main, 1);

/* main function */
function main() {
	draw();
}