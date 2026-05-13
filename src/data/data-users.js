// import { getRandomNumber } from "../utils/helperFn";

const regEmails = []

const regId = []

 const getRandomNumber =(min, max)=>{
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor( Math.random() * (max - min + 1)) + min;
  }

function createEmail(fullname) {
    let email = fullname.replace(" ", "")+"@ymail.com"

    while (true) {
        if (regEmails.indexOf(email) === -1) {
            regEmails.push(email);
             break;
        }else { 
            email = email.split("@")[0]+getRandomNumber(1,999)+"@ymail.com";
            regEmails.push(email);
            break;
        }
    }
    return email;
}




function createId(role) {
    const generateDigits = (size)=> {
        let digits = "";

        for (let x = 0; x < size; x++){
            digits+=getRandomNumber(1,9);
        }
       return digits;
    }
    let  id = role === "student"? "73"+generateDigits(7): "95"+generateDigits(5);
    while (true) {
        if (regId.indexOf(id) === -1) {
            regId.push(id);
             break;
        }else { 
             id = role === "student"? "73"+generateDigits(7): "95"+generateDigits(5);
            regId.push(id);
            break;
        }
    }

 return id;
}

 

export function getUsers(){
 return [
    {
        fullName: "Ayanfe Bash",
        email: createEmail("ayanfe bash"),
        id: createId("lecturer"),
        password: "test1234",
        role: "lecturer",
        courses: ["English","Math II"]
    },
    {
        fullName: "Mathew Brown",
        email: createEmail("mathew brown"),
        id: createId("lecturer"),
        password: "test1234",
        role: "lecturer",
        courses: ["Calculus"]
    },
    {
        fullName: "Ahmed Musa",
        email: createEmail("ahmed musa"),
        id: createId("lecturer"),
        password: "test1234",
        role: "lecturer",
        courses: [ "System Administration"]
    },
    {
        fullName: "Fred Omoh",
        email: createEmail("fred omoh"),
        id: createId("lecturer"),
        password: "test1234",
        role: "lecturer",
        courses: [ "Computer Networks"]
    },
    {
        fullName: "Papa Apex",
        email: createEmail("papa apex"),
        id: createId("lecturer"),
        password: "test1234",
        role: "lecturer",
        courses: [ "Logic Design"]
    },
    {
        fullName: "Awele Asielue",
        email: createEmail("ahmed musa"),
        id: createId("lecturer"),
        password: "test1234",
        role: "lecturer",
        courses: [ "Cyber Security"]
    },
    {
        fullName: "Uchenna Nwanne",
        email: createEmail("uchenna nwanne"),
        id: createId("lecturer"),
        password: "test1234",
        role: "lecturer",
        courses: [ "Operating System"]
    },
     {
        fullName: "Micheal Obiora",
        email: createEmail("micheal obiora"),
        id: createId("lecturer"),
        password: "test1234",
        role: "lecturer",
        courses: ["DSA", "Ariticial Intelligence"]
    },
     {
        fullName: "Kemi Jhonson",
        email: createEmail("kemi jhonson"),
        id: createId("student"),
        password: "test1234",
        role: "student",
        courses: ["English","Math II", "Artificial Intelligence","System Administration",
            "Computer Networks","Logic Design","Operating System", "Cyber Security"
        ]
    },
     {
        fullName: "Martins White",
        email: createEmail("martins white"),
        id: createId("student"),
        password: "test1234",
        role: "student",
       courses: ["English","Math II", "Artificial Intelligence","System Administration",
            "Computer Networks","Logic Design","Operating System", "Cyber Security"
        ]
    },
     {
        fullName: "kennedy Micheal",
        email: createEmail("kennedy micheal"),
        id: createId("student"),
        password: "test1234",
        role: "student",
        courses: ["English","Math II", "Artificial Intelligence","System Administration",
            "Computer Networks","Logic Design","Operating System", "Cyber Security"
        ]
    },
     {
        fullName: "James Nwachukwu",
        email: createEmail("james nwachukwu"),
        id: createId("student"),
        password: "test1234",
        role: "student",
         courses: ["English","Math II", "Artificial Intelligence","System Administration",
            "Computer Networks","Logic Design","Operating System", "Cyber Security"
        ]
    }, 
    {
        fullName: "Tosin Adebayo",
        email: createEmail("tosin adebayo"),
        id: createId("student"),
        password: "test1234",
        role: "student",
         courses: ["English","Math II", "Artificial Intelligence","System Administration",
            "Computer Networks","Logic Design","Operating System", "Cyber Security"
        ]
    }, 
    {
        fullName: "Kelvin Lawrence",
        email: createEmail("kelvin lawrence"),
        id: createId("student"),
        password: "test1234",
        role: "student",
        courses: ["English","Math II", "Artificial Intelligence","System Administration",
            "Computer Networks","Logic Design","Operating System", "Cyber Security"
        ]
    },
     {
        fullName: "Ahmed Garba",
        email: createEmail("Ahmed Garba"),
        id: createId("student"),
        password: "test1234",
        role: "student",
        courses: ["English","Math II", "Artificial Intelligence","System Administration",
            "Computer Networks","Logic Design","Operating System", "Cyber Security"
        ]
    }, 
    {
        fullName: "Uchenna Okoye",
        email: createEmail("uchenna okoye"),
        id: createId("student"),
        password: "test1234",
        role: "student",
        courses: ["English","Math II", "Artificial Intelligence","System Administration",
            "Computer Networks","Logic Design","Operating System", "Cyber Security"
        ]
    },
    {
        fullName: "Marvelous  Jhonson",
        email: createEmail("marvelous jhonson"),
        id: createId("student"),
        password: "test1234",
        role: "student",
        courses: ["English","Math II", "Artificial Intelligence","System Administration",
            "Computer Networks","Logic Design","Operating System", "Cyber Security"
        ]
    },
    {
        fullName: "Taiwo Ojo",
        email: createEmail("taiwo ojo"),
        id: createId("student"),
        password: "test1234",
        role: "student",
         courses: ["English","Math II", "Artificial Intelligence","System Administration",
            "Computer Networks","Logic Design","Operating System", "Cyber Security"
        ]
    }
 ]
}

export function getUser(){

}


