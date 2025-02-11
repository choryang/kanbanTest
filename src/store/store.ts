import { create } from 'zustand';

interface UseItemBaseStore {
    toDos: string[];
    reOrder: (value: string[]) => void;
}

const useItemBaseStore = create<UseItemBaseStore>()((set, get) => ({
    toDos: ["a", "b", "c", "d", "e", "f"],
    reOrder: (value: string[]) => set({toDos: value})

}));

export default useItemBaseStore;