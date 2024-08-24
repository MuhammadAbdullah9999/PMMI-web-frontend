import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Navbar from "../styles/Navbar";
import CourseCard from "./CourseCard";
import Footer from "../LandingPage/Footer";

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState("courses");

  // Typing animation for the heading
  const headingProps = useSpring({
    from: { width: "0%"},
    to: { width: "100%" },
    config: { duration: 4000 },
    reset: true,
  });

  // Typing animation for the paragraph
  const paragraphProps = useSpring({
    from: { width: "0%" },
    to: { width: "100%",  },
    config: { duration: 5000 },
    reset: true,
  });

  // Sample data
  const courses = [
    { title: "PMP Certification", InstructorName: "John Doe", duration: "40 hours", type: "course", img: `${process.env.PUBLIC_URL}/images/Course-img-1.png` },
    { title: "PMI-ACP Exam Prep", InstructorName: "Jane Smith", duration: "30 hours", type: "course", img: `${process.env.PUBLIC_URL}/images/Course-img-2.png` },
    { title: "CAPM Training", InstructorName: "Alice Johnson", duration: "25 hours", type: "course", img: `${process.env.PUBLIC_URL}/images/Course-img-3.png` },
    { title: "Advanced Project Management", InstructorName: "Bob Brown", duration: "35 hours", type: "course", img: `${process.env.PUBLIC_URL}/images/Course-img-4.png` },
    { title: "Project Management Simulator", InstructorName: "Simulator Team", duration: "N/A", type: "simulator", img: `${process.env.PUBLIC_URL}/images/Course-img-1.png` },
  ];

  return (
    <div>
      <Navbar textColor="text-blue-800" />

      <div className="relative">
        <img
          src={`${process.env.PUBLIC_URL}/images/Courses-page-main-image.png`}
          alt="Landing"
          className="w-full h-[500px] object-cover"
        />

        {/* Overlay text and button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <animated.h1
            style={headingProps}
            className="text-xl sm:text-4xl md:h-12 font-bold mb-4 overflow-hidden whitespace-nowrap"
          >
            All Project Management Training Courses
          </animated.h1>

          <animated.p
            style={paragraphProps}
            className="text-xs w-4/5 sm:text-xl mb-8 overflow-hidden whitespace-nowrap"
          >
            Explore comprehensive courses to enhance your project management skills.
          </animated.p>

          <div className="w-1/2 md:w-32 mt-4 text-center font-semibold bg-blue-900 text-white rounded-full px-3 py-2 hover:bg-blue-600 cursor-pointer hover:shadow-lg active:text-white active:bg-blue-500">
            Get Started
          </div>
        </div>
      </div>

      {/* Tabs for filtering */}
      <div className="flex flex-wrap justify-center gap-4 my-8 px-4">
        <div
          onClick={() => setActiveTab("courses")}
          className={`cursor-pointer px-4 py-2 rounded-lg ${
            activeTab === "courses" ? "bg-blue-500 text-white" : "bg-gray-200"
          } transition-colors duration-300`}
        >
          Courses
        </div>
        <div
          onClick={() => setActiveTab("simulators")}
          className={`cursor-pointer px-4 py-2 rounded-lg ${
            activeTab === "simulators" ? "bg-blue-500 text-white" : "bg-gray-200"
          } transition-colors duration-300`}
        >
          Simulators
        </div>
      </div>

      {/* Filtered content */}
      <div className="p-4 px-4 sm:px-8 flex flex-wrap gap-6 justify-center mb-12">
        {courses
          .filter(course => activeTab === "courses" ? course.type === "course" : course.type === "simulator")
          .map((course, index) => (
            <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-[23%]">
              <CourseCard course={course} />
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;
