import Timer from "./timer.js"

// GLOBAL VARIABLES
let num = window.prompt("Número de instrumentos: ");
let contWhile = 0;
let drumPads;
let drumsInstruments = [];
let padStates = [];

let bpm = 120;
let beatsPerMeasure = 4;

// ADD INSTRUMENTS FOR DRUM MACHINE
while (contWhile < num)
{
	drumsInstruments.push(window.prompt("Instrumento: "));

	for (let i = 0; i < 16; i++)
		padStates.push(false);
	
	contWhile++;
}

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

// EXECUTE FUNCTION ON LOADING
window.onload = createDrumMachine;

const metronome = new Timer(playClick, 60000/bpm, {inmediate: true})
//metronome.start();