import { PencilIcon } from "@heroicons/react/24/outline"
import { createStringTitle } from "../utils/helperFn"
import { ApplicationLayout } from "./application-layout"


export default function MyAccountLayout({user}) {
    return (
        <ApplicationLayout>
             <div className="flex flex-col justify-center">
                <div className="flex justify-center items-center mt-5">
                    <div className="w-[100%] flex flex-col justify-center items-center">
                        <div className="size-[max(50%,1.5rem)] sm:size-[max(30%,1.5rem)] mb-6">
                            <img className="mb-3 rounded-[50%]" src="default.jpg"/>
                        </div>
                        <div>
                           <div className="flex flex-col text-center">
                                <label htmlFor="my-fullName" className="font-semibold text-[1.9rem] dark:bg-[rgba(0, 0, 0, 0)] dark:text-white ">{`${createStringTitle(user.fullName.split(' ')[0])} ${createStringTitle(user.fullName.split(' ')[1])}`}</label>
                                <div className="flex items-center mt-4 justify-center"> 
                                <input disabled={true} className=" mr-2 text-center w-[40%] dark:bg-[rgba(0, 0, 0, 0)]" id="my-fullname" name="my-fullname" value={`@${user.fullName.replace(" ","")}`}/>
                                   <PencilIcon className="size-4"/>
                                </div>
                           </div>
                            
                        </div>
                    </div>
                </div>
                 <form className="mt-16 px-4 md:px-0" >
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex gap-x-2   flex-col">
                            <div className="flex w-[100%]  gap-x-[20%] items-center">
                            <label htmlFor="username" className="font-semibold text-[1rem] dark:text-white">Username</label>
                            <div className="flex items-center "> 
                            
                                <input  disabled={true} className="mr-2 w-[100%] bg-[inherit]" id="username" type="text" name="username" 
                                    value={`@${user.fullName.replace(" ","")}`}
                            />
                            <PencilIcon className="size-6"/>
                            </div>
                                
                            </div>
                            <div className="flex w-[100%] gap-x-[32.5%] items-center mt-[1.5rem] ">
                                <label htmlFor="email" className="font-semibold text-[1rem] dark:text-white">Email</label>
                                <div className="flex items-center   text-[1rem] ">
                                
                                <input disabled={true} className="mr-2 w-[100%] bg-[inherit]" id="email"type="text" name="email" 
                                        value={`${user.email}`}
                                />
                                  <PencilIcon className="size-6"/>
                                </div>
                                   
                            </div>
                            <div className="flex w-[100%] gap-x-[28%] items-center mt-[1.5rem] ">
                                <label htmlFor="gender" className="font-semibold text-[1rem] dark:text-white">Gender</label>
                                <div className="flex items-center   text-[1rem]   ">
                                
                                <input disabled={true}  className="mr-2 w-[100%] bg-[inherit] " id="gender"type="text" name="gender" 
                                        value={`${user.gender}`}
                                />
                                  <PencilIcon className="size-6"/>
                                </div>
                                   
                            </div>

                             <div className="flex w-[100%] gap-x-[32%] items-center mt-[1.5rem] ">
                                <label htmlFor="dob" className="font-semibold text-[1rem] dark:text-white">D.O.B</label>
                                <div className="flex items-center   text-[1rem] ">
                                
                                <input disabled={true} className="mr-2 w-[100%] bg-[inherit]" id="dob"type="text" name="dob" 
                                        value={`${user.dob}`}
                                />
                                  <PencilIcon className="size-6"/>
                                </div>
                                   
                            </div>

                               <div className="flex w-[100%] gap-x-[25%] items-center mt-[1.5rem] ">
                                <label htmlFor="courses" className="font-semibold text-[1rem] dark:text-white">Courses</label>
                                <div className="flex items-center   text-[1rem] ">
                                
                                <select className="mr-2 w-[100%] bg-[inherit] text-[0.95rem]" id="courses"type="text" name="courses" 
                                >
                                    {user?.courses && user.courses.map((course)=><option>
                                        {course}
                                    </option>)}
                                </select>
                                  {/* <PencilIcon className="size-6"/> */}
                                </div>
                                   
                            </div>
                            
                            
                </div>
                </div>
                </form>
             </div>
        </ApplicationLayout>
        
    )
}