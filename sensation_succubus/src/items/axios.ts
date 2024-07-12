import axios from "axios";
import Cookies from "universal-cookie";
import { Sub } from "./entity/Sub";
import { Thread } from "./ThreadProps";
import { Form } from "../Subreddit/items/PostForm";
import {Comment} from "./entity/Comment";

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
            const currentDate = new Date();
            
            cookies.set("Jwt Authorization", response.data.token, {
                expires: new Date(currentDate.setDate(currentDate.getDate() + 1000)),
                path: "/"
            })
            return true;
        } else {
            throw new Error("Sorry, your username and password conbination does not exist on our system")
        }
        
    } catch (error) {
        console.log(error);
        return false;
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

export const postAddUpvote = async(id: string) => {
    const token = cookies.get("Jwt Authorization");
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
    const token = cookies.get("Jwt Authorization");
    try {
        const response = await axios.post(url + "sub", {
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

export const postNewPost = async(data: Form) => {
    try {
        const response = await axios.post(url + "post", {
            userId: data.userId,
            subId: data.subId,
            title: data.title,
            body: data.body,
        })
        return (response.status === 200);
    } catch (error) {
        
    }
    return true;
}

export const getRecentUpdatedSub = async(): Promise<Sub[]> => {
    const response: Sub[] = [
        {
            key: 1,
            name: "r/Hello",
            description: "Welcome to da game",
            rules: "No shjtting",
            imageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvi.wikipedia.org%2Fwiki%2FFat_Man&psig=AOvVaw2I38EOh48-4MsJ7eFmX7Ov&ust=1720711033932000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCICQraHinIcDFQAAAAAdAAAAABAE"
        },
    ];
    return response;
}

export const postReplyComment = async (childOf: string, body: string) => {
    try {
        const response = await axios.post(url + "comment/add", {
            childOf: childOf,
            body: body
        })
        return response.status === 200;
    } catch (error) {
        
    }
}

//lấy post dựa trên id
export const getPostFromSub = async(id: string) => {
    // const threads: Thread[] = []
    // const token = cookies.get("jwt Authorization");
    // const response = await axios.get(
    //     url + `sub/${id}/getpost`, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `bearer ${token}`
    //         }
    //     }, 
    // )
    // return response.data;
    return [{
        id: "0",
      user: "r/demo",
      userAva: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZxN7GwXfzInywLzZgplmv1AKZGxUHzjOcxw&s",
      title: "This is the title of the post",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
      libero nec justo mollis convallis. Nam at neque ac ipsum ultrices
      tincidunt. Quisque ut libero eget lorem malesuada tincidunt. Fusce
      convallis purus quis nisi vehicula, in aliquet justo tempus.
      Vestibulum ac justo vel nisi vehicula consectetur in eu ligula.
      Sed id velit eu sapien eleifend interdum. Quisque fringilla
      ultricies sapien, at vestibulum est condimentum sit amet. Maecenas
      vitae dapibus justo. Vivamus accumsan dui et nisi sagittis, quis
      faucibus purus ullamcorper. Nam non diam nec sapien consequat
      facilisis. Phasellus lobortis, ex eget luctus molestie, odio felis
      suscipit sem, et scelerisque orci arcu a dolor. Integer gravida
      turpis in leo varius, nec aliquam risus dapibus. Etiam fringilla
      sapien non ex tincidunt, a gravida purus suscipit. Pellentesque
      egestas gravida nulla, vel hendrerit mi tincidunt eu.`,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvoz.vn%2Fu%2Fchon-an-lua.1692470%2F&psig=AOvVaw0784CJpLleK3md2951qX6Z&ust=1720714831951000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCj9LTwnIcDFQAAAAAdAAAAABAJ",
      upvotes: "6.9k",
      downvotes: "1.2k",
    }]
}

export const getCommentOwnerData = async (userId: string) => {
    // const token = cookies.get("Jwt Authorization")
    // try {
    //     const response = await axios.post(url + "users/username_avatar", {
    //         id: userId
    //     }, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization" : `bearer ${token}`
    //         }
    //     })
    //     if(response.status === 200) {
    //         const username = response.data.username;
    //         const userAva = response.data.userAva;
    //         return {
    //             userName: username, 
    //             userAva: userAva
    //         }
    //     }
    // } catch (error) {
        
    // }
    return ({
        username: "r/blabla",
        userAva: "https://raw.githubusercontent.com/TomerAberbach/imgflip/HEAD/pigeon.png"
    })
}

export const getComments = async (id: string, childOf: string): Promise<Comment[]> => {
    if(childOf != "0") {
        return [
            {
                commentId: "2",
                postId: "asxdcv",
                authorId: "dhvduhdfv",
                body: "neither do I",
            }
        ]

    }
    // const token = cookies.get("Jwt Authorization");
    // try {
    //     const response = await axios.post(url + "posts/comments", {
    //         postId: id,
    //         childOf: childOf
    //     });
    //     if (response.status === 200) {
    //         return response.data;
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
    return [
      {
        commentId: "1",
        postId: "asxdcv",
        authorId: "dhvduhdfv",
        body: "I hate Biden so much"
      },
      {
        commentId: "4",
        postId: "asxdcv",
        authorId: "dhvduhdfv",
        body: "Let's raid the white house!"
      },
      {
        commentId: "5",
        postId: "asxdcv",
        authorId: "dhvduhdfv",
        body: "Trump should be our supreme leader until he passes away"
      }
    ];
  };
  