import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/*' element={<h1>err the world is ending</h1>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
