import ArrayCardList from "../common/ArrayCardList";
import TableFormRow from "../common/TableFormRow";
import TableHead from "../common/TableHead";

const EducationForm = ({
  educationData,
  handleArrayChange,
  saveArrayRow,
  resumeData,
  handleDeleteArray,
}) => {
  const isEducationValid = () => {
    const {
      instituteName,
      degreeName,
      fieldOfStudy,
      status,
      startDate,
      endDate,
    } = educationData;

    return (
      instituteName &&
      degreeName &&
      fieldOfStudy &&
      status &&
      startDate &&
      endDate
    );
  };

  // education config
  const educationFields = [
    { name: "instituteName", placeholder: "Institute Name" },
    { name: "degreeName", placeholder: "Degree Name" },
    { name: "fieldOfStudy", placeholder: "Field/Major" },
    {
      name: "status",
      type: "select",
      options: [
        { value: "", label: "Select" },
        { value: "Passed", label: "Passed" },
        { value: "Studying", label: "Studying" },
      ],
    },
    { name: "startDate", type: "date" },
    { name: "endDate", type: "date" },
  ];

  const educationConfig = {
    title: "degreeName",
    subtitle: "instituteName",
    description: "fieldOfStudy",
    badges: [
      {
        key: "status",
        className: (status) =>
          status === "Passed"
            ? "bg-green-100 text-green-700"
            : "bg-blue-100 text-blue-700",
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
              "Institute",
              "Degree",
              "Field",
              "Status",
              "Start",
              "End",
              "Action",
            ]}
          />

          <TableFormRow
            fields={educationFields}
            data={educationData}
            handleChange={handleArrayChange}
            saveRow={saveArrayRow}
            isValid={isEducationValid}
            formKey="education"
          />
        </table>
        <ArrayCardList
          items={resumeData.education}
          config={educationConfig}
          onDelete={handleDeleteArray}
          arrayKey="education"
        />
      </div>
    </>
  );
};

export default EducationForm;
