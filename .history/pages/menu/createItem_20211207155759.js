import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { Context } from "../../components/Context";

import Styles from "../../"

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

const createItem = () => {
  const { uid } = useContext(Context);
  const router = useRouter();

  // useEffect(()=>{
  //     if(!uid){
  //         router.push("/Login")
  //     }
  // },[uid])
  return (
    <div
    className={Styles.createItem_container}
    >
      <div style={{ marginTop: "50px" }}>
        <h1 style={{ lineHeight: "5px" }}>里親募集する</h1>
        <hr />
      </div>

<div style={{marginTop:"40px"}}>
     <h2>募集する前に</h2>
      <p>
        本当に大切なワンちゃんを育てられない環境になったのでしょうか？
        感動的なことをここに書きたい
        本当に大切なワンちゃんを育てられない環境になったのでしょうか？
        感動的なことをここに書きたい
        本当に大切なワンちゃんを育てられない環境になったのでしょうか？
        感動的なことをここに書きたい
        本当に大切なワンちゃんを育てられない環境になったのでしょうか？
        感動的なことをここに書きたい
        本当に大切なワンちゃんを育てられない環境になったのでしょうか？
        感動的なことをここに書きたい
      </p>
</div>
     

      <Link href="/myTool/createItems/item">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {images.map((image) => (
            <ImageButton
              focusRipple
              key={image.title}
              style={{
                width:"70%",
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
  );
};

export default createItem;
