import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../utils/baseURL.js";

export const adminAPI = createApi({
  reducerPath: "adminAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/admins`,
    credentials: "include",
  }),
  tagTypes: ["Hostel", "Room", "Student", "Staff"],
  endpoints: (builder) => ({
      adminLogin: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: data, // { email, password }
      }),
    }),
    adminRegister: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data, // { name, email, password, role, image? }
      }),
    }),

    // ---------------- Hostels ----------------
    createHostel: builder.mutation({
      query: (hostelData) => ({
        url: `/hostels`,
        method: "POST",
        body: hostelData,
      }),
      invalidatesTags: ["Hostel"],
    }),
    getAllHostels: builder.query({
      query: () => `/hostels`,
      providesTags: ["Hostel"],
    }),
    updateHostel: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/hostels/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Hostel"],
    }),
    deleteHostel: builder.mutation({
      query: (id) => ({
        url: `/hostels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hostel"],
    }),

    // ---------------- Rooms ----------------
    createRoom: builder.mutation({
      query: (roomData) => ({
        url: `/rooms`,
        method: "POST",
        body: roomData,
      }),
      invalidatesTags: ["Room"],
    }),
    getAllRooms: builder.query({
      query: () => `/rooms`,
      providesTags: ["Room"],
    }),
    getAvailableRooms: builder.query({
      query: () => `/rooms/available`,
      providesTags: ["Room"],
    }),
    assignStudentsToRoom: builder.mutation({
      query: ({ student_id, room_id }) => ({
        url: `/rooms/assign`,
        method: "POST",
        body: { student_id, room_id },
      }),
      invalidatesTags: ["Room", "Student"],
    }),

    // ---------------- Students ----------------
    addStudent: builder.mutation({
      query: (studentData) => ({
        url: `/students`,
        method: "POST",
        body: studentData,
      }),
      invalidatesTags: ["Student"],
    }),
    getAllStudents: builder.query({
      query: () => `/students`,
      providesTags: ["Student"],
    }),
    updateStudent: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/students/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),

    // ---------------- Staff ----------------
    addStaff: builder.mutation({
      query: (staffData) => ({
        url: `/staff`,
        method: "POST",
        body: staffData,
      }),
      invalidatesTags: ["Staff"],
    }),
    getAllStaff: builder.query({
      query: () => `/staff`,
      providesTags: ["Staff"],
    }),
    updateStaff: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/staff/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Staff"],
    }),
    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminRegisterMutation,

  useCreateHostelMutation,
  useGetAllHostelsQuery,
  useUpdateHostelMutation,
  useDeleteHostelMutation,

  useCreateRoomMutation,
  useGetAllRoomsQuery,
  useGetAvailableRoomsQuery,
  useAssignStudentsToRoomMutation,

  useAddStudentMutation,
  useGetAllStudentsQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,

  useAddStaffMutation,
  useGetAllStaffQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = adminAPI;

export default adminAPI;