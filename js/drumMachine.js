//****************************************************************************************************/
//****************************************** CREATE DRUM MACHINE *************************************/
//****************************************************************************************************/

//**************************************** INITIAL SELECTORS *****************************************/
const okNumInstruments = document.querySelector(".okNumInstruments");

//**************************************** GLOBAL VARIABLES ******************************************/
let instrumentsList = ["Kick", "Snare", "Hihat", "Crash", "Clap", "Tom", "Cowbell"]
let padStates = [];
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
	const drumsContainer = document.querySelector('.drumContainer');
	const userSelectChoices = document.querySelectorAll("#instrument");

	for(let i = 0; i < userSelectChoices.length; i++)
	{
		drumsContainer.appendChild(getDrumLine(userSelectChoices[i].value));
		
		for (let i = 0; i < 16; i++)
			padStates.push(false);
	}

	addListeners();

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

//******************************* SUBMIT LISTENER TO CREATE DRUM MACHINE ***************************/
okNumInstruments.addEventListener('click', createInstrumentChoices);