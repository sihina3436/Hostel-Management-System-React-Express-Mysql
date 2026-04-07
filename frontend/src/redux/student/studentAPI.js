// src/redux/student/studentAPI.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../utils/baseURL.js";

export const studentAPI = createApi({
  reducerPath: "studentAPI",
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${getBaseURL()}/api/students`,
    prepareHeaders: (headers, { getState }) => {
      // ✅ Correctly get token from Redux state
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include", // include cookies if any
  }),
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ studentId, profileData }) => ({
        url: `/${studentId}/profile`,
        method: "PUT",
        body: profileData,
      }),
    }),

    changePassword: builder.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: `/me/password`,
        method: "PUT",
        body: { currentPassword, newPassword },
      }),
    }),


    getRoomDetails: builder.query({
      query: ({ studentId }) => ({
        url: `/${studentId}/room`,
        method: "GET",
      }),
    }),

    getstudentProfile: builder.query({
      query: ({ studentId }) => ({
        url: `/${studentId}/profile`,
        method: "GET",
      }),
    })

  }),
});

export const { useUpdateProfileMutation, useChangePasswordMutation, useGetRoomDetailsQuery, useGetstudentProfileQuery } = studentAPI;
export default studentAPI;
