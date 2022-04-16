const express = require('express')
const router = express.Router()
const { getSolo } = require('../controllers/soloController')
const { TonalDifferences, checkIfTonalDifferencesMatch } = require('../scripts/Tonal_Difference_Calculator/tonal-differences')

router.get('/', getSolo)

router.post('/', async (req, res) => {
    console.log('post made: ', req.body)
    const { melodyNotes, userNotes } = req.body

    const tonalDifferences = await TonalDifferences(melodyNotes, userNotes)
    // const match = checkIfTonalDifferencesMatch(tonalDifferences.computedTonalDifferences, tonalDifferences.userTonalDifferences)
    // res.send({
    //     message: match
    // }).status(200)
    res.json('aello')
})

module.exports = router
