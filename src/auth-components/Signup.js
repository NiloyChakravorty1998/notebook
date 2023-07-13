import React, { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending a signup request to the server
    fetch("http://localhost:5000/api/auth/createUser",{
      method: "POST", body:JSON.stringify({
        name,
        email,
        password
      }), headers:{
        "Content-type":"application/json"
      }
    }).then((res) => {
      res.json().then((data) => {
        localStorage.setItem("token", data.authtoken)
        console.log(data.authtoken)
        window.location = "/"
      })
    })
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 56px)',  backgroundColor: '#eeeeee' }}>
      <div className="container p-4 rounded shadow" style={{ maxWidth: '400px' }}>
        <h4 className="text-center mb-4">Signin</h4>
        <form >
        <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Full Name
            </label>
            <input
              type="name"
              className="form-control form-control-sm"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-sm"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-sm" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
