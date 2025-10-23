
import './App.css'
import TodoItems from './components/TodoItems';
import Headings from './components/Headings';
import AddTodo from './components/AddTodo';


import {TodoItemsProvider} from './store/TodoItemsProvider';
import LoadItems from './components/LoadItems';


function App() {
 
  return (

    <TodoItemsProvider>
      
   <Headings />
   <AddTodo />
   <LoadItems />
  <TodoItems />

    </TodoItemsProvider>
   
  )
}

export default App
