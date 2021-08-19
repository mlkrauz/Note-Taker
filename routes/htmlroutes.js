//initialize router
const htmlRouter = require('express').Router()

//Route: get index.html
htmlRouter.get('*', (req, res) => {

})

//Route: get notes.html
htmlRouter.get('/notes', (req, res) => {

})

//export our router with routes appended
module.exports = htmlRouter