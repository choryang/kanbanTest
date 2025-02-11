import DraggableCard from './components/Card'
import DropArea from './components/DropArea'

function App() {


  const handleDrop = () => {
    
  }

  return (
    <>
      <DropArea onDrop={handleDrop}>
         <DraggableCard id="1" text="Draggable Card 1" />
         <DraggableCard id="2" text="Draggable Card 2" />
      </DropArea>
    </>
  )
}

export default App
