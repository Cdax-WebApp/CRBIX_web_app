// src/pages/MyCourses.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Login/AuthContext';
import { useTheme } from "../components/Profile/ThemeContext";
import * as courseApi from '../Api/course.api';
import { BookOpen, Loader2, AlertCircle, PlayCircle, Award, Clock, Users, Sun, Moon } from 'lucide-react';

const MyCourses = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserCourses = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await courseApi.getPurchasedCourses(user.id);
      setCourses(Array.isArray(data) ? data : []);
      
    } catch (error) {
      setError('Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserCourses();
  }, [fetchUserCourses]);

  const handleCourseClick = (course) => {
    // Navigate to course details page
    navigate(`/course/${course.id}`);
  };

  const formatProgress = (progress) => {
    const progressValue = progress?.progressPercentage || progress?.progressPercent || progress?.progress || 0;
    return Math.round(progressValue);
  };

  const getPlaceholderImage = () => {
    return theme === 'dark' 
      ? 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Theme Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="text-blue-600 dark:text-blue-400" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Learning</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Continue your learning journey with these courses
              </p>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 self-start sm:self-center"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <>
                <Moon size={18} />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun size={18} />
                <span>Light Mode</span>
              </>
            )}
          </button>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mb-4" />
              <div className="absolute inset-0 rounded-full border-2 border-blue-200 dark:border-blue-800 animate-ping"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Loading your courses...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="text-red-600 dark:text-red-400" size={24} />
              <h3 className="font-semibold text-red-800 dark:text-red-300">Unable to load courses</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchUserCourses}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
            <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <BookOpen className="text-blue-600 dark:text-blue-400" size={48} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              No Courses Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              You haven't enrolled in any courses yet. Start your learning journey today!
            </p>
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Browse Courses
            </button>
          </div>
        )}

        {!loading && !error && courses.length > 0 && (
          <>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-blue-600 dark:text-blue-400">{courses.length}</span> course{courses.length !== 1 ? 's' : ''} enrolled
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={fetchUserCourses}
                  className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => {
                const progress = formatProgress(course);
                const imageUrl = course.thumbnailUrl || course.bannerImage || course.image || getPlaceholderImage();
                
                return (
                  <div 
                    key={course.id} 
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                    onClick={() => handleCourseClick(course)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={imageUrl} 
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = getPlaceholderImage();
                        }}
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {progress > 0 && (
                        <div className="absolute top-3 left-3 bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                          {progress}% Complete
                        </div>
                      )}
                      
                      {course.isSubscribed && (
                        <div className="absolute top-3 right-3 bg-green-600 dark:bg-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                          Subscribed
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-3 py-1 rounded-full">
                          {course.category || "Programming"}
                        </span>
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-medium px-3 py-1 rounded-full">
                          {course.level || "Intermediate"}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {course.description || course.shortDescription}
                      </p>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-sm">
                            {course.instructor?.charAt(0) || 'I'}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {course.instructor || "Instructor"}
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-500">Instructor</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1" title="Duration">
                          <Clock size={14} className="text-gray-500 dark:text-gray-500" />
                          <span>{course.formattedDuration || `${Math.floor(course.totalDuration / 60)}h`}</span>
                        </div>
                        <div className="flex items-center gap-1" title="Enrolled Students">
                          <Users size={14} className="text-gray-500 dark:text-gray-500" />
                          <span>{course.enrolledStudents?.toLocaleString() || "0"}</span>
                        </div>
                        <div className="flex items-center gap-1" title="Rating">
                          <Award size={14} className="text-yellow-500 dark:text-yellow-400" />
                          <span>{course.rating || 4.5}/5</span>
                        </div>
                      </div>
                      
                      {progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                            <span>Progress</span>
                            <span className="font-semibold text-blue-600 dark:text-blue-400">{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 h-2 rounded-full transition-all duration-700"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      <button 
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCourseClick(course);
                        }}
                      >
                        <PlayCircle size={18} />
                        {progress > 0 ? 'Continue Learning' : 'Start Learning'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCourses;