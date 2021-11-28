import Link from "next/link"
import React from 'react'

const alert = () => {
    return (
        <div>
            <h1>通知ページ</h1>
            <hr/>

            <d
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
