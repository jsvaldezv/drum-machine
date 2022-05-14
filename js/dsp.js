import Timer from "./timer.js"

// METRONOME
let bpm = 120;
let beatsPerMeasure = 4;

function playClick()
{
	console.log("Click");
}

const metronome = new Timer(playClick, 60000/bpm, {inmediate: true})
//metronome.start();