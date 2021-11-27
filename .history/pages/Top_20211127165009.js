import Link from "next/link";
import {useRouter} from "next/router"
import React, { useContext, useState } from "react";
import { Context } from "../components/Context";
import { auth } from "../components/firebase";
import firebase from "@firebase/app";

// header
import Switch from "@mui/material/Switch";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// main
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Tooltip from "@mui/material/Tooltip";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "90%",
  },
}));

const Top = () => {
  const [isSearch, setIsSearch] = useState(false);
  const { isLogin, setIsLogin, items } = useContext(Context);
  const router = useRouter()

  // 検索欄表示の状態管理
  const onClickSearch = () => {
    if (isSearch == false) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  };

  //ログインとログアウト
  const onClickAuth = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    if (isLogin == false) {
      auth
        .signInWithPopup(googleProvider)
        .then((res) => {
          setIsLogin(true);
          alert("ログインしました！");
          console.log(res.user.uid);
        })
        .catch((res) => {
          alert("失敗しました...");
          console.log(res.user.uid);
        });
    }
    if (isLogin == true) {
      auth.signOut().then(() => {
        alert("ログアウトしました！");
        setIsLogin(false);
      });
    }
  };

//カテゴリーページに遷移
const onClickCategory =()=>{
    router.push("/category")
}

  return (
    <>
      {isSearch ? (
        <>
          <Tooltip title="戻る" arrow>
            <ArrowBackIosIcon
              style={{
                position: "fixed",
                top: "20",
                left: "20",
                cursor: "pointer",
              }}
              onClick={onClickSearch}
            />
          </Tooltip>

          <div style={{ alignItems: "center", margin: "auto" }}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",

                margin: "auto",
                marginTop: "300px",
                width: 400,
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <Tooltip title="カテゴリーで探す" arrow>
                  <MenuIcon onClick={onClickCategory}/>
                </Tooltip>
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="里親を探す"
                inputProps={{ "aria-label": "里親を探す" }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>

              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
              ></IconButton>
            </Paper>
          </div>
        </>
      ) : (
        <>
          <header
            style={{
              display: "flex",
              alignItems: "center",

              position: "fixed",
              width: "100%",
              height: "80px",
              top: 0,
              zIndex: 2,
              background: "white",
              borderBottom: "1px solid rgb(229, 229, 229)",
              marginBottom: "100px",
            }}
          >
            <h1 style={{ flex: 1, marginLeft: "20px",textAlign:"center"}}>MyPets</h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <SearchIcon
                onClick={onClickSearch}
                style={{ fontSize: "40px", marginRight: "10px" }}
              />
              <Switch
                onChange={onClickAuth}
                checked={isLogin}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </header>

          <main
            style={{
              zIndex: 0,
              marginTop: "200px",
              marginBottom: "100px",
              height: "700px",
              overflow: "auto",
            }}
          >
            <h1>mudana</h1>

            <ImageList
              sx={{ width: "100%", height: 450 }}
              cols={4}
              rowHeight={200}
            >
              {items.length > 0 &&
                items.map((item, index) => (
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
                      />

                      <ImageListItemBar
                        title={item.title}
                        subtitle={item.author}
                      />
                    </ImageListItem>
                  </Link>
                ))}
            </ImageList>
          </main>
        </>
      )}
    </>
  );
};

export default Top;
