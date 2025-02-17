import DraggableCard from './components/Card'
import DropArea from './components/DropArea'
import useItemBaseStore from './store/store';
import { EmojiButton } from '@joeattardi/emoji-button';
import {Emoji, Title} from './styles/Emoji';
import { useEffect } from 'react';
import { BoardWrapper, Wrapper } from './styles/Wrapper';

function App() {

  const { boards } = useItemBaseStore();
  const picker = new EmojiButton({
    emojisPerRow: 12,
    position: "right-start"
  });

  useEffect(() => {

    picker.on('emoji', selection => {
      const emojiBtn = document.getElementById("emojiBtn");
      if(emojiBtn === null) return null;
      emojiBtn.innerHTML = selection.emoji;
    });

  },[])


  const emojiHandler = () => {
    const emojiBtn = document.getElementById("emojiBtn");
    if(emojiBtn === null) return null;
    picker.togglePicker(emojiBtn);
  }
 

  return (
    <Wrapper>
      <Emoji id='emojiBtn' onClick={emojiHandler}>😄</Emoji>
      <Title>Kanban Board</Title>
      <BoardWrapper>
      {Object.keys(boards).map((boardId) => {
       return  <DropArea id={boardId} key={boardId}>
          {boards[boardId].map((item, index) => {
              return <DraggableCard key={item} id={item} boardId={boardId} text={item} index={index}/>;
          })}
        </DropArea>
        })
      }
      </BoardWrapper>
    </Wrapper>
  )
}

export default App
