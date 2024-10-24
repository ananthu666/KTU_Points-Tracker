"use client";
import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";
import React, { useEffect, useState } from "react";

// import { useSelector } from "react-redux";
import supabase from '@/lib/supabaseClient';

const Page = () => {
  // User details
  const email= localStorage.getItem('studentemail');

  const storedStudentData = localStorage.getItem('studentdata');
  

  // Fetch student data based on email
  const studentData = storedStudentData ? JSON.parse(storedStudentData) : null;
  
  console.log("Student data---:", studentData.email);

  return (
    <div className="w-screen h-screen flex">
      <NavBar />
      <div className="flex-1">
        <TopBar />
        <div className="p-6">
          {/* Profile Details */}
          <div className="bg-white rounded-lg p-8 pl-4 pt-2">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Profile Details</h2>
            <ul className="space-y-4">
              {/* Displaying user details in a single list */}
              <li className="flex justify-start">
                <span className="font-medium text-gray-600 w-52">Full Name</span>
                <span className="text-gray-800">{studentData.username || "N/A"}</span>
              </li>
              <li className="flex justify-start">
                <span className="font-medium text-gray-600 w-52">University ID</span>
                <span className="text-gray-800">{studentData.collegeid || "N/A"}</span>
              </li>
              <li className="flex justify-start">
                <span className="font-medium text-gray-600 w-52">Department</span>
                <span className="text-gray-800">{studentData.department || "N/A"}</span>
              </li>
              <li className="flex justify-start">
                <span className="font-medium text-gray-600 w-52">Year of Study</span>
                <span className="text-gray-800">{studentData.yos ? `${studentData.yos}th year` : "N/A"}</span>
              </li>
              <li className="flex justify-start">
                <span className="font-medium text-gray-600 w-52">Batch</span>
                <span className="text-gray-800">{studentData.year_of_pass ? `${studentData.year_of_pass - 4}-${studentData.year_of_pass}` : "N/A"}</span>
              </li>
              <li className="flex justify-start">
                <span className="font-medium text-gray-600 w-52">Email Address</span>
                <span className="text-gray-800">{studentData.email || "N/A"}</span>
              </li>
              <li className="flex justify-start">
                <span className="font-medium text-gray-600 w-52">Date of Birth</span>
                <span className="text-gray-800">{studentData.dob || "N/A"}</span>
              </li>
              <li className="flex justify-start">
                <span className="font-medium text-gray-600 w-52">Phone Number</span>
                <span className="text-gray-800">{studentData.phone || "N/A"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
