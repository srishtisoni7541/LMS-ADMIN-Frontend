
// import { LogOut, UserCog, Trash2, Save, X } from "lucide-react";
// import { useState } from "react";

// const ProfileModal = ({ admin, onClose, onEdit, onDelete, onLogout }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({
//     name: admin?.name || '',
//     email: admin?.email || '',
//     phone: admin?.phone || ''
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   if (!admin) return null;

//   const handleEditClick = () => {
//     setEditData({
//       name: admin?.name || '',
//       email: admin?.email || '',
//       phone: admin?.phone || ''
//     });
//     setIsEditing(true);
//   };

//   const handleInputChange = (field, value) => {
//     setEditData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setEditData({
//       name: admin?.name || '',
//       email: admin?.email || '',
//       phone: admin?.phone || ''
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative max-h-[90vh] overflow-y-auto">
//         {/* Close Button */}
//         <button
//           className="absolute top-2 right-2 text-gray-600 hover:text-black"
//           onClick={onClose}
//         >
//           <X size={20} />
//         </button>

//         {/* Title */}
//         <h2 className="text-2xl font-bold mb-4">
//           {isEditing ? 'Edit Profile' : 'Admin Profile'}
//         </h2>

//         {/* Content */}
//         {!isEditing ? (
//           <>
//             {/* View Mode - Details */}
//             <div className="space-y-2">
//               <p><strong>Name:</strong> {admin?.name}</p>
//               <p><strong>Email:</strong> {admin?.email}</p>
//               <p><strong>Role:</strong> {admin?.role}</p>
//               <p><strong>Phone:</strong> {admin?.phone || "N/A"}</p>
//               <p><strong>Joined:</strong> {admin?.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "N/A"}</p>
//             </div>

//             {/* Actions */}
//             <div className="mt-6 space-y-3">
//               <button
//                 className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors"
//                 onClick={handleEditClick}
//               >
//                 <UserCog size={18} /> Edit Profile
//               </button>

//               <button
//                 className="w-full bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
//                 onClick={onDelete}
//               >
//                 <Trash2 size={18} /> Delete Account
//               </button>

//               <button
//                 className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors"
//                 onClick={onLogout}
//               >
//                 <LogOut size={18} /> Logout
//               </button>
//             </div>
//           </>
//         ) : (
//           <>
//             {/* Edit Mode - Form */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={editData.name}
//                   onChange={(e) => handleInputChange('name', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={editData.email}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your email"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone
//                 </label>
//                 <input
//                   type="tel"
//                   value={editData.phone}
//                   onChange={(e) => handleInputChange('phone', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your phone number"
//                 />
//               </div>

//               <div className="text-sm text-gray-500">
//                 <p><strong>Role:</strong> {admin?.role}</p>
//                 <p><strong>Joined:</strong> {admin?.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "N/A"}</p>
//               </div>
//             </div>

//             {/* Edit Actions */}
//             <div className="mt-6 space-y-3">
//               <button
//                 className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
//                   isLoading 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-green-500 hover:bg-green-600'
//                 } text-white`}
//                 onClick={()=>onEdit(editData)}
//                 disabled={isLoading}
//               >
//                 <Save size={18} /> 
//                 {isLoading ? 'Saving...' : 'Save Changes'}
//               </button>

//               <button
//                 className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors"
//                 onClick={handleCancelEdit}
//                 disabled={isLoading}
//               >
//                 <X size={18} /> Cancel
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileModal;




import { LogOut, UserCog, Trash2, Save, X } from "lucide-react";
import { useState } from "react";

const ProfileModal = ({ admin, onClose, onEdit, onDelete, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    phone: admin?.phone || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!admin) return null;

  const handleEditClick = () => {
    setEditData({
      name: admin?.name || '',
      email: admin?.email || '',
      phone: admin?.phone || ''
    });
    setIsEditing(true);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      name: admin?.name || '',
      email: admin?.email || '',
      phone: admin?.phone || ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2">
      <div className="bg-white p-4 sm:p-6 w-72 rounded-xl shadow-xl lg:w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
          {isEditing ? 'Edit Profile' : 'Admin Profile'}
        </h2>

        {/* Content */}
        {!isEditing ? (
          <>
            {/* View Mode - Details */}
            <div className="space-y-2 text-sm sm:text-base">
              <p><strong>Name:</strong> {admin?.name}</p>
              <p><strong>Email:</strong> {admin?.email}</p>
              <p><strong>Role:</strong> {admin?.role}</p>
              <p><strong>Phone:</strong> {admin?.phone || "N/A"}</p>
              <p><strong>Joined:</strong> {admin?.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "N/A"}</p>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3 flex flex-col">
              <button
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors text-sm sm:text-base"
                onClick={handleEditClick}
              >
                <UserCog size={18} /> Edit Profile
              </button>

              <button
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-colors text-sm sm:text-base"
                onClick={onDelete}
              >
                <Trash2 size={18} /> Delete Account
              </button>

              <button
                className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors text-sm sm:text-base"
                onClick={onLogout}
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Edit Mode - Form */}
            <div className="space-y-4 text-sm sm:text-base">
              <div>
                <label className="block font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="text-gray-500 text-xs sm:text-sm">
                <p><strong>Role:</strong> {admin?.role}</p>
                <p><strong>Joined:</strong> {admin?.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "N/A"}</p>
              </div>
            </div>

            {/* Edit Actions */}
            <div className="mt-6 space-y-3 flex flex-col">
              <button
                className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-white text-sm sm:text-base ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
                onClick={()=>onEdit(editData)}
                disabled={isLoading}
              >
                <Save size={18} /> 
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors text-sm sm:text-base"
                onClick={handleCancelEdit}
                disabled={isLoading}
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
