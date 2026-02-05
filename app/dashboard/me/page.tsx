"use client";

import ProtectedRoute from "@/app/wrapper/protectedRoute";
import { useEffect, useState } from "react";
import axios from "axios";
import {UpdateProfile} from "@/app/updateProfile/profile";

interface User {
  _id: string;
  email: string;
  name: string;
}

export default function Page() {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const getUserDetails = async (token: string | null) => {
    if (!token) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/me`,
        {
          headers: { authorization: token },
        }
      );

      if (response.status === 201) {
        setUserDetails(response.data.data);
      }
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    getUserDetails(token);
  }, []);

  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        {userDetails ? (
          <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              User Details
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="font-semibold text-gray-700">User ID:</span>
                <span className="text-gray-900 break-all">{userDetails._id}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="font-semibold text-gray-700">Name:</span>
                <span className="text-gray-900">{userDetails.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-900">{userDetails.email}</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-colors duration-200"
              >
                Change Details
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center text-lg">Loading user details...</p>
        )}
      </div>
      <UpdateProfile isOpen={isOpen} setIsOpen={setIsOpen} userId={userDetails?._id}/>
    </ProtectedRoute>
    
  );
}
