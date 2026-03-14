import TableHead from "../common/TableHead";
import ArrayCardList from "../common/ArrayCardList";
import TableFormRow from "../common/TableFormRow";

const ExperienceForm = ({
  experience,
  handleArrayChange,
  saveArrayRow,
  resumeData,
  handleDeleteArray,
}) => {
  const isExperienceValid = () => {
    const { comapnyName, role, type, status, startDate, location, endDate } =
      experience;

    return (
      comapnyName && role && type && status && startDate && location && endDate
    );
  };
  // expeirence config
  const experienceFields = [
    { name: "comapnyName", placeholder: "Company" },
    { name: "role", placeholder: "Role" },
    { name: "location", placeholder: "Location" },
    {
      name: "type",
      type: "select",
      options: [
        { value: "", label: "Select" },
        { value: "Full Time", label: "Full Time" },
        { value: "Internship", label: "Internship" },
        { value: "Part Time", label: "Part Time" },
        { value: "Freelance", label: "Freelance" },
      ],
    },
    {
      name: "status",
      type: "select",
      options: [
        { value: "", label: "Select" },
        { value: "Working", label: "Working" },
        { value: "Serving Notice", label: "Serving Notice" },
      ],
    },
    { name: "startDate", type: "date" },
    { name: "endDate", type: "date" },
  ];

  const experienceConfig = {
    title: "role",
    subtitle: "comapnyName",
    description: "location",
    descriptionPrefix: "📍 ",
    badges: [
      {
        key: "type",
        className: "bg-purple-100 text-purple-700",
      },
      {
        key: "status",
        className: (status) =>
          status === "Working"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700",
      },
    ],
    startDate: "startDate",
    endDate: "endDate",
  };

  return (
    <>
      <div className="md:col-span-2">
        <table className="min-w-full text-sm text-left">
          <TableHead
            heading={[
              "Company",
              "Role",
              "Location",
              "Type",
              "Status",
              "Start",
              "End",
              "Action",
            ]}
          />

          <TableFormRow
            fields={experienceFields}
            data={experience}
            handleChange={handleArrayChange}
            saveRow={saveArrayRow}
            isValid={isExperienceValid}
            formKey="experience"
          />
        </table>
        <ArrayCardList
          items={resumeData.experience}
          config={experienceConfig}
          onDelete={handleDeleteArray}
          arrayKey="experience"
        />
      </div>
    </>
  );
};

export default ExperienceForm;
