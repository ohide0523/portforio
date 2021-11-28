import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Context } from "../../components/Context";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Tooltip from "@mui/material/Tooltip";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const mypage = () => {
  const { likedItems, followLists, myUser } = useContext(Context);
  const router = useRouter();

  //いいねした全itemのページに遷移する関数
  const onClickAllLikedItems = () => {
    router.push("/myTool/myFavorite/favorite");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Myページ</h1>
        <Link href="/myTool/profile/editProfile">
          <Button
            variant="outlined"
            component="span"
            sx={{ marginLeft: "20px" }}
          >
            プロフィールを編集する
          </Button>
        </Link>
      </div>

      {myUser.length > 0 &&
        myUser.map((user, index) => (
          <div key={index}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Avatar
                alt="アバター画像"
                src={user.img}
                sx={{ width: 150, height: 150 }}
              />
              <div style={{display:"flex",flexDirection:"column",marginLeft:"20px"}}>
                     <div>ニックネーム:{user.name}</div>
              <div>メール:{user.email}</div>
              <div>フォロワー数:{user.follower}</div>
              </div>
           
            </div>
          </div>
        ))}

      <h2>いいねしたワンちゃんたち</h2>
      <hr />

      <div>
        <ImageList sx={{ width: "90%", height: 300 }} cols={4} rowHeight={200}>
          {likedItems.length > 0 &&
            likedItems.map((item, index) => (
              <Link
                key={index}
                href="/[another]/anotherItem/[item]"
                as={`/${item.userId}/anotherItem/${item.id}`}
              >
                <ImageListItem key={item.img}>
                  <img
                    src={item.img}
                    srcSet={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{ position: "relative" }}
                  />

                  <ImageListItemBar title={item.title} subtitle={item.author} />
                </ImageListItem>
              </Link>
            ))}
        </ImageList>
        {likedItems.length > 3 && (
          <Tooltip title="もっと見る" arrow>
            <ArrowForwardIosIcon
              style={{
                position: "absolute",
                top: "230",
                right: "60",
                cursor: "pointer",
              }}
              onClick={onClickAllLikedItems}
            />
          </Tooltip>
        )}
      </div>

      <h2>フォローしているユーザー</h2>
      <hr />
      <ul style={{ marginBottom: "400px" }}>
        {followLists.length > 0 &&
          followLists.map((list, index) => (
            <li key={index}>
              <Link
                href="/[another]/[profile]"
                as={`/${list.followUser}/profile`}
              >
                <p>{list.name}</p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default mypage;
