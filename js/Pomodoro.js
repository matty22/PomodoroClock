//Global variables

var workDisplay = "25:00";
var breakDisplay = "5:00";
var originalWorkTime = "25";
var originalBreakTime = "5";
var currentWorkTime;
var currentBreakTime;
var breakTotalSeconds = 300;
var workTotalSeconds = 1500;
var workAudio = new Audio('files/LightsaberTurnOn.mp3');
var breakAudio = new Audio('files/ThatsImpossible.mp3');

// Initial display of default timer settings

document.getElementById("workDisplay").innerHTML = workDisplay;
document.getElementById("breakDisplay").innerHTML = breakDisplay;

// Following 4 functions handle the + and - time buttons for each timer

function addWorkTime() {
	document.getElementById("workDisplay").innerHTML = "";
	document.getElementById("workDisplay").innerHTML = parseInt(workDisplay) + 1 + ":00";
	workDisplay = parseInt(workDisplay) + 1;
	originalWorkTime = workDisplay;
	workTotalSeconds = parseInt(workDisplay) * 60;
	if (parseInt(workDisplay) > 0) {
		$("#workMinus").prop("disabled", false);
	}
}



function minusWorkTime() {
	document.getElementById("workDisplay").innerHTML = "";
	document.getElementById("workDisplay").innerHTML = parseInt(workDisplay) - 1 + ":00";
	workDisplay = parseInt(workDisplay) - 1;
	if (parseInt(workDisplay) <= 0) {
		$("#workMinus").prop("disabled", true);
	} 
	originalWorkTime = parseInt(workDisplay);	
	workTotalSeconds = parseInt(workDisplay) * 60;
}



function addBreakTime() {
	document.getElementById("breakDisplay").innerHTML = "";
	document.getElementById("breakDisplay").innerHTML = parseInt(breakDisplay) + 1 + ":00";
	breakDisplay = parseInt(breakDisplay) + 1;	
	originalBreakTime = parseInt(breakDisplay);	
	breakTotalSeconds = parseInt(breakDisplay) * 60;
	if (parseInt(breakDisplay) > 0) {
		$("#breakMinus").prop("disabled", false);
	}
}


function minusBreakTime() {
	document.getElementById("breakDisplay").innerHTML = "";
	document.getElementById("breakDisplay").innerHTML = parseInt(breakDisplay) - 1 + ":00";
	breakDisplay = parseInt(breakDisplay) - 1;
	if (parseInt(breakDisplay) <= 0 ) {
		$("#breakMinus").prop("disabled", true);
	}
	originalBreakTime = parseInt(breakDisplay);
	breakTotalSeconds = parseInt(breakDisplay) * 60;
}


// Following two functions handle countdown timer for the work and break sessions

function breakCountdown() {
	
	
	currentBreakTime = window.setInterval(myBreakTimer, 1000);

	function myBreakTimer() {
	document.getElementById("timerDisplay").innerHTML = "";

	breakTotalSeconds = breakTotalSeconds - 1;
	var breakMinutes = Math.floor(breakTotalSeconds / 60);
	if (breakMinutes < 10) {
		breakMinutes = "0" + breakMinutes;
	}
	var breakSeconds = breakTotalSeconds % 60;
	if (breakSeconds < 10) {
		breakSeconds = "0" + breakSeconds;
	}
	document.getElementById("timerDisplay").innerHTML = breakMinutes + ":" + breakSeconds;

		if (breakTotalSeconds <= 0) {
			clearInterval(currentBreakTime);
			document.getElementById("timerDisplay").innerHTML = "BACK TO WORK!";
			breakAudio.play();
			$("#startButton").prop("disabled", false);
		}
	}
}


function workCountdown() {
	var startClicked = true;
	if (startClicked = true) {
		$("startButton").prop("disabled",true);
	}


	currentWorkTime = window.setInterval(myWorkTimer, 1000);
	function myWorkTimer() {
	document.getElementById("timerDisplay").innerHTML = "";
	
	workTotalSeconds = workTotalSeconds - 1;
	var workMinutes = Math.floor(workTotalSeconds / 60);
	if (workMinutes < 10) {
		workMinutes = "0" + workMinutes;
	}
	var workSeconds = workTotalSeconds % 60;
	if (workSeconds < 10) {
		workSeconds = "0" + workSeconds;
	}
	document.getElementById("timerDisplay").innerHTML = workMinutes + ":" + workSeconds;
		if (workTotalSeconds <= 0) {
			clearInterval(currentWorkTime);
			document.getElementById("timerDisplay").innerHTML = "BREAK TIME!";
			workAudio.play();
			breakCountdown();
		}
	}
}


// This function handles Pause button clicks

function pauseTimers() {
	clearInterval(currentWorkTime);
    clearInterval(currentBreakTime);
}

// This function handles Reset button clicks. If originalWorkTime = 25 reset sets time to -1. Same with break time.

function resetTimers() {
	
	
	//Stops timer from running down
	clearInterval(currentWorkTime);
	clearInterval(currentBreakTime);
	workTotalSeconds = parseInt(workDisplay) * 60;
	breakTotalSeconds = parseInt(breakDisplay) * 60;
	
	//This section resets the Work Session timer to its received input or to default of "25" if it received no input from user
	workDisplay = originalWorkTime;	
	document.getElementById("workDisplay").innerHTML = "";
	
	if (workDisplay <= 0) {
		document.getElementById("workDisplay").innerHTML = "25:00";
		document.getElementById("timerDisplay").innerHTML = "25:00"
	} else {
		document.getElementById("workDisplay").innerHTML = originalWorkTime + ":00";
		document.getElementById("timerDisplay").innerHTML = originalWorkTime + ":00"; // Want to have this reset to whatever my placeholder is prior to pushing start
	}
	

	//This section resets the Break Session timer to its received input or to default of "5" if it received no input from user
	breakDisplay = originalBreakTime;
	document.getElementById("breakDisplay").innerHTML = "";

	if (breakDisplay <= 0 ) {
		document.getElementById("breakDisplay").innerHTML = "5:00";
	} else {
		document.getElementById("breakDisplay").innerHTML = originalBreakTime + ":00";
		
	}
	
}

