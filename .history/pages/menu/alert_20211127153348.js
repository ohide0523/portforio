import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../components/Context";
import { db } from "../../components/firebase";

const alert = () => {
  const [newChat, setNewChat] = useState([]);
  const { uid } = useContext(Context);

  useEffect(() => {
    if (uid) {
      db
        .collection("chatRoom")
        .where("member","array-contains",uid)
        .orderBy("createAt")
        .onSnapshot((snapshot) => {
         snapshot.forEach((doc)=>{
             setNewChat([doc.data()])
         })
        });
    }
  }, [uid]);
  return (
    <div>
      <h1>通知ページ</h1>
      <hr />


      <div>{newChat.length>0 ?(<h1>あなたに通知はありません</h1>):(
          newChat.map((chat)=>(
              
          ))
      )
          
          }</div>
      <Link
        href="/myTool/chat/[uid]/[pid]"
        as={`/myTool/chat/自分のuid/チャット相手のuid`}
      >
        <p>Nさんからメッセージが届きました。</p>
      </Link>
      <hr />
      <Link
        href="/myTool/chat/[uid]/[pid]"
        as={`/myTool/chat/自分のuid/チャット相手のuid`}
      >
        <p>Nさんからメッセージが届きました。</p>
      </Link>

      <hr />
      <Link
        href="/myTool/chat/[uid]/[pid]"
        as={`/myTool/chat/自分のuid/チャット相手のuid`}
      >
        <p>Nさんからメッセージが届きました。</p>
      </Link>
      <hr />
    </div>
  );
};

export default alert;
