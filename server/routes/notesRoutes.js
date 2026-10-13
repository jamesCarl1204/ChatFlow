const express = require('express')
const router = express.Router()

const {showNotes,addNotes} = require('../controllers/notesController')



router.get('/api/notes', showNotes)
router.post('/api/notes', addNotes)

module.exports = router