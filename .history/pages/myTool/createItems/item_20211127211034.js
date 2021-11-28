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
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

const images = [
  {
    url: "/シーズー１.jpeg",
    title: "里親を募集する",
    width: "100%",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const item = () => {
  const [itemURL, setItemURL] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [category2, setCategory2] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [content, setContent] = useState("");

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
    <>
    <h1>募集入力ページ</h1>
    <div style={{width:"20%",h}}>
      <img src={itemURL} />
    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "60%",
        margin: "auto",
        alignItems: "center",
      }}
    >
     
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

      <TextField
        id="standard-basic"
        label="名前を入力してください"
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ m: 1, width: "100%" }}
      />

      <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
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

      <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
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

      <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-simple-select-filled-label">
          年齢を選んでください
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          onChange={(e) => setAge(e.target.value)}
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
          value={sex}
          onChange={(e) => setSex(e.target.value)}
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
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Link href="/Top">
        {/* <button onClick={onClickAdd}>募集確定</button> */}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            minWidth: 300,
            width: "100%",
            m: 1,
          }}
        >
          {images.map((image) => (
            <ImageButton
              focusRipple
              key={image.title}
              style={{
                width: image.width,
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>
      </Link>
    </div>
    </>
  );
};

export default item;
