import Image from "next/image";
import React from "react";
import Link from "next/link";

const TopBar = () => {
  const role=localStorage.getItem("role");
  const storedStudentData = localStorage.getItem('studentdata');
  const studentData = storedStudentData ? JSON.parse(storedStudentData) : null;
  const student = studentData ? studentData.username : "Name";
  return (
    <div>
      <div className="py-4 bg-gray-900 text-white flex items-center justify-between shadow-md px-6 z-10">
        <h1 className="text-2xl">College of Engineering Trivandrum</h1>
        {role!="tutor"?<Link href='/profile' className="flex items-center gap-2">
          <div className="">

          {student}
          </div>
          <Image src='/profile.svg' width={30} height={30 } alt="user"/>
        </Link>:<Link href='#' className="flex items-center gap-2">
          <div className="">

          Tutor
          </div>
          <Image src='/profile.svg' width={30} height={30 } alt="user"/>
        </Link>}
      </div>
    </div>
  );
};

export default TopBar;
