const LoaderModal = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 flex flex-col items-center space-y-4 shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
        <span className="text-indigo-600 font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default LoaderModal;
