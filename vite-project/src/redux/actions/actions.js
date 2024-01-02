import Swal from 'sweetalert2';

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
  DELETE_DOG
} from "../actionsTypes/actionsTypes";
import axios from "axios";

export const getDogs = () => {
  return async (dispatch) => {
    try {
      const response = await axios("https://pidogsulminadir-production.up.railway.app/dogs");
      const data = response.data;
      dispatch({ type: GET_ALL_DOGS, payload: data });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const createDog = (combinedData) => {
  const endpoint = "/create";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, combinedData);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};


export const getTemperaments = ()=>async(dispatch)=>{
  try {
      const {data} = await axios("https://pidogsulminadir-production.up.railway.app/temperaments")
      
      dispatch({type: GET_TEMPERAMENTS, payload: data})
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchDogs = (newName) => {
  return async (dispatch, getState) => {
    try {
      if (newName.trim() === "") {
        const originalDogs = getState().Alldogs;
        return dispatch({
          type: SEARCH_DOGS,
          payload: originalDogs,
        });
      } else {
        const response = await axios.get(
          `https://pidogsulminadir-production.up.railway.app/dogs?name=${newName}`
        );
        if (response.status === 200) {
          const data = response.data;
          return dispatch({
            type: SEARCH_DOGS,
            payload: data,
          });
        } 
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonColor: '#D4A373', 
        cancelButtonColor: '#d33', 
        confirmButtonClass: 'no-border-button',
      });
      throw new Error(error.message);
      
    }
  };
};

export const getDogDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios(`https://pidogsulminadir-production.up.railway.app/dogs/${id}`);
      const data = response.data;
      dispatch({ type: DOG_DETAIL, payload: data });
    } catch (error) {
      alert(error.response.data.message)
      throw new Error(error.message);
    }
  };
};

export const deleteDog = (id) =>{
  return async (dispatch) =>{
    try {
      await axios.delete(`https://pidogsulminadir-production.up.railway.app/dogs/${id}`);
      return dispatch({
        type: DELETE_DOG,
        payload: id
      })
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

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

