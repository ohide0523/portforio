import Link from "next/link"
import React,{useState,useEffect} from 'react'

const alert = () => {
    const [newChat,setNewChat] = useState([])

    useEffect(()=>{
        if(uid){
            const chatRoomRef = db.collection("users").doc(uid).collection("chatRoom").where("member","array-contains-any",uid).get()
            chatRoomRef.orderBy(createAt).onSnapshot((snapshot)=>)
        }
    },[uid])
    return (
        <div>
            <h1>通知ページ</h1>
            <hr/>

            <div>
                {}
            </div>
            <Link href="/myTool/chat/[uid]/[pid]" as={`/myTool/chat/自分のuid/チャット相手のuid`}>
            <p>Nさんからメッセージが届きました。</p>
            </Link>
            <hr/>
            <Link href="/myTool/chat/[uid]/[pid]" as={`/myTool/chat/自分のuid/チャット相手のuid`}>
            <p>Nさんからメッセージが届きました。</p>
            </Link>
            
            <hr/>
            <Link href="/myTool/chat/[uid]/[pid]" as={`/myTool/chat/自分のuid/チャット相手のuid`}>
            <p>Nさんからメッセージが届きました。</p>
            </Link>
            <hr/>
           
            
        </div>
    )
}

export default alert
