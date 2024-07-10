import axios from "axios";
import Cookies from "universal-cookie";
import { Sub } from "./entity/Sub";

const url = "http://localhost:8080/api/"

const cookies = new Cookies();
//post api calls

//post username and password for authentication
export const postLogin = async(username: string, password: string) => {
    try {
        //
        const response = await axios.post(url + "user/login",  {
            username: username,
            password: password,
        }, {headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", //bypassing CORS
        }})
        if(response.status.valueOf() === 200) {
            const data = response.data.token; //session id
            return data;
        }
        
    } catch (error) {
        console.log(error);
    }
}

export const postSignup = async (data) => {
    try {
        const response = await axios.post(url + "user/signup", {
            username: data.username,
            password: data.password,
            email: data.email
        }, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        })
        if(response.status === 200) {
            return true;
        }
    } catch (error) {
        
    }
}

export const postAddUpvote = async() => {
    const token = cookies.get("jwt Authorization");
    console.log("Token: ", token);
    
    try {
        const response = await axios.post(url + "thread/upvote/add", {
            something: "bla bla"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const postAddCommunity = async (data) => {
    const token = cookies.get("jwt Authorization");
    try {
        const response = await axios.post(url + "comms", {
            name: data.name,
            description: data.description,
            rules: data.rules
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        })
        if(response.status === 200) {
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const getRecentUpdatedSub = async(): Promise<Sub[]> => {
    const response: Sub[] = [
        {
            key: 1,
            name: "r/Hello",
            description: "Welcome to da game",
            rules: "No shjtting",
            imageURL: ""
        },
    ];
    return response;
}