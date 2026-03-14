import InputField from "../common/InputField";
import SaveButton from "../common/SaveButtton";

const SkillForm = ({
  skills,
  setSkills,
  handleSave,
  resumeData,
  handleDeleteSkill,
}) => {
  return (
    <>
      <div className="md:col-span-2">
        <InputField
          name="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Please state your skills"
        />
        <SaveButton onClick={handleSave} disabled={!skills.trim()} />
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
    </>
  );
};

export default SkillForm;
