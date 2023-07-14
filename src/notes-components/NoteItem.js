import React from 'react';

const NoteItem = (props) => {
  const handleNote = () => {
    console.log(props.id)
    window.location.href = `/note/${props.id}`;
  };

  return (
    <div className="my-3">
      <div className="card" style={{backgroundColor: '#eeeeee'}}>
        <div className="card-body">
            <center>
          <h5 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
            
            {props.title}</h5>
            </center>
            <br></br>
          <p className="card-text" style={{ marginBottom: '10px' }}><h6 style={{fontSize: '15px',fontWeight: 'bold'}}>Description : </h6>{props.description}...</p>
          <center>
          <h6 className="card-text" style={{ color: '#154c79', marginBottom: '10px',fontWeight: 'bold' }}>{props.tag}</h6>
          </center>
          <center>
            <button type="button" className="btn btn-primary" onClick={handleNote}>Read More</button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
