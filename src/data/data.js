export function getAttendance(){
    return [
        {
            course: "English",
            lecturer: "Ayanfe Bash",
            students: ["kemi", "Martins", "Tosin", "James","Kelvin"],
            startTime:  Date.now() - (5 * 24 * 60 * 60 * 1000),
            createdAt: Date.now() - (5 * 24 * 60 * 60 * 1000),
            endTime: Date.now() - (5 * 24 * 60 * 60 * 1000) + ( 3 * 60 * 60 * 1000)+(12 * 60 * 1000)
        },
        {
            course: "Math II ",
            lecturer: "Ayanfe Bash",
            students: ["Kemi","Kennedy", "James", "Tosin","Kelvin"],
            startTime: Date.now() - (5 * 24 * 60 * 60 * 1000) + ( 3 * 60 * 60 * 1000)+(40 * 60 * 1000),
            createdAt: Date.now() - (5 * 24 * 60 * 60 * 1000),
            endTime: Date.now() - (5 * 24 * 60 * 60 * 1000) + ( 6 * 60 * 60 * 1000)+(30 * 60 * 1000)
        },
        {
            course: "Calculus",
            lecturer: "Mathew Brown",
            students: ['Kemi', "Kennedy","Kelvin","James", "Uchenna", "Ahmed", "Tosin"],
            startTime: Date.now() - (5 * 24 * 60 * 60 * 1000) + ( 6 * 60 * 60 * 1000)+(30 * 60 * 1000),
            createdAt: Date.now() - (5 * 24 * 60 * 60 * 1000),
            endTime: Date.now() - (5 * 24 * 60 * 60 * 1000) + ( 8 * 60 * 60 * 1000)+(12 * 60 * 1000)
        },
        {
            course: "DSA",
            lecturer: "Micheal Obiora",
            students: ["Marvelous", "Kelvin", "Akinyemi", "Taiwo", "kemi", "Tosin"],
            startTime: Date.now() - (4 * 24 * 60 * 60 * 1000) + ( 1 * 60 * 60 * 1000)+(30 * 60 * 1000),
            createdAt: Date.now() - (4 * 24 * 60 * 60 * 1000),
            endTime:  Date.now() - (4 * 24 * 60 * 60 * 1000) + ( 3 * 60 * 60 * 1000)+(12 * 60 * 1000)

        },
         {
            course: "Aritificial Intelligence",
            lecturer: "Micheal Obiora",
            students: ["Marvelous", "Kelvin", "Akinyemi", "Taiwo", "kemi"],
            startTime: Date.now() - (4 * 24 * 60 * 60 * 1000) + ( 2 * 60 * 60 * 1000)+(30 * 60 * 1000),
            createdAt: Date.now() - (4 * 24 * 60 * 60 * 1000),
            endTime:  Date.now() - (4 * 24 * 60 * 60 * 1000) + ( 5 * 60 * 60 * 1000)+(12 * 60 * 1000)

        },
         {
            course: "System Administration",
            lecturer: "Ahmed Musa",
            students: ["Marvelous", "Kelvin", "Akinyemi", "Taiwo", "Kemi"],
            startTime: Date.now() - (4 * 24 * 60 * 60 * 1000) + ( 1 * 60 * 60 * 1000)+(30 * 60 * 1000),
            createdAt: Date.now() - (4 * 24 * 60 * 60 * 1000),
            endTime:  Date.now() - (4 * 24 * 60 * 60 * 1000) + ( 3 * 60 * 60 * 1000)+(12 * 60 * 1000)

        },
         {
            course: "Computer Networks",
            lecturer: "Fred Omoh",
            students: ["Martha", "Kelvin", "Akinyemi", "Taiwo", "Damilola", "kemi"],
            startTime: Date.now()- (3 * 24 * 60 * 60 * 1000) + ( 1 * 60 * 60 * 1000)+(30 * 60 * 1000),
            createdAt: Date.now() - (3 * 24 * 60 * 60 * 1000),
            endTime:  Date.now() - (3 * 24 * 60 * 60 * 1000) + ( 3 * 60 * 60 * 1000)+(12 * 60 * 1000)

        },
         {
            course: "Logic Design",
            lecturer: "Papa Apex",
            students: ["Marvelous", "Kelvin","Kemi", "Akinyemi", "Taiwo","Tosin"],
            startTime: Date.now() - (3 * 24 * 60 * 60 * 1000)  + ( 3 * 60 * 60 * 1000)+(30 * 60 * 1000),
            createdAt: Date.now() - (3 * 24 * 60 * 60 * 1000),
            endTime:  Date.now() - (3 * 24 * 60 * 60 * 1000) + ( 6 * 60 * 60 * 1000)+(12 * 60 * 1000)

        }, {
            course: "Operating System",
            lecturer: "Uchena Nwanne",
            students: ["Marvelous", "Kelvin", "Akinyemi", "Taiwo", "Kemi","Tosin"],
            startTime: Date.now() - (3 * 24 * 60 * 60 * 1000) + ( 1 * 60 * 60 * 1000)+(30 * 60 * 1000),
            createdAt: Date.now() - (3 * 24 * 60 * 60 * 1000),
            endTime:  Date.now() - (3 * 24 * 60 * 60 * 1000) + ( 3 * 60 * 60 * 1000)+(12 * 60 * 1000)

        },
         {
            course: "Cyber Security",
            lecturer: "Awele Asielue",
            students: ["Marvelous", "Kelvin", "Akinyemi", "Taiwo", "Kehinde", "Kemi"],
            startTime: Date.now() - (2 * 24 * 60 * 60 * 1000) + ( 1 * 60 * 60 * 1000)+(30 * 60 * 1000),
            createdAt: Date.now() - (2 * 24 * 60 * 60 * 1000),
            endTime:  Date.now() - (2 * 24 * 60 * 60 * 1000) + ( 3 * 60 * 60 * 1000)+(12 * 60 * 1000)

        },
        {
            course: "Logic Design",
            lecturer: "Papa Apex",
            students: ["Marvelous", "Kelvin","Kemi", "Akinyemi", "Taiwo","Kehinde"],
            startTime: Date.now() - (2 * 24 * 60 * 60 * 1000)  + ( 3 * 60 * 60 * 1000)+(30 * 60 * 1000),
            createdAt: Date.now() - (2 * 24 * 60 * 60 * 1000),
            endTime:  Date.now() - (2 * 24 * 60 * 60 * 1000) + ( 6 * 60 * 60 * 1000)+(12 * 60 * 1000)

        },
        {
            course: "Computer Networks",
            lecturer: "Fred Omoh",
            students: ["Martha", "Kelvin", "Akinyemi", "Taiwo", "Damilola", "kemi"],
            startTime: Date.now()- (2 * 24 * 60 * 60 * 1000) + ( 1 * 60 * 60 * 1000)+(30 * 60 * 1000),
            createdAt: Date.now() - (2 * 24 * 60 * 60 * 1000),
            endTime:  Date.now() - (2 * 24 * 60 * 60 * 1000) + ( 3 * 60 * 60 * 1000)+(12 * 60 * 1000)

        }
    ]
}