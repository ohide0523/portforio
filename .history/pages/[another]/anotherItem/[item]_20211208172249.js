import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext,useEffect } from "react";
import { Context } from "../../../components/Context";
import firebase from "@firebase/app";

// いいねアイコン
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { db } from "../../../components/firebase";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { margin } from "@mui/system";

const item = () => {
  const { like, uid, anotherUser, anotherItem,get} =
    useContext(Context);
  const router = useRouter();
  const {another,item} = router.query

  useEffect(()=>{
    if (another && item) {
      // 他のユーザーの情報を取得
      getAnotherUser(another);
      // 他のユーザーの持っている特定のitemの取得
      getAnotherItem(another,item);
    }
  },[another,item])


  //  いいねする機能
  const addLikedItem = async (userId, itemId, img, title, count) => {
    // batch
    const batch = db.batch();

    const anotherItemRef = db
      .collection("users")
      .doc(userId)
      .collection("items")
      .doc(itemId);
    const myUserRef = db.collection("users").doc(uid);

    batch.set(db.doc(anotherItemRef.path).collection("likedUsers").doc(item), {
      user: uid,
      itemId: item,
    });

    batch.update(anotherItemRef, {
      likeCount: firebase.firestore.FieldValue.increment(1),
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    batch.set(db.doc(myUserRef.path).collection("likedItems").doc(item), {
      title: title,
      img: img, //ここに個々のitemの写真を打ち込みたい
      id: itemId,
      userId: userId,
      itemRef: anotherItemRef,
      like: true, //ここは、likeの状態を表すもの。後で、likeのstateで管理する。
      likeCount: count,
    });

    batch.update(myUserRef, {
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    await batch.commit();
  };

  //   いいねを解除する機能
  const deleteLikedItem = async (userId, itemId) => {
    const batch = db.batch();
    const anotherItemRef = db
      .collection("users")
      .doc(userId)
      .collection("items")
      .doc(itemId);
    const myUserRef = db.collection("users").doc(uid);
    batch.delete(
      db.doc(anotherItemRef.path).collection("likedUsers").doc(item)
    );
    batch.update(anotherItemRef, {
      likeCount: firebase.firestore.FieldValue.increment(-1),
    });

    batch.delete(db.doc(myUserRef.path).collection("likedItems").doc(item));

    await batch.commit();
  };

  // 相手のプロフィールに遷移する
  const onCLickProfile = (id) => {
    router.push(`/${id}/profile`);
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {anotherItem.length > 0 &&
          anotherItem.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <h1 style={{ fontSize: "23px" }}>ワンちゃんの紹介ページ</h1>
                {another == uid && (
                  <Link
                    href="/myTool/edit/[editItem]"
                    as={`/myTool/edit/${item.id}`}
                  >
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{ height: "30px" }}
                    >
                      ワンちゃんの情報を編集する
                    </Button>
                  </Link>
                )}
                {/* <div>{item.userId}</div> */}
              </div>

              <img src={item.img} style={{ width: "100%", margin: "auto" }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "30px",
                }}
              >
                <h2 style={{ fontSize: "20px" }}>{item.title}</h2>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {like ? (
                    <FavoriteIcon
                      onClick={() => deleteLikedItem(item.userId, item.id)}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      onClick={() =>
                        addLikedItem(
                          item.userId,
                          item.id,
                          item.img,
                          item.title,
                          item.likeCount
                        )
                      }
                    />
                  )}
                  {item.likeCount}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3>カテゴリー</h3>
                <p>
                  {item.category[0]}/{item.category[1]}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "15px",
                  marginBottom: "40px",
                }}
              >
                <h3>年齢</h3>
                <p>{item.age}歳</p>
              </div>

              <div style={{ marginBottom: "40px" }}>
                <h3>性格・特徴など</h3>
                <hr />

                <p>{item.content}</p>
              </div>
            </div>
          ))}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>このワンちゃんの飼い主</h2>
          <hr />
          <div>
            {anotherUser.length > 0 &&
              anotherUser.map((user, index) => (
                <div key={index} style={{ marginBottom: "100px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "60px",
                    }}
                    onClick={() => onCLickProfile(user.id)}
                  >
                    <Avatar
                      alt="アバター画像"
                      src={user.img}
                      sx={{ width: 70, height: 70, margin: "20px" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ fontSize: "20px" }}>{user.name}</div>
                      <div>
                        {user.follower}
                        <span style={{ fontSize: "10px" }}>フォロワー</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default item;