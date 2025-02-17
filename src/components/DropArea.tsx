import { ReactElement, useRef } from "react";
import { useDrop } from "react-dnd";
import {Board, BoardTitle, NewCardBtn} from "../styles/Board";
import useItemStore from "../store/store";

const ItemTypes = {
    CARD: 'card'
}

interface IDropAreaProps {
    id: string
    children?: ReactElement[]
}


const DropArea = ({ id, children }: IDropAreaProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const boards = useItemStore(state => state.boards);
    const updateList = useItemStore(state => state.updateList);

    const handleNewCard = () => {
        const list = [...boards[id]];
        list.push("새 아이템");
        updateList(id, list);
    }

    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: () => ({name: id}),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    drop(ref);

    return (
        <Board ref={ref}>
            <BoardTitle>{id}</BoardTitle>
            {children}
            <NewCardBtn onClick={handleNewCard}>+ 새 아이템</NewCardBtn>
        </Board>
    )
}

export default DropArea;