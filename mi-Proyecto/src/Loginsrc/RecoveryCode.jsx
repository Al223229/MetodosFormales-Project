import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const VerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Solo números
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Avanzar al siguiente input automáticamente
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Retroceder si se borra y está vacío
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[#fcfbf2]">

      {/* Fondo verde superior */}
      <div className="absolute top-0 left-0 w-full h-[45vh] bg-[#70AA77] z-0"></div>

      {/* Contenido */}
      <main className="flex-grow flex items-center justify-center z-10 px-4 mt-8">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10 text-center">

          <h2
            className="text-2xl md:text-3xl font-bold text-black mb-4 uppercase tracking-wide"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            Ingresa el código de verificación
          </h2>

          <p className="text-gray-600 mb-8 font-roboto text-sm md:text-base">
            Es el número de 6 dígitos que recibiste por correo.
          </p>

          {/* Inputs del código */}
          <div className="flex justify-center gap-3 mb-8">
            {code.map((digit, index) => (
              <React.Fragment key={index}>
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 md:w-14 md:h-16 border-2 border-gray-400 rounded-xl text-center text-2xl font-bold text-gray-700 
                  focus:outline-none focus:border-[#354a7d] focus:ring-2 focus:ring-[#354a7d]/20 transition-all"
                />
                {index === 2 && <div className="w-2"></div>}
              </React.Fragment>
            ))}
          </div>

          {/* Botón continuar */}
          <Link
            to="/RecoveryPassword"
            className="block w-full bg-[#354a7d] hover:bg-[#2c3e69] text-white font-bold py-3 rounded-xl text-lg uppercase tracking-wider mb-4 transition-colors shadow-md"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            Continuar
          </Link>

          {/* Botón reenviar */}
          <button
            className="w-full bg-[#a8c49a] hover:bg-[#95b386] text-white font-bold py-3 rounded-xl text-lg uppercase tracking-wider mb-6 transition-colors shadow-md"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            Reenviar Código
          </button>

          {/* Volver */}
          <Link
            to="/RecoverySelect"
            className="text-black font-bold uppercase tracking-wide hover:underline text-sm md:text-base"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            Volver
          </Link>
        </div>
      </main>
    </div>
  );
};

export default VerificationPage;
