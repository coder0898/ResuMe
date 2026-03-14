import {
  AcademicCapIcon,
  BriefcaseIcon,
  CommandLineIcon,
  DocumentTextIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import ProgressBar from "./components/layout/ProgressBar";
import StepNavigation from "./components/layout/StepNavigation";
import FormHead from "./components/layout/FormHead";
import PersonalInfo from "./components/form/PersonalInfo";
import EducationForm from "./components/form/EducationForm";
import ExperienceForm from "./components/form/ExperienceForm";
import SkillForm from "./components/form/SkillForm";

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
              <EducationForm
                educationData={educationData}
                handleArrayChange={handleArrayChange}
                saveArrayRow={saveArrayRow}
                resumeData={resumeData}
                handleDeleteArray={handleDeleteArray}
              />
            )}

            {steps === 3 && (
              <ExperienceForm
                experience={experience}
                handleArrayChange={handleArrayChange}
                saveArrayRow={saveArrayRow}
                resumeData={resumeData}
                handleDeleteArray={handleDeleteArray}
              />
            )}

            {/* STEP 4 SKILLS */}
            {steps === 4 && (
              <SkillForm
                skills={skills}
                setSkills={setSkills}
                handleSave={handleSave}
                resumeData={resumeData}
                handleDeleteSkill={handleDeleteSkill}
              />
            )}

            {/* BUTTONS */}

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
