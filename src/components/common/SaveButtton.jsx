import { CheckIcon } from "@heroicons/react/20/solid";

const SaveButton = ({ onClick, disabled, label = "Save", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md flex gap-2 items-center text-white transition
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
    >
      <CheckIcon className="w-4 h-4" />
      {label}
    </button>
  );
};

export default SaveButton;
