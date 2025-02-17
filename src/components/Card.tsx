import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import {Card, CardHandle, CardHandleBox} from "../styles/Card";
import useItemStore from "../store/store";

const ItemTypes = {
    CARD: 'card'
}

interface IVisibility {
    value: "hidden" | "visible"
}

interface IDraggableCardProp {
    id: string,
    index: number,
    text: string,
    boardId: string
}

interface IGetDropResult {
    dropEffect: string,
    name: string
}


const DraggableCard = ({id, index, text, boardId}: IDraggableCardProp) => {
    const ref = useRef<HTMLDivElement>(null);
    const boards = useItemStore(state => state.boards);
    const updateList = useItemStore(state => state.updateList);
    const [cardHandleVisible, setCardHandleVisible] = useState<IVisibility>({value: "hidden"})

    const handleCardTextEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if(e.key === "Enter") {
            const list = [...boards[boardId]];
            list.splice(index, 1);
            list.splice(index, 0, e.currentTarget.innerText);
            updateList(boardId, list); 
        }
       
    }

    const handleCardTextBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        const list = [...boards[boardId]];
        list.splice(index, 1);
        list.splice(index, 0, e.currentTarget.innerText);
        updateList(boardId, list); 
    }

    const handleCardBoxHover = () => {
        setCardHandleVisible({value: "visible"});
    }

    const handleCardBoxOut = () => {
        setCardHandleVisible({value: "hidden"});
    }


    const [, drag] = useDrag({
        type: ItemTypes.CARD,
        item: { id, index, text },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
        end: (_, monitor) => {
            const result: IGetDropResult | null = monitor.getDropResult();
            if(result === null) return null;
        
            const oldBoardName = boardId;
            const oldIndex = index;
            const newBoardName = result.name;
            const newIndex = monitor.getItem().index;

            if(oldBoardName === newBoardName) {
                const list = [...boards[oldBoardName]];
                list.splice(oldIndex, 1);
                list.splice(newIndex, 0, boards[oldBoardName][oldIndex]);
                updateList(oldBoardName, list);   
            } else {
                const oldList = [...boards[oldBoardName]];
                const newList = [...boards[newBoardName]];
                oldList.splice(oldIndex, 1);
                newList.splice(newIndex, 0, boards[oldBoardName][oldIndex]);
                updateList(oldBoardName, oldList);
                updateList(newBoardName, newList);
            }
            
        }
    });

    const [, drop] = useDrop<
        IDraggableCardProp,
        void
      >({
            accept: ItemTypes.CARD,
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

                item.index = hoverIndex;
                
            },
            collect: (monitor) => ({
                isOver: monitor.isOver()
            })
        });

    

    drag(drop(ref));

    return (
        <Card ref={ref}  
            onMouseOver={handleCardBoxHover} 
            onMouseOut={handleCardBoxOut}>
            <span contentEditable onKeyDown={handleCardTextEnter} onBlur={handleCardTextBlur}>{text}</span>
            <CardHandleBox style={{visibility: `${cardHandleVisible.value}`}}>
                <CardHandle>삭제</CardHandle>
            </CardHandleBox>
        </Card>
    )
}

export default DraggableCard;