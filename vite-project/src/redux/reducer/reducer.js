import { GET_ALL_DOGS, DOG_DETAIL, CLEAN_DOGS, ORDER_DOGS, SEARCH_DOGS, GET_TEMPERAMENTS } from "../actionsTypes/actionsTypes"

const initialState = {
    Alldogs: [],
    Alltemperaments: [],
    dogsDetail: {},
    order: "Ascendente" // Agregamos el estado de orden
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                Alldogs: action.payload
            }
        case GET_TEMPERAMENTS:
            return{
                ...state,
                Alltemperaments: action.payload
            }
        case DOG_DETAIL:
            return {
                ...state,
                dogsDetail: action.payload
            }
        case CLEAN_DOGS:
            return {
                ...state,
                dogsDetail: {}
            }
        case ORDER_DOGS:
            const sortedDogs = [...state.Alldogs].sort((dog1, dog2) =>
                state.order === "Ascendente"
                    ? dog2.name.localeCompare(dog1.name) // A-Z
                    : dog1.name.localeCompare(dog2.name) // Z-A
            );
            return {
                ...state,
                Alldogs: sortedDogs,
                order: state.order === "Ascendente" ? "Descendente" : "Ascendente", // Alterna el estado de orden
            };
        case SEARCH_DOGS:
            return {
                ...state,
                Alldogs: action.payload,
            }
        default:
            return { ...state }
    }
}

export default reducer
