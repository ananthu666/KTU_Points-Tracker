"use client";
import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import supabase from "@/lib/supabaseClient";

const Page = () => {
  const email = localStorage.getItem("studentemail");
  const [achievements, setAchievements] = useState([]);

  const state = useSelector((state) => state);

  const fetchAData = async (email1) => {
    console.log("Fetching data for:", email1);
    const { data: userData, error: userError } = await supabase
      .from("achievements")
      .select("*")
      .eq("email", email1);

    if (userError) {
      console.error("Error fetching data:", userError);
    } else {
      console.log("Fetched student data:", userData);
      setAchievements(userData);
      // Calculate total points and number of achievements
      const totalPoints = userData.reduce(
        (sum, achievement) => sum + achievement.points,
        0
      );
    }
  };
  const fetchUdata = async (email1) => {
    console.log("Fetching data for:", email1);
    const { data: userData, error: userError } = await supabase
      .from('students') // Make sure 'students' is your correct table name
      .select('*')
      .eq('email', email1)
      .single();

    if (userError) {
      console.error("Error fetching data:", userError);
    } else {
      console.log("Fetched student data:", userData);
      localStorage.setItem('studentdata', JSON.stringify(userData));
    }
  };

  // Set email and old data from state.auth when availabl
  // Fetch student data when email is updated
  useEffect(() => {
    if (email) {
      fetchAData(email);
      fetchUdata(email);
    }
  }, [email]);



  const totalPoints = achievements
    .filter((achievement) => achievement.approved === "approved")
    .reduce((sum, achievement) => sum + achievement.points, 0);
  const numAchievements = achievements.filter(
    (achievement) => achievement.approved === "approved"
  ).length;
  return (
    <div className="w-screen h-screen flex">
      <NavBar />
      <div className="flex-1">
        <TopBar />
        <div className="p-6">
          {/* Statistics Section */}
          <div className="flex justify-between mb-10 bg-blue-400 text-white p-6 rounded-lg">
            <div className="text-center">
              <h2 className="text-2xl">Total Activity Points</h2>
              <p className="text-lg mt-2">{totalPoints}</p>{" "}
              {/* Render total points */}
            </div>
            <div className="text-center">
              <h2 className="text-2xl">Number of Achievements</h2>
              <p className="text-lg mt-2">{numAchievements}</p>{" "}
              {/* Render number of achievements */}
            </div>
          </div>

          {/* Achievements Table */}
          <h2 className="text-center text-2xl font-semibold mb-4">
            Achievements
          </h2>
          <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="p-4 text-left">Sl No</th>
                <th className="p-4 text-left">Activity Name</th>
                <th className="p-4 text-left">Activity Head</th>
                <th className="p-4 text-left">Points</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {achievements.length > 0 ? (
                achievements.map((achievement, index) => (
                  <tr
                    key={achievement.id}
                    className="hover:bg-gray-100 border-b border-gray-200"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{achievement.act_name}</td>
                    <td className="p-4">{achievement.act_head}</td>
                    <td className="p-4">{achievement.points}</td>
                    <td
                      className="p-4"
                      style={{
                        color:
                          achievement.approved === "approved" ? "green" : achievement.approved === "pending"?"orange":"red",
                      }}
                    >
                      {achievement.approved}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    No achievements found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
