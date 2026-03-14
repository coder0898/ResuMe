const InputField = ({
  label = "",
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  inputType = "form",
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        {inputType === "form" ? (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        ) : (
          ""
        )}

        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 mb-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </>
  );
};

export default InputField;
