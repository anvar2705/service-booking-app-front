import { create } from "zustand";

export const useStore = create<{ loading: boolean }>(() => ({
    loading: false,
}));

export const setMainLoading = (value: boolean) => useStore.setState(() => ({ loading: value }));
