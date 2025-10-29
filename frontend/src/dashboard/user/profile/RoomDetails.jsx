import React from "react";

const RoomDetails = () => {
  const roomInfo = {
    number: "G-427",
    type: "Sharing",
    floor: "4th Floor",
    building: "Girls Hostel - Block A",
    capacity: 4,
    availability: "0 Slots Left",
  };

  const roommates = [
    {
      name: "Amanda Fernando",
      phone: "+94 77 123 4567",
      department: "ICT",
      level: "3",
    },
    {
      name: "Sihara Edirisinghe",
      phone: "+94 71 987 6543",
      department: "ICT",
      level: "1",
    },
    {
      name: "Hiruni Perera",
      phone: "+94 77 555 1234",
      department: "ICT",
      level: "2",
    },
    {
      name: "Devindi Silva",
      phone: "+94 77 888 4321",
      department: "ICT",
      level: "2",
    },
  ];

  const getAvatar = (roomNumber) =>
    roomNumber.startsWith("G")
      ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png" // Female
      : "https://cdn-icons-png.flaticon.com/512/236/236832.png"; // Male

  return (
    <div className="max-w-5xl mx-auto bg-white p-10 space-y-10">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-green-700 text-center mb-6">
        Room Details
      </h2>

      {/* Room Info */}
      <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-green-200 shadow-sm">
        <div className="space-y-2">
          <p className="text-gray-700"><strong>Room No:</strong> {roomInfo.number}</p>
          <p className="text-gray-700"><strong>Type:</strong> {roomInfo.type}</p>
          <p className="text-gray-700"><strong>Floor:</strong> {roomInfo.floor}</p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-700"><strong>Capacity:</strong> {roomInfo.capacity} Students</p>
          <p className="text-gray-700"><strong>Availability:</strong> {roomInfo.availability}</p>
          <p className="text-gray-700"><strong>Building:</strong> {roomInfo.building}</p>
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
                src={getAvatar(roomInfo.number)}
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
    </div>
  );
};

export default RoomDetails;
