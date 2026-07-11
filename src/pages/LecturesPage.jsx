 import { useEffect, useRef, useState } from "react";


import LecturesPageLayout from "../components/LecturesLayout";
import { Table, TableBody, TableCell,  TableHead,  TableHeader,  TableRow } from '../components/table';
import { Heading} from '../components/heading';
import api from "../api/api";
import CreateLectureLayout from "../components/CreateLectureLayout";
import { ArrowPathIcon, CalendarDaysIcon } from "@heroicons/react/20/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
 


export default function LecturesPage() {
    const pageLoaded = useRef(false);
    const [lectureList, setLectureList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLiveSession, setIsLiveSession] = useState(false);
    const navigate = useNavigate()

 
async function getLecturesRemote() {
    const data = JSON.parse(localStorage.getItem("active-user"));
    try {    
        const res = await api.get('/api/v1/lectures/get-upcomingLectures'); 
        if (res.data.lectures.length > 0) {
            setLectureList(res.data.lectures.map((lecture)=>lecture.classesPerDay).flatMap((classPerDay)=> classPerDay));
        }else{
            setLectureList([]);
        }
      
    }catch(err) {
         setIsLoading(false);  
         if (!err?.response?.data.message) return;
         
            if (err.response.data.message.includes("User not found") ||
            err.response.data.message.includes("Session expired") ){
              localStorage.removeItem("active-user");
              return navigate('/', true)
            }
         
         
    }
    setUserData(data);
    setIsLoading(false);         
 }

 useEffect(()=> {
     function setIsLiveSessionFn(){
        setIsLiveSession(true);
        }
        const activeUser = localStorage.getItem("active-user");

        if (!activeUser) {
            return navigate("/", true);
        }else if (activeUser){
           setIsLiveSessionFn();
        }
 
        if (!pageLoaded.current){
            getLecturesRemote();
            pageLoaded.current = true;
        }
        
    },[])
 
    if (!isLiveSession) return;

    return( <LecturesPageLayout>
        <Heading className={" mb-4 font-semibold text-[1.3rem]  -ml-2.5 dark:text-white lg:-ml-6"}>Upcoming Lectures
        
    
        <span className="pt-1 flex">
        <span  onClick={()=>{setIsLoading(true); 
            if (!isLoading) getLecturesRemote()
        }
        } 
            className={`mr-2 cursor-pointer lg:mr-4`}>
            <ArrowPathIcon 
            className={`size-6 ${isLoading && 'animate-spin'}`}></ArrowPathIcon>
        </span>
        <CalendarDaysIcon className="size-6"></CalendarDaysIcon></span>
        </Heading>

        {
            userData?.user?.role && userData?.user?.role === "lecturer" && 
            <button className="mb-4  -ml-2.5 border-[2.5px] outline-offset-5 outline-gray-950 border-solid text-white text-[1rem] font-semibold px-2 py-1.5 rounded-[6px] bg-[rgb(252,130,0)] disabled:bg-[rgb(244,185,124)] md:py-1 lg:-ml-6"
            disabled={isModalOpen} onClick={()=>{setIsModalOpen(true)}}>Create lecture</button>
        }
         

        {  isModalOpen &&
        <CreateLectureLayout userData={userData?.user} setLectureList={setLectureList} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}
        <Table  className="mt-4  border-[1px] border-solid [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
            <TableHead>
                <TableRow>
                    <TableHeader className={"font-medium  border-r-[3px] border-solid text-[0.95rem] text-black dark:text-white"}>Date</TableHeader>
                    <TableHeader className={"font-medium   border-r-[3px] border-solid text-[0.95rem] text-black dark:text-white"}>Course</TableHeader>
                    <TableHeader className={"font-medium  border-r-[3px] border-solid text-black text-[0.95rem] dark:text-white"}>Lecturer</TableHeader>
                    <TableHeader className={"font-medium  border-r-[3px] border-solid text-black text-[0.95rem] dark:text-white"}>Start Time</TableHeader>
                    <TableHeader className={"font-medium  border-r-[3px] border-solid text-black text-[0.95rem] dark:text-white"}>Status</TableHeader>
                    <TableHeader className={"font-medium  text-black text-[0.95rem] dark:text-white"}>End time</TableHeader>
                    </TableRow>
                </TableHead>
            <TableBody>
                {lectureList !== null && lectureList.map((lecture,index)=> <TableRow key={index}>
                    <TableCell className={'border-r-[2px] border-dash dark:border-r-[4px]'}>
                        {new Date(lecture.startTime).toLocaleDateString()}
                    </TableCell>
                    <TableCell className={'border-r-[2px] border-dash dark:border-r-[4px]'}>
                        {lecture.course}
                    </TableCell>
                    <TableCell className={'border-r-[2px] border-dash dark:border-r-[4px]'}>
                        {lecture.lecturer}
                    </TableCell>
                    <TableCell className={'border-r-[2px] border-dash dark:border-r-[4px]'}>
                        {new Date(lecture.startTime).toLocaleTimeString()}
                    </TableCell>
                    <TableCell className={'border-r-[2px] border-dash dark:border-r-[4px]'}>{
                        <div className="flex items-center">
                            <ClockIcon className="size-4"/>
                             <span className="pl-1">Pending</span>
                        </div>
                        }
                    </TableCell>
                    <TableCell>
                        {new Date(lecture.endTime).toLocaleTimeString()}
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
         {
            lectureList === null || lectureList.length === 0 && 
            <div className=" mt-10  text-[1.2rem] flex justify-center items-center">
                There are no upcoming lectures 
            </div>
         }
    </LecturesPageLayout>
    )

}