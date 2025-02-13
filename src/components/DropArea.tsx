import { ReactElement, useRef } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";

const ItemTypes = {
    CARD: 'card'
}

interface IDropAreaProps {
    id: string
    children?: ReactElement[]
}

const Board = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: gray;
`;

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
            {id}
            {children}
        </Board>
    )
}

export default DropArea;