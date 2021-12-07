import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Context } from "../../components/Context";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Tooltip from "@mui/material/Tooltip";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import Styles from "../../styles/Home.module.css"
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    width:"90%",
    minHeight:"300px"
  },
 
}));


const mypage = () => {
  const { likedItems, followLists, myUser, myUserItems, uid } =
    useContext(Context);
  const router = useRouter();
  const classes = useStyles()

  // useEffect(() => {
  //   if (uid == null) {
  //     router.push("/Login");
  //   }
  // }, [uid]);

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
        <h1 className={Styles.mypage_h1}>マイページ</h1>
        
      </div>

      {myUser.length > 0 &&
        myUser.map((user, index) => (
          <div key={index}>
            <div
             className={Styles.profile_top}
            >
              <Avatar
                alt="アバター画像"
                src={user.img}
                className={Styles.profile_avatar}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                  fontSize:"15px",
                  lineHeight:"1.5"
                }}
              >
                <div>ニックネーム:{user.name}</div>
                <div>メール:{user.email}</div>
                <div>フォロワー数:{user.follower}</div>
                <Link href="/myTool/edit/editProfile">
          <Button
            variant="outlined"
            component="div"
            sx={{marginTop:"10px"}}
          >
            プロフィールを編集する
          </Button>
        </Link>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "70%",
                
                margin: "auto",
                
              }}
            >
              <h2>自己紹介</h2>
              <div>{user.introduce}</div>
            </div>
          </div>
        ))}

      <div style={{ marginTop: "100px" }}>
        <h2 className={Styles.profile_h2}>
          自分が里親を募集したワンちゃんたち
        </h2>
        <hr />

        <div className={classes.root}>
          <ImageList
            
            cols={3}
sx={{minHeight:200,width:"90%"}}          >
            {myUserItems.length > 0 &&
              myUserItems.map((item, index) => (
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
                      style={{ position: "relative",height:"50px"}}
                    />

                    <ImageListItemBar
                      title={item.title}
                      subtitle={item.author}
                    />
                  </ImageListItem>
                </Link>
              ))}
          </ImageList>
        </div>
      </div>

      <h2 style={{lineHeight:"1px"}}>いいねしたワンちゃんたち</h2>
      <hr />

      <div style={{ display: "flex", height: "300px" }}>
        <ImageList sx={{ width: "90%", height: 300 }} cols={4} rowHeight={200}>
          {likedItems.length > 0 &&
            likedItems.map((item, index) => (
              <Link
                key={index}
                href="/[another]/anotherItem/[item]"
                as={`/${item.userId}/anotherItem/${item.id}`}
              >
                <ImageListItem>
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
          <Tooltip title="もっと見る" arrow >
            <ArrowForwardIosIcon
              style={{
                marginLeft: "60px",
                marginTop: "110px",
              }}
              onClick={onClickAllLikedItems}
            />
          </Tooltip>
        )}
      </div>

      <h2 style={{ lineHeight: "1px" }}>フォローしているユーザー</h2>
      <hr />

      <div style={{ marginBottom: "100px",display:"flex", }}>
        {followLists.length > 0 &&
          followLists.map((list, index) => (
            <div
              style={{
                display: "flex",
                margin:"30px"
              }}
              key={index}
            >
            
              <div style={{ display: "flex", flexDirection: "column" }}>
                  <Link
              href="/[another]/[profile]"
              as={`/${list.followUser}/profile`}
              key={index}
            >
                <Avatar
                  alt="アバター画像"
                  src={list.img}
                  sx={{ width: 80, height: 80 }}
                />
                </Link>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>{list.name}</div>
                  <div>{list.followerCount}フォロワー</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default mypage;
