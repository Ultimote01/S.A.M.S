 import {BrowserRouter, Routes, Route} from "react-router-dom";
 import LoginPage from "./pages/LoginPage";
 import SignupPage from "./pages/SignupPage";
 import Dashboard from "./pages/Dashboard";
import LecturesPage from "./pages/LecturesPage";
import AttendacePage from "./pages/AttendancePage";


function App() {
 
 
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/lectures" element={<LecturesPage/>}/>
      <Route path="/live-class" element={<AttendacePage/>}/>
    </Routes>
   
   </BrowserRouter>
  )
} 
export default App
