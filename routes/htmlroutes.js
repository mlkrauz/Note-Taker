//initialize router
const htmlRouter = require('express').Router()
const path = require("path");

//Route: get index.html
htmlRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

//Route: get notes.html
htmlRouter.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

//export our router with routes appended
module.exports = htmlRouter