import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRightIcon, UserGroupIcon } from '@heroicons/react/16/solid';
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon, ExclamationCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';

import DashboardLayout from '../components/DashboardLayout';
import { Badge } from '../components/badge';
import { Divider } from '../components/divider';
import { Heading, Subheading } from '../components/heading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/table';
import { createStringTitle, 
  getAttendeesByDate, 
  getAveragePresentStudents, 
  getTotalPresentStudents,
  getRandomNumber,
  calculateChartData,
  getTotalPresentStudent,
  getTotalAbsentStudent
} from '../utils/helperFn';
import api from '../api/api';
import SimpleAreaChart from '../components/SimpleAreaChart';
import CustomActiveShapePieChart from '../components/PieChart';
import { ClockIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/outline';





export function Stat({ title, value, change }) {

  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
        <span className="text-zinc-500">from last week</span>
      </div>
    </div>
  )
}


function CloseButtonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /> 
  </svg>

  )
}
function Arrowpath({className}) {
  return(
   <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

  )
}

 
 


 
 
export default  function Home() {
  const [data, setData] = useState([]);
  const [userObject, setUserObject] = useState(null);
  const [notifications, setNotifications] = useState(userObject?.user?.notifications);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingX,setIsLoadingX] =useState(false);
  const [attendancePerDay, setAttendancePerDay] = useState(null);
  const [registeredStudents, setRegisteredStudents] =useState(0);
  const pageLoaded = useRef(false);
  const navigate = useNavigate();

  async function getAttendanceList () {
      setIsLoadingX(true);
      const activeUser = localStorage.getItem("active-user");
      try {
          const res  = await api.get("/api/v1/attendance-list/");
          if (activeUser){
            const activeObj = JSON.parse(activeUser);
            const attendanceList =  res.data.attendanceList.map((el)=> el.classesPerDay).flatMap((el)=>el);
           activeObj.attendanceList = attendanceList;

           localStorage.setItem("active-user", JSON.stringify(activeObj));
           setTimeout(()=>{loadData()},2000)
          }
      } catch (err) {
        console.log(err);
      }
      setIsLoadingX(false);
  }

  const loadData = function(){
      let activeUser = localStorage.getItem("active-user");
      const previousPage = localStorage.getItem("previous-page");
      
       if (previousPage === undefined ||  previousPage === null ) {
       
           reValidateUser();
           pageLoaded.current =  true;
      }
    
      if (!activeUser) {
        return navigate("/", true);
      }
      
      localStorage.removeItem("previous-page")
      renderPage(JSON.parse(activeUser).user, 
      JSON.parse(activeUser).registeredStudents,
      JSON.parse(activeUser).attendanceList);
     }

   
  async function reValidateUser() {
      try {
          await api.get("/api/v1/users/");
        }catch(err) {

            if (!err?.response?.data.message) return;
            if (err.response.data.message.includes("User not found") ||
            err.response.data.message.includes("Session expired") ){
              localStorage.removeItem("active-user");
              return navigate('/', true)
            }
        }
    }


  function renderPage(user, registeredStudents,data){
        setUserObject(user);
        setRegisteredStudents(registeredStudents);
        setData(data);
        setAttendancePerDay(getAttendeesByDate(data,0));
    }
  

  useEffect(()=>{ 

      if (!pageLoaded.current){
        loadData();
        pageLoaded.current = true;
      }

  },[])


 
    
    if (userObject === null) return;
    if (!data[0]) return;

    
  
    
    
    async function handleNAction(route) {
       setIsLoading(true);
      try{
          const res = await api.get(route);
         
          setNotifications((notifications)=> 
          notifications.map((notification,index)=> {
            if (notification?.name === "email") {
                notification.message = res?.data?.message
                userObject.user.notifications = userObject?.user?.notifications.slice(index+1, notifications.length);
                localStorage.setItem("user", JSON.stringify(userObject));
                return notification
            }
          })
          )
           setIsLoading(false);
      /* eslint-disable-next-line */
      } catch(err){
        setIsLoading(false);
      }
    }
    
      
    function handleNotifications(pos){
    const ModifiedEl = notifications.filter((message , index)=> index !== pos );
    setNotifications(ModifiedEl);
    
  }
  

  

   
  return (
    <DashboardLayout user={userObject?.user} data={data} 
    >
      { notifications?.map((notification, index)=> <div key={index} className='bg-[rgb(244,244,245,1)]   hidden gap-x-[2rem] w-[60%]   text-center py-[0.7rem] rounded-lg justify-center ml-[7rem] items-center mt-[-2rem] mb-[1rem] lg:ml-[15rem] lg:mt-[-1rem] lg:w-[50%] lg:flex dark:bg-zinc-800 dark:text-white' >
      {notification?.message}
      {notification?.action && <button  disabled={isLoading} className=" text-white text-[.82rem] bg-purple-500 px-[0.4rem] hover:cursor-pointer rounded-[6px] disabled:opacity-60 disabled:cursor-default" onClick={()=> handleNAction(notification?.action?.route)}>
        { isLoading? <Arrowpath className={" h-[1.3rem] w-[1.3rem] animate-spin"}  />  : notification?.action?.label}
      </button> }
      <i  className="bg-[rgb(244,244,245,1)]  hover:cursor-pointer dark:bg-zinc-800" onClick={()=> handleNotifications(index)}><CloseButtonIcon /></i></div>)
      }

      <Heading>
      <span> Hello , {createStringTitle(userObject.fullName.split(" ")[0])}</span> 
     </Heading>

     {userObject.role === "student" && <div className='pt-2'>
      <span>Matriculation No:</span> <span>{userObject.id}</span>
      </div>}

      {userObject.role === "lecturer" && <div className='pt-2'>
      <span>Lecturer Profile Code:</span> <span>{userObject.id}</span>
      </div>}

      <div className="mt-8 flex gap-x-2 justify-between">
        <div className={"w-[33%] shadow-sm border-[1.9px] text-black border-solid py-6 px-3 border-[#C0C0C0]  rounded-[4.5px] dark:text-white"}> 
          <div className='flex mb-3 justify-between text-[0.6rem] leading-[1.2em] md:items-center'>
           <div className='flex flex-col  md:flex-row md:items-center '> 
            <UserGroupIcon className='size-4 md:mr-1.5'/>
            <h6>Total Attendees</h6>
            </div>
              <ExclamationCircleIcon className='size-3.5'/>
            </div>
          <div >
            <h4 className='text-[0.9rem] font-bold'>{attendancePerDay.flatMap((students)=> students).length}</h4>
            <div className='flex items-center'>
              <ArrowUpRightIcon className='size-2'/>
               <p className=' ml-0.5 text-[0.55rem] leading-[0.7rem]'> 
            <strong className='pr-1 text-[#008000] dark:text-[#32CD32]'>0.5%</strong>from this month</p>
            </div>
          </div>
         </div>
           <div className={"w-[33%] shadow-sm border-[1.9px] text-black border-solid py-6 px-3  border-[#C0C0C0]  rounded-[4.5px] dark:text-white"}> 
          <div className='flex mb-3 justify-between text-[0.6rem] leading-[1.2em] md:items-center'>
           <div className='flex flex-col  md:flex-row md:items-center '> 
            <ClockIcon className='size-4 md:mr-1.5'/>
            <h6>{userObject.role === "student"?"Classes (Present)": "Attended All Classes"}</h6>
            </div>
              <ExclamationCircleIcon className='size-3.5'/>
            </div>
          <div >
            <h4 className='text-[0.9rem] font-bold'>{ 
              userObject.role === "student"?
              getTotalPresentStudent(userObject?.id, attendancePerDay):
              getTotalPresentStudents(attendancePerDay.flatMap((students)=> students), attendancePerDay.length
            )
            }</h4>
            <div className='flex items-center'>
              <ArrowUpRightIcon className='size-2'/>
               <p className=' ml-0.5 text-[0.55rem] leading-[0.7rem]'> 
            <strong className='pr-1 text-[#008000] dark:text-[#32CD32]'>0.5%</strong>from this month</p>
            </div>
          </div>
         </div>
          <div className={"w-[33%] shadow-sm border-[1.9px] text-black border-solid py-6 px-3  border-[#C0C0C0]  rounded-[4.5px] dark:text-white"}> 
          <div className='flex mb-3 justify-between text-[0.6rem] leading-[1.2em] md:items-center'>
           <div className='flex flex-col  md:flex-row md:items-center '> 
            <MinusCircleIcon className='size-4 md:mr-1.5'/>
            <h6>{userObject.role === "student"? "Classes (Absent)":"Above Average"}</h6>
            </div>
              <ExclamationCircleIcon style={{transform: "skew(180deg)"}} className='size-3.5'/>
            </div> 
          <div >
            <h4 className='text-[0.9rem] font-bold'>{
              userObject.role === "student" ?
              getTotalAbsentStudent(userObject?.id, attendancePerDay):
              getAveragePresentStudents(attendancePerDay.flatMap((students)=> students), attendancePerDay.length)}
            </h4>
            <div className='flex items-center'>
              <ArrowUpRightIcon className='size-2'/>
               <p className=' ml-0.6 text-[0.55rem] leading-[0.7rem]'> 
            <strong className='pr-1 text-[#008000] dark:text-[#32CD32]'>0.5%</strong>from this month</p>
            </div>
          </div>
         </div>
      </div>

      <div className="mt-8 flex  flex-col items-center gap-x-4 gap-y-8  justify-between md:flex-row" >
          <SimpleAreaChart/>
          <div className={"w-[100%] shadow-sm border-[2px] max-w-[424px] text-black border-solid border-[#C0C0C0] rounded-[4.5px] md:w-[60%] dark:text-white"}> 
            <div className='flex mt-2 px-2 justify-between items-center'>
              <div className='flex items-center text-[0.82em] text-black font-bold dark:text-white'> 
                <CheckCircleIcon className='size-4'/>
              <h4>Attendance Summary</h4>
              </div>
              <select className='py-1 px-2 text-black rounded-[2px] text-[0.75em] font-semibold dark:text-white'
              onChange={(e)=>{
                 setAttendancePerDay(getAttendeesByDate(data, e.target.value));
              }}>
                <option value={0} selected>Today</option>
                <option value={1}>Yesterday</option>
                <option value={2}> 2 Days</option>
                <option value={3}> 3 Days</option>
              </select>
            </div>
          <CustomActiveShapePieChart attendanceData={[
             isNaN(Math.round(calculateChartData(attendancePerDay,registeredStudents)[0]))? 0:Math.round(calculateChartData(attendancePerDay,registeredStudents)[0]),
             isNaN(Math.floor(calculateChartData(attendancePerDay,registeredStudents)[1]))? 100:Math.floor(calculateChartData(attendancePerDay,registeredStudents)[1])
          ]}/>
          <div className='flex justify-between items-center px-6 pb-4 text-[0.7em]'>
            <div className='flex items-center'>
              <i className='px-1 h-[10px] block mr-1 bg-[#008000]'></i>
              <span>
                Present(
                  <span>
                    {isNaN(Math.round(calculateChartData(attendancePerDay,registeredStudents)[0]))? 0: 
                    Math.round(calculateChartData(attendancePerDay,registeredStudents)[0])
                    }%
                  </span>)
              </span>
            </div>
            <div className='flex items-center'>
              <i className='px-1 h-[10px] block  mr-1 bg-zinc-400'></i>
               <span>
                Absent(
                  <span>
                    {isNaN(Math.floor(calculateChartData(attendancePerDay,registeredStudents)[1]))? 100 :
                    Math.floor(calculateChartData(attendancePerDay,registeredStudents)[1])
                    }%
                  </span>
                  )

               </span>
            </div>
          </div>
          </div>
      </div>
       
      <Subheading className="mt-14 flex justify-between">
        <span className=' font-semibold text-[1.2rem] sm:pl-3'>Recent Lectures</span>
        <i disabled={isLoadingX} onClick={()=> getAttendanceList()} className={`sm:mr-2 cursor-pointer ${isLoadingX && 'animate-spin'}`}><ArrowPathIcon className='size-6'/></i></Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader className={"font-medium text-black dark:text-white"}>Date</TableHeader>
            <TableHeader className={"font-medium text-black dark:text-white"}>Course</TableHeader>
            <TableHeader className={"font-medium text-black dark:text-white"}>Lecturer</TableHeader>
            <TableHeader className={"font-medium text-black dark:text-white"}>Start Time</TableHeader>
             { userObject.role === "student" && <TableHeader className={"font-medium text-black dark:text-white"}>
                  Mode
              </TableHeader>}
             <TableHeader className={"font-medium text-black dark:text-white"}>End time</TableHeader>
            <TableHeader className="text-right font-medium text-black dark:text-white">Ratings</TableHeader>

          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.toReversed().map((attendance,index) => (
            <TableRow key={index}   
            title={`attendance #${new Date(attendance.startTime).toLocaleDateString()}`}
            >
              <TableCell>
                {new Date(attendance.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>{
                `${attendance.course}
                `
                }</TableCell>
              <TableCell>
                {attendance.lecturer}
                </TableCell>
              <TableCell>
                 {new Date(attendance.startTime).toLocaleTimeString()}
              </TableCell>
              {userObject.role === "student" &&  <TableCell>
                  {
                   attendance.mode
                  }
                </TableCell>}
               <TableCell>
                {new Date(attendance.endTime).toLocaleTimeString()}
                </TableCell>
              <TableCell className="text-center">
                <div className='flex justify-end'> 
                { !isLoadingX && Array.from({length:getRandomNumber(1,5)}).map((el, index)=><StarIcon key={index} className='size-4'/>)}
                </div>
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardLayout>
  )
}



 