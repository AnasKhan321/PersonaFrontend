'use client'

import { useEffect, useState } from 'react'
import { ReactTyped } from "react-typed";

import { ArrowRight, User   , LoaderCircle} from 'lucide-react'
import { useSocket } from './appcontext/Socketcontext'

import toast  from 'react-hot-toast'

import Profile from './clientComponents/profile';

import { useRouter } from 'next/navigation'


export default function Home() {
  const [username, setUsername] = useState('')
  const router = useRouter()

  const {socket}  = useSocket()
  const [users , setusers]  = useState([])


  const [loading , setisLoading]  = useState(false)


  const fetchUsers = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}availableProfiles`)
    const data = await res.json() ; 
    setusers(data.data)
    console.log(data.data)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if(username.charAt(0)  == "@"){
      let name = username.split("@")[1]
      console.log(name)

      socket.emit("PersonCreate"  , JSON.stringify({username : name}))
      setisLoading(true)

      socket.on("userfound"  , (data)=>{
        setisLoading(false)
        router.push(`/${name}`)
      })

      socket.on("usernotfound"  , (data)=>{
        setisLoading(false)
        toast.error("User not found!")
      })

    }else{
      toast.error("username must start with @")
    }
  }

  useEffect(()=>{
    fetchUsers() ; 
  },[])


  return (
    <div className="container mx-auto px-4 py-12  ">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to <ReactTyped strings={["Ai Persona"]} typeSpeed={5}   loop={false}/></h1>
        <p className="text-xl text-gray-300 mb-8">Create and chat with AI-generated personas based on Twitter profiles</p>
      </section>

      <section className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-white   text-center animated-text ">Create AI Persona </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Enter X username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="@username"
              required
            />
          </div>
          <button
          disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-t from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-white px-4 py-2 rounded-lg  disabled:bg-blue-400 hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
           {loading? "Creating..." : "Create a Persona"}


            {loading?<> <LoaderCircle className='animate-spin'/>  </>   :     <ArrowRight className="ml-2" /> }
          </button>
        </form>
      </section>

      <h2 className="text-2xl font-bold text-white" >All Available Personas</h2>
 

      {users.map((user  , index )=>(
        
        <a href={`/${user.username}`}  key={index}>
            <Profile profile={user}/>
        </a>
        
      ))}
    </div>
  )
}


