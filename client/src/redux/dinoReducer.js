
// Actions
export const actions = {
    FETCH_DINOS: 'fetching all dinosaurs',
    FETCH_DINOS_SUCCESS: 'finished fetching dinos',
    FAVOURITE_DINO: 'favouriting a dinosaur',
    UNFAVOURITE_DINO: 'remove favourite dinosaur'
};

// Reducer
const dinoReducer = (state, action) => {
    switch (action.type) {
        case actions.FETCH_DINOS: {
            return {
                ...state,
                loading: true,
            };
        }
        case actions.FETCH_DINOS_SUCCESS: {
            return {
                ...state,
                loading: false,                
            };
        }
        case actions.FAVOURITE_DINO: {
            return {
                ...state,
                favourites: [
                    ...state.favourites,
                    action.payload
                ],
                loading: false,                
            };
        }
        case actions.UNFAVOURITE_DINO: {
            const updatedDinos = state.favourites.filter(dinoId => dinoId !== action.payload);            
            return {
                ...state,
                favourites: updatedDinos,
                loading: false,                
            };
        }
        default:
            return state;
    }
};

export default dinoReducer;