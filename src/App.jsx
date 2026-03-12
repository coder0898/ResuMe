import {
  AcademicCapIcon,
  BriefcaseIcon,
  CommandLineIcon,
  DocumentTextIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import InputField from "./components/common/InputField";
import SelectField from "./components/common/SelectField";
import ProgressBar from "./components/layout/ProgressBar";
import StepNavigation from "./components/layout/StepNavigation";
import FormHead from "./components/layout/FormHead";
import PersonalInfo from "./components/form/PersonalInfo";

function App() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
    },
    education: [],
    experience: [],
    skills: [],
  });

  const [educationData, setEducationData] = useState({
    instituteName: "",
    degreeName: "",
    fieldOfStudy: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const [experience, setExperience] = useState({
    comapnyName: "",
    role: "",
    type: "",
    status: "",
    startDate: "",
    location: "",
    endDate: "",
  });

  const [skills, setSkills] = useState("");

  const [steps, setSteps] = useState(1);
  const [errors, setErrors] = useState({});
  const totalSteps = 4;

  // STEP CONTROL
  const handleNext = () => {
    if (steps < totalSteps) {
      setSteps((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (steps > 1) {
      setSteps((prev) => prev - 1);
    }
  };

  //handler for handling inputs
  const handleInputChange = (section) => (e) => {
    const { name, value } = e.target;

    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const handleArrayChange = (section, e) => {
    const { name, value } = e.target;
    if (section.toLowerCase() === "education") {
      setEducationData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // console.log(educationData);
    }

    if (section.toLowerCase() === "experience") {
      setExperience((prev) => ({
        ...prev,
        [name]: value,
      }));
      // console.log(experience);
    }
  };

  //save button
  const saveArrayRow = (section, e) => {
    e.preventDefault();
    if (section === "education") {
      setResumeData((prev) => ({
        ...prev,
        education: [...prev.education, { ...educationData, id: Date.now() }], // append new education
      }));

      setEducationData({
        instituteName: "",
        degreeName: "",
        fieldOfStudy: "",
        status: "",
        startDate: "",
        endDate: "",
      });
      console.log("education added successfully");
    }

    if (section === "experience") {
      setResumeData((prev) => ({
        ...prev,
        experience: [...prev.experience, { ...experience, id: Date.now() }], // append new experience
      }));

      setExperience({
        companyName: "", // fixed typo
        role: "",
        type: "",
        status: "",
        startDate: "",
        location: "",
        endDate: "",
      });
      console.log("experience added successfully");
    }
  };

  const handleDeleteArray = (section, id) => {
    if (section === "education") {
      setResumeData((prev) => ({
        ...prev,
        education: prev.education.filter((edu) => edu.id !== id),
      }));
      console.log(" education data delete sucessfully");
      return;
    }
    if (section === "experience") {
      setResumeData((prev) => ({
        ...prev,
        experience: prev.experience.filter((item) => item.id !== id),
      }));
      console.log(" experience data delete sucessfully");
      return;
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), skills }], // append new experience
    }));
    setSkills("");
    console.log("data saved");
  };

  const handleDeleteSkill = (e, id) => {
    e.preventDefault();
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  // validation
  const validatePersonalInfo = () => {
    const { fullName, email, phone, location } = resumeData.personalInfo;
    return (
      fullName.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      location.trim() !== ""
    );
  };

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

  const isExperienceValid = () => {
    const { comapnyName, role, type, status, startDate, location, endDate } =
      experience;

    return (
      comapnyName && role && type && status && startDate && location && endDate
    );
  };

  const isStepValid = () => {
    if (steps === 1) return validatePersonalInfo();
    if (steps === 2) return resumeData.education.length > 0;
    if (steps === 3) return resumeData.experience.length > 0;
    if (steps === 4) return resumeData.skills.length > 0;
    return true;
  };

  // submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    alert("Resume saved successfully!");
  };

  // Function for steps based form heading
  const stepConfig = {
    1: { title: "Personal Information", Icon: UserIcon },
    2: { title: "Education", Icon: AcademicCapIcon },
    3: { title: "Experience", Icon: BriefcaseIcon },
    4: { title: "Skills (Technical & Soft)", Icon: CommandLineIcon },
  };

  const currentStep = stepConfig[steps];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="flex items-center gap-2 mb-6">
            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
            <h2 className="text-blue-500 font-semibold text-2xl">
              Resume Builder Form
            </h2>
          </div>
          {/* PROGRESS BAR */}
          <ProgressBar step={steps} totalSteps={totalSteps} />

          {/* =========== Dynamic Step Heading ============= */}

          <FormHead Icon={currentStep.Icon} title={currentStep.title} />

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* STEP 1 */}
            {steps === 1 && (
              <PersonalInfo
                resumeData={resumeData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* STEP 2 EDUCATION */}
            {steps === 2 && (
              <div className="md:col-span-2">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">Institute</th>
                      <th className="px-4 py-3">Degree</th>
                      <th className="px-4 py-3">Field</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Start</th>
                      <th className="px-4 py-3">End</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3">
                        <InputField
                          name="instituteName"
                          value={educationData.instituteName}
                          onChange={(e) => handleArrayChange("education", e)}
                          placeholder="Institute Name"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <InputField
                          name="degreeName"
                          value={educationData.degreeName}
                          onChange={(e) => handleArrayChange("education", e)}
                          placeholder="Degree Name"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <InputField
                          name="fieldOfStudy"
                          value={educationData.fieldOfStudy}
                          onChange={(e) => handleArrayChange("education", e)}
                          placeholder="Field/Major"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <SelectField
                          name="status"
                          value={educationData.status}
                          onChange={(e) => handleArrayChange("education", e)}
                          options={[
                            { value: "", label: "Select" },
                            { value: "Passed", label: "Passed" },
                            { value: "Studying", label: "Studying" },
                          ]}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <InputField
                          name="startDate"
                          value={educationData.startDate}
                          onChange={(e) => handleArrayChange("education", e)}
                          type="date"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <InputField
                          name="endDate"
                          value={educationData.endDate}
                          onChange={(e) => handleArrayChange("education", e)}
                          type="date"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={(e) => saveArrayRow("education", e)}
                          disabled={!isEducationValid()}
                          className={`px-4 py-2 rounded-md text-white
                          ${!isEducationValid() ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"}`}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {resumeData.education.map((edu) => (
                    <div
                      key={edu.id}
                      className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      {/* Degree */}
                      <h3 className="text-lg font-semibold text-gray-800">
                        {edu.degreeName}
                      </h3>

                      {/* Institute */}
                      <p className="text-gray-600 text-sm mt-1">
                        {edu.instituteName}
                      </p>

                      {/* Field */}
                      <p className="text-sm text-gray-500 mt-1">
                        {edu.fieldOfStudy}
                      </p>

                      {/* Status Badge */}
                      <div className="mt-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium
                          ${
                            edu.status === "Passed"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {edu.status}
                        </span>
                      </div>

                      {/* Dates */}
                      <div className="mt-4 text-sm text-gray-500">
                        {edu.startDate} - {edu.endDate}
                      </div>

                      {/* Divider */}
                      <div className="border-t my-4"></div>

                      {/* Action */}
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleDeleteArray("education", edu.id)}
                          className="text-red-500 text-sm font-medium hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {steps === 3 && (
              <div className="md:col-span-2">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">Company</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Start</th>
                      <th className="px-4 py-3">End</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3">
                        <InputField
                          name="comapnyName"
                          value={experience.comapnyName || ""}
                          onChange={(e) => handleArrayChange("experience", e)}
                          placeholder="Company"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <InputField
                          name="role"
                          value={experience.role || ""}
                          onChange={(e) => handleArrayChange("experience", e)}
                          placeholder="Role"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <InputField
                          name="location"
                          value={experience.location || ""}
                          onChange={(e) => handleArrayChange("experience", e)}
                          placeholder="Location"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <SelectField
                          name="type"
                          value={experience.type}
                          onChange={(e) => handleArrayChange("experience", e)}
                          options={[
                            { value: "", label: "Select" },
                            { value: "Full Time", label: "Full Time" },
                            { value: "Internship", label: "Internship" },
                            { value: "Part Time", label: "Part Time" },
                            { value: "Freelance", label: "Freelance" },
                          ]}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <SelectField
                          name="status"
                          value={experience.status}
                          onChange={(e) => handleArrayChange("experience", e)}
                          options={[
                            { value: "", label: "Select" },
                            { value: "Working", label: "Working" },
                            {
                              value: "Serving Notice",
                              label: "Serving Notice",
                            },
                          ]}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <InputField
                          type="date"
                          name="startDate"
                          value={experience.startDate || ""}
                          onChange={(e) => handleArrayChange("experience", e)}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <InputField
                          type="date"
                          name="endDate"
                          value={experience.endDate || ""}
                          onChange={(e) => handleArrayChange("experience", e)}
                        />
                      </td>

                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={(e) => {
                            saveArrayRow("experience", e);
                          }}
                          // className="bg-green-600 text-white px-4 py-2 rounded-md"
                          disabled={!isExperienceValid()}
                          className={`px-4 py-2 rounded-md text-white
                            ${
                              !isExperienceValid()
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600"
                            }`}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {resumeData.experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      {/* Role */}
                      <h3 className="text-lg font-semibold text-gray-800">
                        {exp.role}
                      </h3>

                      {/* Company */}
                      <p className="text-sm text-gray-600 mt-1">
                        {exp.comapnyName}
                      </p>

                      {/* Location */}
                      <p className="text-sm text-gray-500 mt-1">
                        📍 {exp.location}
                      </p>

                      {/* Type + Status */}
                      <div className="flex gap-2 mt-3 flex-wrap">
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                          {exp.type}
                        </span>

                        <span
                          className={`text-xs px-2 py-1 rounded-full
          ${
            exp.status === "Working"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
                        >
                          {exp.status}
                        </span>
                      </div>

                      {/* Duration */}
                      <div className="mt-4 text-sm text-gray-500">
                        {exp.startDate} - {exp.endDate}
                      </div>

                      {/* Divider */}
                      <div className="border-t my-4"></div>

                      {/* Delete Button */}
                      <div className="flex justify-end">
                        <button
                          onClick={() =>
                            handleDeleteArray("experience", exp.id)
                          }
                          className="text-red-500 text-sm font-medium hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* STEP 4 SKILLS */}
            {steps === 4 && (
              <div className="md:col-span-2">
                <InputField
                  name="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Please state your skills"
                />
                <button
                  onClick={handleSave}
                  // className="bg-green-600 text-white px-4 py-2 rounded-md"
                  disabled={!skills.trim()}
                  className={`px-4 py-2 rounded-md text-white
                  ${!skills.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"}`}
                >
                  Save
                </button>
                <div className="mt-6 flex flex-wrap gap-2">
                  {resumeData.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {skill.skills}

                      <button
                        onClick={(e) => handleDeleteSkill(e, skill.id)}
                        className="text-blue-500 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BUTTONS */}
            {/* <div className="md:col-span-2 flex justify-end gap-4 pt-4">
              {steps > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="text-white px-5 py-2.5 rounded-lg bg-gray-600 hover:bg-gray-700"
                >
                  Prev
                </button>
              )}

              {steps === totalSteps ? (
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
            </div> */}
            <StepNavigation
              step={steps}
              totalSteps={totalSteps}
              handleNext={handleNext}
              handlePrev={handlePrev}
              handleSubmit={handleSubmit}
              isStepValid={isStepValid}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
