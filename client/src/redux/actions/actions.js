import axios from "axios";
import { GET_VIDEOGAMES, GET_VIDEOGAME } from "./types";

// export function getVideogames() {
//   return async function (dispatch) {
//     const { data } = await axios(`http://localhost:3001/videogames`);
//     return dispatch({ type: GET_VIDEOGAMES, payload: data });
//   };
// }

export const getVideogames = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/videogames`);
      return dispatch({ type: GET_VIDEOGAMES, payload: data });
    } catch (error) {
      console.error("Error al obtener los juegos:", error);
    }
  };
};

export function getVideogame(id) {
  return async function (dispatch) {
    const { data } = await axios(`http://localhost:3001/videogames/${id}`);
    return dispatch({ type: GET_VIDEOGAME, payload: data });
  };
}
