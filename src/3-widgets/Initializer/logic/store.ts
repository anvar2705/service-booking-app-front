import { create } from "zustand";

export const useStore = create<{ isInitialized: boolean }>(() => ({
    isInitialized: false,
}));

export const setInitiaized = () => useStore.setState(() => ({ isInitialized: true }));
