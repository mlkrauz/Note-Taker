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

    write(allNotes) {
        return writeFileAsync('db/db.json', JSON.stringify(allNotes))
    }

    addNote(note) {
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
}