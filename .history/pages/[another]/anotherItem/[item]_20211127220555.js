import Link from "next/link";
import React, { useEffect, useContext } from "react";
import { Context } from "../../../components/Context";
import firebase from "@firebase/app";

// いいねアイコン
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { db } from "../../../components/firebase";

import Avatar from "@mui/material/Avatar";

const item = () => {
  const { like, uid, anotherUser, anotherItem, getAnotherUser, item, another } =
    useContext(Context);

  useEffect(() => {
    if (another) {
      console.log(anotherUser);
    }
  }, [another]);

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
    // batch.update(db.doc(myUserRef.path).collection("likedItems").doc(item), {
    //     makeAt:firebase.firestore.FieldValue.serverTimestamp(),
    // })
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

  return (
    <div>
      <h1>商品の紹介ページ</h1>

      {anotherItem.length > 0 &&
        anotherItem.map((item, index) => (
          <div key={index}>
            <img src={item.img} />
            <h2>{item.title}</h2>
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
            <p>{item.category}</p>
            <p>{item.age}</p>
            <p>{item.value}</p>
          </div>
        ))}

      <h2>このワンちゃんの飼い主</h2>
      {anotherUser.length > 0 &&
        anotherUser.map((user, index) => (
          <div key={index} style={{ marginBottom: "100px" }}>
            {/* <Link href="/[another]/[profile]" as={`/${user.id}/profile`}>
              </Link> */}
            <div style={{display:"flex",alignItems:"center"}}>
              <Avatar
                alt="アバター画像"
                src={user.img}
                sx={{ width: 50, height: 50,margin:"20px"}}
              />
              <div >{user.name}</div>
              <hr
            </div>
          </div>
        ))}
    </div>
  );
};

export default item;
