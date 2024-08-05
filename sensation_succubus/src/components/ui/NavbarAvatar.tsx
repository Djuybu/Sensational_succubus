import React, { useEffect, useState } from 'react';
import {Avatar} from "antd";
import "tailwindcss/tailwind.css"

// const [avaMenu, setAvaMenu] = useState<boolean>(false);
const avaSrc = "../resources/ava_blue.png";
export default function NavbarAvatar(){
    return(
        <Avatar
                style={{
                maxHeight: "2rem",
                maxWidth: "2rem",
                width: "auto",
                height: "auto",
                cursor: 'pointer'
                }}
                src="https://preview.redd.it/3d-reddit-avatar-v0-d0hbomc23vw91.png?width=640&crop=smart&auto=webp&s=941d06d870ee30d7464464600c4ab71111bd329f"
            ></Avatar>
    )
}