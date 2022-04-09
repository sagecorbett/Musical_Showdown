let cl = require('child_process')

/* 
 Purpose: Currently I am running a not ideal solution in order to create and send Midi files. 
          The problem is that by creating so many files I am cluttering the application. This 
          functions purpose is to delete all the created melody files after they have been sent.
 Input:
    path: <String> This is the direct path to the folder that needs all files within it deleted

 Output:
    <Boolean> || Error MSG: True or Error depending on if the cleanup was successful
*/
const cleanup = path => {
    try {
        cl.execSync(`rm -rf ${path}*`)
        return true
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = cleanup