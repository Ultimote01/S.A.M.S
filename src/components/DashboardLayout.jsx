import { ApplicationLayout } from './application-layout'


export default function DashboardLaypout({user, data,children}) {

   
 
    return(
      <ApplicationLayout user={user} data={data}>{children}</ApplicationLayout>
    )
}