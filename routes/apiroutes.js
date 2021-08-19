//initialize our router
const api = require('express').Router()

//Route: get /api/notes data
api.get('/api/notes', (req, res) => {

})

//Route: post note from request body to database, if valid.
api.post('/api/notes', (req, res) => {

})

//Route: deletes note by id, if valid
api.delete('/api/notes/:id', (req, res) => {

})

//export our router with routes appended
module.exports = api