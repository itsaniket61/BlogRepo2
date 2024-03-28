import axios from "axios";
import { useState,useEffect} from "react"
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../custom Hooks/useAuth";

export function EditPost(){
    const[formData,setFormData] = useState({
        title : "",
        description : ""
    })

    console.log(formData)

    const {id} = useParams()
    const navigate = useNavigate()
    const[cat,setCat] = useState("")
    const[cats,setCats] = useState([])
    const[image,setImage] = useState("")
    console.log(image)
    useAuth(`/edit/${id}`,"/register")

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            category: cats
        }));
    }, [cats]);

    useEffect(()=>{
        setFormData(prev=>({
            ...prev,
            image : image
        }))
    },[image])
    
    function clickHandler(){
        setCats(prev=>[...prev,cat])
        setCat("")
    }

    function removeHandler(id){
        let newArray = cats.filter((val,idx)=>{
            return idx != id
        })
        setCats(newArray)
    }
    
  
    console.log(formData)
    console.log(cats)

    const formHandler=(e)=>{
        const {name,value} = e.target
        setFormData(prev=>({
            ...prev,
            [name] : value
        }))
    }
    function editHandler(){
        const sendData = new FormData()
        sendData.append("title",formData.title)
        sendData.append("image",formData.image)
        sendData.append("description",formData.description)
        sendData.append("category",formData.category)
       axios({
        method : "put",
        url : `http://localhost:3000/post/updatePost/${id}`,
        data : sendData
       })
       .then((res)=>{
        console.log(res.data)
        navigate("/profile")

       })
    }
    return(
        <>
        <div className="w-6/12 mx-20 mt-10 space-y-10">
        <h1 className="font-bold text-2xl">Update a Post</h1>
        <input type="text" onChange={formHandler} name="title" placeholder="Enter post title" />
        <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])}/>
        <div>
        <input type="text" className="py-1 mr-3 border" placeholder="Enter post category" value={cat} onChange={(e)=>setCat(e.target.value)} />
        <button onClick={clickHandler} className="bg-black px-2 py-1 rounded-sm text-white">ADD</button>
        </div>
        <div className="flex space-x-3"> 
        {cats.map((val,idx)=>{
            return <div className="border bg-gray-400 px-2 py-1 flex space-x-2">
                <h1>{val}</h1>
                <button className="" onClick={()=>removeHandler(idx)}><ImCross/></button>
            </div>
        })}
        </div>
        <textarea name="description" onChange={formHandler} placeholder="Enter your text..." className="border outline-none py-2 px-4" id="" cols="60" rows="15"></textarea>
        
        </div>
        <div className="text-center py-6">
        <button onClick={editHandler} className="bg-black text-white px-16 py-2">Update</button>
    </div>
        </>
        
    )
}