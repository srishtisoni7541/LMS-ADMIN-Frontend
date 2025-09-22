import { useState } from "react";
import Modal from "./Modal";
import LoaderModal from "./LoaderModal";
import Certificate from "./CertificateModal";
const DynamicTable = ({
  columns,
  data = [],
  onRowClick,
  onEdit,
  onDelete,
  onMakeInstructor,
  type = "default",
  onGenerateCertificate,
  currentUserRole = "student",
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [modalType, setModalType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // console.log(data);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setModalMode("view");

    // Determine modal type
    if (row.role === "student" || row.role === "instructor")
      setModalType("user");
    else if (row.moduleTitle || row.type === "module") setModalType("module");

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
              const rowType =
                row.type ||
                (row.moduleTitle
                  ? "module"
                  : row.certificateContent
                  ? "certificates"
                  : "user");

              return (
                <tr
                  key={index}
                  className={`cursor-pointer hover:bg-gray-50 ${
                    isDeleted ? "opacity-50 line-through" : ""
                  }`}
                  onClick={() => handleRowClick(row)}
                >
                  {columns.map((col) => {
                    let value;

                    // Certificates ke liye fields set karo
                    if (col.key === "studentName") value = row.student?.name;
                    else if (col.key === "studentEmail")
                      value = row.student?.email;
                    else if (col.key === "courseTitle")
                      value = row.course?.title;
                    else if (col.key === "issuedAt")
                      value = new Date(row.issuedAt).toLocaleDateString();
                    else value = col.render ? col.render(row) : row[col.key];

                    return (
                      <td
                        key={col.key}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {value}
                      </td>
                    );
                  })}

                  {/* Actions */}
                  <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    {/* Student/User actions */}
                    {!isDeleted &&
                      (row.role === "student" || row.role === "user") && (
                        <>
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

                          <button
                            className={`px-2 py-1 rounded text-white ${
                              currentUserRole === "instructor"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                            disabled={currentUserRole === "instructor"}
                            onClick={(e) => {
                              e.stopPropagation();
                              onGenerateCertificate(row);
                            }}
                          >
                            Generate Certificate
                          </button>
                        </>
                      )}

                    {/* Instructor actions */}
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

                    {/* Certificates actions (same as module) */}
                    {!isDeleted && row.certificateContent && (
                      <>
                        <button
                          className="px-2 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRow(row);
                            setModalMode("edit");
                            setModalType("certificate");
                            setIsModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete && onDelete(row);
                          }}
                        >
                          Delete
                        </button>

                        <button
                          className="px-2 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRow(row);
                            setModalMode("view");
                            setModalType("certificate");
                            setIsModalOpen(true);
                          }}
                        >
                          Read
                        </button>
                      </>
                    )}

                    {/* Default actions (modules / others) */}
                    {!isDeleted && !row.role && !row.certificateContent && (
                      <>
                        <button
                          className="px-2 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRow(row);
                            setModalMode("edit");
                            setModalType("module");
                            setIsModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete && onDelete(row);
                          }}
                        >
                          Delete
                        </button>

                        <button
                          className="px-2 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
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
      {/* User / Module Modal */}
      {selectedRow && modalType !== "certificate" && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={selectedRow}
          mode={modalMode}
          type={modalType}
          onSave={(updatedRow) => {
            onEdit && onEdit(selectedRow._id, updatedRow);
            setIsModalOpen(false);
          }}
        />
      )}
      {selectedRow && modalType === "certificate" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
            <Certificate data={data} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
      {/* Loader Modal */}
      {isLoading && <LoaderModal message="Generating Certificate..." />}
    </div>
  );
};

export default DynamicTable;
