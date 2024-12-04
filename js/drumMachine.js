//****************************************************************************************************/
//****************************************** CREATE DRUM MACHINE *************************************/
//****************************************************************************************************/

//****************************************************************************************************/
//********************************************** JSON PRESETS ****************************************/
//****************************************************************************************************/

// IMPORT JSON
import initPreset from '../presets/init.json' with {type: 'json'};
import deepHousePreset from '../presets/deepHouse.json' with {type: 'json'};
import technoPreset from '../presets/techno.json' with {type: 'json'};
import reguetonPreset from '../presets/regueton.json' with {type: 'json'};

console.log ("Hola")

const presets = [];
presets.push(initPreset);
presets.push(deepHousePreset);
presets.push(technoPreset);
presets.push(reguetonPreset);

//**************************************** INITIAL SELECTORS *****************************************/
const okNumInstruments = document.querySelector(".okNumInstruments");
const letsGo = document.querySelector(".modalCenter_Lets");

//**************************************** GLOBAL VARIABLES ******************************************/
let instrumentsList = ["Kick", "Snare", "Hihat", "Crash", "Clap", "Tom", "Cowbell"]
let drumPads;
let createdUser = false;
let indexPresetGlobal = 0;

//****************************************************************************************************/
//********************************************* LISTENERS ********************************************/
//****************************************************************************************************/

//*************************************** ADD LISTENERS TO PADS **************************************/
function addListeners()
{
	drumPads = document.querySelectorAll(".drumPad");

	for (let i = 0; i < drumPads.length; i++)
		drumPads[i].addEventListener('click', changePadState(i));
}

//********************************* LISTENER FUNCTION TO CHANGE STATE TO PAD *************************/
const changePadState = (inIndex) => {
	return (e) => {
		let state = window.glob[inIndex]
		let pad = e.target;

		state ? pad.style.backgroundColor = "rgba(0, 0, 0, 0.2)" : pad.style.backgroundColor = "rgb(42, 231, 255)";

		window.glob[inIndex] = !state;
		console.log(window.glob);
  }
}

function updatePadState(inIndex)
{
	drumPads = document.querySelectorAll(".drumPad");
	let pad = drumPads[inIndex];
	let state = window.glob[inIndex];

	!state ? pad.style.backgroundColor = "rgba(0, 0, 0, 0.2)" : pad.style.backgroundColor = "rgb(42, 231, 255)";
}

//****************************************************************************************************/
//********************************************* PRESETS **********************************************/ 
//****************************************************************************************************/

//**********************************  UPDATE JSON INDEX PRESETS **************************************/ 
function updateIndexPresets()
{
	const presetsChoice = document.querySelector('#preset');

	switch(presetsChoice.value) 
	{
		case "init":
			indexPresetGlobal = 0;
			break;

		case "deepHouse":
			indexPresetGlobal = 1;
			break;

		case "techno":
			indexPresetGlobal = 2;
			break;

		case "regueton":
			indexPresetGlobal = 3;
			break;
	}
}

//******************************************* LOAD PRESET *******************************************/ 
function loadPreset()
{
	createdUser = false;
	createDrumMachine();
	updateIndexPresets();

	for(let i = 0; i < (presets[indexPresetGlobal].numInstruments * 16); i++)
	{
		let padState;

		if(i < 16)
			padState = presets[indexPresetGlobal].kickPattern[i];

		else if(i >= 16 && i < 32)
			padState = presets[indexPresetGlobal].snarePattern[i-16];

		else if(i >= 32 && i < 48)
			padState = presets[indexPresetGlobal].hihatPattern[i-32];

		else if(i >= 48 && i < 64)
			padState = presets[indexPresetGlobal].crashPattern[i-48];

		else if(i >= 64 && i < 80)
			padState = presets[indexPresetGlobal].clapPattern[i-64];

		else if(i >= 80 && i < 96)
			padState = presets[indexPresetGlobal].tomPattern[i-80];

		else if(i >= 96 && i < 112)
			padState = presets[indexPresetGlobal].cowbellPattern[i-96];

		window.glob[i] = padState;
		updatePadState(i, padState);
	}
}

//************************************** CREATE PRESETS COMBOBOX ************************************/ 
function createPresets()
{
	const presetsContainer = document.querySelector('.presets');
	presetsContainer.innerHTML = "";

	const firstPartForm = `<form class="presetsChoice"> <select id="preset" name="preset">`;
	const thirdPartForm = `</form>`;
	let secondPartForm = "";

	for(let i = 0; i < presets.length; i++)
		secondPartForm += `<option value="${presets[i].id}">${presets[i].name}</option>`;
	
	presetsContainer.innerHTML += firstPartForm + secondPartForm + thirdPartForm;

	presetsContainer.addEventListener('change', loadPreset);
	presetsContainer.style.display = "flex";
}

