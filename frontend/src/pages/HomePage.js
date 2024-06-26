
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/SideBar';
import InterviewCard from '../components/InterviewCard';
import { getInterviews } from '../services/interviewApi';

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await getInterviews();
        setInterviews(response);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-2xl font-bold">Welcome Jai Shree Krishna</h1>
        <h2 className="text-xl text-gray-700">{user.email}</h2>
        <div className="grid grid-cols-1 gap-4">
          {interviews.map((interview) => (
            <InterviewCard
              key={interview._id}
              company={interview.company}
              role={interview.role}
              experience={interview.experience}
              type={interview.type}
              userName={interview.creator.fullName}
              userTag={interview.creator.username}
              userAvatar={interview.creator.avatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}