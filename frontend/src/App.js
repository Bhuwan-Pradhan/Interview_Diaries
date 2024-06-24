import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import HomePage from "./pages/HomePage";


const App = () => {
  const { token } = useSelector((state) => state.auth);
  if (token) {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    );
  }

}

export default App;
