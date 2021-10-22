import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

export const AuthContext = React.createContext();
//custom hook that allows components to access context data
export function useAuth() {
    return useContext(AuthContext)
}
function AuthProvider({ children }) {
    const history = useHistory();
    const [user, userSet] = useState("");
    const [loading, setLoading] = useState(false);

    async function signUp(name,email,password,confirmPassword) {
        const data = await axios.post("/user/signup", {
            name:name,
            email: email,
            password: password,
            confirmPassword:confirmPassword
        });
        console.log(data,user);
        userSet(user);
    }
    async function login(email, password) {
        try {
            const data = await axios.post("/user/login", {
                email: email,
                password: password
            });
            console.log("dataaa",data.data);
            userSet(data.data);
            localStorage.setItem("user", JSON.stringify(data.data));
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }
    async function logout() {
        localStorage.removeItem("user")
        const data = await axios.get("/user/logout");
        console.log(data);
        userSet(null);
    }

    useEffect(async () => {
        let data = localStorage.getItem("user");
        console.log(data,898787);
        if (data) {
            userSet(JSON.parse(data));
            console.log(user);
            history.push("/");
        } else {
            userSet(null);
        }
    }, [])

    const value = {
        user,
        login,
        signUp,
        logout
    }

    return (
        < AuthContext.Provider value={value} >
            {!loading && children}
        </AuthContext.Provider >
    )
}

export default AuthProvider
