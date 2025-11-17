import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell
} from 'recharts';

// --- ICONOS SVG (usados en la página) ---

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20V16"></path>
  </svg>
);

const CurrencyDollarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8"></circle><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5h15a2.5 2.5 0 0 1 0 5H18"></path><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path><path d="M12 12v7"></path><path d="M8 19h8"></path>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// --- DATOS MOCK PARA LOS GRÁFICOS ---

const ventasMensualesData = [
  { name: 'Ene', '2022': 100, '2023': 120, '2024': 150, '2025': 180 },
  { name: 'Feb', '2022': 110, '2023': 130, '2024': 160, '2025': 190 },
  { name: 'Mar', '2022': 120, '2023': 140, '2024': 170, '2025': 220 },
  { name: 'Abr', '2022': 130, '2023': 150, '2024': 180, '2025': 240 },
  { name: 'May', '2022': 140, '2023': 160, '2024': 190, '2025': 250 },
  { name: 'Jun', '2022': 150, '2023': 170, '2024': 200, '2025': 270 },
];

const nuevosSubscriptoresData = [
  { name: 'Mi', value: 12 }, { name: 'Tu', value: 19 }, { name: 'We', value: 3 },
  { name: 'Th', value: 5 }, { name: 'Fr', value: 2 }, { name: 'Sa', value: 10 },
  { name: 'Su', value: 8 },
];

const categoriasTopData = [
  { name: 'Proteínas', value: 90, color: '#3b82f6' },
  { name: 'Pre-entreno', value: 75, color: '#2563eb' },
  { name: 'Post-entreno', value: 60, color: '#1d4ed8' },
  { name: 'Aminoácidos', value: 50, color: '#60a5fa' },
  { name: 'Quemadores', value: 45, color: '#93c5fd' },
  { name: 'Creatina', value: 40, color: '#bfdbfe' },
  { name: 'Suplementos', value: 30, color: '#dbeafe' },
  { name: 'Snacks', value: 20, color: '#eff6ff' },
];

const productosVendidosData = [
  { id: '01', name: 'Proteína Whey', popularity: 48, sales: '48%' },
  { id: '02', name: 'Proteína Whey Gold Standard', popularity: 57, sales: '57%' },
  { id: '03', name: 'Proteína Whey Gold Standard', popularity: 75, sales: '75%' },
  { id: '04', name: 'Proteína Whey Gold Standard', popularity: 29, sales: '29%' },
];

const subscriptoresActivosData = [
  { name: 'Ene', value: 1000 },
  { name: 'Feb', value: 1100 },
  { name: 'Mar', value: 1050 },
  { name: 'Abr', value: 1150 },
  { name: 'May', value: 1200 },
  { name: 'Jun', value: 1247 },
];

// --- COMPONENTES DE GRÁFICOS ---

const VentasMensualesChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={ventasMensualesData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
      <YAxis axisLine={false} tickLine={false} domain={[0, 800]} ticks={[0, 200, 400, 707]} />
      <Tooltip />
      <Legend verticalAlign="top" align="right" wrapperStyle={{ top: -10 }} />
      <Area type="monotone" dataKey="2022" stackId="1" stroke="#a7f3d0" fill="#a7f3d0" />
      <Area type="monotone" dataKey="2023" stackId="1" stroke="#6ee7b7" fill="#6ee7b7" />
      <Area type="monotone" dataKey="2024" stackId="1" stroke="#34d399" fill="#34d399" />
      <Area type="monotone" dataKey="2025" stackId="1" stroke="#fb923c" fill="#fb923c" />
    </AreaChart>
  </ResponsiveContainer>
);

const NuevosSubscriptoresChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={nuevosSubscriptoresData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
      <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} fontSize={12} />
      <YAxis hide />
      <Tooltip cursor={{ fill: 'transparent' }} />
      <Bar dataKey="value" fill="#fb923c" radius={[5, 5, 5, 5]} barSize={10} />
    </BarChart>
  </ResponsiveContainer>
);

const CategoriasTopChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={categoriasTopData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
      <XAxis type="number" hide />
      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} dx={-10} width={80} fontSize={12} />
      <Tooltip />
      <Bar dataKey="value" radius={[0, 5, 5, 0]}>
        {categoriasTopData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

const SubscriptoresActivosChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={subscriptoresActivosData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={3} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

// --- COMPONENTES DE LA UI ---

const AdminSidebar = () => (
  <nav className="fixed left-0 top-0 h-full w-16 bg-white shadow-lg z-20 flex flex-col items-center py-6">
    <button className="p-2 bg-[#F3F4F6] rounded-lg text-gray-700 hover:bg-gray-200 transition">
      <HomeIcon />
    </button>
    <button className="p-2 mt-4 rounded-lg text-gray-500 hover:bg-gray-200 transition">
      <ChartBarIcon />
    </button>
  </nav>
);

const AdminHeader = () => (
  <header className="bg-[#5CA982] h-16 flex justify-between items-center px-6 shadow-sm z-10">
    <span className="text-3xl font-extrabold text-white">Befit.</span>
    <button className="text-white p-2 rounded-full hover:bg-white/20 transition">
      <UserIcon />
    </button>
  </header>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-[#C8E6C9] p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className="p-3 bg-white/50 rounded-full text-[#5CA982]">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-extrabold text-gray-800">{value}</p>
    </div>
  </div>
);

const SmallStatCard = ({ title, subtitle }) => (
  <div className="text-center bg-gray-50 p-3 rounded-lg">
    <p className="text-xl font-extrabold text-[#5CA982]">{title}</p>
    <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
  </div>
);

const ProductosVendidosTable = () => (
  <table className="w-full text-left text-sm">
    <thead>
      <tr className="text-xs text-gray-500 border-b border-gray-200">
        <th className="py-2">#</th>
        <th className="py-2">Nombre</th>
        <th className="py-2">Popularidad</th>
        <th className="py-2">Ventas</th>
      </tr>
    </thead>
    <tbody>
      {productosVendidosData.map((item) => (
        <tr key={item.id} className="border-b border-gray-100">
          <td className="py-3 font-bold">{item.id}</td>
          <td className="py-3">{item.name}</td>
          <td className="py-3">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full" 
                style={{ width: `${item.popularity}%` }}
              ></div>
            </div>
          </td>
          <td className="py-3 font-medium">{item.sales}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---

export default function AnalyticsDashboard() {
  const mainStats = [
    {
      title: "Suscriptores activos",
      value: "1,247",
      icon: <UserGroupIcon />,
    },
    {
      title: "Ventas",
      value: "3,699",
      icon: <ChartBarIcon />,
    },
    {
      title: "Ingresos",
      value: "1,287,450",
      icon: <CurrencyDollarIcon />,
    },
    {
      title: "Producto top",
      value: "Proteína Whey",
      icon: <TrophyIcon />,
    },
  ];

  return (
    <div className="flex bg-[#F3F4F6] min-h-screen">
      {/* Sidebar de Admin (la barra oscura de la izquierda) */}
      <AdminSidebar />
      
      {/* Contenedor Principal (Header + Contenido) */}
      <div className="flex-1 ml-16"> {/* ml-16 para compensar el sidebar */}
        
        {/* Header de Admin (Befit) */}
        <AdminHeader />
        
        {/* Contenido Principal del Dashboard */}
        <main className="p-6">
          
          {/* Título */}
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Panel de control</h1>

          {/* Grid Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Tarjetas de Estadísticas Principales */}
            {mainStats.map((stat, index) => (
              <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
            ))}

            {/* Resumen de hoy (ocupa 2 columnas) */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen de hoy</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SmallStatCard title="$5k MXN" subtitle="Ingresos de hoy" />
                <SmallStatCard title="500" subtitle="Ventas totales" />
                <SmallStatCard title="9" subtitle="Productos nuevos" />
                <SmallStatCard title="12" subtitle="Órdenes" />
              </div>
            </div>

            {/* Gráfico de Ventas Mensuales */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Ventas mensuales</h2>
              <div className="h-64">
                <VentasMensualesChart />
              </div>
            </div>

            {/* Nueva Sección: Gráficos adicionales */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Nuevos subscriptores</h2>
              <div className="h-64">
                <NuevosSubscriptoresChart />
              </div>
            </div>

            {/* Categorías Top */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Categorías top</h2>
              <div className="h-64">
                <CategoriasTopChart />
              </div>
            </div>

            {/* Subscriptores Activos */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Subscriptores activos</h2>
              <div className="h-64">
                <SubscriptoresActivosChart />
              </div>
            </div>

            {/* Tabla de Productos Vendidos */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Productos más vendidos</h2>
              <ProductosVendidosTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}