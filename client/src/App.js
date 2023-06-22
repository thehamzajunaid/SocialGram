import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";


function App() {

  const {user, darkMode} = useContext(AuthContext)

  // console.log(darkMode)
  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Routes>
      <Route path="/" element={ user ? <Home/> : <Login/>}/>
      <Route path="/login" element={user ? <Navigate to="/"/> :<Login/>}/>
      <Route path="/register" element={user ? <Navigate to="/"/> :<Register/>}/>
      <Route path="/messenger" element={!user ? <Navigate to="/"/> :<Messenger/>}/>
      <Route path="/profile/:username" element={<Profile/>}/>
    </Routes>
    </div>
    
  );
}

export default App;
