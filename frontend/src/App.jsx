
import { Suspense,lazy } from 'react'
import { Routes, Route, Link} from 'react-router-dom'
import Loading from './components/Loading'
import './App.css'


const Index = lazy(() => import('./pages/Index'))
const Login = lazy(() => import("./pages/Login"))
const Navbar = lazy(() => import('./components/Navigation'))
const Register = lazy(() => import("./pages/Register"))
const BookList = lazy(() => import("./components/BookList"))
const BookDetails = lazy(() => import("./pages/BookDetails"))
function App() {

  return (
    <>
      <Navbar/>
      <Suspense fallback={<Loading/>}>
      <Routes>

        <Route path="/" element={<Index/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/booklist" element={<BookList/>} />
        <Route path="/bookdetails" element={<BookDetails/>}/>
      </Routes>
      </Suspense>
    </>
  )
}

export default App
