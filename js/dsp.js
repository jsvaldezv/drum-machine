//****************************************************************************************************/
//********************************************* DSP DRUM MACHINE *************************************/
//****************************************************************************************************/

//************************************************* IMPORTS ******************************************/
import Timer from "./timer.js"

//**************************************** *****INITIAL SELECTORS ************************************/
const playSelector = document.querySelector(".play");
const pauseSelector = document.querySelector(".pause");

//**************************************** GLOBAL VARIABLES ******************************************/
let bpm = 120;
let isRunning = false;

//******************************************** AUDIOS ***********************************************/
const click = new Audio('assets/audios/click.mp3');

//***************************************** SHOW/HIDE ICONS ******************************************/
function showHide(inIcons) 
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

function playClick() 
{
	click.play();
	click.currentTime = 0;
}

//********************************************* PLAY *************************************************/
function play()
{
	console.log("Click");

	if(!isRunning)
	{
		metronome.start();
		playClick();
		showHide("stop");
		isRunning = true;
	}

	else
		playClick();
}

function stop()
{
	if(isRunning)
	{
		metronome.stop();
		showHide("play");
		isRunning = false;
	}
}

//******************************************* CREATE TIMER OBJECT ************************************/
const metronome = new Timer(play, 60000/bpm, {inmediate: true})

//******************************************** PLAY LISTENER  ***************************************/
playSelector.addEventListener('click', play);
pauseSelector.addEventListener('click', stop);