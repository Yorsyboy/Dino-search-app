import React, { useReducer, useMemo, createContext } from 'react';

// Data
import initialState from './initialState';

// Reducers
import auth from './authReducer';
import dinos from './dinoReducer';

const combineReducers = reducers => {
    return (state = {}, action) => {
        const newState = {};
        for(let key in reducers) {
            newState[key] = reducers[key](state[key], action);
        }
        return newState;
    };
};

const rootReducer = combineReducers({
    auth,
    dinos
});

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const store = useMemo(() => [state, dispatch], [state]);
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

// Helper
export const createAction = (type, payload) => ({
    type, payload
});