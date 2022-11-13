import React, { useContext } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import { useForm } from "react-hook-form";
import { hanldeSignInWithEmailAndPass } from './LoginManager';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';


const SignIn = () => {
    const {loading, err, user, dispatch} = useContext(AuthContext);
    const [credentials, setCredentials] = useState({email: '', password: ''});
    // const [loading, setLoading] = useState(false);
    // const [err, setErr] = useState({})
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            const fetchData = await axios.post('http://localhost:5000/auth/login', credentials);
            dispatch({type: "LOGIN_SUCCESS",payload: fetchData.details});
            console.log(fetchData)
        }
        catch(err){
            console.log(err)
        }
        e.preventDefault();
        // console.log(credentials)
        // setLoading(true)
        // const { email, password } = data
        // hanldeSignInWithEmailAndPass(email, password)
        //     .then(res => {
        //         handleResponse(res)
        //         setLoading(true)
        //         if (res.error) {
        //             setLoading(false)
        //             setErr(res.error)
        //         }
        //     })

    }
    console.log("dagaaaaa", user)
    const handleChange = (e) =>{
        setCredentials((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    return (
        <form className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
                <span className="fIcon"><FaEnvelope /></span>
                <input placeholder="Enter Your Email" type="email" name='email' onChange={handleChange}/>
            </div>
            {/* {errors.email && <span className="text-warning">This field is required</span>} */}
            <div className="input-field">
                <span className="fIcon"><FaLock /></span>
                <input type="password" name="password" placeholder="Enter Your Password" onChange={handleChange}/>
            </div>
            {/* {errors.password && <span className="text-warning">This field is required</span>} */}
            {/* {err.length && <p className="text-danger">{err}</p>} */}
            <button className="iBtn" type="submit" value="sign In" onClick={onSubmit}>
            Sign In
                {/* {loading ?  */}
                {/* <Spinner animation="border" variant="info" /> : "Sign In"} */}
            </button>
            <p className="social-text">Or Sign in with social platforms</p>
            {/* <SocialSignUp handleResponse={handleResponse} /> */}
        </form>
    );
};

export default SignIn;