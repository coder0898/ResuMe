import {
  AcademicCapIcon,
  BriefcaseIcon,
  CommandLineIcon,
  DocumentTextIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";

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
    console.log(resumeData.personalInfo);
  };

  const handleArrayChange = (section, e) => {
    const { name, value } = e.target;
    if (section.toLowerCase() === "education") {
      setEducationData((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log(educationData);
    }

    if (section.toLowerCase() === "experience") {
      setExperience((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log(experience);
    }
  };

  //save button
  const saveArrayRow = (section, e) => {
    e.preventDefault();
    if (section === "education") {
      setResumeData((prev) => ({
        ...prev,
        education: [...prev.education, educationData], // append new education
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
        experience: [...prev.experience, experience], // append new experience
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
          <div className="mb-10 relative">
            {/* Background Line */}
            <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-200"></div>

            {/* Active Line */}
            <div
              className="absolute top-5 left-0 h-[2px] bg-blue-500 transition-all duration-300"
              style={{ width: `${((steps - 1) / (totalSteps - 1)) * 100}%` }}
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
                steps >= stepNumber
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
                      >
                        {stepNumber}
                      </div>

                      <span className="text-xs mt-2 text-gray-600">
                        {label}
                      </span>
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* =========== Dynamic Step Heading ============= */}

          {steps === 1 && (
            <div className="flex items-center gap-3 mb-6 border-b pb-3">
              <UserIcon className="h-8 w-8" />
              <h3 className="text-lg font-semibold mb-4">
                Personal Information
              </h3>
            </div>
          )}

          {steps === 2 && (
            <div className="flex items-center gap-3 mb-6 border-b pb-3">
              <AcademicCapIcon className="h-8 w-8" />
              <h3 className="text-lg font-semibold mb-4">Education</h3>
            </div>
          )}

          {steps === 3 && (
            <div className="flex items-center gap-3 mb-6 border-b pb-3">
              <BriefcaseIcon className="h-8 w-8" />
              <h3 className="text-lg font-semibold mb-4">Experience</h3>
            </div>
          )}

          {steps === 4 && (
            <div className="flex items-center gap-3 mb-6 border-b pb-3">
              <CommandLineIcon className="h-8 w-8" />
              <h3 className="text-lg font-semibold mb-4">
                Skills (Technical & Soft)
              </h3>
            </div>
          )}

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* STEP 1 */}
            {steps === 1 && (
              <>
                <div className="space-y-5">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name <sup className="text-red-500">*</sup>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={resumeData.personalInfo.fullName}
                      onChange={handleInputChange("personalInfo")}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Full Name"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email <sup className="text-red-500">*</sup>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={resumeData.personalInfo.email}
                      onChange={handleInputChange("personalInfo")}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Email Id"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone <sup className="text-red-500">*</sup>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={handleInputChange("personalInfo")}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Linkedin */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={resumeData.personalInfo.linkedin}
                      onChange={handleInputChange("personalInfo")}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="LinkedIn Profile"
                    />
                  </div>

                  {/* Portfolio */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Portfolio
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={resumeData.personalInfo.portfolio}
                      onChange={handleInputChange("personalInfo")}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Github / Website"
                    />
                  </div>

                  {/* Location */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={resumeData.personalInfo.location}
                      onChange={handleInputChange("personalInfo")}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </>
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
                        <input
                          type="text"
                          name="instituteName"
                          value={educationData.instituteName}
                          onChange={(e) => handleArrayChange("education", e)}
                          placeholder="Institute Name"
                          className="border px-3 py-2 rounded-md w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          name="degreeName"
                          value={educationData.degreeName}
                          onChange={(e) => handleArrayChange("education", e)}
                          placeholder="Degree Name"
                          className="border px-3 py-2 rounded-md w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          name="fieldOfStudy"
                          value={educationData.fieldOfStudy}
                          onChange={(e) => handleArrayChange("education", e)}
                          placeholder="field"
                          className="border px-3 py-2 rounded-md w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          name="status"
                          value={educationData.status}
                          onChange={(e) => handleArrayChange("education", e)}
                          className="border px-3 py-2 rounded-md w-full"
                        >
                          <option value="">Select</option>
                          <option value="Passed">Passed</option>
                          <option value="Studying">Studying</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="date"
                          name="startDate"
                          value={educationData.startDate}
                          onChange={(e) => handleArrayChange("education", e)}
                          className="border px-2 py-2 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="date"
                          name="endDate"
                          value={educationData.endDate}
                          onChange={(e) => handleArrayChange("education", e)}
                          className="border px-2 py-2 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={(e) => saveArrayRow("education", e)}
                          className="bg-green-600 text-white px-4 py-2 rounded-md"
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
                      <th className="px-4 py-3">Start</th>
                      <th className="px-4 py-3">End</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          name="comapnyName"
                          value={experience.comapnyName}
                          onChange={(e) => handleArrayChange("experience", e)}
                          placeholder="Company"
                          className="border px-3 py-2 rounded-md w-full"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="text"
                          name="role"
                          value={experience.role}
                          onChange={(e) => handleArrayChange("experience", e)}
                          placeholder="Role"
                          className="border px-3 py-2 rounded-md w-full"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="text"
                          name="location"
                          value={experience.location}
                          onChange={(e) => handleArrayChange("experience", e)}
                          placeholder="Location"
                          className="border px-3 py-2 rounded-md w-full"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <select
                          name="type"
                          value={experience.type}
                          onChange={(e) => handleArrayChange("experience", e)}
                          className="border px-3 py-2 rounded-md w-full"
                        >
                          <option value="">Select Type</option>
                          <option value="Full Time">Full Time</option>
                          <option value="Internship">Internship</option>
                          <option value="Part Time">Part Time</option>
                          <option value="Freelance">Freelance</option>
                        </select>
                      </td>

                      <td className="px-4 py-3">
                        <select
                          name="status"
                          value={experience.status}
                          onChange={(e) => handleArrayChange("experience", e)}
                          className="border px-3 py-2 rounded-md w-full"
                        >
                          <option value="">Select Status</option>
                          <option value="Working">Working</option>
                          <option value="Serving Notice">Serving Notice</option>
                        </select>
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="date"
                          name="startDate"
                          value={experience.startDate}
                          onChange={(e) => handleArrayChange("experience", e)}
                          className="border px-2 py-2 rounded-md"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="date"
                          name="endDate"
                          value={experience.endDate}
                          onChange={(e) => handleArrayChange("experience", e)}
                          className="border px-2 py-2 rounded-md"
                        />
                      </td>

                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={(e) => {
                            saveArrayRow("experience", e);
                          }}
                          className="bg-green-600 text-white px-4 py-2 rounded-md"
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
                <input
                  name="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Please state your skills"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 mb-2"
                />
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
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
            <div className="md:col-span-2 flex justify-end gap-4 pt-4">
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
                  className="text-white px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700"
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-white px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
