import axios from "axios";
import Cookies from "universal-cookie";

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
    const token = cookies.get("jwtAuthorization");
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