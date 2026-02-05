"use client";

import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios"

interface HandleOpenInterface {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userId: string;
}

export function UpdateProfile({ isOpen, setIsOpen, userId }: HandleOpenInterface) {
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateName = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/changeName`,
      { name },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 201) {
      console.log("Name changed successfully:", response.data);
      toast.success("Name changed successfully")
    } else {
      toast.error("Failed to change name");
    }
  } catch (error: any) {
    console.error("Error changing name:", error.response?.data || error.message);
  }finally{
    setName("");
  }
};

  const handleChangePassword = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/changePassword`, 
      { password: { oldPassword, newPassword } },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 201) {
      console.log("Password changed successfully:", response.data);
      toast.success("Password changed successfully")
    } else {
      console.error("Failed to change password:", response.data);
      toast.error("Failed to change password")
    }
  } catch (error: any) {
    console.error("Error changing password:", error.response?.data || error.message);
  } finally{
    setOldPassword("");
    setNewPassword("");
  }
};

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription>
              <div className="space-y-6 mt-4">


                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="font-medium text-gray-700">
                    Change Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter new name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleUpdateName}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md mt-2 transition-colors duration-200"
                  >
                    Change Name
                  </button>
                </div>


                <div className="flex flex-col space-y-2">
                  <label htmlFor="oldPassword" className="font-medium text-gray-700">
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <label htmlFor="newPassword" className="font-medium text-gray-700 mt-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    onClick={handleChangePassword}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md mt-2 transition-colors duration-200"
                  >
                    Change Password
                  </button>
                </div>

              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
