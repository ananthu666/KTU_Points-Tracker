"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";
import supabase from "@/lib/supabaseClient"; // Ensure this is correctly imported

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 9;

  const fetchAchievements = async () => {
    const { data: achievements, error } = await supabase
      .from("achievements")
      .select("*") // Select relevant columns
      .order("collegeid", { ascending: true })
      .eq("approved", "approved"); // Filter approved achievements

    if (error) {
      console.error("Error fetching achievements:", error);
    } else {
      // Group by collegeid and aggregate data
      const groupedAchievements = achievements.reduce((acc, curr) => {
        if (!acc[curr.collegeid]) {
          acc[curr.collegeid] = {
            collegeid: curr.collegeid,
            points: 0,
            activities: [],
          };
        }

        acc[curr.collegeid].points += curr.points; // Aggregate points
        acc[curr.collegeid].activities.push(curr.act_name); // Collect activity names

        return acc;
      }, {});

      // Convert the object into an array for easier rendering
      const studentArray = Object.values(groupedAchievements);
      setStudents(studentArray); // Set the grouped achievements
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  // Calculate the current students to display
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Change page handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(students.length / studentsPerPage);

  return (
    <div className="min-h-screen overflow-x-hidden flex">
      <NavBar />
      <div className="flex flex-col w-full pb-8">
        <TopBar />
        <h2 className="text-2xl font-semibold px-4 py-4">Students List</h2>

        {/* Header Row */}
        <div className="flex justify-between border-b pb-3 font-semibold text-black px-4">
          <div className="flex-1">University ID</div>
          <div className="flex-1">Activities</div>
          <div className="flex-1">Total Points</div>
          <div className="flex-1 text-right">View More</div>
        </div>

        {/* Display current students */}
        {currentStudents.map((data, index) => (
          <div
            key={index}
            className="flex justify-between text-black px-4 py-2 border-b border-gray-200"
          >
            <div className="flex-1">{data.collegeid}</div>
            <div className="flex-1">
              {data.activities.join(", ")} {/* Display all activities */}
            </div>
            <div className="flex-1">{data.points}</div>
            <Link
              className="flex-1 text-right"
              href={`/studentdetails/${data.collegeid}`}
            >
              <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded hover:bg-blue-600 transition">
                View More
              </button>
            </Link>
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4 px-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentListPage;
