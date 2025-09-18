import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, BookOpen, Users, GraduationCap, PlusCircle, BookHeadphones } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileModal from "../components/ProfileModal";
import {
  editProfileApi,
  deleteAccountApi,
  logoutApi,
} from "../services/authService";
import { clearCredentials, setUser } from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../components/DynamicTable";
import { getAllUsers } from "../services/usersService";
import {
  getAllInstructors,
  makeInstructor,
} from "../services/instructorService";
import DetailModal from "../components/DetailModal";
import CreateModuleForm from "../components/CreateModule";
import CourseForm from "../components/CreateCourseForm";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfile, setShowProfile] = useState(false);
  const [users, setUsers] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMakeInstructor = async (userId) => {
    try {
      await makeInstructor(userId);
      toast.success("User promoted to instructor!");
      setUsers(
        users.map((u) => (u._id === userId ? { ...u, role: "instructor" } : u))
      );
      setInstructors([...instructors, { ...selectedItem, role: "instructor" }]);

      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to promote user!");
      console.error(err);
    }
  };

  // Fetch Users
  useEffect(() => {
    if (activeTab !== "users") return;

    let mounted = true;
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        if (mounted) setUsers(res.data);
      } catch (err) {
        toast.error("Failed to fetch users!");
        console.error(err);
      }
    };
    fetchUsers();

    return () => {
      mounted = false;
    };
  }, [activeTab]);

  // Fetch Instructors
  useEffect(() => {
    if (activeTab !== "instructors") return;

    let mounted = true;
    const fetchInstructors = async () => {
      try {
        const res = await getAllInstructors();
        console.log(res);
        if (mounted)
          setInstructors(Array.isArray(res.message) ? res.message : []);
      } catch (err) {
        toast.error("Failed to fetch instructors!");
        console.error(err);
      }
    };
    fetchInstructors();

    return () => {
      mounted = false;
    };
  }, [activeTab]);

  const handleRowClick = (row) => {
    setSelectedItem(row);
    setIsModalOpen(true);
  };

  const handleEdit = async (payload) => {
    try {
      const updated = await editProfileApi(payload);
      dispatch(setUser(updated.data));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile!");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccountApi();
      dispatch(clearCredentials());
      toast.success("Account deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete account!");
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(clearCredentials());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed!");
      console.error(err);
    }
  };

  const userColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

  const instructorColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "phone", label: "Phone" },
    { key: "courses", label: "Courses" },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 space-y-6">
        <h2 className="text-2xl font-bold text-indigo-600">Admin Panel</h2>
        <nav className="space-y-4">
          {[
            { key: "courses", label: "Create Courses", icon: <BookHeadphones /> },
            { key: "modules", label: "Create Modules", icon: <BookOpen /> },
            { key: "lessons", label: "Create Lessons", icon: <PlusCircle /> },
            { key: "fetchLessons", label: "Fetch Lessons", icon: <BookOpen /> },
            { key: "users", label: "Fetch Users", icon: <Users /> },
            {
              key: "instructors",
              label: "Instructors",
              icon: <GraduationCap />,
            },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              className={`flex items-center gap-3 w-full p-2 rounded-lg ${
                activeTab === key
                  ? "bg-indigo-100 text-indigo-600"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(key)}
            >
              {icon} {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 relative">
        {/* Topbar */}
        <div className="flex justify-end items-center gap-4 mb-6">
          <span className="font-semibold">{admin?.name}</span>
          <button
            className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center"
            onClick={() => setShowProfile(true)}
          >
            <User />
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="bg-white shadow-lg rounded-xl p-6 min-h-[70vh]">
          {activeTab === "dashboard" && (
            <h2 className="text-xl font-bold">Welcome to Admin Dashboard</h2>
          )}

          {activeTab === "instructor" && (
            <h2 className="text-xl font-bold">Create Instructor Form</h2>
          )}

           {activeTab === "courses" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Create Module Form</h2>
              <CourseForm />
            </div>
          )}

          {activeTab === "modules" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Create Module Form</h2>
              <CreateModuleForm />
            </div>
          )}
          {activeTab === "lessons" && (
            <h2 className="text-xl font-bold">Create Lesson Form</h2>
          )}

          {activeTab === "fetchLessons" && (
            <h2 className="text-xl font-bold">All Lessons List</h2>
          )}

          {/* Users Table */}
          {activeTab === "users" && (
            <>
              <h2 className="text-xl font-bold mb-4">All Users</h2>
              <DynamicTable
                columns={userColumns}
                data={users}
                showMakeInstructor={true}
                onRowClick={handleRowClick}
              />
              <DetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedItem ? selectedItem.name : ""}
                actionButton={
                  selectedItem?.role === "student" ? (
                    <button
                      onClick={() => handleMakeInstructor(selectedItem._id)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      Make Instructor
                    </button>
                  ) : null
                }
              >
                {selectedItem && (
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong> {selectedItem.email}
                    </p>
                    <p>
                      <strong>Role:</strong> {selectedItem.role}
                    </p>
                  </div>
                )}
              </DetailModal>
            </>
          )}

          {/* Instructors Table */}
          {activeTab === "instructors" && (
            <>
              <h2 className="text-xl font-bold mb-4">All Instructors</h2>
              <DynamicTable
                columns={instructorColumns}
                data={instructors}
                showMakeInstructor={false}
                onRowClick={handleRowClick}
              />
              <DetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedItem ? selectedItem.name : ""}
              >
                {selectedItem && (
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong> {selectedItem.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedItem.phone}
                    </p>
                    <p>
                      <strong>Role:</strong>
                      {selectedItem.role}
                    </p>
                    <p>
                      <strong>Courses:</strong>{" "}
                      {selectedItem.courses?.join(", ")}
                    </p>
                  </div>
                )}
              </DetailModal>
            </>
          )}
        </div>
      </main>

      {/* Profile Modal */}
      {showProfile && (
        <ProfileModal
          admin={admin}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onLogout={handleLogout}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default AdminPanel;
