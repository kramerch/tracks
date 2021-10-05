import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";
import { CommonActions } from '@react-navigation/native';

let navigator: NativeStackNavigationProp<ParamListBase>;

export const setNavigator = (nav: NativeStackNavigationProp<ParamListBase>) => {
    navigator = nav;
}

export const navigate = (routeName: string, params: object) => {
    navigator.dispatch(
        CommonActions.navigate({
            name: routeName,
            params
        })
    );
}

export type Route = 
    | { name: string }
    | { name: string, params: any }
    | { name: string, state: ResetState };

export type ResetState = {
    index?: number,
    routes: Route[]
};

export const reset = (state: ResetState) => {
    navigator.dispatch(
        CommonActions.reset(state)
    );
};

export const createResetState = (routes: string[], params?: any): ResetState =>  {
    let currentRoute: Route | undefined;
    for(let route in routes.slice().reverse()) {
        let childRoute = currentRoute;
        if(!childRoute)
            currentRoute = { name: route, params };
        else
            currentRoute = { name: route, state: { routes: [childRoute] } };
    }

    if(currentRoute)
        return { routes: [currentRoute] };
    else
        return { routes: [] };
}