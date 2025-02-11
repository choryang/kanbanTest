import { useRef } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";

const ItemTypes = {
    CARD: 'card'
}

const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: white;
`;

const DraggableCard = ({id, text}: any) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drag] = useDrag({
        type: ItemTypes.CARD,
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(ref);

    return <Card ref={ref}>{text}</Card>
}

export default DraggableCard;