const fs = require('fs')
/*
PURPOSE: 
    Build Melody Files purpose is to take a uint8Array and write it into a midi file. 

INPUT: 
    <uint8Array> - The binary midi file
    <String> - The name of the midi file we want to create

Output:
    <Boolean> - True or False depending on if the file was created
*/

const BuildMelodyFile = (binaryFile, fileLocation, fileName) => {
    try {
        fs.writeFile(`${fileLocation}/${fileName}`, binaryFile, 'base64', function(err) {
            console.log(err)
        })
    } catch (error) {
        console.log(error)
        return false
    }
    return true
}


module.exports = BuildMelodyFile