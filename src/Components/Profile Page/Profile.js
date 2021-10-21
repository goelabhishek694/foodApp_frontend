import React, { useState , useEffect,useContext} from 'react';
import '../Styles/profile.css';
import { useAuth } from '../Context/AuthProvider';
import axios from 'axios';

function Profile() {

    // const { user } = useAuth();
    const [user,setUser] = useState()
    useEffect(async ()=>{
        setUser(JSON.parse(localStorage.getItem("user")));
        console.log(user);
        nameSet(user.data.name)
        passwordSet(user.data.password)
        emailSet(user.data.email)
        passwordCnfSet(user.data.password)
        console.log(user)
    },[]);
    // console.log("typeof user is ",(user));
    const [password, passwordSet] = useState()
    const [passwordCnf, passwordCnfSet] = useState("")
    const [email, emailSet] = useState("");
    const [name, nameSet] = useState("");
    const nameEdit = async () => {
        await axios.patch('/user/login');
    }
    const handleClick = async () => {
        try {
            console.log(user.user._id);
            const data = await axios.patch("/user/" + user.user._id, { headers: { "Authorization": `Bearer ${user.token}` } }, {
               email,
                name,
                password,
                confirmPassword: passwordCnf,
                role: user.user.role,
                _id:user.user._id
            });
        } catch (error) {
            console.log(error);
        }
    }
    console.log(user);
    return (
        <div className="container-grey">
            <div className="form-container">
                <div className='h1Box'>
                    <h1 className='h1'>Profile</h1>
                    <div className="line"></div>
                    <div className="profileImage">
                        {/* <img src={user.user.profileImage} /> */}
                    </div>
                </div>
                <div className="loginBox">
                    <div className="entryBox">
                        <input type="file" />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Email</div>
                        <input className="email input" type="email" value={email} onChange={(e) => emailSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Password</div>
                        <input className="password input" type="text" value={password} onChange={(e) => passwordSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Confirm Password</div>
                        <input className="password input" type="text" value={passwordCnf} onChange={(e) => passwordCnfSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Name</div>
                        <input className="password input" type="text" value={name} onChange={(e) => nameSet(e.target.value)} />
                    </div>
                    <button className="loginBtn  form-button" type="submit" onClick={handleClick}>
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile
