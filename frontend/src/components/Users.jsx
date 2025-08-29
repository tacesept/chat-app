import React, { useState, useEffect } from "react";
import { Link } from "react-router"; 
import { useSocketStore } from "../context/useSocketStore";

const Users = () => {
  const [searchInput, setSearchInput] = useState(""); // input value
  const [searchTerm, setSearchTerm] = useState(""); // actual search term
  const [users, setUsers] = useState([]); // fetched users
  const [loading, setLoading] = useState(true);

  const onlineUsers = useSocketStore((state) => state.onlineUsers);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("api/users/", {
          method: "GET",
          credentials: "include", // send cookies (JWT)
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on searchTerm
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Loading users...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-50 text-gray-800">
      {/* Search Bar with Button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <p className="text-gray-500 text-center">No users found.</p>
        ) : (
          filteredUsers.map((user) => {
            const isOnline = onlineUsers.includes(user._id); // ✅ per-user check

            return (
              <Link
                key={user._id}
                className="btn btn-ghost btn-block mt-2 flex items-center justify-between p-2 border-b hover:bg-gray-100 rounded text-gray-900"
                to={`/${user._id}`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{user.name}</span>
                </div>
                {/* You can implement online/offline status if your API provides it */}
                {/* <span className="w-3 h-3 rounded-full bg-gray-400"></span> */}
                <span
                  className={`w-3 h-3 rounded-full ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Users;
