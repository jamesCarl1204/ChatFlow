const {pool} = require('../config/db')

const notesModel = {
    async getNotes () {
        const [rows] = await pool.query('SELECT * FROM notes');
        return rows
    },
    async insertNotes (userId, content) {
        const [result] = await pool.query('INSERT INTO notes(user_id, content) VALUES(?,?)',[userId, content])
        return result
    }
}

module.exports = notesModel