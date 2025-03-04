import React, {useState} from "react";
import { FaArrowLeft, FaBell, FaKey, FaWrench, FaTrash  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {

  const [notification, setNotification] = useState("email");

  const handleChange = (event) => {
    setNotification(event.target.value);
  };

  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/dashboard"); 
  };

  return (
    <div className="h-screen items-center justify-center">
        <div className="flex items-center gap-8 top-6 left-6 px-8 py-8 ">
            <FaArrowLeft className="text-3xl cursor-pointer" onClick={handleIconClick} />
            <h1 className="text-3xl font-semibold">Profile setting</h1>
        </div>   

        <div className="flex">
          <div className="w-3/5 items-center ml-8 mt-10">
            <div class="flex items-center space-x-8 mb-4 ">
              <span class="text-lg font-medium text-gray-700">Notifications</span>
              <FaBell />
            </div>

            <div class="grid grid-cols-12 gap-4 items-center">
            
              <div class="col-span-6 space-y-3">
                <label class="flex items-center space-x-2">
                  <input type="radio" name="notification" value="email" className="form-radio text-blue-600" checked={notification === "email"} onChange={handleChange}/>
                  <span class="text-gray-700">Send through email</span>
                </label>
                
                <label class="flex items-center space-x-2">
                  <input type="radio" name="notification" value="apps" className="form-radio text-blue-600" checked={notification === "apps"} onChange={handleChange}/>
                  <span class="text-gray-700">Only in apps</span>
                </label>
                
                <label class="flex items-center space-x-2">
                  <input type="radio" name="notification" value="off" className="form-radio text-blue-600" checked={notification === "off"} onChange={handleChange}/>
                  <span class="text-gray-700">Off</span>
                </label>
              </div>

              <div class="col-span-6">
                <input 
                  type="text" 
                  placeholder="Enter your email" 
                  class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="w-2/5 flex flex-col ml-8 mt-10 pr-5">
            <span class="text-lg font-medium text-gray-700 mb-5">Rename the farm</span>
            <input 
                  type="text" 
                  placeholder="Enter the new name" 
                  class="border border-gray-300 rounded px-3 py-2"
              />
          </div>
        </div>

        <div className="flex mt-10 ">
          <div className="w-3/5 items-center ml-8">
            <div class="flex items-center space-x-8 mb-4 ">
              <span class="text-lg font-medium text-gray-700">Change password</span>
              <FaKey />
            </div>

            <div class="space-y-3 w-4/5">
                <input 
                  type="password" 
                  placeholder="Old password" 
                  class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  type="password" 
                  placeholder="New password" 
                  class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  type="password" 
                  placeholder="Enter new password again" 
                  class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
          </div>

          <div className="w-2/5 flex flex-col ml-8 space-y-10">
            <div class="flex items-center space-x-2">
              <span class="text-lg font-medium text-gray-700">Configure servers and devices</span>
              <FaWrench />
            </div>  

            <div class="flex items-center space-x-2">
              <span class="text-xl font-medium text-red-700">Delete farm</span>
              <FaTrash class="text-red-700"/>
            </div> 
          </div>
        </div>

        <div class="flex justify-end p-8">
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Save
          </button>
        </div>
    </div>
  );
};

export default UserProfile;
