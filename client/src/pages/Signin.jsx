import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { isUserLoggedAtom } from "../atom"
import { useSetRecoilState } from "recoil"
import { useAuth } from "../custom Hooks/useAuth"
import { config } from "../config/config"
export function Signin(){
    const navigate = useNavigate()
    useAuth("/","/signin")
    const [formData,setformData] = useState({
        email : "",
        password : ""
    })
    console.log(formData)

    function handler(e){
        const {name,value} = e.target
        setformData(prev=>({
            ...prev,
            [name] : value
        }))
    }
    function clickHandler(){
        axios({
            method : "post",
            url : config.backendHost + "/user/signin",
            data : formData
        }).then((res)=>{
            localStorage.setItem("token","Bearer " + res.data.token)
            navigate('/')
        }).catch((e)=>{
            console.log(e)
        })
    }
    return(
        <div className="mt-20 mx-auto shadow-md border-white-500 w-10/12 sm:w-7/12 md:w-5/12 lg:w-4/12 2xl:w-3/12 rounded-md">
        <div className="mt-5 text-center mb-6">
            <h1 className="font-bold text-3xl">Log In</h1>
            <p className="text-gray-500 w-2/3 mx-auto mt-3">Enter your credentials to access your account</p>
        </div>

        <div className="mx-auto w-10/12">
    
        <div className="mb-2">
            <p className="font-bold mb-2">Email</p>
            <input className="border rounded-md  w-full py-1 pl-2" onChange={handler} name="email" type="text" placeholder="JohnDoe@gmail.com"/>
        </div>
        <div className="mb-4">
            <p className="font-bold">Password</p>
            <input className="border rounded-md  w-full py-1 pl-2" onChange={handler} name="password" type="password" />
        </div>
        <div>
        <button onClick={clickHandler} className="border mb-3 text-white bg-black rounded-md  w-full py-1 pl-2">Signin</button>
        </div>
        
        </div>
    
    </div>
    )
}