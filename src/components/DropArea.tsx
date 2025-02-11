import { ReactElement, useRef } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";

const ItemTypes = {
    CARD: 'card'
}

interface IDropAreaProps {
    toDos: string[],
    children: ReactElement[]
}

interface IDraggableCardProp {
    id: string,
    index: number,
    text: string
}

const Board = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: gray;
`;

const DropArea = ({ toDos, children }: IDropAreaProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop<
    IDraggableCardProp,
    void
  >({
        accept: ItemTypes.CARD,
        drop: (item, monitor) => (
            console.log("drop", item, monitor.canDrop())
        ),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    drop(ref);

    return (
        <Board ref={ref}>
            Drop here
            {children}
        </Board>
    )
}

export default DropArea;