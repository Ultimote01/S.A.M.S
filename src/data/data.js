import { getRandomNumber } from "../utils/helperFn";
import { getUsers } from "./data-users"


const users = getUsers();
const attendancelist = createAttendance().flatMap(el=> el)
export function getAttendance(){
    
    return  attendancelist
     
}


function getUserLecturer(){
 return users[getRandomNumber(0, 8)]
}

function getUserStudents() {
   const  userstudent = [...users].splice(8);
    const studentExist = []; 
    const students = [];
    const size =  getRandomNumber(2, userstudent.length-1)
   
     for (let x = 0; x <= size ; x++){
        
        while(true) {
            const currentStudent = userstudent[getRandomNumber(0, userstudent.length-1)]
            if (studentExist.indexOf(currentStudent.fullName) > -1){
                break;
            }else {
                studentExist.push(currentStudent.fullName)
                students.push(currentStudent.id);
            }
        }
         
        
    }
     

    return students;
  
    
}

function createAttendance(){
    const attendanceSize = 21;
    const attendanceList = []

    for (let x = attendanceSize; x >= 0; x--) {

            const courseExist = [];
            const todayLectures = [];
            const coursePerday = getRandomNumber(2, 5)  
            for (let i = 0; i < coursePerday ; i++){
                while (true) {
                    const lecturer = getUserLecturer()
                    let courseName = lecturer.courses[getRandomNumber(1, lecturer.courses.length+1)-1];
                    courseName = courseName === undefined ? lecturer.courses[0] : courseName ;
                    if (courseExist.indexOf(courseName) > -1 ){
                        break;
                    }else {
                            
                    if (todayLectures.length < coursePerday){

                         todayLectures.push({
                            course:  courseName,
                            lecturer: lecturer.fullName,
                            students: getUserStudents(),
                            startTime: Date.now() - (x * 24 * 60 * 60 * 1000) + ( 2 * 60 * 60 * 1000)+(30 * 60 * 1000),
                            createdAt: new Date(Date.now() - (x * 24 * 60 * 60 * 1000)).toLocaleDateString(),
                            endTime: Date.now() - (x * 24 * 60 * 60 * 1000) + ( 6 * 60 * 60 * 1000)+(12 * 60 * 1000)
                        }) 
                    }
                    
                     courseExist.push(courseName);
                }


                }
           
            }
            attendanceList.push(todayLectures);
             
      
    }
     
    // attendanceList.forEach((el)=>el.forEach((el1)=> console.log(el1)))
    return attendanceList;

}

export function getAllUsers() {
    return users;
}


