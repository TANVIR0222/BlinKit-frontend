const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full w-full ">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-75"></div>
  </div>
  );
};

export default LoadingSpinner;
