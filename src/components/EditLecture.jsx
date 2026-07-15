import CreateAndEditLayout from "./CreateAndEditLayout";


export default function EditLecture({ userData, setLectureList, isModalOpen, setIsModalOpen,lectureIndex}) {
    
   

    return(
        <CreateAndEditLayout
             userData={userData}
            setLectureList={setLectureList}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            edit= {true}
            editValues={{
                startDate: document.getElementById(`${lectureIndex[0]}-lecture-startDate`)?.innerText.split('/').reverse().join('-'),
                _id: lectureIndex[1],
                modifiedLectureStartTime: 
                document.getElementById(`${lectureIndex[0]}-lecture-startDate`)?.innerText.split('/').reverse().join('-')+"T"+"00:00:00Z",
                course: document.getElementById(`${lectureIndex[0]}-lecture-course`)?.innerText,
                startTime:document.getElementById(`${lectureIndex[0]}-lecture-startTime`)?.innerText,
                lecturer: document.getElementById(`${lectureIndex[0]}-lecture-lecturer`)?.innerText,
                mode:  document.getElementById(`${lectureIndex[0]}-lecture-mode`)?.innerText,
                endTime: document.getElementById(`${lectureIndex[0]}-lecture-endTime`).innerText,
                index: lectureIndex[0]

            }}

        />
    )
}