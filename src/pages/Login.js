import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import ApiConfig from "../config/ApiConfig";
import { useDispatch } from "react-redux";
import { LoginUser } from "../Redux/Slice/AuthSlice";
import { toast } from "react-toastify";
export default function Login() {
    const [loginData, setLoginData] = useState({
        password:"", email:""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e)=>{
        const {value, name} = e.target
        setLoginData((prev)=>({...prev, [name]: value}))
    }
    const loginAPi = async () => {
        const data = {
            "email": loginData.email,
            "password": loginData.password
        }
        try {
            const response = await axios.post(ApiConfig.login, data)
            if(response.status === 200){
                dispatch(LoginUser(response.data))
                toast.success("Login Successfull")
                if(response.data.role === "Admin"){
                    navigate("/list")
                }
                else if(response.data.role === "User"){
                    navigate("/Product")
                }
                else{
                    navigate("/")
                }

            }
        } catch (error) {
            console.log("error while loggin", error)
            toast.error(error.response.data.message)
        }
    }
    return (
        <>
            <section className="border-red-500 login-form min-h-screen flex items-center justify-center bg-img" style={{ backgroundImage: "url('/assets/image/bbblurry.svg')" }}>
                <div className="container mx-auto">
                    <div className="flex justify-center px-6 my-12">
                        <div className="w-96 flex">
                            <div className="w-full bg-login p-6  rounded-lg">
                                <div className="heading-1 pt-10 m-auto ">
                                    <img src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg" alt="login-img" className="rounded-full m-auto p-1 border" width="100px" height="100px" />
                                    <h3 className="pt-8 font-bold text-4xl text-center tracking-wider text-white">Login</h3>
                                </div>
                                <form className=" pt-8  rounded">
                                    <div className="mb-4">
                                        <input
                                            className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a]  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={loginData.login}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4 md:mr-2 ">
                                        <input
                                            className="w-full px-3 py-3  text-sm  leading-normal  text-gray-50 border-0  bg-[#ffffff1a]  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={loginData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button onClick={loginAPi}
                                            className="w-full px-4 py-3 font-bold tracking-wider text-[#000] rounded-lg bg-white focus:outline-none focus:shadow-outline"
                                            type="button"> Login
                                            <div className="fill-one"></div>
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}