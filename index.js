var num = window.prompt("Número de instrumentos: ");
var contWhile = 0;
var drumsInstruments = []
while (contWhile < num)
{
	drumsInstruments.push(window.prompt("Instrumento: "))
	contWhile++;
}

var padStates = new Array(drumsInstruments.length * 16).fill(false);
var drumPads;

function addListeners()
{
	drumPads = document.querySelectorAll(".drumPad");

	for (var i = 0; i < drumPads.length; i++)
	{
		drumPads[i].addEventListener('click', function()
		{
			let pad = this;
			pad.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
		});
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
	{
		console.log(drumsInstruments[i]);
		drumsContainer.appendChild(getDrumLine(drumsInstruments[i]));
	}

	addListeners();
}

window.onload = createDrumMachine;