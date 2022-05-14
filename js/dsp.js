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
let beatsPerMeasure = 4;

//**************************************** SHOW/HIDE ICONS ******************************************/
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

//********************************************* PLAY *************************************************/
function play()
{
	console.log("Click");
	showHide("stop");
	//metronome.start();
}

function stop()
{
	showHide("play");
}

//******************************************* CREATE TIMER OBJECT ************************************/
const metronome = new Timer(play, 60000/bpm, {inmediate: true})

//******************************************** PLAY LISTENER  ***************************************/
playSelector.addEventListener('click', play);
pauseSelector.addEventListener('click', stop);