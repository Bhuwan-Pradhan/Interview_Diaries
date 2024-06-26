
import React from 'react';
import InterviewForm from '../components/InterviewExForm';
import Sidebar from '../components/SideBar';

export default function InterviewFormPage() {
  return (
    <div className="flex justify-center items-center h-screen">
         <Sidebar />
      <InterviewForm />
    </div>
  );
}
