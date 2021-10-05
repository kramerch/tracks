import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";

export interface TracksNavigationProp {
    navigation: NativeStackNavigationProp<ParamListBase>;
}

export interface TracksRouteProp<TParams> extends TracksNavigationProp {
    route: {
        params: TParams;
    }
}