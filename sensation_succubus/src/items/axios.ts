import axios from "axios";

const url = "http://localhost:8080/api/"

//post api calls

//post username and password for authentication
export const postLogin = async (username: string, password: string) => {
    try {
        const response = await axios.post(url + "user/login",  {
            username: username,
            password: password,
        }, {headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", //bypassing CORS
        }})
        if(response.status.valueOf() === 200) {
            const data = response.data //session id
            return data;
        }
        
    } catch (error) {
        console.log(error);
    }
}