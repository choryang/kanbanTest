import DraggableCard from './components/Card'
import DropArea from './components/DropArea'
import useItemBaseStore from './store/store';

function App() {

  const { boards } = useItemBaseStore();

  return (
    <>
      {Object.keys(boards).map((boardId) => {
       return  <DropArea id={boardId} key={boardId}>
          {boards[boardId].map((item, index) => {
              return <DraggableCard key={item} id={item} boardId={boardId} text={item} index={index}/>;
          })}
        </DropArea>
        })
      }
    </>
  )
}

export default App
