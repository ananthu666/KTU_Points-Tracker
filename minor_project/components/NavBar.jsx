import React from "react";
import Link from "next/link";

const NavBar = () => {
  const role=localStorage.getItem("role");
  return (
    <div className=" bg-gray-900 p-2 flex flex-col border-r">
      <h2 className="text-2xl text-white p-4">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link
              href={role === "student" ? "/student" : "/tutor"}
            className="text-white text-md py-2 px-4 block rounded hover:bg-gray-700"
          >
            Home
          </Link>
        </li>
        {/* <li>
          <Link
            href="/department"
            className="text-white text-md py-2 px-4 block rounded hover:bg-gray-700"
          >
            Department
          </Link>
        </li> */}
        {role=="student"?<li>
          <Link
            href="/addactivity"
            className="text-white text-md py-2 px-4 block rounded hover:bg-gray-700"
          >
            Add Activity
          </Link>
        </li>:
        <li>
          <Link
            href="/studentlist"
            className="text-white text-md py-2 px-4 block rounded hover:bg-gray-700"
          >
            Student List
          </Link>
        </li>
        }
        
      </ul>
    </div>
  );
};

export default NavBar;
