import { useState } from 'react';
import DraggableCard from './components/Card'
import DropArea from './components/DropArea'
import useItemBaseStore from './store/store';

function App() {

  const {toDos} = useItemBaseStore();

  return (
    <>
      <DropArea toDos={toDos}>
        {toDos.map((toDo, index) => {
            return <DraggableCard id={toDo} text={toDo} index={index}/>;
        })}
      </DropArea>
    </>
  )
}

export default App
