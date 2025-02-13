import { ReactElement, useRef } from "react";
import { useDrop } from "react-dnd";
import {Board, BoardTitle} from "../styles/Board";

const ItemTypes = {
    CARD: 'card'
}

interface IDropAreaProps {
    id: string
    children?: ReactElement[]
}


const DropArea = ({ id, children }: IDropAreaProps) => {
    const ref = useRef<HTMLDivElement>(null);
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
        </Board>
    )
}

export default DropArea;