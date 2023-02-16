import './App.css';
import Login from './Components/Login/Login';
import Users from './Components/Users/Users';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
