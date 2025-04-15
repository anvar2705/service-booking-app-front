import { createContext, type PropsWithChildren, useContext, useState } from "react";
import { type Draft } from "immer";
import { create, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

export const createZustandStore = <State,>(initialState: State) => {
    const createStore = () => {
        const storeInstance = create<State>()(
            immer(() => ({
                ...initialState,
            })),
        );

        const updateStore = (value: (state: Draft<Exclude<State, (...args: unknown[]) => unknown>>) => void) => {
            storeInstance.setState(value);
        };

        return {
            storeInstance,
            updateStore,
        };
    };

    const context = createContext(createStore());

    function useSelector<T>(selector: (state: State) => T): T {
        const { storeInstance } = useContext(context);
        if (!storeInstance) throw new Error("Missing context provider in the tree");
        return useStore(storeInstance, selector);
    }

    function useUpdate() {
        const { updateStore } = useContext(context);
        if (!updateStore) throw new Error("Missing context provider in the tree");
        return updateStore;
    }

    const Provider = ({ children }: PropsWithChildren) => {
        const [useStore] = useState(createStore);

        return <context.Provider value={useStore}>{children}</context.Provider>;
    };

    return {
        Provider,
        useSelector,
        useUpdate,
    };
};
