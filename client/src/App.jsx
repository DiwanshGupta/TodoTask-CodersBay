import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/register'
import Login from './pages/login'
import Todo from './pages/todo'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/todo' element={<Todo/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
