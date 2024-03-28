import { BsSearch } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link,useNavigate,useLocation } from "react-router-dom";
import { isUserLoggedAtom, postAtom } from "./atom";
import { useRecoilState } from "recoil";
import { useAuth } from "./custom Hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

export function NavBar(){
    const navigate = useNavigate()
    const location = useLocation()
    const [user,setUser] = useRecoilState(isUserLoggedAtom)
    const [search,setSearch] = useState("")
    const [posts,setPosts] = useRecoilState(postAtom)


    function logoutHandler(){
        localStorage.removeItem("token")
        setUser(false)
        navigate("/register")
    }
    useEffect(()=>{
            axios({
                method : "get",
                url : "http://localhost:3000/auth",
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            })
            .then((res)=>{
                setUser(true)
            })
            .catch((e)=>{
                setUser(false)
            })
    },[location.pathname])

    useEffect(()=>{
        axios.get("http://localhost:3000/post/searchPost?filter="+search)
        .then((res)=>{
            setPosts(res.data.filteredPosts)
        })
    },[search])
    return(
        <div className="w-9/12 cursor-pointer items-center  mx-auto mt-5 flex  justify-between">
            <h1 onClick={()=>{
                navigate("/")
            }} className="font-bold sm:text-xl">Blog Market</h1>
            
             {(location.pathname=='/')?<div className="flex space-x-2 outline-none items-center">
              <BsSearch/> 
           <input type="text" onChange={(e)=>setSearch(e.target.value)} className="outline-none" placeholder="Search a post" />
            </div>:""}
            <div className>
                <div className="hidden md:flex items-center space-x-2">
                {!user && <Link to="/register"><h1>Register</h1></Link>}
                {!user && <Link to="/signin"><h1>Log in</h1></Link>}
                {user && <Link to="/create"><h1>Write</h1></Link>}
                {user && <Link to="/profile"><h1>Profile</h1></Link>}   
                {user && <h1 className="cursor-pointer" onClick={logoutHandler}>Logout</h1>}
                </div>
                
                <RxHamburgerMenu className="block md:hidden" />
            </div>
        </div>
    )
}