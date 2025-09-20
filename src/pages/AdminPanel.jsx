import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, BookOpen, Users, GraduationCap, PlusCircle, BookHeadphones, Eye } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileModal from "../components/ProfileModal";
import { editProfileApi, deleteAccountApi, logoutApi } from "../services/authService";
import { clearCredentials, setUser } from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../components/DynamicTable";
import { getAllUsers } from "../services/usersService";
import DetailModal from "../components/DetailModal";
import CreateModuleForm from "../components/CreateModule";
import CourseForm from "../components/CreateCourseForm";
import CoursesDisplay from "../components/CourseDisplay";
import CreateLessonForm from "../components/CreateLessons";
import { getModulesApi } from "../services/moduleService";
import AllLessonsList from "../components/AllLessons";
import { useInstructors } from "../hooks/useInstructors"; 

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfile, setShowProfile] = useState(false);
  const [users, setUsers] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { instructors, loadInstructors, promoteToInstructor, demoteToStudent } = useInstructors();

  const handleRowClick = (row) => {
    setSelectedItem(row);
    setIsModalOpen(true);
  };

  const handleMakeInstructor = async (user) => {
    try {
      const updated = await promoteToInstructor(user._id);
      toast.success(`${updated.name} promoted to instructor`);
      // users list update
      setUsers(users.map((u) => u._id === user._id ? { ...u, role: "instructor" } : u));
    } catch (err) {
      toast.error("Failed to promote instructor");
    }
  };

  const handleRemoveInstructor = async (instructor) => {
    try {
      await demoteToStudent(instructor._id);
      toast.success(`${instructor.name} removed from instructors`);
      // users list update
      setUsers(users.map((u) => u._id === instructor._id ? { ...u, role: "student" } : u));
    } catch (err) {
      toast.error("Failed to remove instructor");
    }
  };

  // Fetch Users
  useEffect(() => {
    if (activeTab !== "users") return;
    let mounted = true;
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        if (mounted) setUsers(res.data || []);
      } catch (err) {
        toast.error("Failed to fetch users!");
      }
    };
    fetchUsers();
    return () => (mounted = false);
  }, [activeTab]);

  // Fetch Instructors
  useEffect(() => {
    if (activeTab !== "instructors") return;
    loadInstructors();
  }, [activeTab]);

  useEffect(() => {
    if (!["lessons", "allModules"].includes(activeTab)) return;
    let mounted = true;
    const fetchModules = async () => {
      try {
        const res = await getModulesApi();
        const moduleData = res.data?.message || res.message || [];
        if (mounted) setModules(moduleData);
      } catch (err) {
        toast.error("Failed to fetch modules!");
      }
    };
    fetchModules();
    return () => (mounted = false);
  }, [activeTab]);

  const handleEdit = async (payload) => {
    try {
      const updated = await editProfileApi(payload);
      dispatch(setUser(updated.data));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccountApi();
      dispatch(clearCredentials());
      toast.success("Account deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete account!");
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

  const moduleColumns = [
    { key: "title", label: "Title" },
    { key: "course", label: "Course" },
  ];

  const sidebarItems = [
    { key: "allCourses", label: "All Courses", icon: <Eye /> },
    { key: "courses", label: "Create Courses", icon: <BookHeadphones /> },
    { key: "allModules", label: "Modules", icon: <BookOpen /> },
    { key: "modules", label: "Create Modules", icon: <BookOpen /> },
    { key: "lessons", label: "Create Lessons", icon: <PlusCircle /> },
    { key: "fetchLessons", label: "Fetch Lessons", icon: <BookOpen /> },
    { key: "users", label: "Fetch Users", icon: <Users /> },
    { key: "instructors", label: "Instructors", icon: <GraduationCap /> },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <aside className="w-64 bg-white shadow-lg p-5 space-y-6">
        <h2 className="text-2xl font-bold text-indigo-600">Admin Panel</h2>
        <nav className="space-y-4">
          {sidebarItems.map(({ key, label, icon }) => (
            <button
              key={key}
              className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors duration-200 ${
                activeTab === key ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab(key)}
            >
              {icon} {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 relative">
        <div className="flex justify-end items-center gap-4 mb-6">
          <span className="font-semibold">{admin?.name}</span>
          <button
            className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-600 transition-colors duration-200"
            onClick={() => setShowProfile(true)}
          >
            <User />
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 min-h-[70vh]">
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-xl font-bold">Welcome to Admin Dashboard</h2>
              <p className="text-gray-600 mt-2">Select an option from the sidebar to get started.</p>
            </div>
          )}

          {activeTab === "allCourses" && <CoursesDisplay />}
          {activeTab === "courses" && <CourseForm />}
          {activeTab === "modules" && <CreateModuleForm />}
          {activeTab === "lessons" && <CreateLessonForm modules={modules} />}
          {activeTab === "allModules" && (
            <DynamicTable columns={moduleColumns} data={modules} onRowClick={handleRowClick} />
          )}
          {activeTab === "users" && (
            <DynamicTable
              columns={userColumns}
              data={users}
              type="user"
              onMakeInstructor={handleMakeInstructor}
              onRowClick={handleRowClick}
            />
          )}
          {activeTab === "instructors" && (
            <DynamicTable
              columns={instructorColumns}
              data={instructors}
              type="instructor"
              onMakeInstructor={handleRemoveInstructor} // remove button
              onRowClick={handleRowClick}
            />
          )}
          {activeTab === "fetchLessons" && <AllLessonsList />}
        </div>
      </main>

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
