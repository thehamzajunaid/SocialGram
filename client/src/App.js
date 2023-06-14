import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import {
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Home/>}/>
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
