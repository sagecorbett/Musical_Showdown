

/* 
 Purpose: Return a random number between given ranges
 Input:
    rangeStart - <Integer> The start of the range of possible random numbers 
    rangeEnd - <Integer> The end (including) of possible randoms numbers to choose from

 Output:
    <Integer> A random Integer
*/
const randomNumberCreator = (rangeStart, rangeEnd) => {
    return Math.floor(Math.random() * (rangeEnd - rangeStart + 1) + rangeStart);
}



module.exports = {
    randomNumberCreator: randomNumberCreator
}