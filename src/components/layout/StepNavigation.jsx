const StepNavigation = ({
  step,
  totalSteps,
  handleNext,
  handlePrev,
  handleSubmit,
  isStepValid,
}) => {
  return (
    <div className="md:col-span-2 flex justify-end gap-4 pt-4">
      {step > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="text-white px-5 py-2.5 rounded-lg bg-gray-600 hover:bg-gray-700"
        >
          Prev
        </button>
      )}

      {step === totalSteps ? (
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700"
        >
          Submit
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNext}
          disabled={!isStepValid()}
          // className="text-white px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700"
          className={`text-white px-5 py-2.5 rounded-lg
                  ${
                    !isStepValid()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default StepNavigation;
