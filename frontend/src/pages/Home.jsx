import styles from './Dashboard.module.css'
import {useState, useEffect}  from'react'
function Home() {

    const [notes, setNotes] = useState([])

    const fetchNotes = async () => {
        try{
            const res = await fetch('http://localhost:5000/api/notes')
            const data = await res.json()
            setNotes(data)

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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({notes})
        })

        fetchNotes()
    }
      return(
        <>
        <div className={styles.container}>
          <form className={styles.takenote} onSubmit={handleSubmit}>
             <h1>take a note</h1>
             <textarea
             value={notes}
             onChange={(e) => setNotes(e.target.value)}>
             </textarea>
             <button type="submit">Save Note</button>
          </form>

          <div className={styles.myNotes}>
            <h1>MY NOTES</h1>
            <input placeholder="search"/>
            <div className={styles.cardContainer}>
                {notes.map((note) => (
                    <div className={styles.notesBox}>
                        
                        <div>
                            <button>delete</button>
                            <button>open notes</button>
                        </div>
                    </div>
                ))}
                
            </div>
          </div>
        </div>
        </>
      )
}

export default Home