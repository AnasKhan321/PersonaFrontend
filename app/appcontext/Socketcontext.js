'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext({ socket: null, isConnected: false })

export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`)

    newSocket.on('connect', () => {
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}

