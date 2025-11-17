import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- ICONOS SVG (usados en esta página) ---

// Icono de Grid (para el sidebar)
const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

// Icono de Gráfica (para el sidebar)
const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20V16"></path>
  </svg>
);

// Icono de Filtro (header)
const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

// Icono de Añadir (header)
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// Icono de Editar (tabla)
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-blue-600 transition-colors">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

// Icono de Borrar (tabla)
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-red-600 transition-colors">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

// Icono de Cámara (para el modal)
const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mb-2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

// Icono de Papelera Grande (para el modal de eliminar)
const ModalTrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

// --- DATOS MOCK INICIALES ---
const initialMockProducts = [
  {
    id: 1,
    name: "Proteína Whey Gold Standard",
    price: 499.90,
    category: "Proteico",
    dateAdded: "01-Nov, 2025",
    imageUrl: "https://placehold.co/150x150/EBF5EE/333?text=WHEY",
    description: "Proteína de suero de alta calidad con 24g por porción. Ideal para recuperación muscular post-entrenamiento."
  },
  {
    id: 2,
    name: "Creatina Monohidratada",
    price: 650.00,
    category: "Creatinas",
    dateAdded: "15-Oct, 2025",
    imageUrl: "https://placehold.co/150x150/EBF5EE/333?text=CREA",
    description: "Creatina micronizada pura para mejorar la fuerza y el rendimiento."
  },
  {
    id: 3,
    name: "Multivitamínico Pro",
    price: 320.50,
    category: "Vitaminas",
    dateAdded: "05-Oct, 2025",
    imageUrl: "https://placehold.co/150x150/EBF5EE/333?text=VITA",
    description: "Complejo vitamínico completo para soporte inmunológico y energía."
  },
  {
    id: 4,
    name: "Pre-Workout C4",
    price: 599.90,
    category: "Pre-entreno",
    dateAdded: "01-Sep, 2025",
    imageUrl: "https://placehold.co/150x150/EBF5EE/333?text=C4",
    description: "Fórmula energética explosiva para máxima concentración y bombeo."
  },
];

// --- COMPONENTES DE LA UI ---

const ProductAdminSidebar = () => (
  <nav className="fixed left-0 top-0 h-full w-20 bg-[#C8E6C9] z-20 flex flex-col items-center py-6 gap-4">
    <Link 
      to="/admin/analytics" 
      className="p-3 bg-transparent rounded-lg text-gray-700 hover:bg-white/50 transition"
    >
      <GridIcon />
    </Link>
    <Link 
      to="/admin/products" 
      className="p-3 bg-white rounded-lg text-gray-700 shadow-md"
    >
      <ChartBarIcon />
    </Link>
  </nav>
);

