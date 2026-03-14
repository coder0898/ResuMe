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
  const totalSteps = 4;

  // STEP CONTROL
  const handleNext = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
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

  return {
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
  };
};
