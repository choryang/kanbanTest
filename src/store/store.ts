import { create } from 'zustand';

interface BoardState {
    boards: {[key: string]: string[]};
    updateList: (name: string, list: string[]) => void;
}

const useItemStore = create<BoardState>((set) => ({
    boards: {
        "To Do": ["a", "b"],
        "In Progress": ["c", "d", "e"],
        Done: ["f"]
    },
    updateList: (name, list) => set(state => ({boards: {...state.boards, [name]: list}}))
}));

export default useItemStore;