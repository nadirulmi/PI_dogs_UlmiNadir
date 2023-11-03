import {
  GET_ALL_DOGS,
  DOG_DETAIL,
  CLEAN_DOGS,
  ORDER_DOGS,
  SEARCH_DOGS,
  GET_TEMPERAMENTS,
  ORDER_SOURCE,
  FILTER_TEMPERAMENTS,
  ORDER_WEIGHT
} from "../actionsTypes/actionsTypes";
import axios from "axios";

export const getDogs = () => {
  return async (dispatch) => {
    try {
      const response = await axios("http://localhost:3001/dogs");
      const data = response.data;
      dispatch({ type: GET_ALL_DOGS, payload: data });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const createDog = (combinedData) => {
  const endpoint = "http://localhost:3001/create";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, combinedData);
      if (response.status === 200) {
        // Puedes despachar una acción de éxito aquí si es necesario
        // dispatch(createDogSuccess(response.data));
        return response.data;
      }
    } catch (error) {
      // Puedes despachar una acción de error aquí si es necesario
      // dispatch(createDogError(error.message));
      throw Error(error.message);
    }
  };
};


export const getTemperaments = ()=>async(dispatch)=>{
  try {
      const {data} = await axios("http://localhost:3001/temperaments")
      
      dispatch({type: GET_TEMPERAMENTS, payload: data})
  } catch (error) {
      throw Error(error)
  }
};

export const searchDogs = (newName) => {
  return async (dispatch, getState) => {
    try {
      if (newName.trim() === "") {
        // Si el valor de búsqueda está vacío, puedes restaurar la lista original de perros
        const originalDogs = getState().Alldogs;
        return dispatch({
          type: SEARCH_DOGS,
          payload: originalDogs,
        });
      } else {
        // Realiza la búsqueda de perros en función de newName
        const response = await axios.get(
          `http://localhost:3001/dogs?name=${newName}`
        );
        if (response.status === 200) {
          const data = response.data;
          return dispatch({
            type: SEARCH_DOGS,
            payload: data,
          });
        } else {
          console.error(`Error al buscar perros: ${response.status}`);
          // Puedes manejar el error de otras maneras aquí si es necesario
        }
      }
    } catch (error) {
      console.error(error);
      // Puedes manejar el error de otras maneras aquí si es necesario
    }
  };
};

export const getDogDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios(`http://localhost:3001/dogs/${id}`);
      const data = response.data;
      dispatch({ type: DOG_DETAIL, payload: data });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const cleanDogs = () => {
  return { type: CLEAN_DOGS };
};

export const orderDogs = () => {
  return { type: ORDER_DOGS };
};

export const orderSource = (source) => {
  return { type: ORDER_SOURCE, payload: source };
}

export const temperamentFilter = (temperaments) => {
  return {
    type: FILTER_TEMPERAMENTS,
    payload: temperaments,
  };
};

export const orderWeight = (order) => {
  return { type: ORDER_WEIGHT, payload: order };
};