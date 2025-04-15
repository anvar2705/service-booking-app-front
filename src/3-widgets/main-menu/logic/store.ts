import { create } from "zustand";

import { MainMenuStore } from "../types";

export const useStore = create<MainMenuStore>(() => ({
    collapsed: true,
}));

export const toggleMainMenuCollapsed = () => useStore.setState((state) => ({ collapsed: !state.collapsed }));
export const setMainMenuCollapsed = (value: boolean) => useStore.setState(() => ({ collapsed: value }));

export const useMainMenuCollapsed = () => useStore((state) => state.collapsed);
