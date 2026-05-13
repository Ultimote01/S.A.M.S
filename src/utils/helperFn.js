

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
        
       if (attendance.createdAt === new Date(Date.now()-(date * 24 * 60 * 60 * 1000 )).toLocaleDateString()){
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