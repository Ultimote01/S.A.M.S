import { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/table';
import api from "../api/api";
import { ClockIcon } from "@heroicons/react/24/outline";

import AttendanceLayout from "../components/AttendanceLayout";

export default function AttendacePage() {
    const pageLoaded = useRef(false);
    const [todayClasses, SetTodayClasses] = useState([]);
    const [timeOutIds, setTimeOutIds] = useState([]);
    const [isOngoing, setIsOngoing] = useState('');



   

     function handleTimeOutStartTime(classes=[]) {

             if (classes.length > 0) {
            const timeOutIDs = [];
            classes.forEach((classsEl)=>{
                 
                const timeout = setTimeout(function(){

                        setIsOngoing(timeout)
                        
                },new Date(classsEl.startTime).valueOf() -
                new Date(Date.now()).valueOf());
               timeOutIDs.push(timeout);
            });
            setTimeOutIds(timeOutIDs);
           
        }
    }

    function handleTimeOutEndTime(classes) {

         if (classes.length > 0) {
            const timeOutIDs = [];
            classes.forEach((classsEl)=>{
                 
                const timeout = setTimeout(function(){

                 getClassesRemote();
                        
                },new Date(classsEl.endTime).valueOf() -
                new Date(Date.now()).valueOf());
               timeOutIDs.push(timeout);
            });
            setTimeOutIds((state)=> [...state, ...timeOutIDs]);
           
        }
    }


    
    async function  getClassesRemote() {

        try {   
                 const res = await api.get(`/api/v1/lectures/get-lectures/?day=today`); 
                SetTodayClasses(res.data.lectures.map((lecture)=>lecture.classesPerDay).flatMap((classPerDay)=> classPerDay));
                handleTimeOutStartTime(res.data.lectures.map((lecture)=>lecture.classesPerDay).flatMap((classPerDay)=> classPerDay));
                handleTimeOutEndTime(res.data.lectures.map((lecture)=>lecture.classesPerDay).flatMap((classPerDay)=> classPerDay));
        }catch(err) {
            console.log(err);
        }
    }
    
     
    useEffect(()=>{
            if (!pageLoaded.current){
                getClassesRemote();
                pageLoaded.current=true;
            }
        },[])



    return (
        <AttendanceLayout>
              <section>
                            <div style={{borderTopLeftRadius: "7px",borderTopRightRadius: "7px"}} className="flex flex-col border-[1px] border-solid">
                                <div className=" mb-6 text-[1.7rem] font-semibold  py-3 bg-stone-400 pl-3 rounded-[7px] text-white dark:bg-zinc-700 ">
                                        <h1>Today's Classes</h1>
                                </div>
                                <div className="text-center darl:text-white">
                                    <p className="pb-6 dark:text-white">
                                        Below are the list of classes that will be held today.
                                        Amonng the list is the ongoing classs with the 'Live' column and indicator.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="px-1 mt-16 md:px-0 lg:mt-24 lg:px-0">
                                { todayClasses.length > 0 && <Table  noTopDivPadding={true} className="mt-4   border-[1px] border-solid [--gutter:theme(spacing.6)] md:px-0 lg:[--gutter:theme(spacing.0)]">
                                <TableHead>
                                        <TableRow>
                                                <TableHeader 
                                                style={{borderEndStartRadius: "20px 20px"}}
                                                className={" pl-6 border-r-2  bg-stone-400 font-medium  text-white dark:bg-zinc-700"}
                                                >Date</TableHeader>
                                                <TableHeader className={" border-r-2 bg-stone-400 font-medium text-white dark:bg-zinc-700"}>Course</TableHeader>
                                                <TableHeader className={" border-r-2  bg-stone-400 font-medium  text-white dark:bg-zinc-700"}>Lecturer</TableHeader>
                                                <TableHeader className={" border-r-2  bg-stone-400 font-medium  text-white dark:bg-zinc-700"}>Start Time</TableHeader>
                                                <TableHeader className={" border-r-2  bg-stone-400 font-medium  text-white dark:bg-zinc-700"}>Status</TableHeader>
                                                <TableHeader 
                                                style={{borderStartEndRadius: "15px 15px"}}
                                                 className={" border-r-2  bg-stone-400 font-medium  text-white dark:bg-zinc-700"}
                                                 >End time</TableHeader>
                                        </TableRow>
                                </TableHead>
            
                                <TableBody>
                                        {  todayClasses.map((lecture,index)=> <TableRow key={index}>
                                    <TableCell>
                                        {new Date(lecture.startTime).toLocaleDateString()
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {lecture.course}
                                    </TableCell>
                                    <TableCell>
                                        {lecture.lecturer}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(lecture.startTime).toLocaleTimeString()}
                                    </TableCell>
                                    <TableCell>{
                                        //eslint-disable-next-line
                                        new Date(lecture.startTime).valueOf() > Date.now()? 
                                        <div className="flex items-center">
                                            <ClockIcon className="size-4"/>
                                            <span className="pl-1">Pending</span>
                                        </div>:
                                        <div className="flex items-center">
                                            <span className="mr-1">Ongoing</span>
                                            <div className="size-2 rounded-[50%] bg-green-500"></div>
                                        </div>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {new Date(lecture.endTime).toLocaleTimeString()}
                                    </TableCell>
                            </TableRow>)}
                                </TableBody>
                            </Table>}
                            </div>
                             
                        </section>
        </AttendanceLayout>
    )
}