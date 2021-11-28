import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useRouter } from "next/router";
import { db } from "../../../../components/firebase";
import { Context } from "../../../../components/Context";
import Styles from "../../../../styles/Home.module.css";
import firebase from "@firebase/app"

const chat = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const router = useRouter();
  const { pid } = router.query;
  const { uid, myUser } = useContext(Context);
  const ref = useRef();
  //messagesのlength
  const length = messages.length;

  useEffect(() => {
    if (pid && uid) {
      getMsg();
      ref.current.focus();
    }
  }, [pid, uid]);

  useEffect(() => {
    if (length) {
      scrollToEnd();
    }
  }, [length]);

  //全メーセージ内容の取得
  const getMsg = () => {
    const id = uid > pid ? `${uid}${pid}` : `${pid}${uid}`;
    db.collection("chatRoom")
      .doc(id)
      .collection("messages")
      .orderBy("createAt")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setMessages((prev) => [...prev, change.doc.data()]);
          }
        });
      });
  };

  //メッセージ送信(メッセージ送信と同時にchatRoomの作成もする) ~~~Enterでの送信パターン~~~
  const submitMsg = (e) => {
    const id = uid > pid ? `${uid}${pid}` : `${pid}${uid}`;
    if (content == "") {
      return;
    }
    if (e.keyCode === 13) {
     
      db.collection("chatRoom")
        .doc(id)
        .set({
          roomId: id,
          member: [uid, pid],
        });

      db.collection("chatRoom").doc(id).collection("messages").add({
        // name: myUser.name,
        // id: myUser.id,
        content: content,
        createAt: new Date().getTime(),
      });
      db.collection("users").doc(uid)("chatRoom").update({
        createAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      setContent("");
      ref.current.focus();
    }
  };

// ~~~~カーソルでの送信パターン~~~~
const onClickSubmitMsg =()=>{
    const id = uid > pid ? `${uid}${pid}` : `${pid}${uid}`;
    db.collection("chatRoom")
      .doc(id)
      .set({
        roomId: id,
        member: [uid, pid],
      });

    db.collection("chatRoom").doc(id).collection("messages").add({
      name: myUser.name,
      id: myUser.id,
      content: content,
      createAt: new Date().getTime(),
    });
    setContent("");
    ref.current.focus();
}


  // 時間の型を作る
  const getStrTime = (time) => {
    let t = new Date(time);
    return (
      `${t.getHours()}`.padStart(2, 0) +
      ":" +
      `${t.getMinutes()}`.padStart(2, "0")
    );
  };

  //下まで自動スクロール
  const scrollToEnd = useCallback(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [ref]);

  return (
    <>
      <div className={Styles.chat_space}>
        <h1>チャットページ</h1>

        {messages.length > 0 &&
          messages.map((msg, index) => (
            <div key={index}>
              <div
                className={uid == msg.id ? Styles.balloon_r : Styles.balloon_i}
                ref={ref}
              >
                <div>
                  {msg.name}
                  <p className={Styles.says}>{msg.content}</p>
                </div>
              </div>
              {/* メッセージを送信した時間の表示 */}
              <div
                className={
                  uid == msg.id ? Styles.says_time_r : Styles.says_time_i
                }
              >
                {uid === msg.id ? "" : getStrTime(msg.createAt)}
                {uid === msg.id ? getStrTime(msg.createAt) : ""}
              </div>
            </div>
          ))}
      </div>

      <div className={Styles.input_form}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={Styles.input}
          ref={ref}
          onKeyDown={(e) => submitMsg(e)}
        />
        <button onClick={onClickSubmitMsg} className={Styles.input}>
          送信
        </button>
      </div>
    </>
  );
};

export default chat;
