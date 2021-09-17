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
}