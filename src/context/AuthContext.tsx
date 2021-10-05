import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosResponse } from "axios";
import { createResetState, reset } from "../navigation.service";

export type AuthActionType =
    | { type: 'add_error', payload: string }
    | { type: 'signup', payload: string }

export type AuthState = {
    token: string | null;
    errorMessage: string;
};

export type AuthInfo = {
    email: string,
    password: string
};

export type AuthContextState = {
    state: AuthState;
    signUp: (authInfo: AuthInfo) => Promise<void>;
    signIn: (AuthInfo: AuthInfo) => Promise<void>;
}

type AuthDispatch = (action: AuthActionType) => void;
type AuthResponse = AxiosResponse<{ token: string }>;

const authReducer = (state: AuthState, action: AuthActionType) => {
    switch(action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signup':
            return { ...state, errorMessage: '', token: action.payload };
        default:
            return state;
    }
};

const signUp = (dispatch: AuthDispatch) => {
    return async ({ email, password }: AuthInfo) => {
        try {
            // const response = await trackerApi.post<AuthInfo, AuthResponse>('/signup', { email, password });
            // await AsyncStorage.setItem('token', response.data.token);
            // dispatch({ type: 'signup', payload: response.data.token });
            let token = 'somejwt';
            await AsyncStorage.setItem('token', token);
            dispatch({ type: 'signup', payload: token });
        } catch(err: any) {
            console.log(dispatch({ type: 'add_error', payload: 'Something went wrong with sign up.' }));
        }
    }
}

const signIn = (dispatch: AuthDispatch) => {
    return async ({ email, password }: AuthInfo) => {
        
    }
}

const signOut = (dispatch: AuthDispatch) => {
    return () => {

    }
}

export const { Provider, Context } = createDataContext<AuthContextState, AuthState>(
    authReducer,
    { signIn, signOut, signUp },
    { token: null, errorMessage: '' }
)