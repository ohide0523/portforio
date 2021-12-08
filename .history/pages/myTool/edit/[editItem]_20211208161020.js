import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../components/Context";
import { db } from "../../../components/firebase";
import firebase from "@firebase/app";
import "@firebase/storage";

import Avatar from "@mui/material/Avatar";

import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

// material-ui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// material-ui　Inputのcss
const Input = styled("input")({
  display: "none",
  marginLeft: "20px",
});

const editItem = () => {
  const router = useRouter();
  const { editItem } = router.query;
  const { uid, setItems } = useContext(Context);
  const [editImg, setEditImg] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editSex, setEditSex] = useState("");

  useEffect(() => {
    if (uid && editItem) {
      db.collection("users")
        .doc(uid)
        .collection("items")
        .doc(editItem)
        .get()
        .then((doc) => {
          setEditImg(doc.data().img);
          setEditTitle(doc.data().title);
          setEditContent(doc.data().content);
          setEditAge(doc.data().age);
          setEditSex(doc.data().sex);
        });
    }
  }, [uid]);

  const onClickDelete_item = () => {
    const lec = window.confirm("このデータを削除しますか？？");
    if (!lec) {
      return false;
    } else {
      db.collection("users")
        .doc(uid)
        .collection("items")
        .doc(editItem)
        .delete().then(()=>{
          db.collectionGroup("items").get((doc)=>{
            doc.forEach((doc)=>{
              setItems(prev,[...prev,doc.data()])
            })
          })
           
        })

      router.push("/Top");
    }
  };

  // 写真のアップロード・ダウンロード
  const uploadPhoto = (e) => {
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
            setEditImg(imgURL);
          })
          .catch(() => {
            alert("アップロードに失敗しました。。もう一度試してください。。");
          });
      });
  };

  const onClickPhotoDelete = () => {
    const lec = window.confirm("この写真を消しますか？？");
    if (!lec) {
      return false;
    } else {
      setEditImg("");
    }
  };

  //ユーザー情報を更新する処理==今日やるところ=======================================
  const onClickUpdate_item = () => {
    db.collection("users").doc(uid).collection("items").doc(editItem).update(
      {
        title: editTitle, //入力しなかったら、nameの中身が空になってしまい結果的に今まで設定していたnameが消える。。
        img: editImg,
        content: editContent,
        age: editAge,
        sex: editSex,
        updateAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    alert("更新しました！");
  };
  // ----------------------------------------------------

  return (
    <>
      <h1 style={{ textAlign: "center" }}>募集の編集ページ</h1>
      <div style={{ textAlign: "center" }}>
        {editImg && (
          <img
            src={editImg}
            style={{ width: "40%", height: "40%" }}
            onClick={onClickPhotoDelete}
          />
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "60%",
          margin: "auto",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={(e) => uploadPhoto(e)}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>

        <TextField
          id="standard-basic"
          label="名前を入力してください"
          variant="standard"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          style={{ m: 1, width: "100%" }}
        />

        <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-simple-select-filled-label">
            年齢を選んでください
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={editAge}
            onChange={(e) => setEditAge(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"5"}>5</MenuItem>
            <MenuItem value={"6"}>6</MenuItem>
            <MenuItem value={"7"}>7</MenuItem>
            <MenuItem value={"8"}>8</MenuItem>
            <MenuItem value={"9"}>9</MenuItem>
            <MenuItem value={"10"}>10</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-simple-select-filled-label">
            性別を選んでください
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={editSex}
            onChange={(e) => setEditSex(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"メス"}>メス</MenuItem>
            <MenuItem value={"オス"}>オス</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="outlined-multiline-static"
          label="内容"
          multiline
          rows={6}
          placeholder="例：穏やかな性格で、特技はおすわりです。"
          sx={{ m: 1, width: "100%" }}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />

        <Link href="/Top">
          <Button
            variant="contained"
            onClick={onClickUpdate_item}
            sx={{ width: "100%", marginTop: "10px" }}
          >
            更新
          </Button>
        </Link>

        <Button
          variant="contained"
          onClick={onClickDelete_item}
          sx={{ width: "100%", marginTop: "50px", background: "red" }}
        >
          削除
        </Button>
      </div>
    </>
  );
};

export default editItem;
