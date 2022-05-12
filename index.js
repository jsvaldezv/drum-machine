import Timer from "./timer.js"

// GLOBAL VARIABLES
var num = window.prompt("Número de instrumentos: ");
var contWhile = 0;
var drumPads;
var drumsInstruments = [];
var padStates = [];

var bpm = 120;
var beatsPerMeasure = 4;

// ADD INSTRUMENTS FOR DRUM MACHINE
while (contWhile < num)
{
	drumsInstruments.push(window.prompt("Instrumento: "));

	for (var i = 0; i < 16; i++)
		padStates.push(false);
	
	contWhile++;
}

// ADD LISTENERS
function addListeners()
{
	drumPads = document.querySelectorAll(".drumPad");

	for (var i = 0; i < drumPads.length; i++)
		drumPads[i].addEventListener('click', changePadState(i));
}

// LISTENER FUNCTION TO CHANGE STATE
const changePadState = (inIndex) => {
	return (e) => {

		var state = padStates[inIndex];
		var pad = e.target;

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
	var drumLine = document.createElement('div');
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

	for(var i = 0; i < drumsInstruments.length; i++)
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
metronome.start();