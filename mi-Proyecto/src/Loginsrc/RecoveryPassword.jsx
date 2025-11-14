import React, { useState } from "react";
import { Link } from "react-router-dom";

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[#fcfbf2]">
      
      {/* Fondo Superior Verde */}
      <div className="absolute top-0 left-0 w-full h-[45vh] bg-[#70AA77] z-0"></div>

      {/* Contenido Principal */}
      <main className="flex-grow flex items-center justify-center z-10 px-4 mt-8">
        <div className="bg-white rounded-[30px] shadow-2xl w-full max-w-[500px] p-12 text-center relative">

          {/* Título */}
          <h2
            className="text-3xl font-bold text-black mb-10 uppercase tracking-wide"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            Cambiar Contraseña
          </h2>

          {/* Inputs */}
          <div className="space-y-8 mb-10 text-left">
            
            {/* Nueva contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-gray-800 mb-1 uppercase"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                Nueva contraseña
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-gray-400 text-gray-800 py-2 bg-transparent focus:outline-none focus:border-[#354a7d] transition-colors"
              />
            </div>

            {/* Repetir contraseña */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-bold text-gray-800 mb-1 uppercase"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                Repetir contraseña
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border-b border-gray-400 text-gray-800 py-2 bg-transparent focus:outline-none focus:border-[#354a7d] transition-colors"
              />
            </div>
          </div>

          {/* Botón Continuar */}
          <Link
            to="/"
            className="block w-full bg-[#354a7d] hover:bg-[#2c3e69] text-white font-bold py-4 rounded-2xl text-xl uppercase tracking-wider mb-8 transition-colors shadow-md"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            Continuar
          </Link>

          {/* Volver */}
          <Link
            to="/RecoverySelect"
            className="text-black font-bold uppercase tracking-wide hover:underline text-lg"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            Volver
          </Link>

        </div>
      </main>
    </div>
  );
};

export default ChangePasswordPage;
