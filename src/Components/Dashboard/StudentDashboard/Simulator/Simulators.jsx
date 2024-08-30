import React, { useEffect, useState } from "react";
import Sidebar from "../../utilities/Sidebar";
import SimulatorCard from "./SimulatorCard"; // Assume you have a SimulatorCard component for displaying simulators
import PageNameAndDate from "../../utilities/PageNameAndDate";
import axios from "axios";

const Simulators = () => {
  const [simulators, setSimulators] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/student/dashboard/simulators/`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setSimulators(Array.isArray(response.data.simulators)
          ? response.data.simulators
          : []);
      })
      .catch((error) => {
        console.error("Error fetching simulators:", error);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="fixed flex flex-col md:flex-row h-screen">
        <Sidebar />
      </div>

      <div className="md:ml-[268px] sm:ml-44 flex flex-col w-full">
        <div className="w-full p-6 mt-4">
          <PageNameAndDate pageName={"Simulators"} />

          <div className="flex justify-between rounded-md w-full my-3"></div>
        </div>

        <div className="flex justify-center gap-8 h-full w-full p-4 flex-wrap">
          {/* Check if simulators is not empty before mapping */}
          {simulators.length > 0 ? (
            simulators.map((simulator, index) => (
              <div key={index} className="w-72">
                <SimulatorCard
                  Id={index+1}
                  simulatorTitle={simulator.title}
                  MCQs={simulator.noOfMCQs}
                  duration={simulator.duration}
                />
              </div>
            ))
          ) : (
            <p>No simulators available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulators;
