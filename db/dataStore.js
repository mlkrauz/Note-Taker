const util = require('util')
const fs = require('fs')
const uuidv1 = require('uuid/v1')

// Promisfy the reading and writing of files.
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

/**
 * Handles the storing and retrieving of data to/from the database
 */
class DataStore {
    
    /**
     * @returns the database of notes.
     */
    read() {
        return readFileAsync('db/db.json', 'utf8')  
    }

    /**
     * Writes all notes to the database.
     * @param {Array | Object} allNotes an Array of notes or a single note object.
     * @returns a copy of the writen database
     */
    write(allNotes) {
        return writeFileAsync('db/db.json', JSON.stringify(allNotes))
    }

    /**
     * Adds the passed in note to the database, assigning it a UUID in the process.
     * @param {Object} note to be added to database
     * @returns a copy of the note object
     */
    async addNote(note) {
        const { title, text } = note
    
        if (!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank")
        }
    
        // Create new note
        const newNote = { title, text, id: uuidv1() }
    
        // Get existing notes
        const existingNotes = await this.getNotes()

        // Write the existing notes back to db, plus our new note
        this.write([...existingNotes, newNote])
            
        // Return the new note
        return newNote
    }

    /**
     * Removes a note from the database, by matching its ID.
     * @param {String} note_id The UUID of the note to be removed
     * @returns a copy of the database with the note removed.
     */
    async removeNote(note_id) {
        const existingNotes = await this.getNotes()

        // Keep notes that don't have the id of 'note_id'
        const filteredNotes = existingNotes.filter((note) => note.id !== note_id)

        // Write the filtered notes to the DB, and return.
        return this.write(filteredNotes)
    }

    /**
     * Gets a list of all notes in the database.
     * @returns an array of note objects.
     */
    async getNotes() {
        const notesString = await this.read()

        let parsedNotes
        try {
            parsedNotes = [].concat(JSON.parse(notesString));
        } catch (error) {
            parsedNotes = [];
        }

        return parsedNotes
    }
}