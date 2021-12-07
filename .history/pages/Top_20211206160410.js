import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../components/Context";
import { db } from "../components/firebase";

import Styles from "../styles/Home.module.css";
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

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const useStyles = makeStyles(() => ({
  item: {
    maxWidth: "90%",
    height: "80vh",
    margin: "auto",
  },
}));

const Top = () => {
  const [isSearch, setIsSearch] = useState(false);
  const { isLogin, getItems, items, googleLogin, logout, uid } =
    useContext(Context);
  const router = useRouter();

  const [isButton, setIsButton] = useState(false);
  const [isDog, setIsDog] = useState(false);
  const [category, setCategory] = useState("");
  const [category2, setCategory2] = useState("");
  const { setItems } = useContext(Context);
  const [newItems, setNewItems] = useState([]);
  const classes = useSty

  // useEffect(() => {
  //   if (!uid) {
  //     router.push("/Login");
  //   }
  // }, [uid]);

  //リロードして、itemsが0なら元のitemsを呼び出す
  useEffect(() => {
    if (items.length > 0) {
      getItems();
    }
  }, []);

  //絞り込みをした後にnewItemsの値が変更してsetStateが発火する。
  useEffect(() => {
    setItems(newItems);
  }, [newItems]);

  // 検索をする処理　絞り込み
  const onClickSearch_category = () => {
    db.collectionGroup("items")
      .where("category", "array-contains-any", [category, category2])
      .limit(30)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          setNewItems((prev) => [...prev, doc.data()]);
          setIsSearch(false);
        });
      });
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

  // 検索欄表示の状態管理
  const onClickSearch = () => {
    if (isSearch == false) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
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
              <Button
                variant="contained"
                onClick={onClickSearch_category}
                style={{ marginTop: "30px" }}
              >
                この条件で検索する
              </Button>
            )}
          </main>
        </>
      ) : (
        <>
          <header className={Styles.header}>
            <h1 className={Styles.header_h1}>MyPets</h1>
            <div className={Styles.header_icons}>
              <SearchIcon
                onClick={onClickSearch}
                className={Styles.header_searchIcon}
              />
              {isLogin ? (
                <Switch
                  onChange={logout}
                  checked={true}
                  inputProps={{ "aria-label": "controlled" }}
                />
              ) : (
                <Switch
                  onChange={googleLogin}
                  checked={false}
                  inputProps={{ "aria-label": "controlled" }}
                />
              )}
            </div>
          </header>

          <main className={Styles.main_top}>
            <div className={Styles.main_topScreen}>
              <div className={Styles.top_text_L}>無駄な命なんて1つもない</div>
              <div className={Styles.top_text_R}>無駄な命なんて1つもない</div>
            </div>

            <div className={Styles.itemTitle}>
              <div>親がいなくて困っている子たち</div>
              <hr />
            </div>

            <ImageList
              className={}
              cols={4}
              rowHeight={330}
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
                        className={Styles.main_img}
                      />

                      <ImageListItemBar title={item.title} />
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
