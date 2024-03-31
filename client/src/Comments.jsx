import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { config } from "./config/config";
export function Comment({comt,id,setCommentsArray,showDeleteBtn}){
    function clickHandler(cmtID){
        axios({
            method : "delete",
            url : `${config.backendHost}/post/deleteComment/${id}/${cmtID}`
        })
        .then((res)=>{
            setCommentsArray(res.data.msg.Comments)
            console.log(res.data)
        })
    }
    return(
        <>
          <div className="bg-gray-200 mt-5 rounded-md">
                <div className="flex justify-between px-3 py-4">
                    <h1>{comt.username}</h1>
                    <div className="flex space-x-3">
                    {showDeleteBtn?<p onClick={()=>clickHandler(comt._id)} className="text-sm"><MdDelete/></p>:""}
                    </div>
                </div>
                <p className="px-3">{comt.comment}</p>
            </div>
            
        </>
    )
}