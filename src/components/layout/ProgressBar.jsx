const ProgressBar = ({ step, totalSteps }) => {
  return (
    <div className="mb-10 relative">
      {/* Background Line */}
      <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-200"></div>

      {/* Active Line */}
      <div
        className="absolute top-5 left-1 h-[2px] bg-blue-500 transition-all duration-300"
        style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
      ></div>

      {/* Steps */}
      <div className="flex justify-between relative">
        {["Personal", "Education", "Experience", "Skills"].map(
          (label, index) => {
            const stepNumber = index + 1;

            return (
              <div key={label} className="flex flex-col items-center">
                <div
                  className={`h-10 w-10 flex items-center justify-center rounded-full font-semibold z-10
              ${
                step >= stepNumber
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
                >
                  {stepNumber}
                </div>

                <span className="text-xs mt-2 text-gray-600">{label}</span>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
