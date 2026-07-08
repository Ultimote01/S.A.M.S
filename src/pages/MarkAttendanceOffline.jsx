import { useState } from 'react';
import { useParams } from 'react-router-dom';


import Spinner from '../components/Spinner';
import api from '../api/api';


export default function MarkAttendanceOffline() {
    const  {course} = useParams();
    const [resError, setResError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resMessage, setResMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const course = document.getElementById("course").value;
        const answer = document.getElementById("answer").value;
        const id = document.getElementById("id").value;
        
        if (!course || !answer || !id) return;

        setIsLoading(true);
        try {
             const res = await api.post("/api/v1/attendance-list/mark-attendance-physical",{
                course,
                answer,
                id
             })
             console.log(res.data)
             
            setResError('');
            setResMessage(res.data.message);
             
        } catch(err){
            console.log(err);
            setResMessage('');
            setResError(err.response?.data?.message)
        }
        setIsLoading(false);
    }
    
    return(
        <div className='flex flex-col  px-4 justify-center items-center mt-16'>
            <div className=' flex w-[100%]  flex-col pt-6  bg-zinc-50 border-[0.4px] rounded-[6px] border-solid border-zinc-200 dark:border-zinc-500 dark:bg-zinc-800 sm:max-w-[80%] lg:max-w-[50%]' >
                <div className='text-center'>
                    <h1 className='text-black font-semibold text-[1.6rem] dark:text-white'>Mark class attendance</h1>
                    <p  className='text-black mt-2 text-[0.9rem] dark:text-white'>Fill in the fields below to submit</p>
                </div>
                <hr className=' mt-5 mx-8 border-[0.2px] border-dash border-zinc-200 dark:border-zinc-600'/>

                {resMessage?  <h4 className=' px-6 text-center flex justify-center text-[0.9rem] mt-2 text-black dark:text-white'>{resMessage}</h4>:
                 <h4 className=' px-6 text-center flex justify-center text-[0.9rem] mt-2 text-[red]'>{resError}</h4>}
               
                <form className='mt-12 pl-4' onSubmit={handleSubmit}>
                    <div className='flex  pl-3 mb-4 sm:pl-6'>
                         <label htmlFor='course' className='pb-1 pl-0.5 font-semibold text-[1rem] dark:text-white'>Course: </label>
                         <div className='text-[0.95rem] pt-1 flex flex-col ml-2 bg-orange-50 max-w-[10rem] rounded-[6px] border-[0.2px] border-solid border-zinc-200'>
                            <input id='course' disabled={true} className='bg-orange-50  h-[18px]  text-center w-[100%]' type='text' value={course}/>
                         </div>
                    </div>

                       <div className='flex flex-col  pl-3 mb-4 sm:pl-6'>
                            <label htmlFor='answer' className='pb-1 pl-0.5 font-semibold text-[1rem] dark:text-white'>Question:
                                <span className='pl-2 text-[0.9rem]'>How was class today?</span>
                            </label>
                             <div className='flex flex-col max-w-[80%] bg-white p-1 sm:max-w-[50%] rounded-[6px] border-[0.4px] border-solid border-zinc-200'>
                            <input id='answer' className=' text-[0.9rem] text-black dark:bg-white' type='text' placeholder='Answer'/>
                         </div>  
                        </div>
                          

                    <div className='flex flex-col pl-3 mb-4 sm:pl-6'>
                         <label htmlFor='id' className='pb-1 pl-0.5 font-semibold text-[1rem] dark:text-white'>Enter your student ID</label>
                         <div className='flex flex-col max-w-[80%] bg-white p-1 sm:max-w-[50%] rounded-[6px] border-[0.4px] border-solid border-zinc-200'>
                            <input id='id' className=' text-[0.9rem] text-black dark:bg-white' type='text' placeholder='1234567'/>
                         </div>  
                    </div>

                    <div className=' ml-4 mb-5  pt-4  sm:ml-6'>
                        <button className=' font-semibold py-1.5 px-4 bg-[var(--accent-bg)] text-[var(--accent)] rounded-md'>{ isLoading?<Spinner/>: "Submit"}</button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}