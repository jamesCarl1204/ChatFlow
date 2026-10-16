const {pool} = require('../config/db')

const notesModel = {
    async getNotes () {
        const [rows] = await pool.query('SELECT * FROM notes');
        return rows
    },
    async insertNotes (userId, content) {
        const [result] = await pool.query('INSERT INTO notes(user_id, content) VALUES(?,?)',[userId, content])
        return result
    },
    async deleteNote(id, userId)  {
        const [result] = await pool.query('DELETE FROM notes WHERE id = ? AND user_id', [id, userId])
        return result
    },
    async updateNote(content, id) {
        const [result] = await pool.query('UPDATE notes SET content = ? WHERE id = ?', [content, id])
        return result
    }
}

module.exports = notesModel