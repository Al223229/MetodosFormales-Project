import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Icono de Lupa para la búsqueda
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default function OrderHistoryPage() {
  // Datos Mock para simular los pedidos de la imagen
  const orders = [
    {
      id: "234-5F5F-OJF56F-0055-101",
      total: 543.00,
      date: "12 Octubre 2025",
      status: "ENTREGADO",
      type: "Común",
      products: ["Proteína Whey Gold Standard"],
      canReview: true
    },
    {
      id: "234-5F5F-OJF96F-2039-101",
      total: 2577.20,
      date: "12 Octubre 2025",
      status: "ENTREGADO",
      type: "Suscripción",
      products: ["Proteína Whey Gold Standard", "Proteína Whey Gold Standard", "Proteína Whey Gold Standard"],
      canReview: true
    },
    {
      id: "234-5F5F-OJF94F-0055-101",
      total: 543.00,
      date: "12 Octubre 2025",
      status: "ENTREGADO",
      type: "Común",
      products: ["Proteína Whey Gold Standard"],
      canReview: true
    },
    {
      id: "234-5F5F-OJF94F-0055-102",
      total: 543.00,
      date: "12 Octubre 2025",
      status: "ENTREGADO",
      type: "Común",
      products: ["Proteína Whey Gold Standard"],
      canReview: true
    },
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 px-4 font-sans text-[#1e1e1e]">
      <div className="max-w-7xl mx-auto">
        
        {/* Layout Principal: Grid de 2 columnas (3/4 para lista, 1/4 para filtros) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* --- COLUMNA IZQUIERDA: BÚSQUEDA Y LISTA --- */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Barra de Búsqueda Superior */}
            <div className="bg-gray-200 rounded-full px-4 py-2 flex items-center shadow-inner max-w-md mb-8 border border-gray-300">
              <input 
                type="text" 
                placeholder="Buscar pedido..." 
                className="bg-transparent border-none focus:outline-none flex-1 text-gray-700 placeholder-gray-500"
              />
              <button className="hover:bg-gray-300 p-1 rounded-full transition">
                <SearchIcon />
              </button>
            </div>

            {/* Lista de Tarjetas de Pedidos */}
            <div className="space-y-6">
              {orders.map((order, index) => (
                <div key={index} className="bg-[#E5E7EB] rounded-xl overflow-hidden shadow-sm border border-gray-300">
                  
                  {/* Header de la Tarjeta (Gris más oscuro) */}
                  <div className="bg-[#D1D5DB] px-6 py-3 flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-600 uppercase">ID PEDIDO</p>
                      <p className="text-xs font-mono text-gray-800">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-600 uppercase">TOTAL</p>
                      <p className="text-sm font-bold text-gray-800">${order.total.toFixed(2)}</p>
                    </div>
                    <button className="bg-[#2D3A96] hover:bg-[#1e2a7a] text-white text-xs font-bold py-2 px-6 rounded-full transition shadow-md">
                      VER DETALLES
                    </button>
                  </div>

                  {/* Cuerpo de la Tarjeta */}
                  <div className="p-6 flex flex-col sm:flex-row gap-6 items-start relative">
                    
                    {/* Placeholder de Imagen (Cuadrado Verde) */}
                    <div className="w-24 h-24 bg-[#A8C69F] rounded-xl flex-shrink-0 shadow-inner"></div>

                    {/* Detalles del Pedido */}
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-sm text-gray-800">
                            ENTREGADO: <span className="font-normal">{order.date}</span>
                          </p>
                          <p className="text-xs text-gray-500 mb-3">Entregado sin complicaciones</p>
                          
                          <ul className="list-disc list-inside text-sm text-gray-800 font-medium space-y-1">
                            {order.products.map((prod, idx) => (
                              <li key={idx}>{prod}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Botón Escribir Opinión */}
                        <button className="bg-[#A8C69F] hover:bg-[#94b38b] text-white text-xs font-bold py-2 px-4 rounded-md transition shadow-sm mt-2 sm:mt-0">
                          ESCRIBIR OPINIÓN
                        </button>
                      </div>
                    </div>

                    {/* Etiqueta Tipo de Compra (Esquina inferior derecha) */}
                    <div className="absolute bottom-4 right-6 text-xs">
                      <span className="text-gray-500">Compra </span>
                      <span className={`font-bold ${order.type === 'Suscripción' ? 'text-[#5CA982]' : 'text-[#5CA982]'}`}>
                        {order.type}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- COLUMNA DERECHA: SIDEBAR DE FILTROS --- */}
          <div className="lg:col-span-1 lg:self-start">
            <div className="bg-[#E5E7EB] p-6 rounded-lg border border-gray-300 sticky top-24">
              <h3 className="font-extrabold text-gray-800 mb-4">Filtros de Búsqueda</h3>
              
              {/* Divisor Punteado */}
              <div className="border-t-2 border-dashed border-gray-400 my-4"></div>

              {/* Filtro Periodo */}
              <div className="mb-6">
                <label className="block font-bold text-gray-700 mb-2 text-sm">Periodo</label>
                <p className="text-xs text-gray-500 mb-2">Meses</p>
                <select className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#2D3A96]">
                  <option>Selection</option>
                  <option>Últimos 30 días</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>
              </div>

              {/* Divisor Punteado */}
              <div className="border-t-2 border-dashed border-gray-400 my-4"></div>

              {/* Filtro Compra */}
              <div className="mb-6">
                <label className="block font-bold text-gray-700 mb-3 text-sm">Compra...</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="accent-[#5CA982] w-4 h-4 rounded" defaultChecked />
                    <span className="text-sm text-gray-600">Común</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="accent-[#5CA982] w-4 h-4 rounded" defaultChecked />
                    <span className="text-sm text-gray-600">Suscripción</span>
                  </label>
                </div>
              </div>

              {/* Divisor Punteado */}
              <div className="border-t-2 border-dashed border-gray-400 my-4"></div>

              {/* Filtro Rango de Precio */}
              <div>
                <label className="block font-bold text-gray-700 mb-2 text-sm">Rango de Precio</label>
                {/* Slider Simulado (Visual) */}
                <div className="relative h-2 bg-[#A8C69F] rounded-full mt-4">
                  <div className="absolute left-0 top-0 h-full w-1/2 bg-[#5CA982] rounded-l-full"></div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-6 bg-white border border-gray-300 rounded shadow cursor-pointer"></div>
                </div>
              </div>
              
              {/* Divisor Punteado Final */}
              <div className="border-t-2 border-dashed border-gray-400 mt-8"></div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}