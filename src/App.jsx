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
          {/* <div className="mb-8">
            <div className="flex items-center justify-between">
              {["Personal", "Education", "Experience", "Skills"].map(
                (label, index) => {
                  const stepNumber = index + 1;

                  return (
                    <div
                      key={label}
                      className="flex-1 flex flex-col items-center relative"
                    >
                      <div
                        className={`h-10 w-10 flex items-center justify-center rounded-full font-semibold transition
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

                      {stepNumber !== totalSteps && (
                        <div className="h-1 w-full bg-gray-200 mt-3">
                          <div
                            className={`h-1 ${
                              steps > stepNumber ? "bg-blue-600 w-full" : "w-0"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </div> */}
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
                        <input className="border px-3 py-2 rounded-md w-full" />
                      </td>
                      <td className="px-4 py-3">
                        <input className="border px-3 py-2 rounded-md w-full" />
                      </td>
                      <td className="px-4 py-3">
                        <input className="border px-3 py-2 rounded-md w-full" />
                      </td>
                      <td className="px-4 py-3">
                        <select className="border px-3 py-2 rounded-md w-full">
                          <option>Select</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="date"
                          className="border px-2 py-2 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="date"
                          className="border px-2 py-2 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md">
                          Save
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                          placeholder="Company"
                          className="border px-3 py-2 rounded-md w-full"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="text"
                          placeholder="Role"
                          className="border px-3 py-2 rounded-md w-full"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="text"
                          placeholder="Location"
                          className="border px-3 py-2 rounded-md w-full"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="date"
                          className="border px-2 py-2 rounded-md"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="date"
                          className="border px-2 py-2 rounded-md"
                        />
                      </td>

                      <td className="px-4 py-3 text-center">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md">
                          Save
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {/* STEP 4 SKILLS */}
            {steps === 4 && (
              <div className="md:col-span-2">
                <input
                  placeholder="Please state your skills"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
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
