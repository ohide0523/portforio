import Link from "next/link";
import {useRouter} from "next/router"
import React, { useState, useContext } from "react";
import { Context } from "../../../components/Context";
import { db } from "../../../components/firebase";
import firebase from "@firebase/app";
import "@firebase/storage";

import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";




import Tooltip from "@mui/material/Tooltip";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InputLabel from "@mui/material/InputLabel";



// material-ui　Inputのcss
const Input = styled("input")({
  display: "none",
  marginLeft: "20px",
});

const editProfile = () => {
const router = useRouter()
  const [userImg, setUserImg] = useState("");
  const { uid } = useContext(Context);
  const [name, setName] = useState("");
  const [introduce, setIntroduce] = useState("");



  const getMyUser_value =()=>{
    db.collection("users").doc(uid).get().then((doc)=>{
      setName(doc.data().name)
      setIntroduce(doc.data().introduce)
      
    })
  }




  const onClickBack =()=>{
      router.push(`/menu/${uid}`)
  }

// 写真のアップロード・ダウンロード
  const uploadPhoto_user = (e) => {
    const storageRef = firebase.storage().ref();
    const file = e.target.files;
    let blob = new Blob(file, { type: "images/jpeg" });
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join("");

    storageRef
      .child(fileName)
      .put(blob)
      .then(() => {
        storageRef
          .child(fileName)
          .getDownloadURL()
          .then((imgURL) => {
            setUserImg(imgURL);
          })
          .catch(() => {
            alert("アップロードに失敗しました。。もう一度試してください。。");
          });
      });
  };


  //ユーザー情報を更新する処理==今日やるところ=======================================
  const onClickUpdate_user = () => {
    // nameがあるかないかでif分岐する

    if(userImg==""){
      db.collection("users").doc(uid).onSnapshot((doc)=>{
        console.log(doc.data().img)
        setUserImg(doc.data().img)
      })
    }

    if(name== ""){
      db.collection("users").doc(uid).get().then((doc)=>{
        setName(doc.data().name)
      })
    }

    // if(introduce == ""){
    //   db.collection("users").doc(uid).get().then((doc)=>{
    //     setIntroduce(doc.data().introduce)
    //   })
    // }


    db.collection("users").doc(uid).update({
      name: name, //入力しなかったら、nameの中身が空になってしまい結果的に今まで設定していたnameが消える。。
      img: userImg,
      introduce: introduce,
      updateAt: firebase.firestore.FieldValue.serverTimestamp(),
    },{merge:true});
    alert("更新しました！");
  };
  // ----------------------------------------------------

  return (
    <div style={{ textAlign: "center" }}>
     <Tooltip title="戻る" arrow>
        
            <ArrowBackIosIcon
              style={{
                position: "fixed",
                top: "20",
                left: "20",
                cursor: "pointer",
              }}
           onClick={onClickBack}
            />
          </Tooltip>
      <h1>プロフィール設定</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        <Avatar
          alt="アバター画像"
          src={userImg}
          sx={{ width: 80, height: 80 }}
        />
        <label htmlFor="outlined-button-file">
          <Input
            accept="image/*"
            id="outlined-button-file"
            multiple
            type="file"
            onChange={(e) => uploadPhoto_user(e)}
          />
          <Button
            variant="outlined"
            component="span"
            sx={{ marginLeft: "20px" }}
          >
            画像を選択する
          </Button>
        </label>
      </div>

      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          margin: "auto",
        }}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 3, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-basic"
            label="ニックネーム"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 3, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-multiline-static"
            label="自己紹介"
            multiline
            rows={6}
            variant="filled"
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
          />
        </Box>
        <Link href="/menu/[mypage]" as={`/menu/${uid}`}>
          <Button
            variant="contained"
            disableElevation
            sx={{ m: 3, width: "100%" }}
            onClick={onClickUpdate_user}
          >
            更新
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default editProfile;
