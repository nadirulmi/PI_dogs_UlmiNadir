import { GET_ALL_DOGS, DOG_DETAIL, CLEAN_DOGS } from "../actionsTypes/actionsTypes";
import axios from "axios"

export const getDogs = () => {
    return async (dispatch) => {
        try {
            const response = await axios('http://localhost:3001/dogs');
            const data = response.data;
            dispatch({ type: GET_ALL_DOGS, payload: data });
        } catch (error) {
            throw new Error(error.message);
        }
    };
}


export const getDogDetail = (id) =>{
    return async (dispatch) => {
        try {
            const response = await axios(`http://localhost:3001/dogs/${id}`);
            const data = response.data;
            dispatch({ type: DOG_DETAIL, payload: data });
        } catch (error) {
            throw new Error(error.message);
        }
    };
}

export const cleanDogs = () =>{
    return{type: CLEAN_DOGS}
}
