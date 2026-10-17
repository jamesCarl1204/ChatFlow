import styles from './Dashboard.module.css'
import {useState, useEffect}  from'react'
import NotesModal from '../componets/notesModal.jsx'

function Home() {

    const [notes, setNotes] = useState([])
    const [notetext, setNoteText] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)

     const handleOpenNote = (note) => {
        setSelectedNote(note);
        setShowModal(true)
    }

    const fetchNotes = async () => {
        try{
            const res = await fetch('http://localhost:3000/api/notes',{method: 'GET', credentials: 'include'})
            const data = await res.json()
            setNotes(data.data)
            console.log(data.msg)
            console.log(notes)

        }catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch('http://localhost:3000/api/notes',{
            method:'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({notes: notetext}),
        })
        const data = res.json()
        console.log(data.msg)

       await fetchNotes()
    }

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:3000/api/notes/${id}`,{
            method: 'DELETE',
            credentials:'include',
            headers: {'Content-Type': 'application/json'},
        })

        const data = await res.json()

        if(!res.ok) {
            console.log(data.msg)
            return
        }
        await fetchNotes()
    }

    async function handleUpdateNote(noteId,content) {
        try {
        const res = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
            method: 'PUT',
            credentials:'include',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({data:content})
        })
        const data = await res.json()
        console.log(data)
        if(!res.ok) {
            console.log(data.msg)
        }
        await fetchNotes()
    }catch(err) {
        console.log(err)
    }
    }

      return(
        <>
        <div className={styles.container}>
        <div className={styles.sidebar}>
            
            <h1>MY NOTES</h1>
            <hr/>
            <div className={styles.searchContainer}>
            <input placeholder="search"/>
            </div>
            

            <div>
            <ul className={styles.cardContainer}>
                {notes.map((note) => (
                    <li className={styles.notesBox} key={note.id} onClick ={() => handleOpenNote(note)}>
                        {note.content}
                        <button onClick={() => handleDelete(note.id)}><i className="fa-sharp fa-solid fa-trash"></i></button>
                    </li>
                ))}
            </ul>
            </div>
          </div>

          <form className={styles.takenote} onSubmit={handleSubmit}>
             <h1>take a note</h1>
             <input placeholder="Title:"/>
             <hr/>
             <textarea
             value={notetext}
             onChange={(e) => setNoteText(e.target.value)}>
             </textarea>
             <button type="submit">Save Note</button>
          </form>
          {showModal && (
            <NotesModal 
            note={selectedNote}
            onClose={() => setShowModal(false)}
            onSave={handleUpdateNote}
            />
          )}
        </div>

        </>
      )
}

export default Home