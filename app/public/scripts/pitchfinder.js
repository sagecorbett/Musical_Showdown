// The models to train the pitch detecting algorithm 
const modelPath = './models';

// Dom elements
const noteDisplay = document.getElementById('note_display');
const melodyDisplay = document.getElementById('melody_display')
const record = document.getElementById('record');
const stopBtn = document.getElementById('stop');
const melodyNotes = document.getElementById('notes').dataset.notes.split(',')
console.log(melodyNotes)
const submit = document.getElementById('submit')

let userNotes = []
// Used to start or stop recursive calls of getPitch
let recording = false;
// Frequency reference used to calculate what note is being played
let aNote = 440

// Microphone necessities
let audioContext;
let mic;
let pitch;
// To check if a new note was played. See write up before getPitch
let pastMicLevel = 0.0

// This variable is to control just standard noise that might be in a room that 
// is NOT the instrument
const minimumMicLevel = 0.008

// Start and Stop buttons
record.addEventListener('click', startRecording)
stopBtn.addEventListener('click', stopRecording)
submit.addEventListener('click', handleSubmit)

// initialize everything needed to use computer microphone
function setup() {
  noCanvas()
  audioContext = getAudioContext();
  audioContext.suspend();
  mic = new p5.AudioIn(errorStartingAudioIn);
  mic.stop()
}

// If there was an error creating a new AudioIn 
function errorStartingAudioIn(err){
  alert("There was an error starting AudioIn: ", err)
  console.error('Error on AudioIn: ', err)
}

// If the mic could not be started alert an error
function errorStartingMic(err){
  alert("There was an error starting your microphone: ", err)
  console.err('Error Starting Mic: ', err)
}

// Called when user clicks the "record" button
function startRecording(){
  // empty existing melody if the user has attempted to play one already
  userNotes = []
  recording = true
  audioContext.resume()
  mic.start(startPitch, errorStartingMic);
}

// Called when user clicks the "stop" button
function stopRecording(){
  recording = false;
  mic.stop()
}

// Called from the "startRecording" function as a callback function to mic.start
function startPitch() {
  pitch = ml5.pitchDetection(modelPath, audioContext, mic.stream, modelLoaded);
}

// When the ML5 pitch detection is ready invoke getPitch()
function modelLoaded() {
  getPitch();
}

// Get pitch is a recursive function that runs while the user is playing their melody. It returns the notes 
// they have played.
function getPitch() {
  // Break recursive calls if the user presses stop
  if(!recording) return
  
  pitch.getPitch(function(err, frequency) {
    let micLevel = mic.getLevel()
    if (frequency && micLevel > minimumMicLevel) {
      // Get Note from Frequency
      let notePlayed = noteStrings[getNoteFromFrequency(frequency)%12]

      // Check if the note being played is a new note or not via mic level and add the note to userNotes if new
      pastMicLevel = noteHandler(micLevel, pastMicLevel, notePlayed, userNotes)

      // display note being played
      noteDisplay.innerText = notePlayed

      // display all notes played by user in melody so far
      melodyDisplay.innerText = userNotes
    } else {
      console.log('No Pitch Found')
    }
    getPitch();
  })
}

function handleSubmit(){
    let melodies = {
        userNotes,
        melodyNotes
    }
    console.log(melodies)
    fetch('/solo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(melodies),
    })
    .then(res => {
      console.log('made it here')
      return res.json()
    })
    .then(data => {
      console.log('made it here 2')
      console.log(data)
    })
}


// Convert Frequency to note. Function borrowed from github user cwilso's free to use tuner app. 
var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
function getNoteFromFrequency(frequency){
  var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
	return Math.round( noteNum ) + 69;
}


/*
PURPOSE: 
  The pitch detection happens in a recursion which invokes the function 
  many times a second. Which means it can grab the same note that was played 100s of times
  before the next note. I am going to try to account for this by using the mic volumes.
  typically when a note is played, its highest volume is at the start and it fades out.
  My plan is to detect when the volume has gone up and consider that a new note. 

  For example the note A is played its starting volume could be 0.86 and by the time the 
  next getPitch() function call its volume could be 0.59 then the note B is played and its 
  volume is 0.78 which is higher than what the volume was previously therefor it must be a new 
  note.

INPUT: 
    micLevel - <Float> When getPitch() has a frequency detected, the volume of that level will 
               be passed to this function

    pastMicLevel - <Float> pastMicLevel refers to a global variable that will be passed in 
                      and used to determine if the currentMicLevel is greater or less than the past

    note - <String> - The current note being played

    notesArr - <Array> When a new note is detected it should be added to an array containing the notes played
               
Output:
    <Float> - Return the micLevel so that the pastMicLevel can be updated
*/
function noteHandler(micLevel, pastMicLevel, note, notesArr){
  // if the current micLevel is less than the past mic level then it is NOT a new note
  // therefor just return the new micLevel
  if(micLevel <= pastMicLevel){
    return micLevel
  }
  // else micLevel is louder than the past one so it must be a new note played
  else {
    console.log(micLevel)
    notesArr.push(note)
    return micLevel
  }
}