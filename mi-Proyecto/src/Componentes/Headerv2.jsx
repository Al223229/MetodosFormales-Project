import './header.css';
import { useState } from "react";
import logo from '../assets/Befitwhite.png';

function Headerv2() {
  return (
    <header className="Header flex items-center gap-6 px-6">
      {/* Logo */}
      <img src={logo} alt="Logo Befit" className="logoBe" />
    </header>
  );
}

export default function App() {
  return (
    <div>
      <Headerv2 />
    </div>
  );
}
