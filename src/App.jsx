import {
  AcademicCapIcon,
  BriefcaseIcon,
  CommandLineIcon,
  DocumentTextIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import ProgressBar from "./components/layout/ProgressBar";
import StepNavigation from "./components/layout/StepNavigation";
import FormHead from "./components/layout/FormHead";
import PersonalInfo from "./components/form/PersonalInfo";
import EducationForm from "./components/form/EducationForm";
import ExperienceForm from "./components/form/ExperienceForm";
import SkillForm from "./components/form/SkillForm";
import { useResumeForm } from "./hook/useResumeForm";

function App() {
  const {
    resumeData,
    educationData,
    experience,
    skills,
    setSkills,
    step,
    totalSteps,
    handleNext,
    handlePrev,
    handleArrayChange,
    handleDeleteArray,
    handleDeleteSkill,
    handleInputChange,
    saveArrayRow,
    handleSave,
  } = useResumeForm();

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
    if (step === 1) return validatePersonalInfo();
    if (step === 2) return resumeData.education.length > 0;
    if (step === 3) return resumeData.experience.length > 0;
    if (step === 4) return resumeData.skills.length > 0;
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

  const currentStep = stepConfig[step];

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
          <ProgressBar step={step} totalSteps={totalSteps} />

          {/* =========== Dynamic Step Heading ============= */}

          <FormHead Icon={currentStep.Icon} title={currentStep.title} />

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* STEP 1 */}
            {step === 1 && (
              <PersonalInfo
                resumeData={resumeData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* STEP 2 EDUCATION */}
            {step === 2 && (
              <EducationForm
                educationData={educationData}
                handleArrayChange={handleArrayChange}
                saveArrayRow={saveArrayRow}
                resumeData={resumeData}
                handleDeleteArray={handleDeleteArray}
              />
            )}

            {step === 3 && (
              <ExperienceForm
                experience={experience}
                handleArrayChange={handleArrayChange}
                saveArrayRow={saveArrayRow}
                resumeData={resumeData}
                handleDeleteArray={handleDeleteArray}
              />
            )}

            {/* STEP 4 SKILLS */}
            {step === 4 && (
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
              step={step}
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
