import React, { useState, useContext, useEffect } from "react";
import { Context } from "../components/Context";
import Image from "next/image";

// firebase関連のimport
import { auth, db } from "../components/firebase";
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
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Tooltip from "@mui/material/Tooltip";
import GoogleIcon from "@mui/icons-material/Google";

const googleProvider = new firebase.auth.GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLogin, setIsLogin, isSearch, setIsSearch } = useContext(Context);

  // 検索欄表示の状態管理
  const onClickSearch = () => {
    if (isSearch == false) {
      setIsSearch(true);
    }
    if (isSearch == true) {
      setIsSearch(false);
    }
  };

  //googleログイン＋アカウントの作成
  const googleLogin = () => {
    
    
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        const firstLogin = res.additionalUserInfo.isNewUser
        if(firs)
        // const userRef = db
        //   .collection("users")
        //   .doc(res.user.uid)
        //   .id
          
        //   if(userRef == res.user.uid){
        //     return  alert("ログインしました！");
        //   }

            db.collection("users").doc(res.user.uid).set({
              name: "googleユーザー",
              id: res.user.uid,
              email: "設定されていません",
              password: "設定されていません",
              img: "設定されていません",
              imgID: "設定されていません",
              sex: "設定されていません",
              introduce: "",
              followerCount: 0,
              createAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
         
        
       

        // 既にfirestoreにデータが存在するかをdocのidと
        
          //ログインしたときにアカウントがなければgoogleアカウントを作成
          
        

        
      })
      .catch(() => {
        alert(
          "失敗しました... 通信環境を確認して再度ログインをお願いします..."
        );
      });
  };

  //emailログイン
  const emailLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("ログインに成功しました！");
        setIsLogin(true);
        setEmail("");
        setPassword("");
      })
      .catch(() => {
        alert("ログインに失敗しました。。");
      });
  };

  // emailアカウント作成
  const createEmailUser = () => {
    auth.createUserWithEmailAndPassword(email, password).then((res) => {
      const user = res.user;
      db.collection("users").doc(user.uid).set({
        name: "emailユーザー",
        id: user.uid,
        email: "設定されていません",
        password: password,
        img: "設定されていません",
        imgID: "設定されていません",
        sex: "設定されていません",
        followerCount: 0,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      alert("アカウントを作成しました！");
      setIsLogin(true);
      setEmail("");
      setPassword("");
    });
  };

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
                <MenuIcon />
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
            <h1 style={{ flex: 1, marginLeft: "20px" }}>ログインページ</h1>
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
                onChange={googleLogin}
                checked={isLogin}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </header>
          <div style={{ marginTop: "200px" }}>
            <h2 onClick={googleLogin}>Googleログイン</h2>
            <Image
              src="/googleアイコン.jpeg"
              width="50px"
              height="50px"
              style={{ backGround: "white", cursor: "pointer" }}
              onClick={googleLogin}
            />
            <h2>Emailでのログインはこちら</h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={emailLogin}>ログイン</button>
            <h3>または</h3>
            <h2>新規会員登録</h2>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={createEmailUser}>新規登録</button>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
