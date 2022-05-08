const drumsInstruments = ["Kick", "Snare", "Hihat", "Tom", "Clap"]

function getDrumLine(inInstrument)
{
	var drumLine = document.createElement('div');
	drumLine.className = 'drumLine';

	drumLine.innerHTML = "<div class='drumInstrument'>" + inInstrument + "</div>";
	
	for(let i = 0; i < 16; i++) 
	{
		drumLine.innerHTML += "<button type='button' class='drumPad'></button>";
	}

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
}

window.onload = createDrumMachine;