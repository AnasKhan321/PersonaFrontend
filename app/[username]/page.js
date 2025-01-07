import Chat from "../clientComponents/chat.jsx"

export default async function Page({
    params,
  }){
    const parameters = await params
    const response  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}userinfo/${parameters.username}`)
    const data = await response.json()
    return(
        <div>

            <div className="flex justify-center items-center  gap-x-2  mt-5 ">
                <img src={data.data.image} className="rounded-full "/>
                <p className="font-bold text-white text-xl"> @{parameters.username} </p>
            </div>
            <Chat username={parameters.username}/> 

        </div>
    )



  }

 