//****************************************************************************************************/
//************************************* CREATE DRUM MACHINE HTML *************************************/
//****************************************************************************************************/

//*******************************  GETTER METHOD TO GET ONE INSTRUMENT LINE **************************/ 
function getDrumLine(inInstrument)
{
	let drumLine = document.createElement('div');
	drumLine.className = 'drumLine';

	drumLine.innerHTML = "<div class='drumInstrument'>" + inInstrument + "</div>";
	
	for(let i = 0; i < 16; i++)
		drumLine.innerHTML += "<div type='button' class='drumPad'></div>";

	return drumLine;
}

//*********************************** CREATE DRUM MACHINE ARRANGEMENT *******************************/
function createDrumMachine()
{
	// CLEAN CURRENT DRUM LINES (IF EXISTS)
	const drumLine = document.querySelectorAll('.drumLine');
	if(drumLine != null)
	{	
		for(let i = 0; i < drumLine.length; i++)
			drumLine[i].remove();
	}

	// CREATE LINES BY USER CHOICE OR BY PRESET
	const drumsContainer = document.querySelector('.drumContainer');
	const userSelectChoices = document.querySelectorAll("#instrument");
	window.instruments = [];

	if(createdUser)
	{
		for(let i = 0; i < userSelectChoices.length; i++)
		{
			drumsContainer.appendChild(getDrumLine(userSelectChoices[i].value));
			window.instruments.push(userSelectChoices[i].value);
			
			for (let i = 0; i < 16; i++)
				window.glob.push(false);
		}
		
		createPresets();
	}
	else
	{
		updateIndexPresets();
		const numInstruments = presets[indexPresetGlobal].numInstruments;

		for(let i = 0; i < numInstruments; i++)
		{
			drumsContainer.appendChild(getDrumLine(presets[indexPresetGlobal].instruments[i]));
			window.instruments.push(presets[indexPresetGlobal].instruments[i]);
			
			for (let i = 0; i < 16; i++)
				window.glob.push(false);
		}
	}

	addListeners();

	const drumsUserChoice = document.querySelector(".drumsUserChoice");
	drumsUserChoice.style.display = "none";
	drumsContainer.style.display = "flex";

	Swal.fire({
		title: '¡Diviertete!',
		text: 'Drum Machine creada',
		padding: '3em',
		color: 'var(--bone)',
		background: 'var(--blue)',
		confirmButtonColor: 'var(--bone)',
	})
}

//************************************** GET SELECTOR FOR USER **************************************/
function getUserInstrumentChoice(inIndex)
{
	let drumInstrumentChoice = document.createElement('div');
	drumInstrumentChoice.className = 'drumInstrumentChoice';

	drumInstrumentChoice.innerHTML = 
		`<form>
			<select id="instrument" name="instrument">
			<option value="${instrumentsList[0]}">${instrumentsList[0]}</option>
			<option value="${instrumentsList[1]}">${instrumentsList[1]}</option>
			<option value="${instrumentsList[2]}">${instrumentsList[2]}</option>
			<option value="${instrumentsList[3]}">${instrumentsList[3]}</option>
			<option value="${instrumentsList[4]}">${instrumentsList[4]}</option>
			<option value="${instrumentsList[5]}">${instrumentsList[5]}</option>
			<option value="${instrumentsList[6]}">${instrumentsList[6]}</option>
			</select>
  		</form>`;

	return drumInstrumentChoice;
}

//*************************** CREATE USER SELECTOR CHOICE FOR INSTRUMENTS **************************/
function createInstrumentChoices()
{
	const numInstruments = document.getElementById('numInstruments');
	const currentWindows = document.querySelector(".drumUserInfo");
	const drumsUserChoice = document.querySelector(".drumsUserChoice");

	currentWindows.style.display = "none";

	for(let i = 0; i < numInstruments.value; i++)
		drumsUserChoice.appendChild(getUserInstrumentChoice(i));

	drumsUserChoice.innerHTML += "<div type='Submit' class='okInstrumentChoices'>Create</div>";

	const okInstrumentChoices = document.querySelector(".okInstrumentChoices");
	okInstrumentChoices.addEventListener('click', createDrumMachine);
	createdUser = true;
}

function clearInit()
{
	const modalWelcome = document.querySelector('.modalWelcome');
	modalWelcome.style.display = "none";
    console.log ("Click")
}

//****************************************************************************************************/
//************************************ CREATE DRUM MACHINE START EVENT *******************************/
//****************************************************************************************************/
okNumInstruments.addEventListener('click', createInstrumentChoices);
letsGo.addEventListener('click', clearInit);

window.onload = () => {
	const presetsContainer = document.querySelector('.presets');
	presetsContainer.style.display = "none";
}