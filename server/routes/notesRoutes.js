const express = require('express')
const router = express.Router()
const {requireAuth} = require('../middleware/requireAuth')
const {showNotes,addNotes, } = require('../controllers/notesController')



router.get('/api/notes',requireAuth, showNotes)
router.post('/api/notes',requireAuth, addNotes)

module.exports = router