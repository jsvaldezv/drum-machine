import Timer from "./timer.js"

const okNumInstruments = document.querySelector(".okNumInstruments");

// GLOBAL VARIABLES
let contWhile = 0;
let drumPads;
let drumsInstruments = [];
let padStates = [];
let bpm = 120;
let beatsPerMeasure = 4;

// ADD INSTRUMENTS FOR DRUM MACHINE
/*while (contWhile < num)
{
	drumsInstruments.push(window.prompt("Instrumento: "));

	for (let i = 0; i < 16; i++)
		padStates.push(false);
	
	contWhile++;
}*/

// ADD LISTENERS
function addListeners()
{
	drumPads = document.querySelectorAll(".drumPad");

	for (let i = 0; i < drumPads.length; i++)
		drumPads[i].addEventListener('click', changePadState(i));
}

// LISTENER FUNCTION TO CHANGE STATE
const changePadState = (inIndex) => {
	return (e) => {

		let state = padStates[inIndex];
		let pad = e.target;

		if(state)
			pad.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
		else
			pad.style.backgroundColor = "rgba(0, 0, 0, 0.8)";

		padStates[inIndex] = !state;
		console.log(padStates);
  }
}

// GETTER METHOD TO GET ONE INSTRUMENT LINE
function getDrumLine(inInstrument)
{
	let drumLine = document.createElement('div');
	drumLine.className = 'drumLine';

	drumLine.innerHTML = "<div class='drumInstrument'>" + inInstrument + "</div>";
	
	for(let i = 0; i < 16; i++)
		drumLine.innerHTML += "<div type='button' class='drumPad'></div>";

	return drumLine;
}

// CREATE DRUM MACHINE ARRANGEMENT
function createDrumMachine()
{
	const drumsContainer = document.querySelector('.drumContainer');

	for(let i = 0; i < drumsInstruments.length; i++)
		drumsContainer.appendChild(getDrumLine(drumsInstruments[i]));

	addListeners();
}

function playClick()
{
	console.log("Click");
}

function getUserInstrumentChoice()
{
	let drumInstrumentChoice = document.createElement('div');
	drumInstrumentChoice.className = 'drumInstrumentChoice';
	drumInstrumentChoice.innerHTML = 
		`<form>
			<select id="country" name="country">
			<option value="kick">Kick</option>
			<option value="snare">Snare</option>
			<option value="hihat">Hihat</option>
			<option value="hihat">Tom</option>
			<option value="hihat">Crash</option>
			</select>
  		</form>`;

	return drumInstrumentChoice;
}

function createInstrumentChoices()
{
	const numInstruments = document.getElementById('numInstruments');
	const currentWindows = document.querySelector(".drumUserInfo");
	const drumsUserChoice = document.querySelector(".drumsUserChoice");

	currentWindows.style.display = "none";

	for(let i = 0; i < numInstruments.value; i++)
		drumsUserChoice.appendChild(getUserInstrumentChoice());
}

okNumInstruments.addEventListener('click', createInstrumentChoices);

const metronome = new Timer(playClick, 60000/bpm, {inmediate: true})
//metronome.start();