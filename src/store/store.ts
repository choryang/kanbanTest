import { create } from 'zustand';

interface BoardState {
    boards: {[key: string]: string[]};
    updateList: (name: string, list: string[]) => void;
}

const useItemStore = create<BoardState>((set) => ({
    boards: {
        "To Do": ["밥 먹기"],
        "In Progress": ["사이드 프로젝트"],
        Done: ["샤워"]
    },
    updateList: (name, list) => set(state => ({boards: {...state.boards, [name]: list}}))
}));

export default useItemStore;