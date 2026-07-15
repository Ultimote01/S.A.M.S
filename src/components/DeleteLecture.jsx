import { useState } from "react"

import DeleteLectureLayout from "./DeleteLectureLayout"
import Spinner from "./Spinner";
import api from "../api/api";

export default function DeleteLecture({setLectureList,isModalOpen, setIsModalOpen,lectureIndex}) {
   const [isLoading, setIsLoading] = useState(false);
   const [errMessage, setErrMessage] = useState('')


   async function handleDeleteLecture() {
    const startDate =  document.getElementById(`${lectureIndex[0]}-lecture-startDate`)?.innerText.split('/').reverse().join('-')+"T"+"00:00:00Z"
        
        setIsLoading(true);
        try {
            
                await api.delete("/api/v1/lectures/delete-lecture",
                    {data:{
                        _id: lectureIndex[1], 
                        deleteLectureStartTime: startDate
                        }
                    }
                )
                 setLectureList((lecture)=>{
                    return lecture.filter((el, index)=> {
                        if (index === lectureIndex[0]){ 
                            return false;
                        }
                        return true;
                    })
                })
                setIsModalOpen(false);
                setErrMessage('');
        // eslint-disable-next-line
        } catch(err) {
            setIsLoading(false)
            setErrMessage("Something happened. Please try again.")
        }
    setIsLoading(false)
   }

    return (
        <DeleteLectureLayout isModalOpen={isModalOpen}>
            <div className="flex flex-col px-1.5 py-3 sm:py-6">
                <div className="flex justify-center font-semibold text-[1.4rem] mb-2  sm:mb-4 ">
                        <h1>Are you sure?</h1>
                </div>
                <div className="flex justify-center text-[0.75rem] mb-5 sm:text-[1rem]">
                    <div className="text-center"> 
                     <h3 className="text-[rgb(238,28,28)]">{errMessage}</h3>
                    <h4>you are about to  delete 
                    "{document.getElementById(`${lectureIndex[0]}-lecture-course`)?.innerText}" 
                    lecture. </h4>
                    </div>
                   
                        
                </div>
                <div className="flex justify-center gap-x-4 ">
                        <button className=" cursor-pointer text-black  bg-[rgb(240,238,237)] py-1.5 px-3 rounded-md dark:bg-[rgb(252,250,247)]" onClick={()=> setIsModalOpen(false)}>Cancel</button>
                        <button className="cursor-pointer text-[var(--accent)] py-1.5 px-3 bg-[var(--accent-bg)] rounded-md" onClick={()=> handleDeleteLecture()}>{isLoading? <Spinner/>:"Delete"}</button>
                </div>
            </div>
        </DeleteLectureLayout>
    )
}