//****************************************************************************************************/
//****************************************** CREATE DRUM MACHINE *************************************/
//****************************************************************************************************/

// IMPORT JSON
//import deepHouse from "../presets/deepHouse.json";
import deepHousePreset from '../presets/deepHouse.json' assert {type: 'json'};
import technoPreset from '../presets/techno.json' assert {type: 'json'};

const presets = [];
presets.push(deepHousePreset);
presets.push(technoPreset);

//**************************************** INITIAL SELECTORS *****************************************/
const okNumInstruments = document.querySelector(".okNumInstruments");
const letsGo = document.querySelector(".modalCenter_Lets");

//**************************************** GLOBAL VARIABLES ******************************************/
let instrumentsList = ["Kick", "Snare", "Hihat", "Crash", "Clap", "Tom", "Cowbell"]
let drumPads;

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

		if(state)
			pad.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
		else
			pad.style.backgroundColor = "rgb(42, 231, 255)";

		window.glob[inIndex] = !state;
		console.log(window.glob);
  }
}

function updatePadState(inIndex)
{
	drumPads = document.querySelectorAll(".drumPad");
	let pad = drumPads[inIndex];
	let state = window.glob[inIndex];

	if(!state)
		pad.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
	else
		pad.style.backgroundColor = "rgb(42, 231, 255)";
}

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

//******************************************* LOAD PRESETS *******************************************/ 
function loadPreset()
{
	const presetsChoice = document.querySelector('#preset');

	for(let i = 0; i < (instrumentsList.length * 16); i++)
	{
		let padState;

		if(i < 16)
			padState = presets[0].kickPattern[i];

		else if(i >= 16 && i < 32)
			padState = presets[0].snarePattern[i-16];

		else if(i >= 32 && i < 48)
			padState = presets[0].hihatPattern[i-32];

		else if(i >= 48 && i < 64)
			padState = presets[0].crashPattern[i-48];

		else if(i >= 64 && i < 80)
			padState = presets[0].clapPattern[i-64];

		else if(i >= 80 && i < 96)
			padState = presets[0].tomPattern[i-80];

		else if(i >= 96 && i < 112)
			padState = presets[0].cowbellPattern[i-96];

		window.glob[i] = padState;
		updatePadState(i, padState);
	}
}

//************************************** CREATE PRESETS COMBOBOX ************************************/ 
function createPresets()
{
	const presetsContainer = document.querySelector('.presets');

	presetsContainer.innerHTML += 
		`<form class="presetsChoice">
			<select id="preset" name="preset">
			<option value="${presets[0].id}">${presets[0].name}</option>
			<option value="${presets[1].id}">${presets[1].name}</option>
		</form>`

	presetsContainer.addEventListener('change', loadPreset);
}

//*********************************** CREATE DRUM MACHINE ARRANGEMENT *******************************/
function createDrumMachine()
{
	const drumsContainer = document.querySelector('.drumContainer');
	const userSelectChoices = document.querySelectorAll("#instrument");

	for(let i = 0; i < userSelectChoices.length; i++)
	{
		drumsContainer.appendChild(getDrumLine(userSelectChoices[i].value));
		window.instruments.push(userSelectChoices[i].value);
		
		for (let i = 0; i < 16; i++)
			window.glob.push(false);
	}

	addListeners();
	createPresets();

	const drumsUserChoice = document.querySelector(".drumsUserChoice");
	drumsUserChoice.style.display = "none";
	drumsContainer.style.display = "flex";
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
}

function clearInit()
{
	const modalWelcome = document.querySelector('.modalWelcome');
	modalWelcome.style.display = "none";
}

//******************************* SUBMIT LISTENER TO CREATE DRUM MACHINE ***************************/
okNumInstruments.addEventListener('click', createInstrumentChoices);
letsGo.addEventListener('click', clearInit);