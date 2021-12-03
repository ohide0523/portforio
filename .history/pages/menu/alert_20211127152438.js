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
        .collection("users")
        .doc(uid)
        .collection("chatRoom")
        .where("member", "array-contains-any", [uid])
        .orderBy("createAt")
        .onSnapshot((snapshot) => {
         console.log()
        });
    }
  }, [uid]);
  return (
    <div>
      <h1>通知ページ</h1>
      <hr />

      <div>{}</div>
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