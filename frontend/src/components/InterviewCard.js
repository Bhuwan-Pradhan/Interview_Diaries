
import React, { useState } from 'react';

export default function InterviewCard({ company, role, experience, type, userName, userTag, userAvatar }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 250;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg w-100"> 
      <div className="flex items-center mb-4">
        <img src={userAvatar} alt={userName} className="w-10 h-10 rounded-full mr-4" />
        <div>
          <h3 className="text-lg font-bold">{userName}</h3>
          <p className="text-gray-500">@{userTag}</p>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">Company: {company}</h2>
      <h3 className="text-lg font-semibold mb-2">Role: {role}</h3>
      <p className="text-gray-700 mb-2">
        {isExpanded || experience.length <= maxLength
          ? experience
          : `${experience.slice(0, maxLength)}...`}
        {experience.length > maxLength && (
          <button
            onClick={toggleReadMore}
            className="text-blue-500 ml-2"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </p>
      <span className={`inline-block px-2 py-1 rounded text-white ${type === 'onCampus' ? 'bg-green-500' : 'bg-blue-500'}`}>
        {type}
      </span>
    </div>
  );
}
