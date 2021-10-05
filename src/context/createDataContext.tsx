import React, { useReducer } from "react";

export default <TContext, TState>(
    reducer: (state: TState, action: any) => TState, 
    actions: any,
    defaultValue: TState) => 
{
    const Context = React.createContext(null as unknown as TContext);

    const Provider = ({ children }: { children: JSX.Element }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundActions: any = {};
        for(let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        )
    }

    return { Context, Provider };
}