"use client";
import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import supabase from '@/lib/supabaseClient'; // Import your Supabase client

const Page = () => {
  // State to hold form data
  const storedStudentData = localStorage.getItem('studentdata');
  

  // Fetch student data based on email
  const studentData = storedStudentData ? JSON.parse(storedStudentData) : null;
  console.log("/./././..",studentData.collegeid)
  const [formData, setFormData] = useState({
    collegeid: studentData.collegeid, // Student ID
    activity_name: "",
    activity_head: "",
    points: "",
    email: localStorage.getItem('studentemail'), // Get student email from local storage
    approved: "pending", // Default approved status to 'pending'
    proofUrl: "", // URL to store uploaded proof
  });
  const [file, setFile] = useState(null);
  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const uploadFile = async () => {
    if (!file) return null;
    console.log("stated")
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('achievements') // Ensure you have a 'achievements' bucket created in Supabase Storage
      .upload(`proofs/${fileName}`, file);

    if (error) {
      console.error("Error uploading file:", error);
      return null;
    }

    // Return the URL of the uploaded file
    const { publicURL } = supabase.storage.from('achievements').getPublicUrl(`proofs/${fileName}`);
    return publicURL;
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the form data to Supabase
    // const proofUrl = await uploadFile();
    // console.log("proofurl",proofUrl);
    const { data, error } = await supabase
      .from('achievements') // Replace with your actual table name
      .insert([{
        collegeid: formData.collegeid,
        act_name: formData.activity_name,
        act_head: formData.activity_head,
        email:formData.email,
        points: formData.points,
        approved: formData.approved, // Set approved to 'pending'
        // proof_url: proofUrl, 
      }]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully:", data);
      alert("Achievement submitted successfully!");
      // Reset the form after successful submission
      setFormData({
        student_id: "",
        activity_name: "",
        activity_head: "",
        points: "",
        approved: "pending", // Reset to 'pending'
        // proofUrl: "",
      });
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <NavBar />
      <div className="flex-1">
        <TopBar />
        <div className="p-6">
          {/* Add Achievement Form */}
          <h2 className="text-2xl font-semibold mb-6">Add New Achievement</h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg">
            {/* div for student id */}
            {/* <div>
              <label htmlFor="student_id" className="block text-lg font-medium text-gray-700">
                Student ID
              </label>
              <input
                type="text"
                name="student_id"
                id="student_id"
                value={formData.student_id}
                className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter KTU ID"
                readOnly
              />
            </div> */}
            <div>
              <label htmlFor="activity_name" className="block text-lg font-medium text-gray-700">
                Activity Name
              </label>
              <input
                type="text"
                name="activity_name"
                id="activity_name"
                value={formData.activity_name}
                onChange={handleChange}
                className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter activity name"
                required
              />
            </div>

            <div>
              <label htmlFor="activity_head" className="block text-lg font-medium text-gray-700">
                Activity Head
              </label>
              <input
                type="text"
                name="activity_head"
                id="activity_head"
                value={formData.activity_head}
                onChange={handleChange}
                className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter activity head"
                required
              />
            </div>

            <div>
              <label htmlFor="points" className="block text-lg font-medium text-gray-700">
                Points
              </label>
              <input
                type="number"
                name="points"
                id="points"
                value={formData.points}
                onChange={handleChange}
                className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter points"
                required
              />
            </div>
            {/* <div>
              <label htmlFor="file" className="block text-lg font-medium text-gray-700">
                Upload Proof (Image/PDF)
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div> */}

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all"
            >
              Submit Achievement
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
