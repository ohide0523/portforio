import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import { Context } from "../../../components/Context";
import firebase from "@firebase/app";

// いいねアイコン
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { db } from "../../../components/firebase";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const item = () => {
  const { like, uid, anotherUser, anotherItem, item, another } =
    useContext(Context);
  const router = useRouter();


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
    <div>
      <h1>商品の紹介ページ</h1>
      {another === uid && (
        <Button
          variant="outlined"
          component="span"
          sx={{height:"20px"}}
        >
          を編集する
        </Button>
      )}
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
            <hr />
            <div
              style={{ display: "flex", alignItems: "center", height: "60px" }}
              onClick={() => onCLickProfile(user.id)}
            >
              <Avatar
                alt="アバター画像"
                src={user.img}
                sx={{ width: 50, height: 50, margin: "20px" }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>{user.name}</div>
                <div>{user.follower}フォロワー</div>
              </div>
            </div>
            <hr />
          </div>
        ))}
    </div>
  );
};

export default item;
