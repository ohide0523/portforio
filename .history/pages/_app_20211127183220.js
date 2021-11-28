import Link from "next/link"
import "../styles/globals.css";
import React from "react"


import ContextProvider from "../components/Context";

// BottomNavigation 下のメニューボタン
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Tooltip from "@mui/material/Tooltip";
import Login from "./Login";



// header
import Switch from "@mui/material/Switch";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


function MyApp({ Component, pageProps }) {

  

  return (
    
    <ContextProvider>
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
              background: "#f4f4f4",
              
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


  <Component {...pageProps} />
      <footer
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          marginTop: "200px",
        }}
      >
        <div>
          <BottomNavigation
            sx={{ width: "100%" }}
           
            onChange={() => handleChange(e)}
            style={{
              background: "#f4f4f4",
            }}
          >
            <Link href="/Top">
              <Tooltip title="ホーム" arrow>
                <BottomNavigationAction
                  label="ホーム"
                  value="Home"
                  icon={<HomeIcon />}
                />
              </Tooltip>
            </Link>

            <Link href="/menu/alert">
              <Tooltip title="通知" arrow>
                <BottomNavigationAction
                  label="お知らせ"
                  value="alert"
                  icon={<NotificationsActiveIcon />}
                />
              </Tooltip>
            </Link>

            <Link href="/menu/createItem">
              <Tooltip title="里親を募集する" arrow>
                <BottomNavigationAction
                  label="里親を募集する"
                  value="pets"
                  icon={<PetsIcon />}
                />
              </Tooltip>
            </Link>

            <Link href="/menu/[mypage]" as={`/menu/myPage`}>
              <Tooltip title="マイページ" arrow>
                <BottomNavigationAction
                  label="マイページ"
                  value="mypage"
                  icon={<PersonIcon />}
                />
              </Tooltip>
            </Link>
          </BottomNavigation>
        </div>
      </footer>
    </ContextProvider>
  );
}

export default MyApp;