import React from 'react';
import {SearchOutlined} from "@ant-design/icons";
import { Input } from "antd";
import "tailwindcss/tailwind.css";

const { Search } = Input;

const onSearch = (value: string) => {
    console.log(value);
  };

export default function SearchBox(){
    return (
    <Search
    placeholder="What to discover today?"
    allowClear
    enterButton={<SearchOutlined />}
    size="large"
    onSearch={onSearch}
    className="ml-auto w-85"
    />
    );
}