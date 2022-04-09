const MidiWriter = require('midi-writer-js');
const { Scale } = require("@tonaljs/tonal");
const { randomNumberCreator } = require('../helper_functions/helpers')
const log = console.log



/*  
FUTURE CONSIDERATIONS:
    - Right now I think I will just return a melody from a random scale.
    But in th future I could possibly allow the scale to be chosen
*/

/*
PURPOSE: 
    Melody Creators purpose is to create an audio file containing a randomly created melody

INPUT: 
    notes - <Integer> The number of notes to be created in the melody
    duration - <Integer> The length that the melody is played

Output:
    <Object> -  An object containing the two keys
                "notes": <Array > An array containing all of the notes used to create the melody
                "binaryFile": <uint8Array > An array containing everything needed to create melody file
*/
const MelodyCreator = (notes, duration) => {
    // Get an array of all possible scales
    let scales = Scale.names()

    // Get a random scale and put it into the key of C4
    let randomScale = 'c4 ' + scales[randomNumberCreator(0, scales.length)]

    // Get the notes of the random scale
    let scaleNotes = Scale.get(randomScale).notes

    // Create an array of "notes" length from notes 
    // randomly selected from the "scaleNotes" array
    let randomNotesArray = randomNoteArrayCreator(scaleNotes, notes)

    // Start with a new track
    let track = new MidiWriter.Track();

    // // Define an instrument (optional):
    track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 1}));

    // Add some notes:
    let note = new MidiWriter.NoteEvent({
        pitch: randomNotesArray,
        duration: '4',
        sequential: true
    });



    track.addEvent(note);

    // Create midi file and save it
    let write = new MidiWriter.Writer(track);
    let directoryPath = `public/melody/`
    let filename = `${Date.now()}_${notes}`

    write.saveMIDI(directoryPath + filename)

    return {
        filename: filename + '.mid',
        notes: randomNotesArray
    }
}


/*
PURPOSE:
    To create an array of "random" notes from a given scale

INPUT:
    scale - <Array of strings> An array of notes from a given scale
    numberOfNotes - <Integer> The number of notes to be returned

OUTPUT:
    <Array> an array of random notes
*/
const randomNoteArrayCreator = (scale, numberOfNotes) => {
    let randomNoteArray = []
    for(let i = 0; i < numberOfNotes; i++){
        // get a random note from the scale and add 
        // it to the randomNoteArray
        randomNoteArray.push(
            scale[randomNumberCreator(0, scale.length)]
        )
    }

    return randomNoteArray
}


module.exports = {
    MelodyCreator: MelodyCreator
}

