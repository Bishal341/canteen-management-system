import API from "../API/API";

export const Signup = async(username, email, password) => {
    try {
        const res = await API.post("/signup", {username, email, password});

        sessionStorage.setItem('token', res.data.token);

        return res.data;
    }catch(err){
        alert(err.response?.data?.message || err.message);
    }
};

export const Login = async(email, password) => {
    try{
        const res = await API.post("/login", {email, password});

        sessionStorage.setItem('token', res.data.token);

        return res.data;
    }catch(err){
        alert(err.response?.data?.message || err.message);
    }
};