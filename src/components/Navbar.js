import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
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
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">
                                inoteBook
                            </Link>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="/navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/about">
                                            About
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/addnote">
                                            New Note
                                        </Link>
                                    </li>
                                </ul>
                                <div className="d-flex">
                                    <h6 style={{
                                        color: 'black', fontFamily: 'Arial', marginTop: '10px',
                                        marginRight: '10px'
                                    }}>{name}</h6>
                                    <Link className="btn btn-outline-primary" to="/" style={{ backgroundColor: 'blue', color: 'white' }}
                                        onClick={() => {
                                            localStorage.setItem("token", null)
                                            window.location = "/"
                                        }}>
                                        Log Out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        )

    }

    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            inoteBook
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="/navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/about">
                                        About
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/addnote">
                                        New Note
                                    </Link>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <Link className="btn btn-outline-primary me-2" to="/signup" style={{ backgroundColor: 'green', color: 'white' }}>
                                    Sign Up
                                </Link>
                                <Link className="btn btn-outline-primary" to="/signin" style={{ backgroundColor: 'blue', color: 'white' }}>
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
