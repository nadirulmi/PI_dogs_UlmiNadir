import {
  GET_ALL_DOGS,
  DOG_DETAIL,
  CLEAN_DOGS,
  ORDER_DOGS,
  SEARCH_DOGS,
  GET_TEMPERAMENTS,
  ORDER_SOURCE,
  FILTER_TEMPERAMENTS,
  ORDER_WEIGHT,
} from "../actionsTypes/actionsTypes";

const initialState = {
  Alldogs: [],
  FilteredDogs: [],
  Alltemperaments: [],
  dogsDetail: {},
  order: "Ascendente",
  filter: "",
  filterTemp: false,
  allDogsFiltered: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        Alldogs: action.payload,
        FilteredDogs: action.payload, //copy
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
      let sortedDogs = [];
      if (state.filter !== "") {
        sortedDogs = [...state.FilteredDogs].sort((dog1, dog2) =>
          state.order === "Ascendente"
            ? dog2.name.localeCompare(dog1.name)
            : dog1.name.localeCompare(dog2.name)
        );
      }
      sortedDogs = [...state.Alldogs].sort((dog1, dog2) =>
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
      let filteredDogs = [];
      
        if (state.filterTemp) {
          filteredDogs = state.allDogsFiltered.filter((dog) => {
            if (source === "all") {
              return true;
            } else if (source === "api") {
              return !dog.created;
            } else if (source === "dbb") {
              return dog.created;
            }
          });

          return {
            ...state,
            Alldogs: filteredDogs,
            filter: "origin",
          };
        }
      

      filteredDogs = state.FilteredDogs.filter((dog) => {
        if (source === "all") {
          return true;
        } else if (source === "api") {
          return !dog.created;
        } else if (source === "dbb") {
          return dog.created;
        }
      });

      return {
        ...state,
        Alldogs: filteredDogs,
        filter: "origin",
        allDogsFiltered: filteredDogs,
      };
    }

    case SEARCH_DOGS:
      return {
        ...state,
        Alldogs: action.payload,
      };

    case FILTER_TEMPERAMENTS: {
      const selectedTemperament = action.payload;

      const filteredDogs = state.FilteredDogs.filter((dog) => {
        return dog.temperament && dog.temperament.includes(selectedTemperament);
      });

      return {
        ...state,
        Alldogs: filteredDogs,
        filter: "temp",
        filterTemp: true,
        allDogsFiltered: filteredDogs,
      };
    }

    case ORDER_WEIGHT: {
      let order = action.payload;
      let sortedDogsWeight;
      let newOrder =
        state.order === "Ascendente" ? "Descendente" : "Ascendente";

      if (state.filter !== "") {
        if (order === "minWeight") {
          sortedDogsWeight = [...state.FilteredDogs].sort((dog1, dog2) => {
            const weightA = parseInt(dog1.weight.split(" - ")[0]);
            const weightB = parseInt(dog2.weight.split(" - ")[0]);
            return weightA - weightB;
          });
        } else if (order === "maxWeight") {
          sortedDogsWeight = [...state.FilteredDogs].sort((dog1, dog2) => {
            const weightA = parseInt(dog1.weight.split(" - ")[1]);
            const weightB = parseInt(dog2.weight.split(" - ")[1]);
            return weightB - weightA;
          });
        }
      }
      if (order === "minWeight") {
        sortedDogsWeight = [...state.Alldogs].sort((dog1, dog2) => {
          const weightA = parseInt(dog1.weight.split(" - ")[0]);
          const weightB = parseInt(dog2.weight.split(" - ")[0]);
          return weightA - weightB;
        });
      } else if (order === "maxWeight") {
        sortedDogsWeight = [...state.Alldogs].sort((dog1, dog2) => {
          const weightA = parseInt(dog1.weight.split(" - ")[1]);
          const weightB = parseInt(dog2.weight.split(" - ")[1]);
          return weightB - weightA;
        });
      }

      return {
        ...state,
        Alldogs: sortedDogsWeight,
        order: newOrder,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
