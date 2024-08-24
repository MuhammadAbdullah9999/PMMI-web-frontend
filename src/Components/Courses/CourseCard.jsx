import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 ease-in-out duration-300">
      <img
        src={course.img}
        alt="Course"
        className="w-full"
      />
      <div className="p-4">
        <h2 className="text-md font-semibold mb-2">{course.title}</h2>
        <p className="text-gray-600 mb-1 text-sm">Instructor: {course.InstructorName}</p>
        <p className="text-gray-600 mb-4 text-sm">Duration: {course.duration}</p>
        <Link 
          to={`/courses/courseDetail/${encodeURIComponent(course.title)}`} 
          className="text-center text-blue-500 cursor-pointer hover:underline"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
