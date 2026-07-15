
import { Avatar } from './avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from './dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from './navbar'
import {
  Sidebar,
  SidebarBody,
  // SidebarFooter,
  SidebarHeader,
  // SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  // SidebarSpacer,
} from './sidebar'
import { SidebarLayout } from './sidebar-layout'

import {
  AcademicCapIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'
import {
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  RectangleGroupIcon,
  LifebuoyIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/20/solid'
import {  useNavigate } from "react-router-dom";
import clsx from 'clsx'
import {  useState } from 'react'


import Logo from './Logo'
// import { createStringTitle } from '../util/helperFn'
import api from "../api/api";

 


function EnvelopeIcon ({...props}){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>

  )
}

function NotificationAction ({label, route, handleNAction}) {
  return(
      <span  className={"hover:cursor-pointer"}style={{marginLeft: "1.25rem", backgroundColor: "oklch(62.7% 0.265 303.9)", borderRadius:"5px", 
        fontSize:"0.7rem", padding:"0.2rem 0.25rem"}} 
      onClick={()=> handleNAction(route)}>
          {label} 
      </span>
  )
}


function NotificationDropDownMenu({anchor, notifications, handleNotifications, handleNAction}){

  return (
    
    <DropdownMenu className="min-w-62 " anchor={anchor}>
      { notifications.map((notification,index)=><DropdownItem key={index}
      onClick={()=> handleNotifications(index)}
      className={"text-center hover:default hover:bg-stone-800"} focusValue={"none"} >

        <DropdownLabel>{notification.message}
          {notification.action && <NotificationAction label={notification.action.label} 
          route={notification.action.route} handleNAction={handleNAction}  />  }
        </DropdownLabel>  

      </DropdownItem> )
      }
        
    </DropdownMenu>
  )
}



export function AccountDropdownMenu({ anchor , handleSignOut,route}) {
  
 
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem  href="/" onClick={()=> handleSignOut(route)}>
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}



export function ApplicationLayout({ children }) {
  const [notifications, setNotifications] = useState([{email: ""}]);
  const navigate = useNavigate(); 
  // const location = useLocation();

  async function handleSignOut (route) {
  
    try {

      // eslint-disable-next-line
      const res = await  api.post("/api/v1/users/logout",{

      })
      
      localStorage.removeItem("active-user");
      navigate(route, {replace: true});
    } catch(err){
      console.log(err);
    }
   
  }



  async function handleNAction(route) {

    
    try{
      
      await api.get(route);
    /* eslint-disable-next-line */
    } catch(err) {}
    
  }


  function handleNotifications(pos){
    const ModifiedEl = notifications.filter((message , index)=> index !== pos );
    setNotifications(ModifiedEl);
    
  }



  

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown >
              <DropdownButton className= { clsx( `bg-white  text-blue-600 after:content-['${notifications.length > 0 ? notifications.length : ""}']  after:absolute
              after:-top-[4px] after:right-[2px] after:text-sm after:text-indigo-200  dark:bg-[inherit]`)}
              as={NavbarItem}>
                <EnvelopeIcon/>
              </DropdownButton>
              { notifications.length >= 1 && 
              <NotificationDropDownMenu notifications={notifications}
              handleNotifications={handleNotifications}
               setNotifications={setNotifications} handleNAction={handleNAction} anchor="bottom end" />
              }
            </Dropdown>
              

            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="default.jpg" square />
              </DropdownButton>
              <AccountDropdownMenu  handleSignOut={handleSignOut} route={"/"}    anchor="bottom end" />
            </Dropdown>
          
          </NavbarSection>
          
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Logo/>
                <SidebarLabel></SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="#">
                  <PlusIcon />
                  <DropdownLabel>Add Event&hellip;</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem to="/dashboard" >
               <RectangleGroupIcon/>
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
              <SidebarItem to="/lectures" >
                <AcademicCapIcon/>
                <SidebarLabel>Lectures</SidebarLabel>
              </SidebarItem>
              <SidebarItem to="/live-class" >
                <LifebuoyIcon/>
                <SidebarLabel>Live Class</SidebarLabel>
              </SidebarItem>
              <SidebarItem  to="/settings">
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>

            </SidebarSection>

             

            <SidebarSection>
              <SidebarItem href="#">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">
                <ChatBubbleLeftIcon/>
                <SidebarLabel>Feedback</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
            <div className="mt-6">
              <div className={"bg-[var(--accent-bg)] ml-2 px-4 py-1 rounded-[3.5px] tracking-[0.2em]\
              max-w-[5rem] text-white text-[0.9rem]"}>
                V1.0.1
              </div>
            </div>
          </SidebarBody>
          
        </Sidebar>
      }
      navbarDesktop= { 
        <div className='flex gap-x-[0.9rem]'> 
           <Dropdown >
              <DropdownButton className= { clsx( `text-blue-600 after:content-['${notifications.length > 0 ? notifications.length : ""}']  after:absolute
              after:-top-[4px] after:right-[2px] after:text-sm after:text-indigo-200  dark:bg-[inherit]`)}
              as={NavbarItem}>
                <EnvelopeIcon/>
              </DropdownButton>
              { notifications.length >= 1 && 
              <NotificationDropDownMenu notifications={notifications}
              handleNotifications={handleNotifications}
               setNotifications={setNotifications} handleNAction={handleNAction} anchor="bottom end" />
              }
            </Dropdown>
              
          <Dropdown>
            <DropdownButton style={{cursor: "pointer"}}  as={NavbarItem}>
            <Avatar src="default.jpg" square />
          </DropdownButton>
          <AccountDropdownMenu   handleSignOut={handleSignOut}  route={"/"}    anchor="bottom end" />
          </Dropdown>
        </div>
        }
    >
      {children}
      
    </SidebarLayout>
  )
}
