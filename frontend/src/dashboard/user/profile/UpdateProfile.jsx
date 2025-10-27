import React, { useState } from "react";

const UpdateProfile = () => {
  // const [avatar, setAvatar] = useState("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
  // const [preview, setPreview] = useState(avatar);

  // const handleAvatarChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setAvatar(URL.createObjectURL(file));
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

  return (
    <div className="max-w-4xl mx-auto bg-white p-12">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-green-700 text-center -mt-12 mb-16">
        Update Profile
      </h2>

      {/* Avatar Upload
      <div className="flex flex-col items-center mb-8">
        <img
          src={preview}
          alt="Profile Avatar"
          className="w-32 h-32 rounded-full border-2 border-green-400 shadow-sm mb-2 object-cover"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-400"
        />
      </div> */}

      <form className="space-y-6">
        {/* Full Name & Registration */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              defaultValue="Sihara Edirisinghe"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="registration" className="block text-sm font-medium text-gray-600">
              Registration Number
            </label>
            <input
              id="registration"
              type="text"
              defaultValue="TG/2021/1033"
              disabled
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue="sihara_20211033@fot.ruh.ac.lk"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              defaultValue="+94 741160804"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {/* Assigned Room, Level, Gender & Department (Read-only) */}
        <div className="grid md:grid-cols-6 gap-6">
          <div className="space-y-2 md:col-span-1">
            <label htmlFor="assigned-room" className="block text-sm font-medium text-gray-600">
              Assigned Room
            </label>
            <input
              id="assigned-room"
              type="text"
              defaultValue="G-427"
              disabled
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2 md:col-span-1">
            <label htmlFor="level" className="block text-sm font-medium text-gray-600">
              Level
            </label>
            <input
              id="level"
              type="text"
              defaultValue="Level 01"
              disabled
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2 md:col-span-1">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-600">
              Gender
            </label>
            <input
              id="gender"
              type="text"
              defaultValue="Female"
              disabled
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2 md:col-span-3">
            <label htmlFor="department" className="block text-sm font-medium text-gray-600">
              Department
            </label>
            <input
              id="department"
              type="text"
              defaultValue="Information and Communication Technology"
              disabled
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Home Address */}
        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-600">
            Home Address
          </label>
          <input
            id="address"
            type="text"
            defaultValue="123 Maharagama, Colombo"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Change Password */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4">Change Password</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-600">
                Current Password
              </label>
              <input
                id="current-password"
                type="password"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-600">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
