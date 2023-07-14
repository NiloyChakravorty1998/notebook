import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Signup from './auth-components/Signup';
import Signin from './auth-components/Signin';
import AddNote from './notes-components/AddNote';
import NoteById from './notes-components/NoteById';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/signin' element={<Signin />} />
          <Route exact path='/addnote' element={<AddNote />} />
          <Route exact path='/note/:noteId' element={<NoteById/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
