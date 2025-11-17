import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
// ... (El resto de tus imports)
import { AnimatePresence } from 'framer-motion';
import Header from "./Componentes/Header";
import Footer from "./Componentes/Footer";
import CartSidebar from "./Componentes/CartSidebar"; 
import Tienda from "./Componentes/Tienda"; 
import Home from "./Home";
import ProductDetail from "./Products/detallesProductos";
import CartPage from "./Products/CartPage";
import CheckoutPage from "./Products/CheckoutPage";
import OrderHistoryPage from "./Users/OrderHistory";
import Analytic from "./Admin/Analytic";
import Crud from "./Admin/Crud";
import AboutUs from "./AboutUs";

// Login Components
import Login from "./Loginsrc/Login";
import Register from "./Loginsrc/Register";
import Setup from "./Loginsrc/SetupProfile";
import RSelect from "./Loginsrc/RecoverySelect";
import RCode from "./Loginsrc/RecoveryCode";
import RPassword from "./Loginsrc/RecoveryPassword";

// --- BASE DE DATOS CENTRALIZADA ---
const ALL_PRODUCTS = [
  { id: 1, title: "Whey Gold Standard", category: "proteinas", goal: "muscle", activity: "gym", description: "Proteína aislada", price: 1200, rating: 5, reviewCount: 320, hasBg: false },
  { id: 2, title: "Gatorade Polvo", category: "post-entreno", goal: "performance", activity: "team_sports", description: "Hidratación intensa", price: 200, rating: 4, reviewCount: 500, hasBg: true },
  { id: 3, title: "Multivitamínico Pro", category: "vitaminas", goal: "health", activity: "swimming", description: "Salud integral", price: 400, rating: 5, reviewCount: 120, hasBg: false },
  { id: 4, title: "Creatina Monohidratada", category: "creatinas", goal: "muscle", activity: "crossfit", description: "Fuerza explosiva", price: 600, rating: 5, reviewCount: 300, hasBg: false },
  { id: 5, title: "Pre-Workout C4", category: "pre-entreno", goal: "energy", activity: "gym", description: "Energía total", price: 550, rating: 4, reviewCount: 200, hasBg: false },
  { id: 6, title: "Isotónico Gel", category: "pre-entreno", goal: "performance", activity: "cycling", description: "Resistencia larga", price: 50, rating: 5, reviewCount: 80, hasBg: true },
  { id: 7, title: "Quemador Hydroxy", category: "quemadores", goal: "weight_loss", activity: "running", description: "Termogénico", price: 700, rating: 3, reviewCount: 90, hasBg: false },
  { id: 8, title: "BCAAs Recovery", category: "aminoacidos", goal: "recovery", activity: "gym", description: "Recuperación muscular", price: 500, rating: 4, reviewCount: 150, hasBg: false },
];

const MainLayout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- Lógica de la ubicación ---
  const location = useLocation();
  
  // Comprobamos si estamos en la página del carrito O en la de checkout
  const isCartOrCheckoutPage = location.pathname === '/CartPage' || location.pathname === '/CheckoutPage';

  // Creamos una función que SÓLO abre el carrito si NO estamos en esas páginas
  const handleCartClick = () => {
    if (!isCartOrCheckoutPage) {
      setIsCartOpen(true);
    }
  };
  
  // --- Lógica del carrito ---
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // --- Función para vaciar el carrito ---
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Header 
        cartItems={cartItems} 
        onCartClick={handleCartClick} 
        isCartDisabled={isCartOrCheckoutPage}
      />

      <CartSidebar
        isOpen={isCartOpen && !isCartOrCheckoutPage}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      {/* --- Contexto con 'clearCart' --- */}
      <Outlet context={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        setIsCartOpen, 
        allProducts: ALL_PRODUCTS,
        clearCart // <--- Función para vaciar el carrito
      }} />

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
        <Route path="/Analytic" element={<Analytic />} />
        <Route path="/Crud" element={<Crud />} />

        <Route element={<MainLayout />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Productos" element={<Tienda />} />
          
          <Route path="/:productName/:id" element={<ProductDetail />}/>
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/CheckoutPage" element={<CheckoutPage />} />
          <Route path="/OrderHistory" element={<OrderHistoryPage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}