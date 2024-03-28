export function Profilepost({post}){
    return(
        <>
         <div className="flex mt-10 w-9/12 mx-auto">
            <img src={`http://localhost:3000/images/${post.image}`}width="300px" alt="" />
            <div className="ml-2">
                <h1 className="font-bold text-xl">{post.title}</h1>
                <div className="flex justify-between text-gray-400 text-sm">

                <p>{post.username}</p>
                </div>
                <h1>{post.description}</h1>
            </div>
        </div>
        </>
    )
}