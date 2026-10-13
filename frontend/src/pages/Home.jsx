import styles from './Dashboard.module.css'

function Home() {
      return(
        <>
        <div className={styles.container}>
          <div className={styles.takenote}>
             <h1>take a note</h1>
             <textarea>

             </textarea>
             <button>Save Note</button>
          </div>

          <div className={styles.myNotes}>
            <h1>MY NOTES</h1>
            <input placeholder="search"/>
            <div>

            </div>
          </div>
        </div>
        </>
      )
}

export default Home