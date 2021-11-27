import React,{useContext} from 'react'
import {Context} from "../components/Context"
import Login from './Login'
import Top from './Top'

function Home() {
  const {isLogin,setIsLogin} =useContext(Context)
  return (
    <div>
      
      {isLogin? <Top/>:<Login/>}


    </div>
  )
}

export default Home