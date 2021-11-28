import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../components/Context";
import { db } from "../../../components/firebase";
import firebase from "@firebase/app";
import "@firebase/storage";

// material-ui関連
// style決め
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const item = () => {
  const [itemURL, setItemURL] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [category2, setCategory2] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [content, setContent] = useState("");
  const [value, setValue] = useState("");

  const [isDog, setIsDog] = useState(false);

  const { uid } = useContext(Context);

  useEffect(() => {
    if (itemURL) {
      console.log(itemURL);
    }
  }, [itemURL]);

  //material-uiのstyle
  const Input = styled("input")({
    display: "none",
  });

  //写真の登録
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
            setItemURL(imgURL);
            alert("アップロードしました！");
          })
          .catch(() => {
            alert("アップロードに失敗しました。。もう一度試してください。。");
          });
      });
  };

  //firestoreに登録
  const onClickAdd = () => {
    const newDoc = db.collection("users").doc(uid).collection("items").doc().id;

    db.collection("users")
      .doc(uid)
      .collection("items")
      .doc(newDoc)
      .set({
        userId: uid,
        id: newDoc,
        title: title,
        img: itemURL,
        category: [category, category2],
        age: age,
        sex: sex,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),

        likeCount: 0,
      });
    alert("募集しました！");
  };

  const handleChange = (e) => {
    if (e.target.value == "犬") {
      setIsDog(true);
    }
    setCategory(e.target.value);
  };

  return (
    <div style={{marginBottom:"100px"}}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "300px",
          width: "50%",
          
        }}
      >
        <h1>募集入力ページ</h1>
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={uploadPhoto}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <input
          type="text"
          placeholder="タイトルを入力してください"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
       
       

       
      </div>

      <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-simple-select-filled-label">カテゴリー</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={category}
          onChange={(e) => handleChange(e)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"猫"}>猫</MenuItem>
          <MenuItem value={"犬"}>犬</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-simple-select-filled-label">
          詳細カテゴリー
        </InputLabel>

        {isDog ? (
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={category2}
            onChange={(e) => setCategory2(e.target.value)}
          >
            <MenuItem value={"シーズー"}>シーズー</MenuItem>
            <MenuItem value={"オーストラリアンシェパード"}>
              オーストラリアンシェパード
            </MenuItem>
          </Select>
        ) : (
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={category2}
            onChange={(e) => setCategory2(e.target.value)}
          >
            <MenuItem value={"黒猫"}>黒猫</MenuItem>
            <MenuItem value={"白猫"}>白猫</MenuItem>
          </Select>
        )}
      </FormControl>

      <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-simple-select-filled-label">
          年齢を選んでください
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age} onChange={(e) => setAge(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"猫"}>猫</MenuItem>
          <MenuItem value={"犬"}>犬</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-simple-select-filled-label">
          性別を選んでください
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={sex} onChange={(e) => setSex(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"猫"}>猫</MenuItem>
          <MenuItem value={"犬"}>犬</MenuItem>
        </Select>
      </FormControl>

      <textarea
          placeholder="内容を入力"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
    </div>
  );
};

export default item;
