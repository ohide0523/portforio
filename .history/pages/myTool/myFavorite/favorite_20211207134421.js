import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../components/Context";
import { db } from "../../../components/firebase";
import Styles from "../../../styles/Home.module.css"

import FavoriteIcon from "@mui/icons-material/Favorite";

const favorite = () => {
  const { uid } = useContext(Context);
  const [allLikedItems, setAllLikedItems] = useState([]);

  useEffect(() => {
    if (uid) {
      getAllLikedItems();
    }
  }, [uid]);

  //もっと見る→全てのいいねしたitemの表示
  const getAllLikedItems = () => {
    db.collection("users")
      .doc(uid)
      .collection("likedItems")
      .onSnapshot((snapshot) => {
        snapshot.forEach((docs) => {
          setAllLikedItems( prev=>[...prev,docs.data()]);
        });
      });
  };
  return (
    <div className={Styles.myFavorite_item_container}>
      <h1 className={Styles.myF}>いいねしたワンちゃんたち</h1>
      <hr />
      {allLikedItems.length > 0 &&
        allLikedItems.map((item, index) => (
          <div key={index}>
            <div
              style={{ display: "flex", height: "100px", marginLeft: "10px" }}
            >
              <Link
                href="/[another]/anotherItem/[item]"
                as={`/${item.userId}/anotherItem/${item.id}`}
              >
                <img src={item.img} alt="ワンちゃんの画像" style={{width:"200px"}} />
              </Link>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "30px",
                }}
              >
                <h3>{item.title}</h3>
                <div>{item.value}</div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FavoriteIcon />
                  <div>{item.likeCount}</div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
    </div>
  );
};

export default favorite;
