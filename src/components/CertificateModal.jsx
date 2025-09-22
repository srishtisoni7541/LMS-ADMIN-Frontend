

import React from 'react';
import { 
  Award, 
  BookOpen, 
  Calendar,
  CheckCircle,
  Star
} from 'lucide-react';

const Certificate = ({ onClose, data }) => {
//   console.log("Certificate Data:", data);

  const certificateData = {
    studentName: data[0]?.student?.name || "Unknown Student",
    courseName: data[0]?.course?.title || "Untitled Course",
    instituteName: "Sheryians Coding School",
    instituteTagline: "Empowering Digital Futures",
    startDate: data[0]?.course?.startDate || "N/A",
    completionDate: data[0]?.course?.completionDate || "N/A",
    issueDate: data?.createdAt 
      ? new Date(data.createdAt).toLocaleDateString()
      : new Date().toLocaleDateString(),
    duration: "52 Hours", // static
    score: 94,            // static
    grade: "A+",          // static
    content:data[0]?.course?.certificateContent,
    instructorName: "Dr. Priya Mehta",  // static
    directorName: "Prof Vikram Singh", // static
    certificateId: data?._id || "N/A",
    verificationUrl: "sheryians.com/verify"
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 relative overflow-hidden border-8 border-yellow-500 rounded-lg shadow-2xl">
      {/* Decorative Border */}
      <div className="absolute inset-4 border-4 border-yellow-200 rounded"></div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow"
        >
          cancel
        </button>
      )}
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-16 h-16 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute top-8 right-8 w-12 h-12 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-10 h-10 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-14 h-14 border-2 border-yellow-500 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-full mr-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {certificateData.instituteName}
              </h1>
              <p className="text-sm text-gray-600">{certificateData.instituteTagline}</p>
            </div>
          </div>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
          
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">
            Certificate of Completion
          </h2>
          <p className="text-gray-600">This is to certify that</p>
        </div>

        {/* Student Name */}
        <div className="text-center mb-8">
          <h3 className="text-4xl font-serif font-bold text-gray-900 mb-2 border-b-2 border-yellow-500 inline-block pb-1">
            {certificateData.studentName}
          </h3>
          <p className="text-lg text-gray-600 mt-4">
            has successfully completed the course
          </p>
        </div>

        {/* Course Details */}
        <div className="text-center mb-8">
          <h4 className="text-2xl font-bold text-indigo-700 mb-4">
            "{certificateData.courseName}"
          </h4>
          <p className="text-gray-700 mb-4">
            with a grade of <span className="font-bold text-green-600">{certificateData.grade}</span>
          </p>
          
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Started: {certificateData.startDate}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
              <span>Completed: {certificateData.completionDate}</span>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{certificateData.duration}</div>
              <div className="text-xs text-gray-600">Course Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{certificateData.score}%</div>
              <div className="text-xs text-gray-600">Final Score</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <div className="text-xs text-gray-600">Excellence</div>
            </div>
            <p>{certificateData.content}</p>
          </div>
        </div>

        {/* Signatures */}
        <div className="flex justify-between items-end mt-12">
          <div className="text-center">
            <div className="w-32 border-b-2 border-gray-400 mb-2"></div>
            <p className="text-sm font-semibold">{certificateData.instructorName}</p>
            <p className="text-xs text-gray-600">Course Instructor</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-full mb-2">
              <Award className="h-8 w-8 text-white mx-auto" />
            </div>
            <p className="text-xs text-gray-600">Certified Achievement</p>
          </div>
          
          <div className="text-center">
            <div className="w-32 border-b-2 border-gray-400 mb-2"></div>
            <p className="text-sm font-semibold">{certificateData.directorName}</p>
            <p className="text-xs text-gray-600">Academic Director</p>
          </div>
        </div>

        {/* Certificate ID */}
        <div className="text-center mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Certificate ID: {certificateData.certificateId} | 
            Issued on: {certificateData.issueDate} | 
            Verify at: {certificateData.verificationUrl}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
