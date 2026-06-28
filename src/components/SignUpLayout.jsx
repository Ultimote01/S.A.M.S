import { UserPlusIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon, UserIcon,BuildingLibraryIcon} from "@heroicons/react/20/solid";
import { AcademicCapIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";


import api from "../api/api";
import Spinner from "./Spinner";
import SelectMultiple from "./SelectMultiple";
 

 

 


export function SignUpLayout(){
    const {register,reset,formState,handleSubmit,getValues} = useForm();
    const [revealPassword, setRevealPassword] = useState(false);
    const [revealConfirmPassword, setRevealConfirmPassword] = useState(false);
    const [consent, setConsent] = useState({agreed: false, submitted: false});
    const [resError, setResError] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isLoading, setIsLoading] =useState(false);
    const {errors} = formState;
    const navigate = useNavigate();

   
  const handleChange = (newValue) => {
    setSelectedOptions(newValue);
  };

  async function submit(data) {

        if (Object.values(data).length === 9) setConsent((state)=> (
            {
                ...state,
                submitted: true

            }
        ))

        if (!consent.agreed) return;

        if (selectedOptions.map((course)=>course.value).length === 0) {
            setResError("User must choose a course");
            return;
        }


        setIsLoading(true);

        try {
            const res = await api.post("/api/v1/users/register", {...data,
                courses: selectedOptions.map((course)=>course.value),
                department: data.department.toLowerCase(),
                role: data.role.toLowerCase()
            });
            
            localStorage.setItem("active-user", JSON.stringify(res.data));
            setTimeout(()=>{
            navigate("/dashboard", true);
            },2000)
            reset();
        
        }catch(err) {
            setResError(err.response.data?.message)
            
        }
        setIsLoading(false);

    }
 

    return (
        <section className="h-[100%] flex flex-col justify-between gap-y-20">
            <div className="flex flex-col ">
                <div className="mt-16 flex flex-col justify-center items-center px-2.5">
                <div className="flex bg-[var(--form-bg)] flex-col px-4 py-14 w-[100%] rounded-xl max-w-[40rem] border-[0.4px] border-solid border-zinc-200 dark:border-[0px] md:px-8"
             
                >
                    <div className="flex flex-col justify-center items-center">
                      <img className="h-[70px] w-[70px]" src="yabatech_logo.jpg"/>
                      <h1 className="mb-1 mt-2 dark:text-white">S.A.M.S</h1>
                      <h4 className="mb-4 text-[0.95rem] dark:white">We build the future technology </h4>
                    </div>
                    <div className="text-center px-6"> 
                    <hr className="dark:bg-white" /> 
                    <h1 className="mt-3 text-[1.3rem] font-semibold  md:text-[1.4rem]">Create an Account</h1>
                    <h2 className="text-[0.9rem] mt-2">Fill in the details below to register</h2>
                     <h3 className="mt-4 text-[0.9rem] text-center text-[rgb(238,28,28)]">{resError}</h3>
                    </div>
                    <form className="mt-8 px-4 md:px-0" onSubmit={handleSubmit(submit)} >
                        <div className="flex flex-col">
                         <div className="flex flex-col justify-between md:flex-row">
                             <div className="flex flex-col mt-[1.5rem]">
                                <label htmlFor="firstname" className="font-semibold pl-1 text-[1rem] dark:text-white">Firstname</label>
                                <div className="flex items-center bg-white py-2 pl-2 border-[2.8px] border-solid  border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600"> 
                                <UserIcon className="size-6 mr-2"/>
                                 <input  className="w-[100%] dark:bg-zinc-100" id="firstname" type="text" name="firstname" placeholder="Jhon"
                                    {
                                        ...register("firstname",
                                             {
                                                required: "This field is required",
                                                maxLength: 30
                                            }
                                             )
                                    }
                                />
                                 </div>
                                 <span className="text-[0.75rem] text-[rgb(238,28,28)]">{errors.firstname?.message}</span>
                             </div>
                              <div className="flex flex-col mt-[1.5rem]">
                                    <label htmlFor="lastname" className="font-semibold pl-1 text-[1rem] dark:text-white">Lastname</label>
                                    <div className="flex items-center bg-white py-2 pl-2 border-[2.8px] border-solid  border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600">
                                    <UserIcon className="size-6 mr-2"/>
                                    <input className="w-[100%] dark:bg-zinc-100" id="lastname"type="text" name="lastname" placeholder="Doe"
                                        {...register(
                                            "lastname",
                                              {
                                                required: "This field is required",
                                                maxLength: 30
                                            }
                                        )}
                                    />
                                     </div>
                                     <span className="text-[0.75rem] text-[rgb(238,28,28)]">{errors.lastname?.message}</span>
                                    </div>
                         </div>
                          <div className="flex flex-col justify-between md:flex-row">
                            <div className="flex flex-col mt-[1.5rem]">
                                 <label htmlFor="email" className="font-semibold pl-1 text-[1rem] dark:text-white">Email</label>
                                 <div className="flex items-center bg-white py-2 pl-2 border-[2.8px] border-solid  border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600"> 
                                <EnvelopeIcon fill="white" stroke="black" className="size-5 mr-2 "/>
                                 <input className="w-[100%] dark:bg-zinc-100" id="email" type="email" name="email" placeholder="jhondoe@example.com" 
                                    {...register(
                                         "email",
                                                {
                                                    required: "This field is required",
                                                        pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                        message:"Please provide a valid email"
                                                        }
                                                }
                                    )}
                                 />
                                 </div>
                                 <span className="text-[0.75rem] text-[rgb(238,28,28)]">{errors.email?.message}</span>
                            </div>

                            <div className="flex flex-col mt-[1.5rem]">
                                 <label htmlFor="phone-number" className="font-semibold pl-1 text-[1rem] dark:text-white">Phone Number</label>
                                 <div className="flex items-center bg-white py-2 pl-2 border-[2.8px] border-solid  border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600">
                                  <PhoneIcon className="size-5 mr-2"/>
                                 <input  className="w-[100%] dark:bg-zinc-100" id="phone-number" type="text" name="phone-number" placeholder="080-0000-0000"
                                    {...register(
                                        "phoneNumber",
                                                {
                                                    required: "This field is required",
                                                        pattern:{value:/^-?\d+$/,
                                                        message:"Please provide a valid phone number"
                                                        },
                                                        maxLength: 11,
                                                        minLength: {value: 11, message:"Please provide a valid phone number" }
                                                }
                                    )}
                                 />
                                 </div>
                                 <span className="text-[0.75rem] text-[rgb(238,28,28)]">{errors.phoneNumber?.message}</span>
                            </div>
                          </div>


                        <div className="flex flex-col justify-between md:flex-row">
                             <div className="flex flex-col mt-[1.5rem]">
                                <label htmlFor="department" className="font-semibold pl-1 text-[1rem] dark:text-white">Department</label>
                                <div className="flex items-center py-2 pl-2 border-[2.8px] border-solid  bg-white border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600 "> 
                                <BuildingLibraryIcon className="size-5 mr-2"/>
                                 <select  id="department" className="bg-white   w-[100%] dark:bg-zinc-100  md:pr-[4.5rem]"  
                                    name="department" 
                                        {...register(
                                            "department",
                                            {
                                                validate: (value)=> ["physical science"].indexOf(value.toLowerCase()) > -1 || "Select a department"
                                            }
                                        )}
                                    >
                                    <option >Select Department</option>
                                    <option>Physical Science</option>
                                 </select>
                                 </div>
                                  <span className="text-[0.75rem] text-[rgb(238,28,28)]">{errors.department?.message}</span>
                             </div>
                              <div className="flex flex-col mt-[1.5rem]">
                                    <label htmlFor="role" className="font-semibold pl-1 text-[1rem] dark:text-white">Role</label>
                                    <div className="flex items-center py-2 pl-2 border-[2.8px] border-solid  bg-white border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600">
                                    <UserPlusIcon className="size-5 mr-2 "/>
                                    <select id="role" className=" w-[100%] bg-white   dark:bg-zinc-100 md:pr-[7.2rem]"
                                     name="role" 
                                        {...register(
                                            "role",
                                            {
                                                validate: (value)=> ["student","lecturer"].indexOf(value.toLowerCase()) > -1 || "Select a role"
                                            }
                                        )}
                                     >      <option>Select a role</option>
                                            <option>Lecturer</option>
                                            <option>Student</option>
                                    </select>
                                    </div>
                                    <span className="text-[0.75rem] text-[rgb(238,28,28)]">{errors.role?.message}</span>
                                    </div>
                         </div>
                         <div className="flex flex-col justify-between md:flex-row">
                            <div className="flex flex-col mt-[1.5rem]">
                                <label htmlFor="id" className="font-semibold pl-1 text-[1rem] dark:text-white">Matric/Staff ID</label>
                                <div className="flex items-center bg-white py-2 pl-2 border-[2.8px] border-solid  border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600"> 
                                <UserIcon className="size-6 mr-2"/>
                                 <input  className="w-[100%] dark:bg-zinc-100" id="id" type="text" name="id" placeholder="Enter your Id" 
                                    {...register(
                                        "id",
                                             {
                                                required: "This field is required",
                                                maxLength: {value: 9, message: "ID must not be longer than 9 numeric digits"},
                                                minLength: {value:7, message: "ID must be atleast 7 numeric digits "},
                                                validate: (value)=> getValues().role.toLowerCase() === "student"?
                                                    value.startsWith("7") && !isNaN(value) && value.length === 9 ? true : "Student id is invalid":
                                                    value.startsWith("9") && !isNaN(value) && value.length === 7 ? true : "Lecturer id is invalid"
                                            }
                                    )}
                                 />
                                 </div>
                                 <span className="text-[0.75rem] text-[rgb(238,28,28)]">{errors.id?.message}</span>
                            </div>

                             <div className="flex flex-col mt-[1.5rem]">
                                <label htmlFor="courses" className="font-semibold pl-1 text-[1rem] dark:text-white">Courses</label>
                                <div className="flex items-center  pl-2 border-[2.8px] border-solid  bg-white border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600 md:max-w-[16rem]"> 
                                <AcademicCapIcon className="size-5 mr-2"/>
                                   <SelectMultiple id={"courses"} className={'w-[100%] md:w-[15rem]'} handleChange={handleChange} selectedOptions={selectedOptions}/>
                                 </div>
                                  <span className="text-[0.75rem] text-[rgb(238,28,28)]">{errors.courses?.message}</span>
                             </div>
                         </div>
                          
                        
                          <div className="flex flex-col gap-x-12 justify-between md:flex-row">
                          <div className="flex flex-col mt-[1.5rem]">
                              <label htmlFor="password" className=" font-semibold pl-1 text-[1rem] dark:text-white">Password</label>
                              <div className="flex items-center bg-white py-2 pl-2 border-[2.8px] border-solid  border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600">
                                <LockClosedIcon stroke="black" className="size-5 mr-2"/>
                                <input id="password" className="w-[100%] dark:bg-zinc-100"  type={!revealPassword? "password": "text"} name="password"  placeholder="********" 
                                    {...register("password",
                                        {
                                            required: "This field is required",
                                            minLength:{value:8,message:"password should be atleast 8 characters"}
                                        }
                                    )}
                                />
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
                          </div>

                          <div className="flex flex-col mt-[1.5rem]">
                              <label htmlFor="confirm-password" className=" font-semibold pl-1 text-[1rem] dark:text-white">Confirm Password</label>
                                <div className="flex items-center bg-white py-2 pl-2 border-[2.8px] border-solid  border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600" >
                                <LockClosedIcon stroke="black" className="size-5 mr-2"/>
                                <input className="w-[100%] dark:bg-zinc-100" id="confirm-password" type={!revealConfirmPassword? "password": "text"} name="confirm-password"  placeholder="********"  
                                    {...register(
                                        "confirmPassword",
                                        {
                                            required: "This field is required",
                                            validate: (value)=> value === getValues().password || "password must match" 
                                        }
                                    )}
                                />
                                { !revealConfirmPassword?
                                    <EyeSlashIcon stroke="black" className="size-5 mr-2 cursor-pointer" 
                                    onClick={()=> {setRevealConfirmPassword(true)}}
                                />:
                                <EyeIcon stroke="black" className="size-5 mr-2 cursor-pointer" 
                                    onClick={()=> {setRevealConfirmPassword(false)}}/>
                                }
                                 
                              </div>
                                <span className="text-[0.75rem] text-[rgb(238,28,28)]">{errors.confirmPassword?.message}</span>
                          </div>

                           </div>

                            

                            <div className="flex  mt-3">
                            <input id="cbox" type="checkbox" className="rounded-[5px] border-[3px] border-solid  border-zinc-200" name="consent" 
                                onChange={()=> setConsent((state)=> ({...state,
                                    agreed: !state.agreed? true : false,
                                    submitted: false
                                }) )}
                            />
                            <h3 className="ml-2 text-[0.85rem] leading-2 ">I agree to the <span className="text-[rgb(252,130,0)]">terms and conditions</span></h3>
                           </div>
                            
                             <span className="text-[0.65rem] text-[rgb(238,28,28)]">{!consent.agreed && consent.submitted && "Please accept the terms & conditions"}</span>


                          <div className="flex  mt-12 md:justify-center">
                              <button className=" flex justify-center w-[100%] py-2 bg-[var(--accent-bg)] text-[var(--accent)] rounded-md md:px-20 md:w-[inherit] ">{isLoading?<Spinner/>:"Register"}</button>
                          </div>

                          <div className="flex pt-2 justify-center text-[0.79rem]">
                                 <h3 >Already a member? <Link to={"/"} className="text-[rgb(252,130,0)] text-[0.9rem] font-semibold">Login</Link></h3>
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