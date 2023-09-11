import axios from "axios";
import {
  GET_GENRES,
  GET_PLATFORMS,
  GET_VIDEOGAMES,
  GET_VIDEOGAME,
  FILTER,
  ORDER,
} from "./types";

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/genres`);
      return dispatch({ type: GET_GENRES, payload: data });
    } catch (error) {
      console.error("Error al obtener los generos:", error);
    }
  };
};

export const getPlatforms = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/platforms`);
      return dispatch({ type: GET_PLATFORMS, payload: data });
    } catch (error) {
      console.error("Error al obtener las plataformas:", error);
    }
  };
};

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

export const getVideogamesByName = (query) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `http://localhost:3001/videogames/?name=${query}`
      );
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

export const filterGames = (genre) => {
  return {
    type: FILTER,
    payload: genre,
  };
};

export const orderGame = (order) => {
  return {
    type: ORDER,
    payload: order,
  };
};
