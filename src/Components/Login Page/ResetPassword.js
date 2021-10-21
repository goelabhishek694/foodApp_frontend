import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/login.css'
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';

function ResetPassword() {
    const history = useHistory();
    const [password, passwordSet] = useState("");
    const [confirm, setConfirm] = useState("");
    const handleResetPassword=async()=>{
        try{
            const data=await axios.post("/user/resetpassword/:token",{
                password:password,
                confirmPassword:confirm
            });
            // history.push("/login")
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="container-grey">
            <div className="form-container">
                <div className='h1Box'>
                    <h1 className='h1'>RESET PASSWORD</h1>
                    <div className="line"></div>
                </div>
                <div className="loginBox">
                <div className="entryBox">
                        <div className="entryText">Password</div>
                        <input className="password input" type="password" name="Password" placeholder="**********" onChange={(e) => passwordSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Confirm  Password</div>
                        <input className="confirmPassword input" type="password" name="ConfirmPassword" placeholder="**********" onChange={(e) => setConfirm(e.target.value)} />
                    </div>
                    <button className="loginBtn  form-button" type="submit" onClick={handleResetPassword}>
                        Reset Password
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ResetPassword
