import { useContext } from 'react';

// Actions and redux
import { actions } from '../redux/dinoReducer';
import { StoreContext, createAction } from '../redux/reducers';

// Services 
import ApiService from './api.service';

// custom useAuth Hook -------------------------------------------------------------------
export const useDinos = () => {
    const [state, dispatch] = useContext(StoreContext);

    const addFavouriteDino = id => {
        dispatch(createAction(actions.FAVOURITE_DINO, id));
    };

    const removeFavouriteDino = id => {
        dispatch(createAction(actions.UNFAVOURITE_DINO, id));
    };

    const loadDinos = async (searchTerm = null) => {
        const apiUrl = !searchTerm ? '/dinos' : `/dinos/search/${searchTerm}`
        let response = null;

        dispatch(createAction(actions.FETCH_DINOS, null));      
        
        const dinoResponse = await ApiService
            .get(apiUrl)
            .catch(err => {
                console.log('error finding dinosaurs', err);
                response = {
                    error: true
                };

                return response;
            });

        if(dinoResponse && dinoResponse.error) {
            return dinoResponse;
        }

        dispatch(createAction(actions.FETCH_DINOS_SUCCESS, null)); 
        
        return dinoResponse.data.data;
    };

    const loadSingleDino = async (id) => {        
        let response = null;

        dispatch(createAction(actions.FETCH_DINOS, null));      
        
        const dinoResponse = await ApiService
            .get(`/dinos/${id}`)
            .catch(err => {
                console.log('error finding a single dinosaurs', err);
                response = {
                    error: true
                };

                return response;
            });

        if(dinoResponse && dinoResponse.error) {
            return dinoResponse;
        }

        dispatch(createAction(actions.FETCH_DINOS_SUCCESS, null)); 
        
        return dinoResponse.data;
    };

    return {        
        isLoading: state.dinos.loading,
        favouriteDinoIds: state.dinos.favourites,
        addFavouriteDino,
        removeFavouriteDino,
        loadDinos,
        loadSingleDino,        
    };
};