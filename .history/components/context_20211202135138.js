import React, { useState, createContext, useEffect } from "react";
import { auth, db,googleProvider } from "./firebase";
import { useRouter } from "next/router";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [uid, setUid] = useState(null);

  // 他のユーザー(個人)
  const [anotherUser, setAnotherUser] = useState([]);
  // 他のユーザー(個人)のitem
  const [anotherItem, setAnotherItem] = useState([]);

  // 自分のユーザー情報
  const [myUser, setMyUser] = useState([]);
  //自分のitems
  const [myUserItems, setMyUserItems] = useState([]);
  // 自分がいいねしたitems
  const [likedItems, setLikedItems] = useState([]);
  //  自分がフォローした人
  const [followLists, setFollowLists] = useState([]);
  // 全てのユーザーのitems
  const [items, setItems] = useState([]);
  const router = useRouter();
  // another = 他のユーザー(個人)のuid・item = 他のユーザーのitemのid
  const { another, item } = router.query;

  // いいねの状態
  const [like, setLike] = useState(false);
  //   フォローの状態
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    if (another) {
      console.log(another);
    }
  }, [another]);

  // 今回聞きたい部分　ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  // ログイン状態を受け取り、状態によって処理を実装している
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // 自分のアカウントのuidをstateで管理する
        setUid(user.uid);
        getItems()
      } 
    });
  }, []);
  // ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

  // uid(自分のアカウントがログイン状態になった時にしたいこと)
  useEffect(() => {
    if (uid) {
      //自分のアカウント情報の取得
      getMyUser();
      //自分の保持しているitemの取得
      getMyUserItems();
      //自分がいいねしているitemの取得
      getLikedItems();
      //自分がフォローしているユーザーの取得
      getMyFollowLists();
      // material-uiのログイン状態をONにする
      setIsLogin(true);
    }
  }, [uid]);

  //他のユーザーのitemの詳細ページに飛んだ時に発火する。
  //これは条件であるから、another,item,uidの値が入った時にそれぞれの条件に応じて関数を発火させる。
  useEffect(() => {
    if (another && item) {
      // 他のユーザーの情報を取得
      getAnotherUser();
      // 他のユーザーの持っている特定のitemの取得
      getAnotherItem();
    }
    // another=他のユーザーのuid と自分のuidを取得した時に、そのitemの適切な状態を取得する。
    if (item && uid) {
      getLike();
    }
  }, [another, item, uid]);

  // Auth関連　ログイン関係ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  
  //googleログイン
  const googleLogin = () => {
    
      auth
        .signInWithPopup(googleProvider)
        .then((res) => {
          // 初めてのログインユーザーか確認している
          const firstLogin = res.additionalUserInfo.isNewUser;
          // 初めてなら、アカウントの作成を行う
          if (firstLogin) {
            console.log("初めてのログイン");
            db.collection("users").doc(res.user.uid).set({
              name: "googleユーザー",
              id: res.user.uid,
              email: "設定されていません",
              password: "設定されていません",
              img: "設定されていません",
              imgID: "設定されていません",
              sex: "設定されていません",
              introduce: "",
              followerCount: 0,
              createAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }
          // すでにアカウントが存在(firestoreのusersにあるアカウント)するならそのまま
          else {
            console.log("既に存在するアカウント");
            router.push("/Top")
          }
        })
        .catch(() => {
          alert(
            "失敗しました... 通信環境を確認して再度ログインをお願いします..."
          );
        });
    
  };

  const logout =()=>{
    auth.signOut().then(()=>{
      alert("ログアウトしました")
      setIsLogin(false)
      setUid(null)
      router.push("/Login")
    })
  }
  // ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

  //各itemのlikeの状態を取得
  const getLike = () => {
    db.collection("users")
      .doc(uid)
      .collection("likedItems")
      .where("id", "==", item)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          setLike(doc.data().like);
        });
      });
    db.collection("users")
      .doc(uid)
      .collection("likedItems")
      .where("id", "==", item)
      .onSnapshot((snapshot) => {
        if (!snapshot.exists) {
          console.log(false);
          setLike(false);
        }
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log(true);
            setLike(change.doc.data().like);
          }
        });
      });
  };

  //全ユーザーのitemsの取得
  const getItems = () => {
    db.collectionGroup("items")
      .limit(30)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          
          if (change.type === "added") {
           db.collectionGroup("items").get().then((snapshot)=>{
             snapshot.forEach((doc)=>{
               setItems(doc.)
             })
           })
          }
          if (change.type === "removed") {
            db.collectionGroup("items")
              .get()
              .then((snapshot) => {
                snapshot.forEach((doc) => {
                  setItems([doc.data()]);
                });
              });
          }
        });
      });
  };

  // anotherItem/[item]のページ関連--------------------------
  // 他のユーザー（個人）の情報とフォロワーの数をリアルタイムで取得
  const getAnotherUser = () => {
    db.collection("users")
      .doc(another)
      .onSnapshot((doc) => {
        setAnotherUser([doc.data()]);
      });
  };

  // 他のユーザー（個人）のitemsの取得 + リアルタイムでいいねの数とハートの状態の取得
  const getAnotherItem = () => {
    db.collection("users")
      .doc(another)
      .collection("items")
      .doc(item)
      .onSnapshot((doc) => {
        setAnotherItem([doc.data()]);
      });
  };

  // ---------------------------------------------------------

  // 自分のアカウント情報取得関連　menu/[mypage]のページの関連------------------------------------

  // 自分の出したitemの取得
  const getMyUserItems = () => {
    db.collection("users")
      .doc(uid)
      .collection("items")
      .limit(4)
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setMyUserItems((prev) => [...prev, change.doc.data()]);
          }
          if (change.type === "removed") {
            if (myUserItems.length === 0) {
              setMyUserItems([]);
            }
            db.collection("users")
              .doc(uid)
              .collection("items")
              .get()
              .then((snapshot) => {
                snapshot.forEach((doc) => {
                  setMyUserItems([doc.data()]);
                });
              });
          }
        });
      });
  };

  //自分のアカウント情報の取得
  const getMyUser = () => {
    db.collection("users")
      .where("id", "==", uid)
      .onSnapshot((snapshot) => {
        snapshot.forEach((docs) => {
          setMyUser([docs.data()]);
        });
      });
  };

  // 自分がいいねしたitemの取得
  const getLikedItems = () => {
    db.collection("users")
      .doc(uid)
      .collection("likedItems")
      .limit(4)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setLikedItems((prev) => [...prev, change.doc.data()]);
          }
          if (change.type === "removed") {
            // 最後の1個になったら、配列の中(likedItems)を空っぽにする
            if (likedItems.length === 0) {
              setLikedItems([]);
            }
            let newItems = [];
            //選択したlikedItemを削除した後の残ったlikedItemsを取得
            db.collection("users")
              .doc(uid)
              .collection("likedItems")
              .get()
              .then((snapshot) => {
                snapshot.forEach((doc) => {
                  newItems.push({ ...doc.data() });
                  setLikedItems(newItems);
                });
              });
          }
        });
      });
  };

  // 自分がフォローした人の取得
  const getMyFollowLists = () => {
    db.collection("users")
      .doc(uid)
      .collection("followLists")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setFollowLists((prev) => [...prev, change.doc.data()]);
            setFollow(true);
          }
          if (change.type === "removed") {
            if (followLists.length === 0) {
              setFollowLists([]);
            }
            let newLists = [];
            db.collection("users")
              .doc(uid)
              .collection("followLists")
              .get()
              .then((snapshot) => {
                snapshot.forEach((doc) => {
                  newLists.push({
                    ...doc.data(),
                  });

                  setFollowLists(newLists);
                });
              });
            setFollow(false);
          }
        });
      });
  };

  //   ------------------------------------------------------------

  return (
    <Context.Provider
      value={{
        myUser,
        myUserItems,
        like,
        setLike,
        likedItems,
        follow,
        followLists,
        anotherUser,
        anotherItem,
        item,
        isLogin,
        setIsLogin,
        uid,
        myUserItems,
        setMyUserItems,
        items,
        setItems,
        getAnotherUser,
        getAnotherItem,
        getLike,
        googleLogin,
        logout,
        getItems
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
