import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import {EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon} from "@heroicons/react/20/solid";

import api from "../api/api";
import Spinner from "./Spinner";

export default function LoginLayout(){
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] =useState(false);
  const [isLiveSession, setIsLiveSession] = useState(true);
  const [revealPassword, setRevealPassword] = useState(false);


  useEffect(()=>{
    const user = localStorage.getItem("active-user");
  

    function setIsLiveSessionFn(){
        setIsLiveSession(false);
    }

    if (user !== undefined && user !== null) {  

      navigate("/dashboard", {replace: true})
    } else setIsLiveSessionFn();
       

  })

 

async function handleSubmit(e) {
  
  setIsLoading(true);
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  if (regexEmail && password) {

    try {
       const res = await api.post("/api/v1/users/login", {
       email,
        password
      });

      if (res.data.status === "fail") {
        setErrorMessage("Please provide a valid email and password");
        return;
      }
        localStorage.setItem("active-user", JSON.stringify(res.data));
        localStorage.setItem("previous-page", "login")
        setTimeout(()=>{
          navigate("/dashboard", true);
        },2000)
    } catch(err) {
      setErrorMessage(err.response?.data?.message)
      
    }
    
  }

  else if  (!regexEmail || !password) {
      setErrorMessage("Please provide a valid email and password")
  }
  setIsLoading(false)
}

if (isLiveSession) return;
 
return(
  <section className="h-[100%] flex flex-col justify-between gap-y-20">
    <div className="flex flex-col ">
        <div className="mt-16 flex flex-col justify-center items-center px-2.5">
        <div className="flex bg-[var(--form-bg)] flex-col px-4 py-14 w-[100%] rounded-xl max-w-[30rem] border-[0.4px] border-solid border-zinc-200 dark:border-[0px] lg:px-16"
     
        >
            <div className="flex flex-col justify-center items-center">
              <img className="h-[70px] w-[70px]" src="yabatech_logo.jpg"/>
              <h1 className="mb-1 mt-2 dark:text-white">S.A.M.S</h1>
              <h4 className="mb-4 text-[0.95rem] dark:white">We build the future technology </h4>
            </div>
            <div className="px-6"> 
            <hr className="dark:bg-white" /> 
             <h3 className="mt-2 text-[0.78rem] text-center text-[red]">{errorMessage}</h3>
            </div>
            <form className="mt-8 px-4 lg:px-0" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label htmlFor="email" className="font-semibold pl-1 text-[1rem] dark:text-white">Email</label>
                  <div className="flex items-center bg-white py-1 pl-2 border-[2.8px] border-solid  border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600"> 
                    <EnvelopeIcon fill="white" stroke="black" className="size-5 mr-2 "/>
                      <input className="w-[100%] dark:bg-zinc-100" id="email" type="email" name="email" placeholder="jhondoe@example.com" />
                      </div>


                  <div className="flex flex-col mt-[1.5rem]">
                      <label htmlFor="password" className=" font-semibold pl-1 text-[1rem] dark:text-white">Password</label>
                        <div className="flex items-center bg-white py-1 pl-2 border-[2.8px] border-solid  border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600">
                                <LockClosedIcon stroke="black" className="size-5 mr-2"/>
                                <input id="password" className="w-[100%] dark:bg-zinc-100"  type={!revealPassword? "password": "text"} name="password"  placeholder="********"      />
                                {
                                    !revealPassword? 
                                    <EyeSlashIcon stroke="black" className="size-5 mr-2 cursor-pointer"
                                     onClick={()=> {setRevealPassword(true);
                                     }}/>:
                                    <EyeIcon stroke="black" className="size-5 mr-2 cursor-pointer" 
                                    onClick={()=> {setRevealPassword(false);
                                    }}/>
                                }
                                 
                              </div>
                  </div>

                  <h3 className="mt-2 pl-2 text-[0.8rem]">Need an account? <Link to={"/signup"} className="text-[0.9rem] text-[rgb(252,130,0)] ">Signup</Link></h3>
                  <div className="flex mt-12 lg:justify-center">
                      <button className=" flex justify-center w-[100%] py-3 bg-[var(--accent-bg)] text-[var(--accent)] rounded-md lg:px-10 lg:w-[inherit] ">{ isLoading?<Spinner/>: "Login"}</button>
                  </div>
                   
                </div>
            </form>
        </div>
        </div>
    </div>
   
    <div className="text-balck  text-[1rem] leading-[1.5rem] dark:text-white ">
          <div className="  flex justify-center text-center py-4 mx-4  md:mx-16">
          <span className=" flex gap-x-1.5 md:gap-x-4"> &copy; 2026 Yabatech. All rights reserved<i></i>
          <a href="/login">Terms of use</a>
          <i></i>
          <a href="/login">Privacy Policy</a>
          </span>
          </div>
    </div>
  </section>
)
}