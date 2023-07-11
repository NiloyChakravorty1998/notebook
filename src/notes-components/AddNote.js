import React, { useState } from 'react'

const AddNote = () => {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleTagChange = (e) => {
        setTag(e.target.value);
    }

    const handleAddNote = () => {
        console.log("my token is " +localStorage.getItem("token"))
        fetch('http://localhost:5000/api/notes/addnote', {
            method: "POST", body:JSON.stringify({
              title,
              description,
              tag
            }), headers:{
              "Content-type":"application/json",
              "auth-token":localStorage.getItem("token")
            }
          }).then((res) => {
            res.json().then((data) => {
              localStorage.setItem("token", data.authtoken)
            })
          })
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 56px)', backgroundColor: '#eeeeee' }}>
            <div className="container p-4 rounded shadow" style={{ maxWidth: '400px' }}>
                <br></br>
                <br></br>
                <center>
                    <h4>Add a new note</h4>
                </center>
                <br></br>
                <p style={{ fontSize: '13px' }}/> 
                    The note should have:
                    <ul>
                        <li>A title of minimum three characters</li>
                        <li>A description of minimum five characters</li>
                        <li>An optional tag</li>
                    </ul>
                
                <form>
                    <div className="container form-group my-3">
                        <label htmlFor="exampleFormControlTextarea1"><h5>Title : </h5></label>
                        <textarea className="form-control form-control-sm" id="title"
                            rows="1" onChange={handleTitleChange} value={title}>
                        </textarea>
                    </div>
                </form>
                <form>
                    <div className="container form-group my-3">
                        <label htmlFor="exampleFormControlTextarea1"><h5>Description : </h5></label>
                        <textarea className="form-control form-control-sm" id="description"
                            rows="6" onChange={handleDescriptionChange} value={description}>
                        </textarea>

                    </div>
                </form>

                <form>
                    <div className="container form-group my-3">
                        <label htmlFor="exampleFormControlTextarea1"><h5>Tag : </h5></label>
                        <textarea className="form-control form-control-sm" id="tag"
                            rows="1" onChange={handleTagChange} value={tag}>
                        </textarea>
                        <br></br>
                        <center>
                            <button type="button" className="btn btn-primary " 
                            onClick={handleAddNote}>Add Note</button>
                        </center>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNote
