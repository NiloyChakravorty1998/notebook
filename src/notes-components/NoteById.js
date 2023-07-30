import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NoteById = () => {
  let { noteId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/notes/getnote/${noteId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setNote(data.note);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/notes/deletenote/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then((data) => {
        window.location = "/"
      })
      .catch((error) => {
        console.log(error);
      });
  }




  const handleUpdate = () => {
      window.location = `/update/note/${noteId}`;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 56px)', backgroundColor: '#eeeeee' }}>
      <div className="container p-4">
        {note ? (
          <div>
            <h5 className="text-center mb-4">{note.title}</h5>
            <div className="card mx-auto" style={{ width: 'calc(100% + 20px)', backgroundColor: '#eeeeee', borderRadius: '0.25rem', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
              <div className="card-body" >
                <p className="card-text">{note.description}</p>
                <center>
                  <p className="card-text" style={{ color: '#154c79', fontWeight: 'bold' }}>{note.tag}</p>
                </center>
              </div>
            </div>
            <br></br>
            <center>
              <button type="button" class="btn btn-info mx-3" onClick={handleUpdate}>Update</button>
              <button type="button" class="btn btn-warning" onClick={handleDelete}>Delete</button>
            </center>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default NoteById;
