import React, { useState, useEffect } from "react";

const ProfileModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("profileData")) || {
        name: "",
        email: "",
        phone: "",
        instagram: "",
        youtube: "",
      }
    );
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(formData));
    alert("Profile Saved!");
    onClose();
  };

  // Close modal on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Close modal on outside click
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  if (!isOpen) return null; // ✅ Now, this comes after useEffect

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative ">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-lg font-semibold">Add New Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            className={`flex-1 p-2 text-center ${
              activeTab === "basic"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("basic")}
          >
            Basic
          </button>
          <button
            className={`flex-1 p-2 text-center ${
              activeTab === "social"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("social")}
          >
            Social
          </button>
        </div>

        {/* Form Fields */}
        {activeTab === "basic" && (
          <div>
            <label className="text-sm font-semibold">Enter Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Eg. John Doe"
              className="w-full border p-2 rounded mt-1 mb-3"
              value={formData.name}
              onChange={handleInputChange}
            />

            <label className="text-sm font-semibold">Enter Email*</label>
            <input
              type="email"
              name="email"
              placeholder="Eg. John@xyz.com"
              className="w-full border p-2 rounded mt-1 mb-3"
              value={formData.email}
              onChange={handleInputChange}
            />

            <label className="text-sm font-semibold">Enter Phone*</label>
            <input
              type="text"
              name="phone"
              placeholder="Eg. 9123456789"
              className="w-full border p-2 rounded mt-1 mb-3"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        )}

        {activeTab === "social" && (
          <div>
            <label className="text-sm font-semibold">
              Instagram Link (Optional)
            </label>
            <input
              type="text"
              name="instagram"
              placeholder="Eg. instagram.com/username"
              className="w-full border p-2 rounded mt-1 mb-3"
              value={formData.instagram}
              onChange={handleInputChange}
            />

            <label className="text-sm font-semibold">
              YouTube Link (Optional)
            </label>
            <input
              type="text"
              name="youtube"
              placeholder="Eg. youtube.com/username"
              className="w-full border p-2 rounded mt-1 mb-3"
              value={formData.youtube}
              onChange={handleInputChange}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="mt-4 flex justify-between">
          {activeTab === "social" && (
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={() => setActiveTab("basic")}
            >
              Back
            </button>
          )}
          {activeTab === "basic" ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
              onClick={() => setActiveTab("social")}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
