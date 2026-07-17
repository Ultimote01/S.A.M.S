import { useEffect, useState } from "react"
import MyAccountLayout from "../components/MyAccountLayout"
import api from "../api/api";
import { Navigate } from "react-router-dom";

export default function MyAccountPage() {
    const [user, setUser] = useState(null);

    async function reValidateUser() {
          try {
              await api.get("/api/v1/users/");
            }catch(err) {
    
                if (!err?.response?.data.message) return;
                if (err.response.data.message.includes("User not found") ||
                err.response.data.message.includes("Session expired") ){
                  localStorage.removeItem("active-user");
                  return Navigate('/', true)
                }
            }
        }
    useEffect(()=>{reValidateUser()},[])

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