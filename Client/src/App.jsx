import Dashboard from "./Components/Dashboard/Dashboard";
import LoginPage from "./Components/Login/LoginPage"
import RegisterPage from "./Components/Register/RegisterPage"
import LandingPage from "./Components/LandingPage/LandingPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReportPage from "./Components/ReportPage/ReportPage";
import HomePage from "./Components/HomePage/HomePage";
import Task1 from "./Components/Task1/Task1";
import ListedReport from "./Components/ListedReports/ListedReport";
import ProfilePage from "./Components/ProfilePage/ProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<ReportPage/>} />
          <Route path="/task1" element={<Task1/>} />
          <Route path="/reportlist/:userId" element={<ListedReport/>} />
          <Route path= "/profile" element={<ProfilePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
