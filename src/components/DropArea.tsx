import { useRef } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";

const ItemTypes = {
    CARD: 'card'
}

const Board = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: gray;
`;

const DropArea = ({ onDrop, children }: any) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item: any) => onDrop(item.id),
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