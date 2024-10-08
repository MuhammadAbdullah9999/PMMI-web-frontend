import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import PageNameAndDate from "../../utilities/PageNameAndDate";
import axios from "axios";
import InstructorSidebar from "../../utilities/InstructorSidebar";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [isAuthenticated,setIsAuthenticated]=useState('')

  useEffect(() => {
    axios
      .get(`https://pmi-web-backend.onrender.com/auth/verifyAuth`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        if (response.data.user.userType === "instructor") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        setIsAuthenticated(false);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://pmi-web-backend.onrender.com/instructor/dashboard/students/`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setStudents(Array.isArray(response.data.students
        ) ? response.data.students
        : []);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return isAuthenticated === null ? (
    <div>Loading...</div> // Show loading state while checking authentication
  ) : isAuthenticated ? (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="fixed flex flex-col md:flex-row h-screen">
        <InstructorSidebar />
      </div>

      <div className="md:ml-[268px] sm:ml-44 flex flex-col w-full">
        <div className="w-full p-6 mt-4">
          <PageNameAndDate pageName={"students"} />

          <div className="flex justify-between rounded-md w-full my-3"></div>
        </div>

        <div className="flex justify-center gap-8 h-full w-full p-4 flex-wrap">
          {/* Check if students is not empty before mapping */}
          {students.length > 0 ? (
            students.map((student,index) => (
              <div key={index} className="w-72">
                <StudentCard
                  Id={index+1}
                  name={student.name}
                  email={student.email}
                  contact={student.contact}
                  _id={student._id}
                />
              </div>
            ))
          ) : (
            <p>No students available</p>
          )}
        </div>
      </div>
    </div>
     ) : (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold">You are not logged in</h1>
      </div>
  );
};

export default StudentsList;
