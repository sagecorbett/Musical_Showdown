const { MelodyCreator } = require('../scripts/Melody_Creator/melody-creator')
const cleanup = require('../scripts/Cleanup/cleanup')


const getSolo = (req, res) => {
    // Delete existing files in melody folder. I wanted to run this as a callback to res.render()
    // but unfortunately it won't work.
    // TODO revisit using cleanup as a callback 
    cleanup(`${__dirname}/../public/melody/`)
    const numOfNotes = Number(req.query.notes)

    if (numOfNotes < 2 || numOfNotes > 20) {
        res.send(
            "Error please select a number of notes between 2 and 20"
        )
            .status(400)
    }

    let melodyObj = MelodyCreator(numOfNotes)
    // res.sendFile(`${__dirname}/${melodyObj.filename}.mid`)
    console.log(melodyObj.notes)
    res.render(
        'melody.ejs',
        {
            filename: melodyObj.filename,
            notes: melodyObj.notes
        }
    )
}

module.exports = {
    getSolo
}