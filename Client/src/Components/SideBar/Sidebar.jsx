import React from 'react'
import { Link } from 'react-router-dom'
import './SideBar.css'
import { MdOutlineDashboard } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { MdOutlineTaskAlt } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setSection }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleIntro_navigation = () =>{
    setSection('task1')
    navigate('/task1')
  }
  const handleReportList = () =>{
    setSection('reportList')
    navigate(`/reportList/${userId}`)
  }
  
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setSection('dashboard')}><MdOutlineDashboard size={20}/> Home Page</li>
        <li onClick={() => setSection('announcements')}><GrAnnounce size={20}/> Announcements</li>
        <li onClick={handleIntro_navigation}> <MdOutlineTaskAlt size={20}/> Self intro pitch</li>
        <li onClick={() => setSection('task2')}> <MdOutlineTaskAlt size={20}/> Bot_ mock pitch</li>
        
        <li onClick={handleReportList}>
          <TbReportSearch size={20} /> Report
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
