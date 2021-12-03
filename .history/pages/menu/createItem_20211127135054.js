import Link from "next/link"
import React from 'react'

const createItem = () => {
    return (
        <div>
            <h1>里親募集する</h1>
            <Link href="/myTool/createItems/item">
            <button>里親を募集する</button>
            </Link>
        </div>
    )
}

export default createItem