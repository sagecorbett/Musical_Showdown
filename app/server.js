const express = require('express')
const app = express()
const home = require('./routes/home')
const solo = require('./routes/solo')
const port = process.env.PORT || 5000

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())

// App Routes
app.use('/', home)
app.use('/solo', solo)

// HTML MIDI PLAYER SCRIPT
app.use('/scripts', express.static(`${__dirname}/node_modules/html-midi-player`))

app.listen(port, () => console.log('Listening on port: ', port))