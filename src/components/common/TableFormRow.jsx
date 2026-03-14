import InputField from "./InputField";
import SaveButton from "./SaveButtton";
import SelectField from "./SelectField";

// TableFormRow.jsx
const TableFormRow = ({
  fields,
  data,
  handleChange,
  saveRow,
  isValid,
  formKey,
}) => {
  return (
    <tbody>
      <tr className="border-t">
        {fields.map((field, index) => (
          <td key={index} className="px-4 py-3">
            {field.type === "select" ? (
              <SelectField
                name={field.name}
                value={data[field.name] || ""}
                onChange={(e) => handleChange(formKey, e)}
                options={field.options}
              />
            ) : (
              <InputField
                name={field.name}
                type={field.type || "text"}
                value={data[field.name] || ""}
                onChange={(e) => handleChange(formKey, e)}
                placeholder={field.placeholder}
              />
            )}
          </td>
        ))}

        <td className="px-4 py-3 text-center">
          <SaveButton
            onClick={(e) => saveRow(formKey, e)}
            disabled={!isValid()}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default TableFormRow;
