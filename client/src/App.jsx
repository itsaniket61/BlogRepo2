import {BrowserRouter,Route,Routes} from "react-router-dom"
import { CreatePost } from './pages/CreatePost'
import { NavBar } from './Navbar'
import { Postdetails } from './pages/Postdetails'
import { Home } from './pages/Home'
import { Footer } from './Footer'
import { EditPost } from './pages/Edit'
import { Signup } from './pages/SignUp'
import { Signin } from './pages/Signin'
import { useState } from "react"
import { UserPostDetails } from "./pages/UserPostDetails"
import { HomeProfile } from "./pages/HomeProfile"


function App() {
  const[CommentsArray,setCommentsArray] = useState([])
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/create" element={<CreatePost/>} />
      <Route path="/edit/:id" element = {<EditPost/>}/>
      <Route path="/register" element = {<Signup/>}/>
      <Route path="/signin" element = {<Signin/>}/>
      <Route path="/profile" element ={<HomeProfile/>}/>
      <Route path="/postDetails/:id" element ={<Postdetails CommentsArray={CommentsArray} setCommentsArray={setCommentsArray}/>}/>
      <Route path="/userPostDetails/:id" element = {<UserPostDetails/>}/>
    </Routes>
    {/* <Footer/> */}
    </BrowserRouter>
  )
}

export default App
