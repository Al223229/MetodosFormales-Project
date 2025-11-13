import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Loginsrc/Login";
import Register from "./Loginsrc/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
