import React, { useState, useEffect } from 'react'
import Notes from '../notes-components/Notes'

const Home = () => {
  const [name, setName] = useState(null);

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

  if (name) {
    return (
      <div>
        <Notes />
      </div>
    )
  }

  return(
  <center><h3>
    Welcome to inoteBook, signin to check out your notes.
  </h3>
  </center>
  )


}

export default Home
