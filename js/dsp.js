//****************************************************************************************************/
//********************************************* DSP DRUM MACHINE *************************************/
//****************************************************************************************************/

//************************************************* IMPORTS ******************************************/
import Timer from "./timer.js"

//********************************************* INITIAL SELECTORS ************************************/
const playSelector = document.querySelector(".play");
const pauseSelector = document.querySelector(".pause");
const stepsFollow = document.querySelectorAll(".step");
const sliderBPM = document.querySelector(".drumBPM-slider");

//**************************************** GLOBAL VARIABLES ******************************************/
let bpm = 120 * 4;
let ms = 60000/bpm;
let isRunning = false;
let stepIndex = 0;

//******************************************** AUDIOS ***********************************************/
const click = new Audio('assets/audios/click.mp3');
const audiosNames = ["kick", "snare", "hihat", "crash", "clap", "tom", "cowbell"];

let audios = []
for(let i = 0; i < audiosNames.length; i++) 
	audios.push(new Audio("assets/audios/" + audiosNames[i] + ".wav"));

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

//*************************************** CLEAR STEP SEQUENCER ******************************************/
function clearmoveStepFollow()
{
	for(let i = 0; i < stepsFollow.length; i++)
		stepsFollow[i].style.backgroundColor = "var(--blue)";
}

//***************************************** MOVE STEP SEQUENCER ******************************************/
function moveStepFollow()
{
	clearmoveStepFollow();
	stepsFollow[stepIndex].style.backgroundColor = "rgb(42, 231, 255)";

	stepIndex++;

	if(stepIndex >= 16)
		stepIndex = 0;
}

//********************************************* UPDATE BPM *********************************************/
function updateBPM()
{
	const newBPM = sliderBPM.value;

	const bpmText = document.querySelector(".drumBPM-text");
	bpmText.textContent = newBPM;
	
	bpm = parseInt(newBPM) * 4;
	ms = 60000/bpm;

	metronome.timeInterval = ms;
}

//********************************************* PLAY SOUNDS *********************************************/
function playSounds() 
{
	let numInstruments = window.glob.length / 16;

	for(let i = 0; i < numInstruments; i++)
	{
		let padInstrumentIndex = (i * 16) + stepIndex;
		let padState = window.glob[padInstrumentIndex];

		if(padState)
		{
			switch(window.instruments[i])
			{
				case "Kick":
					audios[0].play();
					audios[0].currentTime = 0;
					break;

				case "Snare":
					audios[1].play();
					audios[1].currentTime = 0;
					break;

				case "Hihat":
					audios[2].play();
					audios[2].currentTime = 0;
					break;
				
				case "Crash":
					audios[3].play();
					audios[3].currentTime = 0;
					break;

				case "Clap":
					audios[4].play();
					audios[4].currentTime = 0;
					break;

				case "Tom":
					audios[5].play();
					audios[5].currentTime = 0;
					break;

				case "Cowbell":
					audios[6].play();
					audios[6].currentTime = 0;
					break;
			}
		}
	}
}

//************************************************ PLAY *************************************************/
function play()
{
	if(!isRunning)
	{
		metronome.start();
		playSounds();
		moveStepFollow();
		showHidePlayIcon("stop");
		isRunning = true;
	}

	else
	{
		playSounds();
		moveStepFollow();
	}
}

//************************************************ STOP ******************************************/
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
const metronome = new Timer(play, ms, {inmediate: true})

//******************************************** PLAY LISTENER  ***************************************/
playSelector.addEventListener('click', play);
pauseSelector.addEventListener('click', stop);
sliderBPM.addEventListener("input", updateBPM);