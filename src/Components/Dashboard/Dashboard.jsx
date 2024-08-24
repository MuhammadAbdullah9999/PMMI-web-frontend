import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./utilities/Sidebar";
import DashboardCard from "./utilities/DashboardCard";
import PageNameAndDate from "./utilities/PageNameAndDate";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initial state set to null

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/verifyAuth", { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(true);
        console.log(response);
      })
      .catch((error) => {
        setIsAuthenticated(false);
        console.log(error);
      });
  }, []);

  return isAuthenticated === null ? (
    <div>Loading...</div> // Show loading state while checking authentication
  ) : isAuthenticated ? (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 mt-4">
          <PageNameAndDate pageName="Dashboard" />
          <div className="grid grid-cols-2 gap-4">
            <DashboardCard label="Enrolled Course" value={20} />
            <DashboardCard label="Enrolled Simulators" value={10} />
            <DashboardCard label="Course Completed" value={5} />
            <DashboardCard label="Instructors" value={3} />
          </div>
          <div className="flex flex-col gap-3 items-center w-4/5 m-auto mt-12 bg-gray-100 rounded-xl p-4 shadow-md shadow-gray-200">
            <h2 className="text-xl font-semibold">Notice Board</h2>
            <p>Upcoming Sessions</p>
            <hr className="w-full border" />
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-2">
                <p className="font-bold">Link</p>
                <p>www.meeting.com</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">Date</p>
                <p>12-08-2024</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">Time</p>
                <p>10:00 am - 11:00 am</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold">You are not logged in</h1>
    </div>
  );
}

export default Dashboard;
