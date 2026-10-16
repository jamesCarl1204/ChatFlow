const express = require('express')
const router = express.Router()
const {requireAuth} = require('../middleware/requireAuth')
const {showNotes,addNotes,deleteNote, updateNote } = require('../controllers/notesController')



router.get('/api/notes',requireAuth, showNotes)
router.post('/api/notes',requireAuth, addNotes)
router.delete('/api/notes/:id', requireAuth, deleteNote)
router.put('/api/notes/:id', requireAuth, updateNote)
module.exports = router