import { useEffect, useRef, useState } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon} from "@heroicons/react/20/solid";

import AttendanceLayout from "../components/AttendanceLayout";
import { useNavigate } from "react-router-dom";
import { Dialog } from "../components/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/table';
import api from "../api/api";

export default function AttendacePage() {
    const pageLoaded = useRef(false);
    const [todayClasses, SetTodayClasses] = useState([]);
    // eslint-disable-next-line
    const [timeOutIds, setTimeOutIds] = useState([]);
    // eslint-disable-next-line
    const [isOngoing, setIsOngoing] = useState('');
    const [isLiveSession, setIsLiveSession] = useState(false);
    const [qrCode,setQrCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    
 
    
    
function recursionWithSetTimeOut(timeOut, activeClass,userData,resolve=false) {

    if (userData === null) return; 
    if ( Date.now() > 
        new Date(activeClass.endTime).valueOf()) return;
    
    if (userData?.role === 'lecturer' && !resolve){
        if ( (Date.now() + (2 * 60 * 1000)) >= new Date(activeClass.endTime).valueOf()) {
            initiateAttendance(activeClass,0);
            resolve=true;
        }
    }

    if (userData?.role === 'student' &&  activeClass.mode.toLowerCase() === 'online' && !resolve) {
         if ( (Date.now() + (2 * 60 * 1000)) >= new Date(activeClass.endTime).valueOf()) {
            setTimeout(()=>{
                 markAttendanceOnlineStudents(activeClass,0);
            },10000)
            resolve=true;
        }
    }


    setTimeout(()=>{ 
        recursionWithSetTimeOut(timeOut,activeClass,userData,resolve);
    }, timeOut)
}

async function  markAttendanceOnlineStudents(activeClass, count) {
    try {
            // eslint-disable-next-line
            const res = await api.post('/api/v1/attendance-list/create-attendance',
                {
                    course: activeClass.course
                }
            );
        return;
        } catch(err) {
                console.log(err)
                if (err.response?.data?.message){
                     if (count < 4){
                    count++;
                    setTimeout(()=>{
                        initiateAttendance(activeClass, count);
                    },3000)
                }
                }
                
        }
}

 async function initiateAttendance (activeClass,count) {

    try {
            const res = await api.post('/api/v1/attendance-list/create-attendance',
                {
                    course: activeClass.course
                }
            );
          
            if (res.data?.message === 'Attendance List pysical  created'){
                 setIsModalOpen(true);
                 setQrCode(res.data.qrCode)
            }
        return;
        } catch(err) {
                console.log(err)
                if (err.response?.data?.message){
                     if (count < 4){
                    count++;
                    setTimeout(()=>{
                        initiateAttendance(activeClass, count);
                    },3000)
                }
                }
                
        }
}
   function getAttendancePerClass(course) {
        const activeClass = localStorage.getItem('active-user');
        setTimeout(async () => {
            try {
                const res = await api.get(`/api/v1/attendance-list/attendanceListPerClass/${course}`)
                console.log(res);
                if (activeClass){
                    const activeClassObj = JSON.parse(activeClass);
                    const isAdded = activeClassObj.attendanceList.some((el)=>el.createdAt === res.data.concludedClass.createdAt);
                    console.log(isAdded);
                    if (!isAdded){
                        activeClassObj.attendanceList.push(res.data.concludedClass);
                        localStorage.setItem("active-user", JSON.stringify(activeClassObj));
                    }
                }
            } catch(err) {
                console.log(err);
            }
        }, 1000);
    }

     function handleTimeOutStartTime(classes=[]) {

             if (classes.length > 0) {
            const timeOutIDs = [];
            classes.forEach((classsEl)=>{
                 
                const timeout = setTimeout(function(){
                    const activeUser = localStorage.getItem("active-user");
                    const userData = activeUser? JSON.parse(activeUser).user : null;
                    recursionWithSetTimeOut(1000,classsEl,userData)
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
                 setIsModalOpen(false);
                 setQrCode('');
                 getAttendancePerClass(classsEl.course);
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
          if (!err?.response?.data.message) return;
            if (err.response.data.message.includes("User not found") ||
            err.response.data.message.includes("Session expired") ){
              localStorage.removeItem("active-user");
              return navigate('/', true)
            }
        }
        setIsLoading(false);
    }


    
     
    useEffect(()=>{

        function setIsLiveSessionFn(){
        setIsLiveSession(true);
      
        }
        const activeUser = localStorage.getItem("active-user");

        if (!activeUser ) {
            return navigate("/", true);

        }else if (activeUser ){
           
           setIsLiveSessionFn();
        }

        if (!pageLoaded.current){
                getClassesRemote();
                pageLoaded.current=true;
            }
        },[])


    
    if (!isLiveSession) return;
   

    return (
        <AttendanceLayout>
            <Dialog
                open={isModalOpen} onClose={()=> {}}
                isModifyBackdropDiv={true}
                extraDialogStyle={`p-0 bg-[transparent]`}>
                <div className="flex flex-col  my-8 rounded-[7px]  bg-[var(--form-bg)]">
                   { qrCode && <img className="py-0 px-2 w-[100%] h-[100%]" src={qrCode} alt="Qr code for attendance"/> }
                </div>
                
            </Dialog>
              <section>
                    <div style={{borderTopLeftRadius: "7px",borderTopRightRadius: "7px"}} className="flex flex-col border-[1px] border-solid">
                        <div className=" flex justify-between mb-6 text-[1.7rem] font-semibold  py-3 bg-stone-400 pl-3 rounded-[7px] text-white dark:bg-zinc-700 ">
                                <h1>Today's Classes</h1>
                                
                                <span  onClick={()=>{setIsLoading(true); 
                                    if (!isLoading)getClassesRemote();
                                   
                                }
                                } 
                                    className={`mr-2 cursor-pointer lg:mr-4`}>
                                    <ArrowPathIcon 
                                    className={`size-6 ${isLoading && 'animate-spin'}`}/>
                                </span>
                            
                        </div>
                        <div className="text-center darl:text-white">
                            <p className="pb-6   sm:px-3 dark:text-white">
                                Below are the list of classes that will be held today.
                                Among the list is the active classs with the 'ongoing' column and indicator.
                            </p>
                            <p className="flex justify-center items-center mb-3">
                                Click the icon<i>
                                    <ArrowPathIcon className="size-3 mx-1"/>
                                </i>above to refresh the list 
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
                                        <TableHeader className={" border-r-2 bg-stone-400 font-medium text-white dark:bg-zinc-700 "}>Course</TableHeader>
                                        <TableHeader className={" border-r-2  bg-stone-400 font-medium  text-white dark:bg-zinc-700"}>Lecturer</TableHeader>
                                        <TableHeader className={" border-r-2  bg-stone-400 font-medium  text-white dark:bg-zinc-700"}>Start Time</TableHeader>
                                        <TableHeader className={" border-r-2  bg-stone-400 font-medium  text-white dark:bg-zinc-700"}>Status</TableHeader>
                                        <TableHeader 
                                        style={{borderStartEndRadius: "15px 15px"}}
                                            className={"  bg-stone-400 font-medium  text-white dark:bg-zinc-700"}
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