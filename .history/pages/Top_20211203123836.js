import Link from "next/link";
import {useRouter} from "next/router"
import React, { useContext, useState,useEffect } from "react";
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
  const { isLogin, getItems, items,googleLogin,logout,uid } = useContext(Context);
  const router = useRouter()

  // 検索欄表示の状態管理
  const onClickSearch = () => {
    if (isSearch == false) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  };



//カテゴリーページに遷移
const onClickCategory =()=>{
    router.push("/category")
}

useEffect(()=>{
  if(!uid){
    router.push("/Login")
  }
},[])

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
              {isLogin?( <Switch
                onChange={logout}
                checked={true}
                inputProps={{ "aria-label": "controlled" }}
              />):(<Switch
                onChange={googleLogin}
                checked={false}
                inputProps={{ "aria-label": "controlled" }}
              />)}
             
            </div>
          </header>


          <main
            style={{
              zIndex: 0,
              marginTop: "100px",
              height: "100vh",
              overflow: "auto",
              marginBottom:"50px"
            }}
          >
            <hr/>
            <h1 style={{textAlign:"center",lineHeight:"100px",background:"skyBlue",height:"100px",opacity:"0.7"}}>無駄な命なんて1つもない</h1>
            <hr/>

            <ImageList
              sx={{ width: "100%", height:"100vh",}}
              cols={4}
              rowHeight={400}
              row={5}
            >
              {items.length > 0 &&
                items.map((item, index) => (
                  <Link
                    key={index}
                    href="/[another]/anotherItem/[item]"
                    as={`/${item.userId}/anotherItem/${item.id}`}
                  >
                    <ImageListItem key={item.img} >
                      <img
                        src={item.img}
                        srcSet={item.img}
                        alt={item.title}
                        loading="lazy"
                        style={{height:"100px"}}
                      />

                      <ImageListItemBar
                        title={item.title}
                        
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
