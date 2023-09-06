import { useState } from "react";

import "./Navbar.css";

function Navbar({ setSearchTerm }) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSearchTerm(value); // Actualiza el término de búsqueda en el componente padre
  };

  return (
    <div className="search-box">
      <form>
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button>Buscar</button>
      </form>
    </div>
  );
}

export default Navbar;
