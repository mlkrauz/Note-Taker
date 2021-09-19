//initialize our router and get dataStore
const api = require('express').Router()
const dataStore = require('../db/dataStore')

//Route: get /api/notes data
api.get('/notes', async (req, res) => {
    try {
        // Get notes array
        const notes = await dataStore.getNotes()

        //Convert to JSON and return with a status of 200
        return res.status(200).json(notes)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Route: post note from request body to database, if valid.
api.post('/notes', async (req, res) => {
    try {
        // Get notes array
        const notes = await dataStore.addNote(req.body)

        //Convert to JSON and return with a status of 200
        return res.status(200).json(notes)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

//Route: deletes note by id, if valid
api.delete('/notes/:id', async (req, res) => {
    try {
        // Get notes array
        const notes = await dataStore.removeNote(req.params.id)

        //Convert to JSON and return with a status of 200
        return res.status(200).json({ ok: true })
    } catch (error) {
        res.status(500).json(error)
    }
})

//export our router with routes appended
module.exports = api