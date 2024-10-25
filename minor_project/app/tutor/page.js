"use client";
import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import supabase from "@/lib/supabaseClient";
import DocumentViewer from "../DocumentViewer";

const Page = () => {
  // Example new activities for approval
  const [achieve, setachieve] = useState([]);
  const fetchAchievements = async () => {
    const { data: achievements, error } = await supabase
      .from("achievements")
      .select(
        `*,
        *,
        students (
          * 
          
        )
      `
      ) // Select relevant columns
      .order("collegeid", { ascending: true });

    if (error) {
      console.error("Error fetching achievements:", error);
    } else {
      setachieve(achievements);
    }
  };
  useEffect(() => {
    fetchAchievements();
  }, []);

  console.log("ach", achieve);

  const [activities, setActivities] = useState([
    {
      sl_no: 1,
      student_name: "Alice Johnson",
      activity_name: "Volunteer Work",
      activity_head: "Mr. Smith",
      points: 20,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 2,
      student_name: "Bob Smith",
      activity_name: "Science Fair",
      activity_head: "Dr. Brown",
      points: 30,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 3,
      student_name: "Charlie Davis",
      activity_name: "Sports Competition",
      activity_head: "Coach Lee",
      points: 25,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 4,
      student_name: "Daisy Miller",
      activity_name: "Art Exhibition",
      activity_head: "Ms. Wilson",
      points: 35,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 5,
      student_name: "Ethan Johnson",
      activity_name: "Debate Club",
      activity_head: "Mr. White",
      points: 15,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 6,
      student_name: "Fiona Clark",
      activity_name: "Coding Workshop",
      activity_head: "Mr. Black",
      points: 40,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 7,
      student_name: "George Walker",
      activity_name: "Math Olympiad",
      activity_head: "Mrs. Green",
      points: 50,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 8,
      student_name: "Hannah Hall",
      activity_name: "Music Festival",
      activity_head: "Mr. Grey",
      points: 30,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 9,
      student_name: "Ian Young",
      activity_name: "Environmental Cleanup",
      activity_head: "Ms. Blue",
      points: 20,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 10,
      student_name: "Jack Lee",
      activity_name: "Theater Performance",
      activity_head: "Mr. Red",
      points: 25,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 11,
      student_name: "Kelly Martinez",
      activity_name: "Photography Contest",
      activity_head: "Ms. Gold",
      points: 30,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 12,
      student_name: "Liam Perez",
      activity_name: "Dance Workshop",
      activity_head: "Mr. Silver",
      points: 35,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 13,
      student_name: "Mia Taylor",
      activity_name: "Charity Run",
      activity_head: "Ms. Purple",
      points: 20,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 14,
      student_name: "Noah Davis",
      activity_name: "History Presentation",
      activity_head: "Mr. Orange",
      points: 30,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 15,
      student_name: "Olivia Brown",
      activity_name: "Cooking Class",
      activity_head: "Chef White",
      points: 15,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 16,
      student_name: "Paul Garcia",
      activity_name: "Robotics Workshop",
      activity_head: "Mr. Blue",
      points: 45,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 17,
      student_name: "Quinn King",
      activity_name: "Student Council Meeting",
      activity_head: "Ms. Black",
      points: 10,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 18,
      student_name: "Rita Allen",
      activity_name: "Book Club",
      activity_head: "Mrs. Green",
      points: 15,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 19,
      student_name: "Sam Evans",
      activity_name: "Science Club",
      activity_head: "Mr. Brown",
      points: 20,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
    {
      sl_no: 20,
      student_name: "Tina Roberts",
      activity_name: "Yoga Class",
      activity_head: "Ms. Pink",
      points: 25,
      approved: false,
      image_url: "https://via.placeholder.com/150",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 8;
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle approval
  const handleApproval = async (id) => {
    try {
      // Update the "achievements" table or any other table you are working with
      const { data, error } = await supabase
        .from("achievements") // Replace with your table name
        .update({ approved: "approved" }) // Change `approved` field or any other field to be updated
        .eq("id", id); // Filter by the `id` or other field

      if (error) {
        console.error("Error updating approval status:", error);
      } else {
        console.log("Record updated successfully:", data);
        // Optionally, refresh the state to reflect the updated data
        fetchAchievements(); // Call your data fetch function again to get updated data
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // Function to handle rejection
  const handleRejection = async (id) => {
    try {
      // Update the "achievements" table or any other table you are working with
      const { data, error } = await supabase
        .from("achievements") // Replace with your table name
        .update({ approved: "rejected" }) // Change `approved` field or any other field to be updated
        .eq("id", id); // Filter by the `id` or other field

      if (error) {
        console.error("Error updating approval status:", error);
      } else {
        console.log("Record updated successfully:", data);
        // Optionally, refresh the state to reflect the updated data
        fetchAchievements(); // Call your data fetch function again to get updated data
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // Calculate current activities for pagination
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = activities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );
  const totalPages = Math.ceil(activities.length / activitiesPerPage);

  return (
    <div className="w-screen h-screen flex">
      <NavBar />
      <div className="flex-1">
        <TopBar />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            New Activities for Approval
          </h2>
          <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="px-4 py-2 text-left">Sl No</th>
                <th className="px-4 py-2 text-left">Student Name</th>
                <th className="px-4 py-2 text-left">Activity Name</th>
                <th className="px-4 py-2 text-left">Activity Head</th>
                <th className="px-4 py-2 text-left">Points</th>
                <th className="px-4 py-2 text-left">Approved</th>
                <th className="px-4 py-2 text-left">View</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {achieve.map((activity, index) => (
                <tr
                  key={activity.sl_no}
                  className="hover:bg-gray-100 border-b border-gray-200"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{activity.students.username}</td>
                  <td className="px-4 py-2">{activity.act_name}</td>
                  <td className="px-4 py-2">{activity.act_head}</td>
                  <td className="px-4 py-2">{activity.points}</td>
                  <td className="px-4 py-2">
                    {activity.approved ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSelectedImage(activity.proof_url)}
                      className=""
                    >
                      <FaEye size={20} />
                    </button>
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    {activity.approved == "pending" ? (
                      <>
                        <button
                          onClick={() => handleApproval(activity.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejection(activity.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                      </>
                    ) : activity.approved == "approved" ? (
                      <span className="text-green-600">Approved</span>
                    ) : (
                      <span className="text-red-600">Rejected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          {/* Modal for Viewing Image */}
          {selectedImage && (
            <DocumentViewer
              url={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
