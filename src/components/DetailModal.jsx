const DetailModal = ({ isOpen, onClose, title, children, actionButton }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-96 max-w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Title */}
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

        {/* Modal content */}
        <div className="space-y-4">
          {children}

          {/* Optional action button */}
          {actionButton && <div className="pt-2">{actionButton}</div>}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
