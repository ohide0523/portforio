import Link from "next/link";
import React, { useState, useContext } from "react";
import { Context } from "../components/Context";
import { useRouter } from "next/router";
import { db } from "../components/firebase";

import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const category = () => {
  const router = useRouter();
  const [isSearch, setIsSearch] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [isDog, setIsDog] = useState(false);
  const [category, setCategory] = useState("");
  const [category2, setCategory2] = useState("");
  const { setItems } = useContext(Context);

  const onClickBack = () => {
    router.push("/Top");
  };

  // 検索をする処理　絞り込み
  const onClickSearch_category = () => {
    let newItems =[]
    db.collectionGroup("items")
      .where("category", "array-contains-any", [category,category2])
      .onSnapshot((snapshot)=>{
        snapshot.forEach((doc)=>)
      })
        
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
    if (event.target.value == "犬") {
      setIsDog(true);
    } else {
      setIsDog(false);
    }

    setIsButton(true);
  };

  const handleChange2 = (event) => {
    setCategory2(event.target.value);
  };

  return (
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
        <Tooltip title="戻る" arrow>
          <ArrowBackIosIcon
            style={{
              margin: "20px",
            }}
            onClick={onClickBack}
          />
        </Tooltip>
        <Link href="/Top">
          <h1 style={{ flex: 1, textAlign: "center" }}>アプリのタイトル</h1>
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
          }}
        >
          <SearchIcon style={{ fontSize: "40px", marginRight: "10px" }} />
        </div>
      </header>

      <main
        style={{
          marginTop: "100px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>動物の種類</h2>
        <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-simple-select-filled-label">
            カテゴリー
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={category}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"猫"}>猫</MenuItem>
            <MenuItem value={"犬"}>犬</MenuItem>
          </Select>
        </FormControl>

        <h2>詳細カテゴリー</h2>
        <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-simple-select-filled-label">
            カテゴリー
          </InputLabel>
          {isDog ? (
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={category2}
              onChange={handleChange2}
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
              onChange={handleChange2}
            >
              <MenuItem value={"黒猫"}>黒猫</MenuItem>
              <MenuItem value={"白猫"}>白猫</MenuItem>
            </Select>
          )}
        </FormControl>
        {isButton && (
          <Link href="/Top">
            <Button variant="contained" onClick={onClickSearch_category}>
              この条件で検索する
            </Button>
          </Link>
        )}
      </main>
    </>
  );
};

export default category;
