import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import useItemBaseStore from "../store/store";

const ItemTypes = {
    CARD: 'card'
}

interface IDraggableCardProp {
    id: string,
    index: number,
    text: string
}

const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: white;
`;

const DraggableCard = ({id, index, text}: IDraggableCardProp) => {
    const ref = useRef<HTMLDivElement>(null);
    const {toDos, reOrder} = useItemBaseStore();
    const moveCard = (fromIndex: number, toIndex: number) => {
        let newToDos = [...toDos];
        newToDos.splice(fromIndex, 1);
        newToDos.splice(toIndex, 0, toDos[fromIndex]);
        reOrder(newToDos);
    }

    const [, drag] = useDrag({
        type: ItemTypes.CARD,
        item: { id, index, text },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });

    const [, drop] = useDrop<
        IDraggableCardProp,
        void
      >({
            accept: ItemTypes.CARD,
            drop: (item, monitor) => (
                console.log("drop", item, monitor.canDrop())
            ),
            hover: (item: IDraggableCardProp, monitor) => {
                if (!ref.current) {
                    return;
                }
                const dragIndex = item.index;
                const hoverIndex = index;

                if (dragIndex === hoverIndex) {
                    return;
                }

                const hoverBoundingRect = ref.current?.getBoundingClientRect(); //drop target의 위치, 크기 정보를 얻는다. 
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset(); //drag item의 현재 마우스 위치값
                const hoverClientY = clientOffset? clientOffset.y - hoverBoundingRect.top : hoverBoundingRect.top; //마우스 포인터의 요소 내 수직 위치

                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
                moveCard(dragIndex, hoverIndex);
                item.index = hoverIndex;
                console.log("hover", dragIndex, hoverIndex);
                
            },
            collect: (monitor) => ({
                isOver: monitor.isOver()
            })
        });

    

    drag(drop(ref));

    return <Card ref={ref}>{text}</Card>
}

export default DraggableCard;