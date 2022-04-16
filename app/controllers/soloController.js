const { MelodyCreator } = require("../scripts/Melody_Creator/melody-creator");
const cleanup = require("../scripts/Cleanup/cleanup");
const {
  TonalDifferences,
  checkIfTonalDifferencesMatch,
} = require("../scripts/Tonal_Difference_Calculator/tonal-differences");


const getSolo = (req, res) => {
  // Delete existing files in melody folder. I wanted to run this as a callback to res.render()
  // but unfortunately it won't work.
  // TODO revisit using cleanup as a callback
  cleanup(`${__dirname}/../public/melody/`);
  const numOfNotes = Number(req.query.notes);

  if (numOfNotes < 2 || numOfNotes > 20) {
    res
      .send("Error please select a number of notes between 2 and 20")
      .status(400);
  }

  let melodyObj = MelodyCreator(numOfNotes);
  // res.sendFile(`${__dirname}/${melodyObj.filename}.mid`)
  res.render("melody.ejs", {
    filename: melodyObj.filename,
    notes: melodyObj.notes,
  });
};

const postSolo = async (req, res) => {
  try {
    // Get the notes of the melody the server created and the notes the user played
    const { melodyNotes, userNotes } = req.body;

    // Get tonal differences for both the user and computer melodies
    let tonalDifferences;
    try {
        tonalDifferences = await TonalDifferences(melodyNotes, userNotes);
    }
    catch(err){
        // This err only happens when the length of the two melodies do not happen
        // This is not a code error but a user error. TonalDifferences addresses this error and throws it. 
        // Since the error is only relevant to the user send it back to the front end
        res.send(err)
    }

    // Check if the two melodies played are a match
    const match = await checkIfTonalDifferencesMatch(
      tonalDifferences.computedTonalDifferences,
      tonalDifferences.userTonalDifferences
    );

    // send whether it was a match or not
    res
      .send({
        message: match,
        tonalDifferences: tonalDifferences
      })
      .status(200);
  } catch (err) {
    console.log(err)
    res.status(500).json("There was a server error")
  }
};

module.exports = {
  getSolo,
  postSolo
};
