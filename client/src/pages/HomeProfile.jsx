import { useEffect, useState } from "react"
import { Profilepost } from "../ProfilePost"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../custom Hooks/useAuth"
import { Loader } from "../Loader/Loader"
import { config } from "../config/config"
export function HomeProfile(){
    useAuth("/profile","/register")
    const [userPosts,setUserPosts] = useState([])
    const navigate = useNavigate() 
    const[data,setdata] = useState([])
    const [formData,setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : ""
    })
    
    useEffect(()=>{
        axios({
            method : "get",
            url : config.backendHost + "/post/profilePosts",
            headers : {
                Authorization : localStorage.getItem("token")
            },
            
        })
        .then((res)=>{
            setUserPosts(res.data.allPosts)
            
        })
    },[])

    function clickHandler(){
        axios({
            method : "post",
            url : config.backendHost + "/user/update",
            headers : {
                Authorization : localStorage.getItem("token")
            },
            data : formData
        })
        .then((res)=>{
            console.log(res.data)
            navigate("/")
            
            
        })
    }
    function handler(e){
        const {name,value} = e.target
        setFormData(prev=>({
            ...prev,
            [name] : value
        })) 
    }
    if(userPosts.length==0){
        return <div className="text-center mt-[30vh]"><Loader/></div>
    }else{
    return(
        <div className="">
        <h1 className="w-9/12 text-xl font-semibold mt-10 mx-auto">Your Posts:</h1>
        <div className="flex">
            <div className="w-9/12 ">
            {userPosts.map((post)=>{
                return <Link to={`/userPostDetails/${post._id}`}><Profilepost post={post}/></Link>
            })}
            
            </div>
            <div className="flex px-10 flex-col">
            <h1 className="text-center font-semibold mt-3 text-xl mb-3">Profile</h1>
            <div className="flex  space-y-4 flex-col">
            <input type="text" onChange={handler} name="firstName" className="pr-5 outline-none pl-2" placeholder="Enter firstName" />
            <input type="text" onChange={handler} name="lastName" className="pr-5 outline-none pl-2" placeholder="Enter lastName" />
            <input type="text" onChange={handler} name="email" className="pl-2 outline-none" placeholder="Enter email" />
            <input type="text" onChange={handler} name="password" className="pl-2 outline-none" placeholder="Enter Password" />
            </div>
            <div className=" mt-3 flex justify-around">
            <button onClick={clickHandler} className="bg-black text-white px-3 py-1">Update</button>
            <button className="bg-black text-white px-3 py-1">Delete</button>
            </div>
        </div>
            
        
        </div>
        </div>
    )
        }
}