import Link from "next/link"
import React from 'react'

const item = () => {
    return (
        <div>
            <h1>商品の紹介ページ</h1>

            <h2>里親に出した人（飼い主）</h2>
            <Link href="/[another]/[profile]" as={`/profile/他ユーザーのuid`}>
                <h3>他ユーザーさん</h3>
            </Link>
        </div>
    )
}

export default item
