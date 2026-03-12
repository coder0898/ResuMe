import { useState } from "react";

export const useResumeForm = () => {
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
    companyName: "",
    role: "",
    type: "",
    status: "",
    startDate: "",
    location: "",
    endDate: "",
  });

  const [skills, setSkills] = useState("");

  const [step, setStep] = useState(1);

  return {
    resumeData,
    setResumeData,
    educationData,
    setEducationData,
    experience,
    setExperience,
    skills,
    setSkills,
    step,
    setStep,
  };
};
