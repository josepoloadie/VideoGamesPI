import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME,
  GET_VIDEOGAMEBYNAME,
  FILTER,
  GET_GENRES,
  GET_PLATFORMS,
  ORDER,
} from "../actions/types";

let initialState = {
  allGames: [],
  allGenres: [],
  filteredGames: [],
  allPlatforms: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_GENRES:
      return {
        ...state,
        allGenres: payload,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        allPlatforms: payload,
      };

    case GET_VIDEOGAMES:
      return {
        ...state,
        allGames: payload,
        filteredGames: payload,
      };

    case GET_VIDEOGAME:
      return {
        ...state,
        filteredGames: payload,
      };

    case GET_VIDEOGAMEBYNAME:
      return {
        ...state,
        filteredGames: payload,
      };

    case FILTER:
      let filteredGames = [...state.allGames];
      let filter;
      if (payload === "API" || payload === "BD") {
        filter = filteredGames.filter((juego) => juego.origin === payload);
      } else if (payload === "SinFiltrar") {
        return {
          ...state,
          filteredGames: [...state.allGames],
        };
      } else {
        filter = filteredGames.filter((juego) =>
          juego.genres.includes(payload)
        );
      }
      return {
        ...state,
        filteredGames: filter,
      };

    case ORDER:
      let orderedGames = [...state.filteredGames];
      let ordered;
      if (payload === "A") {
        ordered = orderedGames.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        ordered = orderedGames.sort((a, b) => b.name.localeCompare(a.name));
      }

      return {
        ...state,
        filteredGames: ordered,
      };

    default:
      return state;
  }
}

export default rootReducer;