const ProductTable = ({ products, onEditClick, onDeleteClick }) => (
  <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-200 bg-gray-50">
          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre</th>
          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Precio</th>
          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {products.map((product) => (
          <tr key={product.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-3">
                <img 
                  className="w-10 h-10 rounded-md object-cover bg-gray-100" 
                  src={product.imageUrl} 
                  alt={product.name} 
                />
                <span className="font-medium text-gray-800">{product.name}</span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="text-gray-700">${product.price.toFixed(2)}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {product.category}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="text-gray-700">{product.dateAdded}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-4">
                <button 
                  aria-label="Editar" 
                  onClick={() => onEditClick(product)}
                  className="p-1 hover:bg-blue-50 rounded transition-colors"
                >
                  <EditIcon />
                </button>
                <button 
                  aria-label="Eliminar" 
                  onClick={() => onDeleteClick(product)}
                  className="p-1 hover:bg-red-50 rounded transition-colors"
                >
                  <TrashIcon />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- MODALES ---

const AddProductModal = ({ onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert('Por favor completa los campos obligatorios');
      return;
    }
    onAddProduct(formData);
    setFormData({ name: '', price: '', category: '', description: '' });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-6">
          <span className="text-3xl font-extrabold text-[#5CA982]">Befit.</span>
          <h2 className="text-2xl font-extrabold text-gray-800 mt-2">AGREGAR PRODUCTO</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nombre *</label>
              <input 
                type="text" 
                placeholder="Nombre del Producto..."
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D3A96]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Precio *</label>
              <input 
                type="number" 
                placeholder="Precio del Producto..."
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D3A96]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Categoría *</label>
              <select 
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D3A96]"
              >
                <option value="">Selecciona una categoría...</option>
                <option value="Proteico">Proteico</option>
                <option value="Vitaminas">Vitaminas</option>
                <option value="Creatinas">Creatinas</option>
                <option value="Aminoácidos">Aminoácidos</option>
                <option value="Pre-entreno">Pre-entreno</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Descripción</label>
              <textarea
                placeholder="Descripción del Producto..."
                rows="6"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D3A96] resize-none"
              ></textarea>
            </div>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-gray-700 mb-1">Imagen del Producto</label>
            <div className="w-full h-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-gray-50">
              <CameraIcon />
              <span className="font-semibold text-gray-600">Subir Foto</span>
              <input type="file" className="hidden" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button 
            onClick={onClose}
            className="bg-gray-500 text-white font-bold py-2 px-6 rounded-full hover:bg-gray-600 transition shadow-md"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-[#5CA982] text-white font-bold py-2 px-6 rounded-full hover:bg-[#4a8c6b] transition shadow-md"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

const EditProductModal = ({ product, onClose, onEditProduct }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description || ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert('Por favor completa los campos obligatorios');
      return;
    }
    onEditProduct({
      ...product,
      ...formData,
      price: parseFloat(formData.price) || 0
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-6">
          <span className="text-3xl font-extrabold text-[#5CA982]">Befit.</span>
          <h2 className="text-2xl font-extrabold text-gray-800 mt-2">EDITAR PRODUCTO</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nombre *</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D3A96]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Precio *</label>
              <input 
                type="number" 
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D3A96]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Categoría *</label>
              <select 
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D3A96]"
              >
                <option value="Proteico">Proteico</option>
                <option value="Vitaminas">Vitaminas</option>
                <option value="Creatinas">Creatinas</option>
                <option value="Aminoácidos">Aminoácidos</option>
                <option value="Pre-entreno">Pre-entreno</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows="6"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D3A96] resize-none"
              ></textarea>
            </div>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-gray-700 mb-1">Imagen Actual</label>
            <div className="w-full h-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 text-center">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-auto max-h-48 object-contain rounded-md mb-2"
              />
              <span className="font-semibold text-gray-600">Cambiar Imagen</span>
              <input type="file" className="hidden" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button 
            onClick={onClose}
            className="bg-gray-500 text-white font-bold py-2 px-6 rounded-full hover:bg-gray-600 transition shadow-md"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-[#D4B76A] text-white font-bold py-2 px-6 rounded-full hover:bg-[#c0a65e] transition shadow-md"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ product, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-[#FDFBF7] w-full max-w-md p-8 rounded-2xl shadow-xl text-center" onClick={(e) => e.stopPropagation()}>
        <div className="w-20 h-20 bg-[#E57373] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
          <ModalTrashIcon />
        </div>
        
        <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
          ¿Eliminar Producto?
        </h2>
        
        <p className="text-gray-600 text-sm mb-8">
          El producto "<span className="font-bold">{product.name}</span>" será borrado <span className="font-bold text-red-600">PERMANENTEMENTE</span>.
          <br/>
          ¿Está seguro?
        </p>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={onClose}
            className="bg-gray-500 text-white font-bold py-2 px-8 rounded-full hover:bg-gray-600 transition shadow-md"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="bg-[#D32F2F] text-white font-bold py-2 px-8 rounded-full hover:bg-[#B71C1C] transition shadow-md"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

export default function ManageProductsPage() {
  const [products, setProducts] = useState(initialMockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleAddProduct = (newProduct) => {
    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price) || 0,
      dateAdded: new Date().toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      imageUrl: `https://placehold.co/150x150/EBF5EE/333?text=${newProduct.name.substring(0, 4).toUpperCase()}`
    };
    setProducts(prevProducts => [productToAdd, ...prevProducts]);
    setIsModalOpen(false);
  };

  const handleEditProduct = (editedProduct) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === editedProduct.id ? editedProduct : p)
    );
    setIsEditModalOpen(false);
    setCurrentProduct(null);
  };

  const handleConfirmDelete = () => {
    if (currentProduct) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== currentProduct.id));
    }
    setIsDeleteModalOpen(false);
    setCurrentProduct(null);
  };

  // Estadísticas
  const totalProducts = products.length;
  const uniqueCategories = new Set(products.map(p => p.category)).size;
  const averagePrice = products.reduce((acc, p) => acc + p.price, 0) / products.length;

  return (
    <div className="flex bg-white min-h-screen">
      <ProductAdminSidebar />
      
      <main className="flex-1 ml-20 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Gestionar Productos
            </h1>
            <p className="text-gray-600 mt-2">
              Administra y organiza todos los productos de tu inventario
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition">
              <FilterIcon />
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#2D3A96] text-white font-bold py-2 px-4 rounded-full hover:bg-[#1e2a7a] transition shadow-md"
            >
              <PlusIcon />
              <span className="text-sm">Añadir Producto</span>
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-600 font-medium">Total Productos</p>
            <p className="text-2xl font-bold text-blue-800">{totalProducts}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-sm text-green-600 font-medium">Categorías</p>
            <p className="text-2xl font-bold text-green-800">{uniqueCategories}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <p className="text-sm text-purple-600 font-medium">Precio Promedio</p>
            <p className="text-2xl font-bold text-purple-800">${averagePrice.toFixed(2)}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
            <p className="text-sm text-orange-600 font-medium">Valor Total</p>
            <p className="text-2xl font-bold text-orange-800">
              ${products.reduce((acc, p) => acc + p.price, 0).toFixed(2)}
            </p>
          </div>
        </div>

        <ProductTable 
          products={products} 
          onEditClick={handleEditClick} 
          onDeleteClick={handleDeleteClick} 
        />
      </main>

      {/* Modales */}
      {isModalOpen && (
        <AddProductModal 
          onClose={() => setIsModalOpen(false)} 
          onAddProduct={handleAddProduct}
        />
      )}
      
      {isEditModalOpen && currentProduct && (
        <EditProductModal 
          product={currentProduct} 
          onClose={() => setIsEditModalOpen(false)} 
          onEditProduct={handleEditProduct}
        />
      )}

      {isDeleteModalOpen && currentProduct && (
        <DeleteConfirmationModal
          product={currentProduct}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}