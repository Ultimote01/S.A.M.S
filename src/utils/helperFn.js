

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
    

 attendanceMap.forEach((value )=>{
    if (value === attendanceListSize) total++;
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
    

 attendanceMap.forEach((value )=>{
    if (value >  Math.round( (45 / 100 ) * attendanceListSize) )
        if (value < Math.round( (95 / 100 ) * attendanceListSize) ) average++;
 })

 attendanceMap.clear();

 return average;
}