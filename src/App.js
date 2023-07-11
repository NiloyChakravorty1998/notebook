import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Signup from './auth-components/Signup';
import Signin from './auth-components/Signin';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
