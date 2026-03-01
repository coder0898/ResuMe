import { DocumentTextIcon } from "@heroicons/react/20/solid";
import "./App.css";
import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
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
  const [errors, setErrors] = useState({});

  const validateInput = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = "This field is required";
    } else {
      switch (name) {
        case "email":
          if (!/\S+@\S+\.\S+/.test(value)) error = "Enter a valid email";
          break;

        case "phone":
          if (!/^[0-9]{10}$/.test(value))
            error = "Enter valid 10-digit phone number";
          break;

        case "linkedin":
          if (!value.includes("linkedin.com"))
            error = "Enter valid LinkedIn URL";
          break;

        case "portfolio":
          try {
            new URL(value);
          } catch {
            error = "Enter valid URL";
          }
          break;

        default:
          break;
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));

    const error = validateInput(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  //handle next and prev
  const handleNext = () => {
    // Validate ONLY first step
    // if (step === 1) {
    //   const isValid = validateStepOne();
    //   if (!isValid) return;
    // }

    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <>
      <div className="h-screen bg-gray-100">
        <main className="p-6">
          <div className="bg-white p-4 rounded shadow-md ">
            <div className="flex items-center gap-2 mb-6">
              <DocumentTextIcon className="h-8 w-8 text-blue-500" />
              <h2 className="text-blue-500 font-semibold text-2xl">
                Resume Form
              </h2>
            </div>
            {/* Step Indicator */}
            <p className="text-sm text-gray-500 mb-6">
              Step {step} of {totalSteps}
            </p>

            {/* Form */}
            {/* ================= DYNAMIC STEP HEADING ================= */}
            {step === 1 && (
              <h3 className="text-lg font-semibold mb-4">
                Personal Information
              </h3>
            )}

            {step === 2 && (
              <h3 className="text-lg font-semibold mb-4">Education</h3>
            )}

            {step === 3 && (
              <h3 className="text-lg font-semibold mb-4">Experience</h3>
            )}

            {step === 4 && (
              <h3 className="text-lg font-semibold mb-4">
                Skills (Technical & Soft)
              </h3>
            )}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ================= STEP 1 ================= */}
              {step === 1 && (
                <>
                  <div className="space-y-5">
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={resumeData.personalInfo.fullName}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2 ${
                          errors.fullName
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Full Name"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm">
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={resumeData.personalInfo.email}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2 ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Email Id"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone <sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={resumeData.personalInfo.phone}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2 ${
                          errors.phone
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Phone Number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn <sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={resumeData.personalInfo.linkedin}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2 ${
                          errors.linkedin
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="LinkedIn Profile"
                      />
                      {errors.linkedin && (
                        <p className="text-red-500 text-sm">
                          {errors.linkedin}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Protfolio <sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="url"
                        name="portfolio"
                        value={resumeData.personalInfo.portfolio}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2 ${
                          errors.portfolio
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="portfolio - Github, personal website"
                      />
                      {errors.portfolio && (
                        <p className="text-red-500 text-sm">
                          {errors.portfolio}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location <sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={resumeData.personalInfo.location}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2 ${
                          errors.location
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Location - City, Country"
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm">
                          {errors.location}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
              {/* ================= STEP 2 ================= */}
              {step === 2 && (
                <>
                  <div className="space-y-5">
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Institute/Board Name
                        <sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="text"
                        name="instituteName"
                        className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2 ${
                          errors.instituteName
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Full Name"
                      />
                      {errors.instituteName && (
                        <p className="text-red-500 text-sm">
                          {errors.instituteName}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Degree/Class <sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="text"
                        name="degreeName"
                        className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2 ${
                          errors.degreeName
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Full Name"
                      />
                      {errors.degreeName && (
                        <p className="text-red-500 text-sm">
                          {errors.degreeName}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field of Study <sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="text"
                        name="fieldOfStudy"
                        className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2 ${
                          errors.fieldOfStudy
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Full Name"
                      />
                      {errors.fieldOfStudy && (
                        <p className="text-red-500 text-sm">
                          {errors.fieldOfStudy}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status <sup className="text-red-500">*</sup>
                      </label>
                      <select
                        name="status"
                        className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2 ${
                          errors.startDate
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      >
                        <option value="">Select Status</option>
                        <option value="Passed">Passed</option>
                        <option value="lastSemister">Last Semister</option>
                      </select>
                      {errors.status && (
                        <p className="text-red-500 text-sm">{errors.status}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date <sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2 ${
                          errors.startDate
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Full Name"
                      />
                      {errors.startDate && (
                        <p className="text-red-500 text-sm">
                          {errors.startDate}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date <sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2 ${
                          errors.endDate
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Full Name"
                      />
                      {errors.endDate && (
                        <p className="text-red-500 text-sm">{errors.endDate}</p>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      className="text-white px-5 py-2.5 rounded-lg font-medium transition bg-green-600 hover:bg-green-700"
                    >
                      Save Button
                    </button>
                  </div>
                </>
              )}

              {/* ================= STEP 3 ================= */}
              {step === 3 && (
                <div className="md:col-span-2">
                  <p className="text-gray-500">
                    You will add dynamic experience fields here.
                  </p>
                </div>
              )}
              {step === 4 && (
                <div className="md:col-span-2">
                  <p className="text-gray-500">
                    You will add dynamic skill fields here.
                  </p>
                </div>
              )}
              {/* ================= BUTTONS ================= */}
              <div className="md:col-span-2 flex justify-end gap-4 pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="text-white px-5 py-2.5 rounded-lg font-medium transition bg-gray-600 hover:bg-gray-700"
                  >
                    Prev
                  </button>
                )}
                {step === totalSteps ? (
                  <button
                    type="button"
                    className="text-white px-5 py-2.5 rounded-lg font-medium transition bg-green-600 hover:bg-green-700"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="text-white px-5 py-2.5 rounded-lg font-medium transition bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                  </button>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
