import { useEffect, useState } from "react"
import MyAccountLayout from "../components/MyAccountLayout"

export default function MyAccountPage() {
    const [user, setUser] = useState(null);

    useEffect(()=>{
        function renderPage(data){
            setUser(data);
        }

        const activeUser = localStorage.getItem("active-user");
        if (activeUser){
            renderPage(JSON.parse(activeUser).user);
        }
    },[]);


    if (!user) return ;
    return(
        <MyAccountLayout user={user}/>
    )
}