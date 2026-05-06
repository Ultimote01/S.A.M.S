import { ApplicationLayout } from './application-layout'
import { getAttendance } from '../data/data'
import { useEffect, useState } from 'react'


export default function DashboardLaypout({user,children}) {
    const [data, setData] = useState([]);

    useEffect(()=>{
        Promise.resolve(getAttendance())
        .then((data)=> setData(data));
    },[])
    
    return(
      <ApplicationLayout user={user} data={data}>{children}</ApplicationLayout>
    )
}