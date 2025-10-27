import React from "react";

const RoomDetails = () => {
  const roomInfo = {
    number: "G-427",
    type: "Sharing",
    floor: "4th Floor",
    building: "Girls Hostel - Block A",
    assignedDate: "January 5, 2025",
    checkInDate: "January 6, 2025",
    checkOutDate: "December 20, 2025",
    capacity: 4,
    availability: "0 Slots Left",
  };

  const roommates = [
    {
      name: "Amanda Fernando",
      phone: "+94 77 123 4567",
      department: "ICT",
      level: "3",
      avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Sihara Edirisinghe",
      phone: "+94 71 987 6543",
      department: "ICT",
      level: "1",
      avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Hiruni Perera",
      phone: "+94 77 555 1234",
      department: "ICT",
      level: "2",
      avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Devindi Silva",
      phone: "+94 77 888 4321",
      department: "ICT",
      level: "2",
      avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  ];

  const roomItems = [
    "02 Double Beds with Mattress",
    "02 Cupboard",
    "04 Study Table & Chair",
    "01 Ceiling Fan",
    "02 LED Lights",
    "02 Cloth Racks",
  ];

  return (
    <div className="max-w-5xl mx-auto bg-white p-10 space-y-10">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-green-700 text-center mb-6">
        Room Details
      </h2>

      {/* Room Info */}
      <div className="grid md:grid-cols-2 gap-6 bg-green-50 p-6 rounded-xl border border-green-200 shadow-sm">
        <div className="space-y-2">
          <p className="text-gray-700"><strong>Room No:</strong> {roomInfo.number}</p>
          <p className="text-gray-700"><strong>Type:</strong> {roomInfo.type}</p>
          <p className="text-gray-700"><strong>Floor:</strong> {roomInfo.floor}</p>
          <p className="text-gray-700"><strong>Building:</strong> {roomInfo.building}</p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-700"><strong>Capacity:</strong> {roomInfo.capacity} Students</p>
          <p className="text-gray-700"><strong>Availability:</strong> {roomInfo.availability}</p>
          <p className="text-gray-700"><strong>Checked-in Date:</strong> {roomInfo.checkInDate}</p>
          <p className="text-gray-700"><strong>Check-out Date:</strong> {roomInfo.checkOutDate}</p>
          <p className="text-gray-700"><strong>Cleaning Schedule:</strong> {roomInfo.cleaningSchedule}</p>
        </div>
      </div>

      {/* Room Members */}
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-6">Room Members</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {roommates.map((member, index) => (
            <div
              key={index}
              className="flex gap-4 bg-white p-5 rounded-xl border border-green-100 shadow hover:shadow-md transition duration-200"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full border-2 border-green-400 object-cover"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
                <p className="text-sm text-gray-600"><strong>Phone:</strong> {member.phone}</p>
                <p className="text-sm text-gray-600"><strong>Department:</strong> {member.department}</p>
                <p className="text-sm text-gray-600"><strong>Level:</strong> {member.level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room Items */}
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-6">Assigned Room Items</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roomItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100 shadow hover:shadow-md transition duration-200"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-800 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
