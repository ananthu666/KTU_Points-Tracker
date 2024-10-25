"use client";
import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import supabase from '@/lib/supabaseClient';

const Page = () => {
  const storedStudentData = localStorage.getItem('studentdata');
  const studentData = storedStudentData ? JSON.parse(storedStudentData) : null;
  
  // Combined state for form data and file
  const [formData, setFormData] = useState({
    collegeid: studentData?.collegeid || '',
    activity_name: "",
    activity_head: "",
    points: "",
    email: localStorage.getItem('studentemail') || '',
    approved: "pending",
  });
  
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substr(2, 9)}_${Date.now()}.${fileExt}`;
    const filePath = `proofs/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('achievements')
      .upload(filePath, file);

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }

    // Construct the complete URL for the uploaded file
    const {
      data: { publicUrl },
    } = supabase.storage
      .from('achievements')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload file first and get the public URL
      const proofUrl = await uploadFile();
      
      if (!proofUrl) {
        throw new Error('File upload failed');
      }

      // Submit the form data with the proof URL
      const { data, error } = await supabase
        .from('achievements')
        .insert([{
          collegeid: formData.collegeid,
          act_name: formData.activity_name,
          act_head: formData.activity_head,
          email: formData.email,
          points: formData.points,
          approved: formData.approved,
          proof_url: proofUrl, // Use the complete public URL
        }]);

      if (error) throw error;

      alert("Achievement submitted successfully!");
      
      // Reset form
      setFormData({
        ...formData,
        activity_name: "",
        activity_head: "",
        points: "",
      });
      setFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('file');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error("Error:", error);
      alert(`Error submitting achievement: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <NavBar />
      <div className="flex-1">
        <TopBar />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Add New Achievement</h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg">
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

            <div>
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
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 ${
                isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              } text-white text-lg font-semibold rounded-lg transition-all`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Achievement'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;