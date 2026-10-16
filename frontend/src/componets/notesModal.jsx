import {useEffect, useState} from 'react'
import styles from './notes.module.css'


function notesModal({note, onClose, onSave}) {
    
    const [content, setContent] = useState(note?.content || '')

    useEffect(() => {
        setContent(note?.content || '')
    }, [note]);

    async function onSave(noteId,content) {
        const res = await fetch(`/api/notes/${noteId}`, {
            method: 'PUT',
            credentials:'include',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({data:content})
        })
        const data = await res.json()
        console.log(data)
        if(!ok) {
            console.log(data.msg)
        }
    }

    if(!note) return null;

    return (
        <div className={styles.overlay}>
        <div className={styles.modal}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)}>
            </textarea>

            <div>
            <button onClick={() => onSave(note.id, content)}>Save</button>
            <button onClick={onClose}>clode</button>
            </div>
        </div>
        </div>
    )
}

export default notesModal