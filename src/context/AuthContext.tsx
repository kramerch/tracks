import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

export type AuthActionType =
    | { type: 'add_error', payload: string }

export type AuthState = {
    isSignedIn: boolean;
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

const authReducer = (state: AuthState, action: AuthActionType) => {
    switch(action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

const signUp = (dispatch: AuthDispatch) => {
    return async ({ email, password }: AuthInfo) => {
        try {
            const response = await trackerApi.post('/signup', { email, password });
            console.log(response.data);
        } catch(err: any) {
            console.log(dispatch({ type: 'add_error', payload: 'Something went wrong with sign up.' }));
        }
    }
}

const signIn = (dispatch: AuthDispatch) => {
    return ({ email, password }: AuthInfo) => {
        
    }
}

const signOut = (dispatch: AuthDispatch) => {
    return () => {

    }
}

export const { Provider, Context } = createDataContext<AuthContextState, AuthState>(
    authReducer,
    { signIn, signOut, signUp },
    { isSignedIn: false, errorMessage: '' }
)