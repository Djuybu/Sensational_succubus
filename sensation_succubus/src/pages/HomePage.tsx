import React from "react";
import {Layout} from "antd"
import MenuBar from '../components/MenuBar.tsx';


const HomePage:React.FC = () => {
    return (
        <>
        <Layout>
            <MenuBar></MenuBar>
            <Layout>
                {/* <Sider></Sider>
                <Content></Content> */}
            </Layout>
        </Layout>
        </>
    )
}

export default HomePage;