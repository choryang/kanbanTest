import DraggableCard from './components/Card'
import DropArea from './components/DropArea'
import useItemBaseStore from './store/store';
import { EmojiButton } from '@joeattardi/emoji-button';
import {Emoji, Title} from './styles/Emoji';
import { useEffect } from 'react';

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
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", maxWidth: 960, marginTop: 50, marginLeft: "auto", marginRight: "auto"}}>
      <Emoji id='emojiBtn' onClick={emojiHandler}>😄</Emoji>
      <Title>Kanban Board</Title>
      <div style={{display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 20, marginTop: 30}}>
      {Object.keys(boards).map((boardId) => {
       return  <DropArea id={boardId} key={boardId}>
          {boards[boardId].map((item, index) => {
              return <DraggableCard key={item} id={item} boardId={boardId} text={item} index={index}/>;
          })}
        </DropArea>
        })
      }
      </div>
    </div>
  )
}

export default App
