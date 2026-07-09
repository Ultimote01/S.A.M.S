import { useState } from "react";
import { Dialog } from "../components/dialog";
import { UsersIcon } from "@heroicons/react/24/solid";
import { AcademicCapIcon, ClockIcon} from "@heroicons/react/24/outline";




import api from "../api/api";
import Spinner from "./Spinner";
import { createStringTitle } from "../utils/helperFn";
 




export default function CreateLectureLayout({isModalOpen, setIsModalOpen, userData,setLectureList}) {
    const [isLoading, setIsLoading] =useState(false);
    const [errors, setErrors] = useState(null);
    const [endTimeDate, setEndTimeDate] = useState('');
    const courses = ['Select a course'].concat(userData.courses.map((course)=>course))



function isNotFutureDate(inputDate) {
    
   const dDate = new Date(Date.now()).toLocaleDateString().split('/');
//    const openingDate =  `${dDate[2]}-${dDate[1]}-${dDate[0]}T09:00`;
   const isNotFutureDate = new Date(inputDate).valueOf() <  new Date(Date.now()).valueOf();

   return [isNotFutureDate, `${dDate[2]}-${dDate[1]}-${dDate[0]}T00:--`];

}

async function handleSubmit(e) {
    e.preventDefault();
    const startTimeEl = document.getElementById("start-time");
    const endTimeEl = document.getElementById("end-time");
    const mode = document.getElementById("mode");
    const course = document.getElementById('course');

     
    if (startTimeEl.value === ''|| endTimeEl.value === '' || mode.value === 'Select Mode' || course.value.toLowerCase() === "select a course")return;
     
    setIsLoading(true);
    try {
            const res = await api.post("/api/v1/lectures/create-lecture",
                {
                 course: course.value,
                mode: mode.value,
                startTime: new Date(startTimeEl.value).toISOString(),
                createdAt: new Date(Date.now()).toString(),
                endTime: new Date(`${endTimeDate}T${endTimeEl.value}`).toISOString()
                }
            );
            setErrors(null);
            setLectureList((lectures)=>([...lectures,...res.data.lecture.classes
            ]));
            setIsModalOpen(false);
           
            
    }catch(err){
        setIsLoading(false);
        setErrors({resError: err.response.data?.message})
    }
    setIsLoading(false);
} 

function isTimeValid(e) {
    
    // if (e.target.attributes.id.value === 'start-time') {

    //     if (new Date(e.target.value).valueOf() > new Date( e.target.value.split("T")[0]+"T16:00").valueOf()){
    //         return [false, 'time must be an hour earlier than closing hour '] ;
    //     }

    //     if (new Date(e.target.value).valueOf() < new Date( e.target.value.split("T")[0]+"T09:00").valueOf()){
    //        return [false, ' time must be a future date'];
    //     }

    //      if (new Date(e.target.value).valueOf() < Date.now()){
    //        return [false, ' time must be a future date'];
    //     }

    //     if (document.getElementById("end-time").value.replace(":",'') !== ''){
    //          if (e.target.value.split("T")[1].replace(':','') >= document.getElementById("end-time").value.replace(":",'')){
    //         return [false, 'time must  not be greater or equal to endtime'];
    //     }
    //     }
    //     }

    if (e.target.attributes.id.value === 'end-time'){ 
        const startTime = document.getElementById("start-time");
        if (!startTime.value) return [false, "time is invalid "]
        // const endTimeInput = new Date(startTime.value.split("T")[0]+"T"+e.target.value).valueOf();
      
        //  if (endTimeInput > new Date(startTime.value.split("T")[0]+"T"+"15:55").valueOf()){
        //     return [false, 'time must be 5 minute earlier than closing hour '] ;
        // }

        // if (endTimeInput < new Date(startTime.value.split("T")[0]+"T"+"09:01").valueOf()){
        //    return [false, ' time must be a future date'];
        // }

        // if (endTimeInput < Date.now()){
        //    return [false, ' time must be a future date'];
        // }
       
        if (new Date(startTime.value).valueOf()+(5 * 60 * 1000) >  new Date(`${endTimeDate}T${e.target.value}`).valueOf() ){
            return [false, 'time must  be 5 minutes later'];
        }
    }
   
    return [true,''];
}


function handleInputChange(e) {
    const message = {};
    let timeValue = '';

     if (!e.target.value) return;

    if (e.target.attributes.id.value ==='end-time'){
       timeValue = endTimeDate+"T"+e.target.value
    }
    
    if (e.target.attributes.id.value ==='start-time'){
       timeValue = e.target.value
    }

    if (isNotFutureDate(timeValue)[0]) {
        e.target.value = isNotFutureDate(timeValue)[1];
        const errorProperty = e.target.getAttribute("id").replace("-","").replace("time","Time") ;
        message[errorProperty]=` ${createStringTitle(errorProperty.replace("Time", ""))} time must be a future date`;
        if (e.target.attributes.id.value === 'start-time'){ 
            setEndTimeDate('');
        }
        setErrors(message);
        return;

    }
    else if (!isTimeValid(e)[0]){
        const errorProperty = e.target.getAttribute("id").replace("-","").replace("time","Time") ;
        message[errorProperty]=` ${createStringTitle(errorProperty.replace("Time", ""))} ${isTimeValid(e)[1]}`;
        if (e.target.attributes.id.value === 'start-time'){ 
            setEndTimeDate('');
        }
        setErrors(message);
        e.target.value = isNotFutureDate(timeValue)[1];
        return;
    }
    else{
        const errorProperty = e.target.getAttribute("id").replace("-","").replace("time","Time") ;
        message[errorProperty]= ""
        if (e.target.attributes.id.value === 'start-time'){ 
            setEndTimeDate(e.target.value.split('T')[0]);
        }
        setErrors(message);
        return;
    }
    
        
    }


    return(
         <Dialog  open={isModalOpen} onClose={()=> {}}
            isModifyBackdropDiv={true}
            extraDialogStyle={`p-0 bg-[transparent]`}
            >
            <div className="flex flex-col  p-2 mt-4 rounded-[7px]  bg-[var(--form-bg)]">
               <div className="flex flex-col">
                <h3 className="flex justify-center mt-2 text-[1.3rem] text-[rgb(238,28,28)]">{errors?.resError}</h3>
                <form className="mt-1 mx-3 lg:px-0" onSubmit={handleSubmit}>
                <div className="flex flex-col">

                 <div className="flex flex-col mt-[1.5rem]">
                        <label htmlFor="mode" className="font-semibold ml-[2px]  text-[1rem] dark:text-white">Mode</label>
                        <div className="flex items-center py-2 pl-2 border-[2.8px] border-solid  bg-white border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600 "> 
                        <UsersIcon className="size-5 mr-2"/>
                          <select  id="mode" className="bg-white w-[100%] dark:bg-zinc-100 "  
                            name="mode" 
                            >
                            <option >Select Mode</option>
                            <option>Physical</option>
                            <option>Online</option>
                            </select>
                            </div>
                            <span className="text-[0.75rem] text-[rgb(238,28,28)]">{errors?.mode}</span>
                </div>

                <div className="flex flex-col mt-[1.5rem]">
                         <label htmlFor="course" className="font-semibold  text-[1rem] dark:text-white">Courses</label>
                        <div className="flex items-center py-2 pl-2 border-[2.8px] border-solid  bg-white border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600 "> 
                            <AcademicCapIcon className="size-5 mr-2"/>
                            <select id={'course'}  className='w-[100%] bg-white  dark:bg-zinc-100'>
                                {courses.map((course, index)=><option key={index}>
                                    {course}
                                </option> )}
                            </select>
                        </div>
                        <span className=" pl-2 text-[0.75rem] text-[rgb(238,28,28)]">{errors?.courses?.message}</span>
                </div>

                <div className="flex flex-col mt-[1.5rem]">
                         <label htmlFor="start-time" className="font-semibold  text-[1rem] dark:text-white">Start Time</label>
                            <h6 className="text-[0.75rem]" >Time is set in 24 hours format "09:00 - 16:01"</h6> 
                        <div className="flex items-center py-1 pl-2 border-[2.8px] border-solid  bg-white border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600 ">
                            <ClockIcon className="size-5 mr-2"/>
                             <input  className="dark:bg-zinc-100 dark:text-zinc-900" type="datetime-local" id="start-time" 
                             onChange={handleInputChange}/>
                        </div>
                        <span className="pl-2 text-[0.75rem] text-[rgb(238,28,28)]">{errors?.startTime}</span>
                </div>

                 <div className="flex flex-col mt-[1.5rem]">
                         <label htmlFor="end-time" className="font-semibold  text-[1rem] dark:text-white">End Time</label>
                            <h6 className="text-[0.75rem]" >Time is set in 24 hours format "09:00 - 16:01"</h6> 
                        <div className="flex items-center py-1 pl-2 border-[2.8px] border-solid  bg-white border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600 "> 
                            <ClockIcon className="size-5 mr-2"/>
                            <input type="date" className="dark:bg-zinc-100 dark:text-zinc-900"  id='end-date' disabled={true} value={endTimeDate}/>
                             <input type="time" className="dark:bg-zinc-100 w-[100%] dark:text-zinc-900" id="end-time" onChange={handleInputChange}/>
                        </div>
                        <span className="pl-2 text-[0.75rem] text-[rgb(238,28,28)]">{errors?.endTime}</span>
                </div>
                

                  <div className="flex gap-x-6  mt-12 mb-6 lg:justify-center">
                      <button className=" w-[100%] py-2 bg-[rgb(240,238,237)] text-black rounded-md lg:px-10 lg:w-[inherit] dark:bg-[rgb(252,250,247)] " onClick={()=>{setIsModalOpen(false); setErrors({});setEndTimeDate('')}}>{"Cancel"}</button>
                      <button type="submit" className=" flex justify-center w-[100%] py-2 bg-[var(--accent-bg)] text-[var(--accent)] rounded-md lg:px-10 lg:w-[inherit] ">{ isLoading?<Spinner/>: "Submit"}</button>
                  </div>
                   
                </div>
            </form>
               </div>
            </div>
        </Dialog>
    )
}