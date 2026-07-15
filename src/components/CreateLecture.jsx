import CreateAndEditLayout from "./CreateAndEditLayout"

export default function CreateLecture({ userData, setLectureList, isModalOpen, setIsModalOpen}){
    return(
        <CreateAndEditLayout  
        userData={userData}
        setLectureList={setLectureList}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}/>
    )
}