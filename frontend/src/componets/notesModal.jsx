import {useEffect, useState} from 'react'
import styles from './notes.module.css'


function notesModal({note, onClose, onSave }) {
    
    const [content, setContent] = useState(note?.content || '')

    useEffect(() => {
        setContent(note?.content || '')
    }, [note]);

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