import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../../components/Context";
import { db } from "../../components/firebase";
import firebase from "@firebase/app";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

// // header
// import Switch from "@mui/material/Switch";
// import InputBase from "@mui/material/InputBase";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const anotherProfile = () => {
  const [follow, setFollow] = useState(false);
  const { uid, anotherUser,getAnotherUser} = useContext(Context);

  const router = useRouter();
  const { another } = router.query;

  useEffect(() => {
    if (another && uid) {
      getFollow();
      getAnotherUser()
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
  const onClickFollow = async (id, name,img,followerCount) => {
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
      img:img,
      followUser: id, //フォローした人のuid
      user: uid, //自分のuid
      followerCount:followerCount,
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
      {anotherUser.length > 0 &&
        anotherUser.map((user, index) => (
          <div key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                
                marginTop: "100px",
                
              }}
              
            >
              <Avatar
                alt="アバター画像"
                src={user.img}
                sx={{ width: 150, height: 150, display: "box" }}
              />

              <div style={{display:"flex",alignItems:"center"}}>
                 <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                  
                  marginTop: "10px",
                }}
              >
                <div>{user.name}</div>
                <div>フォロワー：{user.followCount}</div>
                <div>{user.email}</div>

                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "20px",
                    flexDirection: "column",
                  }}
                >
                  {follow ? (
                    <Button
                      variant="outlined"
                      onClick={() => onClickUnFollow(user.id)}
                      sx={{ width: "200px" }}
                    >
                      フォロー
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => onClickFollow(user.id, user.name,user.img,user.followCount)}
                      sx={{ width: "200px" }}
                    >
                      フォロー
                    </Button>
                  )}
                  <Link
                    href="/myTool/chat/[uid]/[pid]"
                    as={`/myTool/chat/${uid}/${user.id}`}
                  >
                    <Button
                      variant="contained"
                      sx={{ width: "200px", marginTop: "10px" }}
                    >
                      この人とチャットする
                    </Button>
                  </Link>
                </div>
             
             
              </div>
            </div>
            <div style={{textAlign:"center",marginTop:"50px",width:"50%",ma}}> 

              <h2>自己紹介</h2>
              {user.introduce}
            </div>
          </div>
        ))}
    </div>
  );
};

export default anotherProfile;
