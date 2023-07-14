import React, { useState, useEffect } from 'react';
import NoteItem from './NoteItem';

const Notes = () => {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/notes/fetchallnotes', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.notes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  return (
    <div className="container my-3">
      <div className="row row-cols-2 row-cols-md-4">
        {notes && notes.length > 0 ? (
          notes.map((element) => (
            <div className="col mb-4" key={element.url}>
              <NoteItem
                title={element.title ? element.title : ''}
                description={truncateDescription(element.description, 6)}
                tag={element.tag}
                id={element._id}
              />
            </div>
          ))
        ) : (
          <p>No Notes found.</p>
        )}
      </div>
    </div>
  );
};

export default Notes;
