import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Loginsrc/Login";
import Register from "./Loginsrc/Register";
import RSelect from "./Loginsrc/RecoverySelect"
import RCode from "./Loginsrc/RecoveryCode"
import RPassword from "./Loginsrc/RecoveryPassword"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/RecoverySelect" element={<RSelect/>}></Route>
        <Route path="/RecoveryCode" element={<RCode/>}></Route>
        <Route path="/RecoveryPassword" element={<RPassword/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
