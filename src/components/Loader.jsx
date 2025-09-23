const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
        
        {/* Text */}
        <p className="mt-4 text-white text-lg font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
