const notesModel = require('../models/notesModel')

const addNotes = async (req, res) => {
    try {

    const {notes} = await req.body
    const userId = req.userId

    const content = await notesModel.insertNotes(userId,notes)

    res.status(200).json({success: true})

    } catch(err) {
        console.log(err)
    }
}


const showNotes = async (req, res) => {
    try {
    const notes = await notesModel.getNotes()

    res.status(200).json({success: true, data: notes})
    } catch(err) {
        console.log(err)
    }
}

const deleteNote = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.userId

        const result = await notesModel.deleteNote(id, userId)
        
        if(result.affectedRows === 0) {
            return res.status(404).json({success: false, msg: 'Note not found'})
        }
        res.status(200).json({success: true, msg: 'successfully deleted'})
    } catch(err) {
        console.log(err)
    }
}

const updateNote = async (req, res) => {
    try {
        const {id} = req.params;
        const {data} = req.body
        
        const result = await notesModel.updateNote(data, id)
        res.status(201).json({success: true, msg: 'updated'})
    } catch(err) {
        console.log(err)
    }
}

module.exports = {showNotes, addNotes, deleteNote, updateNote}