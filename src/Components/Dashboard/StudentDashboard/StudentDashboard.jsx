import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../utilities/Sidebar";
import DashboardCard from "../utilities/DashboardCard";
import PageNameAndDate from "../utilities/PageNameAndDate";
import axios from "axios";

function StudentDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initial state set to null
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pmi-web-backend.onrender.com/auth/verifyAuth`, { withCredentials: true })
      .then((response) => {
        if (response.data.user.userType == "student") {
          setIsAuthenticated(true);
          fetchDashboardData();
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        setIsAuthenticated(false);
        console.log(error);
      });
  }, []);

  const fetchDashboardData = () => {
    axios
      .get(`https://pmi-web-backend.onrender.com/student/dashboard`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  };

  // Destructure values from dashboardData
  const enrolledCoursesCount = dashboardData
    ? dashboardData.enrolledCourses.length
    : 0;
  const simulatorsCount = dashboardData ? dashboardData.simulators.length : 0;
  const completedCoursesCount = dashboardData
    ? dashboardData.completedCourses
    : 0;
  const upcomingMeetings = dashboardData ? dashboardData.upcomingMeetings : [];

  return isAuthenticated === null ? (
    <div>Loading...</div> // Show loading state while checking authentication
  ) : isAuthenticated ? (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 mt-4">
          <PageNameAndDate pageName="Dashboard" />
          <div className="grid grid-cols-2 gap-4">
            <DashboardCard
              label="Enrolled Course"
              value={enrolledCoursesCount}
            />
            <DashboardCard
              label="Enrolled Simulators"
              value={simulatorsCount}
            />
            <DashboardCard
              label="Course Completed"
              value={completedCoursesCount}
            />
            <DashboardCard
              label="Upcoming Meetings"
              value={upcomingMeetings.length}
            />
          </div>
          <div className="flex flex-col gap-3 items-center w-11/12 h-48 overflow-auto m-auto mt-12 bg-gray-100 rounded-xl p-4 shadow-md shadow-gray-200">
            <h2 className="text-xl font-semibold">Notice Board</h2>
            <p>Upcoming Sessions</p>
            <hr className="w-full border" />
            <div className=" flex justify-between w-full">
              <p className="font-bold">Link</p>
              <p className="font-bold">Date</p>
              <p className="font-bold">Time</p>
            </div>
            {upcomingMeetings.length > 0 ? (
              upcomingMeetings.map((meeting, index) => (
                <div key={index} className="flex justify-between w-full mt-4">
                  <div className="flex flex-col gap-2 w-12">
                    <p className="w-full break-words">
                      <a
                        href={meeting.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-500 underline"
                        style={{
                          width: "150px",
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        {meeting.meetingLink || "N/A"}
                      </a>
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="pl-24">
                      {new Date(meeting.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>{meeting.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No upcoming sessions.</p>
            )}
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

export default StudentDashboard;
