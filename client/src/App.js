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


function App() {

  const {user} = useContext(AuthContext)

  return (
    <Routes>
      <Route path="/" element={ user ? <Home/> : <Register/>}/>
      <Route path="/login" element={user ? <Navigate to="/"/> :<Login/>}/>
      <Route path="/register" element={user ? <Navigate to="/"/> :<Register/>}/>
      <Route path="/profile/:username" element={<Profile/>}/>
    </Routes>
    
    // <Router>
    //   <Switch>
    //     <Route exact path="/">
    //       <Home/>
    //     </Route>
    //     <Route path="/login">
    //       <Login/>
    //     </Route>
    //     <Route path="/register">
    //       <Home/>
    //     </Route>
    //     <Route path="/profile/:username">
    //       <Profile/>
    //     </Route>
    //   </Switch>
    // </Router>
  );
}

export default App;
