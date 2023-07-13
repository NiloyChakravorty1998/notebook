import React, {useState, useEffect} from 'react'

const NoteById = (prop) => {
  const noteId = prop.noteId;
  const [note, setNote] = useState(null)
  useEffect(() => {
    fetch('http://localhost:5000/api/notes/addnote', {
      method: "GET", body: JSON.stringify({
        
      }), headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
      }
  }).then((res) => {
      res.json().then((data) => {
          window.location = "/"
      })
  })
  })
  return (
    <div>
      
    </div>
  )
}

export default NoteById
