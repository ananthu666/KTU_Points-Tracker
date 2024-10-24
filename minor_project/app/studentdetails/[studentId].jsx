"use client";
import React from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";

const StudentProfilePage = (params) => {
  const { roll_no } = params.studentId;

  // Example student data (In a real app, you might fetch this from an API)
  const studentData = {
    101: {
      name: "Alice Johnson",
      points: 100,
      achievements: ["Volunteered at local shelter", "Won first prize in Science Fair"],
      email: "alice@example.com",
      phone: "123-456-7890",
    },
    102: {
      name: "Bob Smith",
      points: 150,
      achievements: ["Participated in Math Olympiad", "Member of Debate Club"],
      email: "bob@example.com",
      phone: "234-567-8901",
    },
    // Add similar objects for other students...
  };

  const student = studentData[roll_no];

  if (!student) {
    return <div>Loading...</div>; // Handle loading state or show a message if student is not found
  }

  return (
    <div className="w-screen h-screen flex">
      <NavBar />
      <div className="flex-1">
        <TopBar />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{student.name}'s Profile</h2>
          <p><strong>Roll No:</strong> {roll_no}</p>
          <p><strong>Activity Points:</strong> {student.points}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
          <h3 className="text-xl font-semibold mt-4">Achievements:</h3>
          <ul className="list-disc list-inside">
            {student.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
