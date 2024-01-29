import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, {  useState } from 'react';
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { NoteState } from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);
  const showalert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  };
  
  return (
    <NoteState>
      <Router>
        <Navbar showalert={showalert} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home showalert={showalert}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showalert={showalert} />} />
            <Route path="/signup" element={<Signup showalert={showalert}/>} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}
export default App;
