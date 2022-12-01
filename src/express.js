const express = require('express')
const cors = require('cors')
const path = require('path')


const createUserController = require('./Controllers/userRegisterController')
const loginUserController = require('./Controllers/userLoginController.js')
const uploadTranscriptController = require('./Controllers/transcriptUploadController')
const getIntentsController = require('./Controllers/getIntents')
const getOneTranscriptIntentsController = require('./Controllers/getOneTranscriptIntents')
const getTranscriptsController = require('./Controllers/getTranscripts')

const clientDirectory = path.join(__dirname, '../build')


const app = express()
app.use(cors())
app.use(express.static(clientDirectory))


//serving up build directory
app.get('*', (req, res) => {
    res.sendFile(path.join(clientDirectory, '/index.html'))
});


app.use(createUserController)
app.use(loginUserController)
app.use(uploadTranscriptController)
app.use(getIntentsController)
app.use(getOneTranscriptIntentsController)
app.use(getTranscriptsController)

module.exports = app