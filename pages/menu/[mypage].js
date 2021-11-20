import Link from "next/link";
import React from "react";

const mypage = () => {
  return (
    <div>
      <h1>プロフィールページ</h1>
      <h2>いいねしたワンちゃんたち</h2>
      <ul>
        <li>
          <Link
            href="/[another]/anotherItem/[item]"
            as={`/他ユーザーのuid/anotherItem/出品itemのid`}
          >
            <h3>コリーちゃん</h3>
          </Link>
          <p>カテゴリー：ボーダーコリー</p>
          <p>性別：メス</p>
        </li>
      </ul>
      <h2>フォローしているユーザー</h2>
      <ul>
        <li>
          <Link href="/[another]/[profile]" as={`/profile/他ユーザーのuid`}>
            <p>Nさん</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default mypage;