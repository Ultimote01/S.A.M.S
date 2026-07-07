import {  useState } from "react";
import { LockClosedIcon, UserIcon} from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import {  EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/outline";


import SettingsLayout from "../components/SettingsLayout"
import Spinner from "../components/Spinner";
import api from "../api/api";




export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState([false,0]);
    const {register,reset,formState,handleSubmit,getValues} = useForm();
    const [revealPassword, setRevealPassword] = useState(false);
    const [revealConfirmPassword, setRevealConfirmPassword] = useState(false);
    const [resMessage, setresMessage] = useState(['',0]);
   
    const {errors} = formState;


    
    async function handleUpdatePassword (data){
        
        setIsLoading([true,2]);
        try {   
                const res = await api.patch('/api/v1/users/updateMyPassword',
                    {
                        password: data.password
                     })
                setresMessage([res.data.message,2]);
                reset();
        } catch(err) {
            console.log(err.response.data.message);
            setresMessage([err.response.data.message,2]);
        }
        setIsLoading([false,0]);
    }

    async function handleUpdateFullname (e) {
        e.preventDefault();

        const fullnameEl = document.getElementById('fullname');
        const activeUser = localStorage.getItem('active-user');

        setIsLoading([true,1]);
        try {
            const res = await api.patch('/api/v1/users/update-me',{fullname: fullnameEl.value});

            if (activeUser && res.data.message === 'Updated request successfully'){
               const updatedActiveUser=  JSON.parse(activeUser);
               updatedActiveUser.user.fullName= fullnameEl.value;
               localStorage.setItem('active-user', JSON.stringify(updatedActiveUser));
                
               fullnameEl.value='';
            }
          
            setresMessage([res.data.message,1]);
        } catch(err) {
                setresMessage([err.response.data.message,1]);
        }
        setIsLoading([false,0])
    }




    return (
        <SettingsLayout>
            <section className="flex flex-col">
                <div className=" flex justify-end items-center mb-6 pr-4 text-[1.6rem] font-semibold  py-3 bg-stone-400  rounded-[6px] text-white dark:bg-zinc-800">
                    User Settings
                </div>

                <div className="flex  px-3 bg-neutral-100  py-2 flex-col mt-5  border-[1px] border-solid rounded-[10px] sm:px-5 dark:bg-black dark:border-zinc-600 ">
                   
                   <h2 className="text-[1.4rem] mb-3  pt-3 text-black font-semibold dark:text-white">Update Fullname</h2>
                   <hr className="border-zinc-300 dark:border-zinc-500"/>
                    <h3 className={`text-center pt-1 ${
                    resMessage[0].includes("successfully")? "text-green-700" : 'text-[rgb(238,28,28)]'
                    }`}>{resMessage[1] === 1 && resMessage[0]}</h3>
                   <div className="flex  mt-8">
                        <form className="flex flex-col pl-3 md:pl-6" onSubmit={handleUpdateFullname}>
                            <label htmlFor="fullname" className="text-[1.1rem] text-zinc-700 font-semibold dark:text-zinc-200 ">Enter fullname</label>
                            <div className="flex py-1 px-1 mt-3 bg-white rounded-[4px]  border-[1px] border-solid">
                                <UserIcon className="size-6 mr-1"/>
                                 <input required type="text" maxLength={25} className='text-[1rem] dark:bg-white w-full' placeholder="Jhon Doe" id="fullname"/>
                            </div>
                            <div className='mb-5  pt-4 mt-3'>
                                 <button disabled={isLoading[0]} className='font-semibold py-1.5 px-4 bg-[var(--accent-bg)] text-[var(--accent)] rounded-md'>{ isLoading[0] && isLoading[1] === 1?<Spinner/>: "Update"}</button>
                             </div>
                        </form>
                   </div>
                </div>



                  <div className="flex  px-3 bg-neutral-100  py-2 flex-col mt-14  border-[1px] border-solid rounded-[10px] sm:px-5 dark:bg-black dark:border-zinc-600 ">
                   
                   <h2 className="text-[1.4rem] mb-3  pt-3 text-black font-semibold dark:text-white">Update Password</h2>
                   <hr className="border-zinc-300 dark:border-zinc-500"/>
                   <h3 className="text-center pt-1 text-[rgb(238,28,28)]">{resMessage[1] === 2 && resMessage[0]}</h3>
                   <div className="flex  mt-8">
                        <form className="flex flex-col pl-3 md:pl-6" onSubmit={handleSubmit(handleUpdatePassword)}>
                            <label htmlFor="password" className="text-[1.1rem] text-zinc-700 font-semibold dark:text-zinc-200 ">Enter password</label>
                            <div className="flex py-1.5 items-center px-1 mt-3 bg-white rounded-[4px]  border-[1px] border-solid">
                                <LockClosedIcon stroke="black" className="size-4 mr-1"/>
                                 <input className='text-[1rem] dark:bg-white w-full'  type={!revealPassword? "password": "text"} placeholder="********" id="password" 
                                  {...register("password",
                                        {
                                            required: "This field is required",
                                            minLength:{value:8,message:"password should be atleast 8 characters"}
                                        }
                                    )}/>
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
                             <span className="text-[0.75rem] text-[rgb(238,28,28)]">{errors.password?.message}</span>

                            <label htmlFor="confirm-password" className="text-[1.1rem] mt-4 text-zinc-700 font-semibold dark:text-zinc-200 ">Confirm password</label>
                            <div className="flex py-1.5 items-center px-1 mt-3 bg-white rounded-[4px]  border-[1px] border-solid">
                               <LockClosedIcon stroke="black" className="size-4 mr-1"/>
                                 <input className='text-[1rem] dark:bg-white w-full' type={!revealConfirmPassword? "password": "text"} placeholder="********" id="confirm-password"
                                  {...register(
                                        "confirmPassword",
                                        {
                                            required: "This field is required",
                                            validate: (value)=> value === getValues().password || "password must match" 
                                        }
                                    )}/>
                                 { !revealConfirmPassword?
                                    <EyeSlashIcon stroke="black" className="size-5 mr-2 cursor-pointer" 
                                    onClick={()=> {setRevealConfirmPassword(true)}}
                                />:
                                <EyeIcon stroke="black" className="size-5 mr-2 cursor-pointer" 
                                    onClick={()=> {setRevealConfirmPassword(false)}}/>
                                }
                            </div>
                             <span className="text-[0.75rem] text-[rgb(238,28,28)]">{errors.confirmPassword?.message}</span>
                            <div className='mb-5  pt-4 mt-3'>
                                 <button disabled={isLoading[0]} className='font-semibold py-1.5 px-4 bg-[var(--accent-bg)] text-[var(--accent)] rounded-md'>{ isLoading[0] && isLoading[1] === 2?<Spinner/>: "Update"}</button>
                             </div>
                        </form>
                   </div>
                </div>

            </section>
        </SettingsLayout>
        
    )
}