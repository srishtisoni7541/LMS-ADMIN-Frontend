import React from 'react';
import { BookOpen, Users, Clock, Star, Edit, Trash2, Eye } from "lucide-react";

const CourseCard = ({ course, onEdit, onDelete, onView, isDeleted }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg ${
        isDeleted ? 'opacity-50 grayscale hover:opacity-60' : 'hover:-translate-y-1'
      }`}
    >
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {isDeleted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-semibold px-3 py-1 rounded bg-red-500">
              Deleted
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 flex-1 mr-2">
            {course.title}
          </h3>
          <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-600">
            {course.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span>{course.students} students</span>
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Star className="w-4 h-4 mr-1 text-yellow-400" />
            <span>{course.rating}/5</span>
          </div>
        </div>

        <div className="border-t pt-3 flex justify-between items-center">
          <div className="text-sm font-medium text-gray-600">
            By {course.instructor}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onView(course._id)}
              className="p-1.5 rounded hover:bg-gray-100 text-blue-600 transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            {!isDeleted && (
              <>
                <button
                  onClick={() => onEdit(course)}
                  className="p-1.5 rounded hover:bg-gray-100 text-gray-600 transition-colors"
                  title="Edit Course"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(course._id)}
                  className="p-1.5 rounded hover:bg-gray-100 text-red-500 transition-colors"
                  title="Delete Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;