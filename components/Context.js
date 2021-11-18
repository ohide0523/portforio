import React,{useState,createContext} from 'react'

export const Context = createContext()

const ContextProvider = ({children}) => {
    const [isLogin,setIsLogin] = useState(false)
    return (
     <Context.Provider value={{isLogin,setIsLogin}}>
         {children}
     </Context.Provider>
    )
}

export default ContextProvider
