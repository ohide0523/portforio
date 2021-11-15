import React,{createContext,useState} from 'react'

export const Context =createContext()

const ContextProvider = ({children}) => {

    // ログインページ・トップページの状態管理
    const [isLogin,setIsLogin] = useState(false)
    return (
       <Context.Provider value={{isLogin,setIsLogin}}>{children}</Context.Provider>
    )
}

export default ContextProvider
