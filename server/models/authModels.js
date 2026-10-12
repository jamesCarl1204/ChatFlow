const {pool} = require('../config/db')

const authModels = {
    async createAccount (email, password) {
        const [result] = await pool.query('INSERT INTO users(email,password) VALUES(?,?,?)', [email, password])
        return result.affectedRows
    },

    async isEmailExist(email) {
        const rows = await pool.query('SELECT * FROM users WHERE email = ?', [email])
        return rows
    }
}

module.exports = authModels