import React, { useEffect, useState } from "react";
import Sidebar from "../../utilities/Sidebar";
import PageNameAndDate from "../../utilities/PageNameAndDate";
import axios from "axios";

const PaymentsAndBilling = () => {
  const [payments, setPayments] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Default to null to indicate loading

  useEffect(() => {
    axios
      .get(`${process.env.ServerURL}/auth/verifyAuth`, { withCredentials: true })
      .then((response) => {
        if (response.data.user.userType === "student") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        setIsAuthenticated(false);
        console.error("Error verifying authentication:", error);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) { // Fetch payments only if authenticated
      axios
        .get(`${process.env.ServerURL}/student/dashboard/payments/`, {
          withCredentials: true,
        })
        .then((response) => {
          if (Array.isArray(response.data.payments)) {
            setPayments(response.data.payments);
          } else {
            console.error("Unexpected data format:", response.data);
            setPayments([]); // Handle unexpected format
          }
        })
        .catch((error) => {
          console.error("Error fetching payments:", error);
        });
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="fixed flex flex-col md:flex-row h-screen ">
        <Sidebar />
      </div>

      <div className="md:ml-[268px] sm:ml-44 flex flex-col w-full p-6">
        <PageNameAndDate pageName={"Payments"} />

<div className="font-bold text-xl mt-4">Billing History</div>
        <div className="mt-6">
          {payments.length > 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              {/* Header Row */}
              <div className="grid grid-cols-6 gap-4 font-semibold mb-2 text-gray-700">
                <div>Course Name</div>
                <div>Amount</div>
                <div>Payment Type</div>
                <div>Date</div>
                <div>Expiry Date</div>
                <div>Duration</div>
              </div>

              {/* Payment Rows */}
              <div className="space-y-4 mt-12">
                {payments.map((payment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="grid grid-cols-6 gap-4 text-sm text-gray-600">
                      <div>{payment.courseName}</div>
                      <div>${payment.amount}</div>
                      <div>{payment.paymentType}</div>
                      <div>{new Date(payment.dateTime).toLocaleDateString()}</div>
                      <div>{new Date(payment.expiryDate).toLocaleDateString()}</div>
                      <div>{payment.duration}</div>
                    </div>
                    {/* <hr className="py-4 border-gray-300" /> */}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-lg text-gray-500">No payments found.</p>
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

export default PaymentsAndBilling;
