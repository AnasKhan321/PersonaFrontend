import Chat from "../clientComponents/chat.jsx"

export default async function Page({
    params,
  }){
    const parameters = await params
    const response  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}userinfo/${parameters.username}`)
    const data = await response.json()

    if(data.data == null){
        return(
            <div className="text-center font-bold text-white mt-10  text-xl  ">  User not found</div>
    )

    }else if(!data.success){

        return(
                <div  className="text-center font-bold text-white mt-10  text-xl "> Backend is down </div> 
         )


    }

    const sres = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}saysomething`  , {
        method : "POST"  , 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          } , 

        body : JSON.stringify({
            username : parameters.username
        })
    })

    const sdata = await sres.json() ; 
    console.log(sdata.data)

    
    return(
        <div>

            <div className="flex justify-center items-center  gap-x-2  mt-5 ">
                <img src={data.data.image} className="rounded-full w-[50px]  h-[50px] "/>
                <p className="font-bold text-white text-xl"> @{parameters.username} </p>
            </div>
            <Chat username={parameters.username}  text={sdata.data}/> 

        </div>
    )



  }

 