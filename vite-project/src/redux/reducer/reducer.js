import { GET_ALL_DOGS, DOG_DETAIL, CLEAN_DOGS} from "../actionsTypes/actionsTypes"

const initialState = {
    Alldogs: [],
    dogsDetail: {}
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_ALL_DOGS:
            return{
                ...state,
                Alldogs: action.payload
            }
        case DOG_DETAIL:
            return{
                ...state,
                dogsDetail: action.payload
            }
        case CLEAN_DOGS:
            return{
                ...state,
                dogsDetail: {}
            }
        default:
            return{...state}
    }
    
}

export default reducer