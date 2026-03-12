import InputField from "../common/InputField";

const PersonalInfo = ({ resumeData, handleInputChange }) => {
  return (
    <>
      <div className="space-y-5">
        {/* Full Name */}

        <InputField
          label="Full Name"
          name="fullName"
          value={resumeData.personalInfo.fullName}
          onChange={handleInputChange("personalInfo")}
          placeholder="Full Name"
        />

        {/* Email */}

        <InputField
          label="Email"
          name="email"
          value={resumeData.personalInfo.email}
          onChange={handleInputChange("personalInfo")}
          type="email"
          placeholder="Email Id"
        />

        {/* Phone */}
        <InputField
          label="Phone"
          name="phone"
          value={resumeData.personalInfo.phone}
          onChange={handleInputChange("personalInfo")}
          type="tel"
          placeholder="Phone Number"
        />
      </div>

      <div className="space-y-5">
        {/* Linkedin */}
        <InputField
          label="LinkedIn"
          name="linkedin"
          value={resumeData.personalInfo.linkedin}
          onChange={handleInputChange("personalInfo")}
          type="url"
          placeholder="LinkedIn Profile"
        />

        {/* Portfolio */}
        <InputField
          label="Portfolio"
          name="portfolio"
          value={resumeData.personalInfo.portfolio}
          onChange={handleInputChange("personalInfo")}
          type="url"
          placeholder="Github / Website"
        />

        {/* Location */}
        <InputField
          label="Location"
          name="location"
          value={resumeData.personalInfo.location}
          onChange={handleInputChange("personalInfo")}
          placeholder="City, Country"
        />
      </div>
    </>
  );
};

export default PersonalInfo;
