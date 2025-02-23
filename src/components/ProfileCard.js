import React, { useState } from "react";

const ProfileCard = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
      <div className="relative">
        <label htmlFor="profile-upload" className="cursor-pointer">
          <div className="border-dashed border-2 border-gray-300 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
            {image ? (
              <img src={image} alt="Profile" className="rounded-full w-24 h-24 object-cover" />
            ) : (
              <span className="text-gray-500">+</span>
            )}
          </div>
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <p className="text-gray-600 mt-4">Add Profile</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Upload Photo
      </button>
    </div>
  );
};

export default ProfileCard; // ✅ Ensure this is a default export
