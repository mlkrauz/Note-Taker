const express = require('express')
const apiRoutes = require('./routes/apiroutes')
const htmlRoutes = require('./routes/htmlroutes')

//init express
const app = express()

//set port
const PORT = 3002

//use middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./public/'))

//use routes
app.use('/', htmlRoutes)
app.use('/api', apiRoutes)

//start listening
app.listen(PORT, () => {
        console.log(`Note-Taker listening at ${PORT}`)
    }
)