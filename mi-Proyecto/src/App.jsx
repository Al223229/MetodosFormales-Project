import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./Componentes/Header";
import Footer from "./Componentes/Footer";
import CartSidebar from "./Componentes/CartSidebar"; 
import Tienda from "./Componentes/Tienda"; 
import Home from "./Home";

// Login Components
import Login from "./Loginsrc/Login";
import Register from "./Loginsrc/Register";
import Setup from "./Loginsrc/SetupProfile";
import RSelect from "./Loginsrc/RecoverySelect";
import RCode from "./Loginsrc/RecoveryCode";
import RPassword from "./Loginsrc/RecoveryPassword";

const MainLayout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Función: Agregar al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); 
  };

  // Función: Eliminar del carrito
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Función: Actualizar cantidad
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <>
      <Header 
        cartItems={cartItems} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart} // CORREGIDO: Antes decía onRemoveItem
        onUpdateQuantity={updateQuantity}
      />

      <Outlet context={{ cartItems, addToCart, setIsCartOpen }} />

      <Footer />
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/RecoverySelect" element={<RSelect />} />
        <Route path="/RecoveryCode" element={<RCode />} />
        <Route path="/RecoveryPassword" element={<RPassword />} />
        <Route path="/SetupProfile" element={<Setup />} />

        <Route element={<MainLayout />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Productos" element={<Tienda />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}