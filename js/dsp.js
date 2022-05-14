//****************************************************************************************************/
//********************************************* DSP DRUM MACHINE *************************************/
//****************************************************************************************************/

//************************************************* IMPORTS ******************************************/
import Timer from "./timer.js"

//**************************************** *****INITIAL SELECTORS ************************************/
const playSelector = document.querySelector(".play");
const pauseSelector = document.querySelector(".pause");
const stepsFollow = document.querySelectorAll(".step");

//**************************************** GLOBAL VARIABLES ******************************************/
let bpm = 120;
let isRunning = false;
let stepIndex = 0;

//******************************************** AUDIOS ***********************************************/
const click = new Audio('assets/audios/click.mp3');

//***************************************** SHOW/HIDE ICONS ******************************************/
function showHidePlayIcon(inIcons) 
{
	if(inIcons == "play")
	{
		playSelector.classList.remove("hide");
		playSelector.classList.add("show");

		pauseSelector.classList.remove("show");
		pauseSelector.classList.add("hide");
	}

	else
	{
		playSelector.classList.remove("show");
		playSelector.classList.add("hide");

		pauseSelector.classList.remove("hide");
		pauseSelector.classList.add("show");
	}
}

function clearmoveStepFollow()
{
	for(let i = 0; i < stepsFollow.length; i++)
		stepsFollow[i].style.backgroundColor = "black";
}

function moveStepFollow()
{

	clearmoveStepFollow();
	stepsFollow[stepIndex].style.backgroundColor = "green";

	stepIndex++;

	if(stepIndex >= 16)
		stepIndex = 0;
}

function playClick() 
{
	click.play();
	click.currentTime = 0;
}

//********************************************* PLAY *************************************************/
function play()
{
	if(!isRunning)
	{
		metronome.start();
		playClick();
		moveStepFollow();
		showHidePlayIcon("stop");
		isRunning = true;

		console.log("Click", stepIndex);
	}

	else
	{
		playClick();
		moveStepFollow();

		console.log("Click", stepIndex);
	}
}

function stop()
{
	if(isRunning)
	{
		metronome.stop();
		showHidePlayIcon("play");
		clearmoveStepFollow();

		isRunning = false;
		stepIndex = 0;
	}
}

//******************************************* CREATE TIMER OBJECT ************************************/
const metronome = new Timer(play, 60000/bpm, {inmediate: true})

//******************************************** PLAY LISTENER  ***************************************/
playSelector.addEventListener('click', play);
pauseSelector.addEventListener('click', stop);