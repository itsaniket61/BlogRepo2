import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth(path1,path2){
    const navigate = useNavigate()
    useEffect(()=>{
        axios({
            method : "get",
            url : "http://localhost:3000/auth",
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((res)=>{
            navigate(`${path1}`)
        })
        .catch((e)=>{
            navigate(`${path2}`)
        })
    },[])
    
}       