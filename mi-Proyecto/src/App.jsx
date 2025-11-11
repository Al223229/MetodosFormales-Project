import './index.css';
import logo from './assets/Befitwhite.png';
import drop_down from './assets/arrow_drop_down.png';

const categoryItems = [
  { id: 1, name: "Proteinas" },
  { id: 2, name: "Vitaminas" },
  { id: 3, name: "Creatinas" },
  { id: 4, name: "Aminoacidos" }
];

function SearchBar() {
  return (
    <div className="absolute top-[15px] left-[405px] w-[500px] h-[50px] bg-white rounded-[60px] border border-black flex items-center px-6">
      <input
        id="search-input"
        type="search"
        placeholder="Search"
        className="w-full font-light text-[#4f4f4f] text-2xl bg-transparent outline-none"
      />
    </div>
  );
}

function Header() {
  return (
    <header className="Header">
      {/* Logo */}
      <img
        src={logo}
        alt="Logo Befit"
        className="logo"
      />

      {/* Botón Productos */}
      <div className="absolute top-[25px] left-[230px]">
        <button
          type="button"
          className="flex items-center gap-2 w-full"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="font-semibold text-[#fffcf2] text-lg whitespace-nowrap">
            Productos
          </span>
          {drop_down && (
            <img
              className="w-[32px] h-[32px]"
              alt="dropdown arrow"
              src={drop_down}
            />
          )}
        </button>
      </div>

      {/* Barra de búsqueda */}
      <SearchBar />
    </header>
  );
}

export default function App() {
  return (
    <div>
      <Header />
    </div>
  );
}
