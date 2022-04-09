/*  
FUTURE CONSIDERATIONS:

*/

const { Interval } = require("@tonaljs/tonal");
const log = console.log

/*
PURPOSE: 
    TonalDifference Calculators purpose is to take two array of notes and return the tonal differences 
    between each note for both arrays

INPUT: 
    computedNotes - <Array> An array containing the notes played in the computer generated
                    audio file
    
    userNotes - <Array> An array containing the users notes at an attempt of matching the melody 

Output:
    <Object> 
        computedTonalDifferences: <Array> The tonal differences that the computer
        userTonalDifferences: <Array> The tonal differences of the notes the user played
*/
const TonalDifferences = (computedNotes, userNotes) => {
    // Check to make sure the two notes arrays are the 
    // same length and give a detailed error message for the user
    if(userNotes.length !== computedNotes.length){
        let missedNotes = Math.abs(userNotes.length - computedNotes.length)
        if(userNotes.length > computedNotes.length)
            throw `Detected ${ missedNotes } more notes than what was played in the melody`
        else
            throw `${ missedNotes } Less notes detected than what was played in the melody`
    }

    let differences = {
        computedTonalDifferences: ['root'],
        userTonalDifferences: ['root']
    }
    
    /*
        Get first note for both melodies. All of the intervals will be reliant on this note.
        For example: if the melody is F, G, A
        We will base it all on the F. From F - G is a Major second. From F - A is a Major 3rd
        So the returned melody based on intervals would be Root, Major 2nd, Major 3rd
        Basing the intervals on the first note will allow me to tell the user which note is out 
        of place if there is one.
    */
    let userFirstNote = userNotes[0]
    let computerFirstNote = computedNotes[0]

    // Loop through both of the notes array checking for tonal differences
    for(let i = 1, n = computedNotes.length; i < n; i++){
        // Add the interval from the first note and each index to the respective tonal diff array
        differences.userTonalDifferences.push(
            Interval.distance(userFirstNote, userNotes[i])
        )
        differences.computedTonalDifferences.push(
            Interval.distance(computerFirstNote, computedNotes[i])
        )
    }

    return differences
}


/*
PURPOSE: 
    TonalDifference Calculators purpose is to decide whether the two melodys contain a series of 
    notes with the same tonal differences. This is how I will handle not having to play in
    the same key

INPUT: 
    computedNotes - <Array> An array containing the notes played in the computer generated
                    audio file
    
    userNotes - <Array> An array containing the users notes at an attempt of matching the melody 

Output:
    <Boolean> True or False that the user matched the melody
*/
const checkIfTonalDifferencesMatch = (computerTonalDifferences, userTonalDifferences) => {
    // The error handling was taken care of in TonalDifferences func. This is 
    // just an extra check to make sure that TonalDifferences is returning two arrays 
    // of the same length
    if(computerTonalDifferences.length !== userTonalDifferences.length){
        throw 'The computerTonalDifferences Array is NOT the same length as userTonalDifferences'
    }


    for(let i = 0, n = computerTonalDifferences.length; i < n; i++){
        if(computerTonalDifferences[i] !== userTonalDifferences[i]) 
            return false
    }

    // if no differences in the array were found then we have a matched melody!
    return true
}



module.exports = {
    checkIfTonalDifferencesMatch: checkIfTonalDifferencesMatch,
    TonalDifferences: TonalDifferences
}