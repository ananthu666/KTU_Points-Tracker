"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";
import supabase from "@/lib/supabaseClient"; // Ensure supabase is imported correctly

const StudentProfilePage = ({ params }) => {
  const roll_no = params.studentId;
  const [achievements, setachievements] = useState(null); // For achievements
  const [studentData, setStudentData] = useState(null); // For achievements
  const [error, setError] = useState(null); // For error handling
  const [data, setData] = useState(null); // For student details
  console.log("Student data---:", data);
  // Fetch student achievements
  const fetchAchievements = async () => {
    const { data: achievements, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("collegeid", roll_no)
      .eq("approved", "approved"); // Filter approved achievements;

    if (error) {
      console.error("Error fetching achievements:", error);
      setError(error.message);
    } else if (achievements && achievements.length > 0) {
      setStudentData(achievements[0]); // Assuming one student per roll_no
      setachievements(achievements);
    } else {
      setError("No achievements found for this roll number.");
    }
  };

  // Fetch student details
  const fetchStudentDetails = async () => {
    const { data: studentDetails, error: studentError } = await supabase
      .from('students') // Replace with your actual table name
      .select('*')
      .eq('collegeid', roll_no)
      .single(); // Assuming a single student per roll_no

    if (studentError) {
      console.error("Error fetching student details:", studentError);
      setError(studentError.message);
    } else {
      setData(studentDetails);
    }
  };

  // UseEffect to fetch data
  useEffect(() => {
    if (roll_no) {
      fetchAchievements();
      fetchStudentDetails();
    }
  }, [roll_no]);

  // Loading and error states
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <NavBar />
        <div className="flex-1">
          <TopBar />
          <h2 className="text-xl font-semibold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!studentData || !data) {
    return (
      <div className="w-screen h-screen flex">
        <NavBar />
        <div className="flex-1">
          <TopBar />
          <div
            className="flex-1 flex items-center justify-center "
          >
          <h2 className="text-xl font-semibold">Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex">
      <NavBar />
      <div className="flex-1">
        <TopBar />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {data.username}'s Profile
          </h2>
          <p>
            <strong>Roll No:</strong> {roll_no}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Phone:</strong> {data.phone}
          </p>
          <p>
            <strong>Activity Points:</strong> {studentData.points}
          </p>
          <h3 className="text-xl font-semibold mt-4">Achievements:</h3>
          <ul className="list-disc list-inside">
            {achievements && achievements.length > 0 ? (
              achievements.map((achievement, index) => (
                <li key={index}>{achievement.act_name}</li> // Assuming achievements has activity_name
              ))
            ) : (
              <li>No achievements available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
