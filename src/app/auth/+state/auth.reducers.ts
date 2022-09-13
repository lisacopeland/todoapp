import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';
import { loginAction, logOutUserAction, setAuthErrorAction, setUserAction, signupUserAction, userSignedupAction } from './auth.actions';

export interface AuthState {
    email: string;
    authError: string;
    userLoggedIn: boolean;
}

const initialState: AuthState = {
    email: null,
    authError: null,
    userLoggedIn: false
};

export const AUTH_FEATURE_KEY = 'auth';

export const authReducer = createReducer(
    initialState,
    on(loginAction, (state, action) => {
        const newState = initialState;
        return newState;
    }),
    
    on(setUserAction, (state, action) => {
        const newState = { ...state, email: action.payload.email, userLoggedIn: true };
        return newState;
    }),
    on(setAuthErrorAction, (state, action) => {
        const newState = { ...state, authError: action.payload.error };
        return newState;
    }),
    on(signupUserAction, (state, action) => {
        const newState = initialState;
        return newState;
    }),
    on(userSignedupAction, (state, action) => {
        const newState = { ...state, email: action.payload.email, userLoggedIn: true };
        return newState;
    }),    
    on(logOutUserAction, (state, action) => {
        const newState = { ...state, email: null, userLoggedIn: false }
        return newState;
    })
);

export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectAll = createSelector(
    getAuthState,
    (state: AuthState) => state
);

export const selectUserLoggedIn = createSelector(selectAll, (state) => state.userLoggedIn
);

export const selectUserEmail = createSelector(selectAll, (state) => state.email
);

export const selectAuthError = createSelector(selectAll, (state) => state.authError
);
