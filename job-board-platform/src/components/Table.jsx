// src/components/Table.jsx
import React from "react";
import ActionButton from "./ActionButton";

export default function Table({ users, onRowClick }) {
  return (
    <div className="rounded-lg bg-white shadow-sm border border-gray-200">
      {/* Header row above the table */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 space-y-3 sm:space-y-0">
        <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
        <button className="inline-flex items-center rounded-lg bg-[#6f3096] px-4 py-2 text-white font-medium hover:bg-[#5a2677] focus:outline-none focus:ring-2 focus:ring-[#6f3096] focus:ring-offset-2 transition-all duration-200 shadow-sm">
          <img src="/images/admin/download.png" alt="Export" className="mr-2 h-4 w-4" />
          Export Data
        </button>
      </div>

      {/* Enhanced responsive scrollable wrapper */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 scroll-smooth">
        <div className="inline-block min-w-full border-0">
          <table className="min-w-full table-auto divide-y divide-gray-200 border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {["Full Name", "Email", "Type", "Status", "Join Date", "Listings", "Actions"].map((head) => (
                <th 
                  key={head} 
                  className="px-6 py-4 text-left text-xs font-medium tracking-wider whitespace-nowrap text-gray-500 uppercase sticky top-0 bg-gray-50 z-10"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user, idx) => (
              <tr 
                key={user.id} 
                className={`hover:bg-gray-100 cursor-pointer transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`} 
                onClick={() => onRowClick && onRowClick(user)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{user.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === "Active" ? "bg-green-100 text-green-800" : user.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                    <span className={`w-2 h-2 rounded-full mr-1.5 ${user.status === "Active" ? "bg-green-500" : user.status === "Pending" ? "bg-yellow-500" : "bg-red-500"}`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.joinDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.listings}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button className="inline-flex items-center rounded-full bg-[#6f3096] px-3 py-1 text-xs text-white hover:bg-[#5a2677] transition-colors shadow-sm">
                      View
                    </button>
                    {user.status === "Active" ? (
                      <button className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs text-red-600 hover:bg-red-200 transition-colors border border-red-200">
                        Suspend
                      </button>
                    ) : user.status === "Suspended" ? (
                      <button className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs text-green-600 hover:bg-green-200 transition-colors border border-green-200">
                        Reactivate
                      </button>
                    ) : (
                      <button className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs text-green-600 hover:bg-green-200 transition-colors border border-green-200">
                        Activate
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
