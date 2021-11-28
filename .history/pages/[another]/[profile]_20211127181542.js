import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../../components/Context";
import { db } from "../../components/firebase";
import firebase from "@firebase/app";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const anotherProfile = () => {
  const [follow, setFollow] = useState(false);
  const { uid, anotherUser, getAnotherUser } = useContext(Context);

  const router = useRouter();
  const { another } = router.query;

  useEffect(() => {
    if (another && uid) {
      getFollow();
      getAnotherUser();
    }
  }, [another, uid]);

  // フォローボタンの状態の取得
  const getFollow = () => {
    db.collection("users")
      .doc(uid)
      .collection("followLists")
      .where("followUser", "==", another)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log(change.doc.data().follow);
            setFollow(change.doc.data().follow);
          }
          if (change.type === "removed") {
            setFollow(false);
          }
        });
      });
  };

  // フォローする機能 引数に相手のuidと名前を受け取る
  const onClickFollow = async (id, name) => {
    if (another == uid) {
      return alert("自分のユーザーはフォローできません");
    }
    // フォローされる側のユーザーの参照
    const anotherUserRef = db.collection("users").doc(id);
    // フォローする自分のユーザーの参照
    const myUserRef = db.collection("users").doc(uid);

    const batch = db.batch();

    // フォローされた側の処理
    batch.set(
      db.doc(anotherUserRef.path).collection("followerLists").doc(uid),
      {
        user: uid, //フォローしてきたユーザーのuid
      }
    );
    batch.update(db.doc(anotherUserRef.path), {
      followCount: firebase.firestore.FieldValue.increment(1),
    });

    // フォローした側の処理
    batch.set(db.doc(myUserRef.path).collection("followLists").doc(id), {
      name: name, //フォローした人のユーザーの名前（仮）　最終的には、プロフィール写真にしたい
      followUser: id, //フォローした人のuid
      user: uid, //自分のuid
      follow: true,
    });
    await batch.commit();
  };

  //  フォロー解除した時の処理 引数にuser
  const onClickUnFollow = async (id) => {
    // フォローされる側のユーザーの参照
    const anotherUserRef = db.collection("users").doc(id);
    // フォローする自分のユーザーの参照
    const myUserRef = db.collection("users").doc(uid);

    const batch = db.batch();

    batch.delete(
      db.doc(anotherUserRef.path).collection("followerLists").doc(uid)
    );
    batch.update(db.doc(anotherUserRef.path), {
      followCount: firebase.firestore.FieldValue.increment(-1),
    });

    batch.delete(db.doc(myUserRef.path).collection("followLists").doc(id));

    await batch.commit();
  };

  return (
    <div>
      <h1>他人のプロフィール</h1>

      {anotherUser.length > 0 &&
        anotherUser.map((user, index) => (
          <div
         
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

            <Avatar
              alt="アバター画像"
              src={user.img}
              sx={{ width: 150, height: 150 }}
            />
            <div style={{display:"flex"}}></div>
            <h2>{user.name}</h2>
            <span>フォロワー：{user.followCount}</span>
            <p>{user.email}</p>
          

            <div style={{ display: "flex", alignItems: "center" }}>
              {follow ? (
                <Button
                  variant="outlined"
                  onClick={() => onClickUnFollow(user.id)}
                >
                  フォロー
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => onClickFollow(user.id, user.name)}
                >
                  フォロー
                </Button>
              )}
              <Link
                href="/myTool/chat/[uid]/[pid]"
                as={`/myTool/chat/${uid}/${user.id}`}
              >
                <Button variant="contained">この人とチャットする</Button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default anotherProfile;
