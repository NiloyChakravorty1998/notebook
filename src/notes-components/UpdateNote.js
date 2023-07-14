import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

const UpdateNote = () => {

    const [name, setName] = useState(null)
    let { noteId } = useParams();

    useEffect(() => {
        fetch("http://localhost:5000/api/auth/me", {
            method: "GET", headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((data) => {
                if (data.name) {
                    setName(data.name)
                }
            })
        })
    }, []);
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

    const handleSaveNote = async () => {  

        fetch(`http://localhost:5000/api/notes/updatenote/${noteId}`, {
            method: "PATCH", body: JSON.stringify({
                title,
                description,
                tag
            }), headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((data) => {
                window.location = "/"
            })
        })
    }
    if (name !== null) {
        return (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 56px)', backgroundColor: '#eeeeee' }}>
            <div className="container p-4 rounded shadow" style={{ maxWidth: '400px' }}>
              <br />
              <br />
              <center>
                <h4>Update note</h4>
              </center>
              <br />
              <p style={{ fontSize: '13px' }} />
              The note should have:
              <ul>
                <li>A title of minimum three characters</li>
                <li>A description of minimum five characters</li>
                <li>An optional tag</li>
              </ul>
      
              <form>
                <div className="container form-group my-3">
                  <label htmlFor="exampleFormControlTextarea1"><h5>Title : </h5></label>
                  <textarea className="form-control form-control-sm" id="title" rows="1" onChange={handleTitleChange} value={title} />
                </div>
              </form>
              <form>
                <div className="container form-group my-3">
                  <label htmlFor="exampleFormControlTextarea1"><h5>Description : </h5></label>
                  <textarea className="form-control form-control-sm" id="description" rows="6" onChange={handleDescriptionChange} value={description} />
                </div>
              </form>
              <form>
                <div className="container form-group my-3">
                  <label htmlFor="exampleFormControlTextarea1"><h5>Tag : </h5></label>
                  <textarea className="form-control form-control-sm" id="tag" rows="1" onChange={handleTagChange} value={tag} />
                  <br />
                  <center>
                    <button type="button" className="btn btn-primary" onClick={handleSaveNote}>Save</button>
                  </center>
                </div>
              </form>
            </div>
          </div>
        );
      }
      
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 56px)', backgroundColor: '#eeeeee' }}>
          <center>
            <h3>Welcome to inoteBook, sign in to check out your notes.</h3>
          </center>
        </div>
      );
}

export default UpdateNote
