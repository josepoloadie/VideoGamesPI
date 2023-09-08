import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames } from "../../redux/actions/actions";

import Cards from "../../components/Cards/Cards";
import Navbar from "../../components/Navbar/Navbar";
import "./HomePage.css";

function Home() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);
  const filteredGames = useSelector((state) => state.filteredGames);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, []);

  return (
    <div className="home">
      <h2 className="home-title">Home Page</h2>
      <Navbar allGenres={allGenres} />
      {/* Renderizar las tarjetas de los juegos */}
      <Cards allGames={filteredGames} />
    </div>
  );
}

export default Home;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getGenres, getVideogames } from "../../redux/actions/actions";

// import Cards from "../../components/Cards/Cards";
// import Navbar from "../../components/Navbar/Navbar";
// import "./HomePage.css";

// function Home() {
//   const dispatch = useDispatch();
//   const allGenres = useSelector((state) => state.allGenres);
//   const filteredGames = useSelector((state) => state.filteredGames);

//   const gamesPerPage = 15;
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     dispatch(getGenres());
//     dispatch(getVideogames());
//   }, []);

//   // Calcular el índice de inicio y fin para los juegos de la página actual
//   const startIndex = (currentPage - 1) * gamesPerPage;
//   const endIndex = startIndex + gamesPerPage;
//   const gamesToShow = filteredGames.slice(startIndex, endIndex);

//   // Función para cambiar la página actual
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   return (
//     <div className="home">
//       <h2 className="home-title">Home Page</h2>
//       <Navbar allGenres={allGenres} />
//       {/* Renderizar las tarjetas de los juegos de la página actual */}
//       <Cards allGames={gamesToShow} />
//       {/* Renderizar los controles de paginación */}
//       <div className="pagination">
//         {Array.from({
//           length: Math.ceil(filteredGames.length / gamesPerPage),
//         }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handlePageChange(index + 1)}
//             className={currentPage === index + 1 ? "active" : ""}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;
