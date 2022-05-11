var num = window.prompt("Número de instrumentos: ");
var contWhile = 0;
var drumsInstruments = []
var padStates = []
while (contWhile < num)
{
	drumsInstruments.push(window.prompt("Instrumento: "))

	for (var i = 0; i < 16; i++)
		padStates.push(false);
	
	contWhile++;
}

console.log(padStates);
var drumPads;

function addListeners()
{
	drumPads = document.querySelectorAll(".drumPad");

	for (var i = 0; i < drumPads.length; i++)
		drumPads[i].addEventListener('click', changePadState(i) );
}

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

function getDrumLine(inInstrument)
{
	var drumLine = document.createElement('div');
	drumLine.className = 'drumLine';

	drumLine.innerHTML = "<div class='drumInstrument'>" + inInstrument + "</div>";
	
	for(let i = 0; i < 16; i++)
		drumLine.innerHTML += "<div type='button' class='drumPad'></div>";

	return drumLine;
}

function createDrumMachine()
{
	const drumsContainer = document.querySelector('.drumContainer');

	for(var i = 0; i < drumsInstruments.length; i++)
		drumsContainer.appendChild(getDrumLine(drumsInstruments[i]));

	addListeners();
}

window.onload = createDrumMachine;