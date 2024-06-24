import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import HomePage from "./pages/HomePage";
import LobbyScreen from "./pages/Interview/Lobby";
import RoomPage from "./pages/Interview/Room";


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
          <Route path="/lobby" element={<LobbyScreen />} />
          <Route path="/room/:roomId" element={<RoomPage />} />

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
          <Route path="/lobby" element={<LobbyScreen />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </Routes>
      </div>
    );
  }

}

export default App;
