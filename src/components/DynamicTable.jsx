// import { useState } from "react";
// import Modal from "./Modal";

// const DynamicTable = ({
//   columns,
//   data = [],
//   onRowClick,
//   onEdit,
//   onDelete,
//   onRead,
//   onMakeInstructor,
//   type = "default",
// }) => {
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("view"); // "view" ya "edit"

//   const handleRowClick = (row) => {
//     setSelectedRow(row);
//     setModalMode("view"); // row click → view mode
//     setIsModalOpen(true);
//     if (onRowClick) onRowClick(row);
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full border-collapse border border-gray-300">
//         <thead className="bg-gray-100">
//           <tr>
//             {columns.map((col) => (
//               <th
//                 key={col.key}
//                 className="border border-gray-300 px-4 py-2 text-left font-semibold"
//               >
//                 {col.label}
//               </th>
//             ))}
//             <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((row, index) => {
//               const isDeleted = row.deleted === true; // check deleted

//               return (
//                 <tr
//                   key={index}
//                   className={`cursor-pointer hover:bg-gray-50 ${
//                     isDeleted ? "opacity-50 line-through" : ""
//                   }`} // fade + strike if deleted
//                   onClick={() => handleRowClick(row)}
//                 >
//                   {columns.map((col) => {
//                     let value = row[col.key];
//                     if (col.key === "course" && row.courseDetails) {
//                       value = row.courseDetails.title;
//                     }
//                     return (
//                       <td
//                         key={col.key}
//                         className="border border-gray-300 px-4 py-2"
//                       >
//                         {value}
//                       </td>
//                     );
//                   })}

//                   {/* Actions column */}
//                   <td className="border border-gray-300 px-4 py-2 flex gap-2">
//                     {isDeleted && (
//                       <span className="bg-gray-400 text-white px-2 py-1 rounded text-xs">
//                         Deleted
//                       </span>
//                     )}

//                     {!isDeleted && row.role === "student" && (
//                       <button
//                         className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onMakeInstructor && onMakeInstructor(row);
//                         }}
//                       >
//                         Make Instructor
//                       </button>
//                     )}

//                     {!isDeleted && row.role === "instructor" && (
//                       <button
//                         className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onMakeInstructor && onMakeInstructor(row);
//                         }}
//                       >
//                         Remove Instructor
//                       </button>
//                     )}

//                     {!isDeleted && type === "default" && !row.role && (
//                       <>
//                         <button
//                           className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedRow(row);
//                             setModalMode("edit");
//                             setIsModalOpen(true);
//                           }}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             onDelete && onDelete(row);
//                           }}
//                         >
//                           Delete
//                         </button>
//                         <button
//                           className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedRow(row);
//                             setModalMode("view");
//                             setIsModalOpen(true);
//                           }}
//                         >
//                           Read
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td
//                 colSpan={columns.length + 1}
//                 className="text-center p-4 text-gray-500"
//               >
//                 No data found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Modal show karo */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         data={selectedRow}
//         mode={modalMode}
//         onSave={(updatedRow) => {
//           onEdit && onEdit(selectedRow._id, updatedRow);
//           setIsModalOpen(false);
//         }}
//       />
//     </div>
//   );
// };

// export default DynamicTable;



import { useState } from "react";
import Modal from "./Modal";

const DynamicTable = ({
  columns,
  data = [],
  onRowClick,
  onEdit,
  onDelete,
  onRead,
  onMakeInstructor,
  type = "default",
  currentUserRole = "student", // 👈 logged-in user ka role pass karo yaha
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // "view" ya "edit"

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setModalMode("view"); // row click → view mode
    setIsModalOpen(true);
    if (onRowClick) onRowClick(row);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border border-gray-300 px-4 py-2 text-left font-semibold"
              >
                {col.label}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => {
              const isDeleted = row.deleted === true;

              return (
                <tr
                  key={index}
                  className={`cursor-pointer hover:bg-gray-50 ${
                    isDeleted ? "opacity-50 line-through" : ""
                  }`}
                  onClick={() => handleRowClick(row)}
                >
                  {columns.map((col) => {
                    let value = row[col.key];
                    if (col.key === "course" && row.courseDetails) {
                      value = row.courseDetails.title;
                    }
                    return (
                      <td
                        key={col.key}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {value}
                      </td>
                    );
                  })}

                  {/* Actions column */}
                  <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    {isDeleted && (
                      <span className="bg-gray-400 text-white px-2 py-1 rounded text-xs">
                        Deleted
                      </span>
                    )}

                    {/* STUDENT CASE */}
                    {!isDeleted && row.role === "student" && (
                      <button
                        className={`px-2 py-1 rounded text-white ${
                          currentUserRole === "instructor"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={currentUserRole === "instructor"}
                        onClick={(e) => {
                          e.stopPropagation();
                          onMakeInstructor && onMakeInstructor(row);
                        }}
                      >
                        Make Instructor
                      </button>
                    )}

                    {/* INSTRUCTOR CASE */}
                    {!isDeleted && row.role === "instructor" && (
                      <button
                        className={`px-2 py-1 rounded text-white ${
                          currentUserRole === "instructor"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                        disabled={currentUserRole === "instructor"}
                        onClick={(e) => {
                          e.stopPropagation();
                          onMakeInstructor && onMakeInstructor(row);
                        }}
                      >
                        Remove Instructor
                      </button>
                    )}

                    {!isDeleted && type === "default" && !row.role && (
                      <>
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRow(row);
                            setModalMode("edit");
                            setIsModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete && onDelete(row);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRow(row);
                            setModalMode("view");
                            setIsModalOpen(true);
                          }}
                        >
                          Read
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center p-4 text-gray-500"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedRow}
        mode={modalMode}
        onSave={(updatedRow) => {
          onEdit && onEdit(selectedRow._id, updatedRow);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default DynamicTable;
