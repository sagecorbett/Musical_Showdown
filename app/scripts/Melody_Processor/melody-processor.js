/*  
FUTURE CONSIDERATIONS:
   Archetectually I am going to write this function assuming I get the audio file from the user
   and am running the check via the server. In the future I think this might/could/should be ran
   on the users side. AKA a front end function. That way I only need to work with the notes array
   serverside.
*/

const fs = require("fs");
const WavDecoder = require("wav-decoder");
const Pitchfinder = require("node-pitchfinder");

console.log(Pitchfinder)

// const { frequencies } = require("pitchfinder")

// const detectPitch = Pitchfinder.YIN();
// const log = console.log

// log(frequencies)

/*
PURPOSE: 
    Melody Processor's purpose is to take an input audio file (the users attempt at matching a melody)
    and processing it to determine what notes were played

INPUT: 
    audio - <String: path to .wav file> The users returned audio

Output:
    An array containing the notes played in sequence of the file
*/
const MelodyProcessor = audio => {
    const buffer = fs.readFileSync(audio);
    const decoded = WavDecoder.decode.sync(buffer); // get audio data from file using `wav-decoder`
    const float32Array = decoded.channelData[0]; // get a single channel of sound
    const Pitchfinder = require("pitchfinder");
    const detectPitch = Pitchfinder.YIN();

    const frequencies = Pitchfinder.frequencies(detectPitch, float32Array, {
    tempo: 130, // in BPM, defaults to 120
    quantization: 4, // samples per beat, defaults to 4 (i.e. 16th notes)
    });
}





MelodyProcessor('./f.wav')