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



function MyApp({ Component, pageProps }) {

  

  return (
    
    <ContextProvider>
<He
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,user-scalable=yes"/>

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