import { GET_VIDEOGAMES, GET_VIDEOGAME } from "../actions/types";
let initialState = { allGames: [], games: [] };

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allGames: payload,
      };

    case GET_VIDEOGAME:
      return {
        ...state,
        allGames: payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
