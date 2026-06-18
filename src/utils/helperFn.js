

export function createStringTitle(string) {
    return String(string).charAt(0).toUpperCase()+String(string).slice(1);
}


const attendanceMap = new Map();
 
export function getTotalPresentStudents(students,attendanceListSize){
   let total = 0
    students.forEach(student => {
        student = createStringTitle(student)
        attendanceMap.set(student, 
        attendanceMap.get(student) === undefined? 1 : attendanceMap.get(student)+1);
    });
   


 attendanceMap.forEach((value)=>{
    if (value === attendanceListSize ) total++;
 })

 attendanceMap.clear();
 return total;
}


export function getAveragePresentStudents(students, attendanceListSize) {
 let average = 0

    students.forEach(student => {
        student = createStringTitle(student)
        attendanceMap.set(student, 
        attendanceMap.get(student) === undefined? 1 : attendanceMap.get(student)+1);
    });
    

if (attendanceListSize === 1) return average;

 attendanceMap.forEach((value )=>{
    if (value <  attendanceListSize && value >  0 )
        average++;
 })

 attendanceMap.clear();

 return average;
}


export function getAttendeesByDate(data, date){
     let totalAttendeesPerDay = [];

     data.forEach((attendance)=> {
        
       if (new Date(attendance.createdAt).toLocaleDateString() === new Date(Date.now()-(date * 24 * 60 * 60 * 1000 )).toLocaleDateString()){
       totalAttendeesPerDay.push(attendance.students)
       }
        
         
     })

     return totalAttendeesPerDay;
  
}




export const getRandomNumber =(min, max)=>{
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor( Math.random() * (max - min + 1)) + min;
  }



  export function calculateChartData(attendancePerDay, registeredStudents){
    const presentStudents = attendancePerDay.flatMap((el)=>el).length;
    const expectedStudents = registeredStudents * attendancePerDay.length;
    const presentPercentage = (presentStudents / expectedStudents) * 100;
    const absentPercentage = ((expectedStudents - presentStudents)/expectedStudents) * 100;
    
    return [presentPercentage, absentPercentage]
  }


  export function getTotalPresentStudent(student, attendancePerDay){

    let presentInClass = 0;
    
    if (student !== null && attendancePerDay !== null){

        attendancePerDay.forEach((students)=>{
        
        if (students.indexOf(String(student)) > -1 )  presentInClass++;})

        }


    return presentInClass;
     
  }


  export function getTotalAbsentStudent(student, attendancePerDay) {

    let absentInClass = 0;
    
    if (student !== null && attendancePerDay !== null){

        attendancePerDay.forEach((students)=>{
        
        if (students.indexOf(String(student)) === -1 )  absentInClass++;})

    }
    return absentInClass;
  }