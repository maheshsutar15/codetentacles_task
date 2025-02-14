import React, { useState } from "react";

export default function Skillsdetails({ stepperFormData, onChange }) {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill && !stepperFormData.skills.includes(newSkill)) {
      const updatedSkills = [...stepperFormData.skills, newSkill];
      onChange({ target: { name: "skills", value: updatedSkills } }); 
      setNewSkill(""); 
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = stepperFormData.skills.filter((skill) => skill !== skillToRemove);
    onChange({ target: { name: "skills", value: updatedSkills } }); 
  };

  const handleInputChange = (event) => {
    setNewSkill(event.target.value); 
  };

  return (
    <>
      <div className="flex w-full p-2">
        <div className="w-full">
          <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
            Skills Details
          </h1>
          <form action="/" method="post">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                Skills
              </label>
              {stepperFormData.skills.map((skill, index) => (
                <div key={index} className="flex space-x-6 mb-4">
                  <input
                    type="text"
                    value={skill}
                    disabled
                    className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex space-x-6 mb-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={handleInputChange}
                  placeholder="Add Skills"
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Skill
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
