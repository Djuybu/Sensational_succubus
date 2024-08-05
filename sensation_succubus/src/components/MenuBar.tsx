import React from 'react';
import {Layout} from "antd";
import "tailwindcss/tailwind.css"
import SearchBox from "./ui/SearchBox.tsx";
import NavbarMenu from './ui/NavbarMenu.tsx';
import AvatarDropdown from './AvatarDropdown.tsx';

const { Header } = Layout
interface HeaderProps{
}

const logoSrc = "https://seeklogo.com/images/R/reddit-icon-new-2023-logo-3F12137D65-seeklogo.com.png";
export default function MenuBar({}: HeaderProps) {
    return (
        <Header 
        style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "flex-start",
            backgroundColor: "black",
        }}>
            <div className="w-1/5 flex items-center">
                <img className="block w-2/5 h-3/5" src={logoSrc} alt="Logo" />
                <div className="block text-white text-xl ">Redđít</div>
            </div>
            <SearchBox></SearchBox>
            <NavbarMenu></NavbarMenu>
            <AvatarDropdown></AvatarDropdown>
        </Header>
    );
}