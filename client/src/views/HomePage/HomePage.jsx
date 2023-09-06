// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getVideogames } from "../../redux/actions/actions";

// import Cards from "../../components/Cards/Cards";
// import Navbar from "../../components/Navbar/Navbar";
// import "./HomePage.css";

// function Home() {
//   const dispatch = useDispatch();
//   const allGames = useSelector((state) => state.allGames);

//   useEffect(() => {
//     dispatch(getVideogames());
//     // return () => {
//     //   clearDetail();
//     // };
//   }, [dispatch]);

//   return (
//     <div className="home">
//       <h2 className="home-title">Home Page</h2>
//       <Navbar />
//       <Cards allGames={allGames} />
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions/actions";

import Cards from "../../components/Cards/Cards";
import Navbar from "../../components/Navbar/Navbar";
import "./HomePage.css";

function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);

  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const [filteredGames, setFilteredGames] = useState([]); // Estado para almacenar los juegos filtrados

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  useEffect(() => {
    // Filtrar los juegos según el término de búsqueda
    const filtered = allGames.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGames(filtered);
    // Función de limpieza
    return () => {
      setFilteredGames([]); // Limpia el estado cuando el componente se desmonta o cuando las dependencias cambian
      se;
    };
  }, [allGames, searchTerm]);

  return (
    <div className="home">
      <h2 className="home-title">Home Page</h2>
      <Navbar setSearchTerm={setSearchTerm} />{" "}
      {/* Renderizar las tarjetas de los juegos */}
      {filteredGames.length > 0 ? <Cards allGames={filteredGames} /> : null}
    </div>
  );
}

export default Home;
