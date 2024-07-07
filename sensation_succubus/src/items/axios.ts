import axios from "axios";

const url = "http://localhost:8080/api/"

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
                "Authorization": data.token,
            }
        })
        if(response.status === 200) {
            return true;
        }
    } catch (error) {
        
    }
}