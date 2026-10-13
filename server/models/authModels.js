const {pool} = require('../config/db')
const bcrypt = require('bcrypt')

const authModels = {

    async createAccount (email, password) {
        const salt = 12
        const hashedPassword = await bcrypt.hash(password, salt)
        const [result] = await pool.query('INSERT INTO users(email,password) VALUES(?,?)', [email, hashedPassword])
        return result
    },

    async isEmailExist(email) {
        const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email])
        return rows
    },

    async getEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
       return rows
    }
}

module.exports = authModels