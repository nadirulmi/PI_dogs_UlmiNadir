import {
  GET_ALL_DOGS,
  DOG_DETAIL,
  CLEAN_DOGS,
  ORDER_DOGS,
  SEARCH_DOGS,
  GET_TEMPERAMENTS,
  ORDER_SOURCE,
  FILTER_TEMPERAMENTS,
} from "../actionsTypes/actionsTypes";

const initialState = {
  Alldogs: [],
  FilteredDogs: [],
  Alltemperaments: [],
  dogsDetail: {},
  order: "Ascendente",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        Alldogs: action.payload,
        FilteredDogs: action.payload, //copia 
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        Alltemperaments: action.payload,
      };

    case DOG_DETAIL:
      return {
        ...state,
        dogsDetail: action.payload,
      };

    case CLEAN_DOGS:
      return {
        ...state,
        dogsDetail: {},
      };

    case ORDER_DOGS:
      const sortedDogs = [...state.Alldogs].sort((dog1, dog2) =>
        state.order === "Ascendente"
          ? dog2.name.localeCompare(dog1.name)
          : dog1.name.localeCompare(dog2.name)
      );
      return {
        ...state,
        Alldogs: sortedDogs,
        order: state.order === "Ascendente" ? "Descendente" : "Ascendente",
      };

    case ORDER_SOURCE: {
      const source = action.payload;

      // Filtrar los perros según la fuente seleccionada
      const filteredDogs = state.FilteredDogs.filter((dog) => {
        if (source === "all") {
          return true;
        } else if (source === "api") {
          return !dog.created;
        } else if (source === "dbb") {
          return dog.created;
        }
      });

      console.log(filteredDogs);

      return {
        ...state,
        Alldogs: filteredDogs,
      };
    }
    case SEARCH_DOGS:
      return {
        ...state,
        Alldogs: action.payload,
      };

    case FILTER_TEMPERAMENTS: {
      const selectedTemperament = action.payload;
      const allDogs = state.FilteredDogs;

      const filteredDogs = allDogs.filter((dog) => {
        return dog.temperament && dog.temperament.includes(selectedTemperament);
      });

      return {
        ...state,
        Alldogs: filteredDogs,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
