function SelectField({ name, value, onChange, options }) {
  return (
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      className="border border-gray-300 px-3 py-2 rounded-md w-full"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default SelectField;
