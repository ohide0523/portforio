import Link from "next/link";
import React, { useContext, useState } from "react";
import { Context } from "./components/Context";

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

const Top = () => {
  const [isSearch, setIsSearch] = useState(false);
  const { isLogin, setIsLogin } = useContext(Context);
  const onClickLogout = () => {
    setIsLogin(false);
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
            <h1 style={{ flex: 1, marginLeft: "20px" }}>Topページ</h1>
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
                onChange={onClickLogout}
                checked={isLogin}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </header>

          <main style={{ zIndex: 0, marginTop: "200px" }}>
            <h1>里親を募集しているワンちゃんたち</h1>
            <ul>
              <li>
                <Link
                  href="/[another]/anotherItem/[item]"
                  as={`/出品した人のuid/anotherItem/出品itemのid`}
                >
                  <h2>コリーちゃん</h2>
                </Link>
                <div>カテゴリー：ボーダーコリー</div>
                <p>性別：メス</p>
              </li>
              <li>
                <Link
                  href="/[another]/anotherItem/[item]"
                  as={`/出品した人のuid/anotherItem/出品itemのid`}
                >
                  <h2>コリーちゃん</h2>
                </Link>
                <div>カテゴリー：ボーダーコリー</div>
                <p>性別：メス</p>
              </li>
              <li>
                <Link
                  href="/[another]/anotherItem/[item]"
                  as={`/出品した人のuid/anotherItem/出品itemのid`}
                >
                  <h2>コリーちゃん</h2>
                </Link>
                <div>カテゴリー：ボーダーコリー</div>
                <p>性別：メス</p>
              </li>
            </ul>
          </main>
        </>
      )}
    </>
  );
};

export default Top;
