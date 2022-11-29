const mongoose = require('mongoose')

const app = require('./express')
const port = process.env.PORT || 8080


app.listen(port, () =>{
    console.log("started on port " + port)
})


const connectionURL = process.env.MONGODB_URL

//connection to database
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
