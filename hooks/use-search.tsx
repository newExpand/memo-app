import { create } from "zustand";

type SearchStore = {
    isOpen: boolean;
    toggle: () => void;
    onOpen: () => void;
    onClose: () => void;
};

export const useSearch = create<SearchStore>((set) => ({
    isOpen: false,
    toggle: () => set((searchState) => ({ isOpen: !searchState.isOpen })),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
