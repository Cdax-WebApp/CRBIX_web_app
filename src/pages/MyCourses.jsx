import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  HiOutlineBookOpen, 
  HiOutlineClock, 
  HiOutlineCheckCircle, 
  HiOutlineRefresh,
  HiOutlineAcademicCap,
  HiChevronRight,
  HiOutlineExclamationCircle,
  HiOutlineFire,
  HiOutlineTrendingUp,
  HiOutlineStar
} from "react-icons/hi";
import { useProfile } from "../components/Profile/ProfileContext";
import { useAuth } from "../components/Login/AuthContext";

export default function CoursesPage() {
  const { isAuthenticated, openLogin } = useAuth();
  const { 
    enrolledCourses, 
    loading, 
    fetchProfile,
    selectedCourseId,
    setSelectedCourseId,
    streakData,
    loadCourseStreak
  } = useProfile();
  
  const navigate = useNavigate();
  
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [courseProgressData, setCourseProgressData] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      loadCourses();
    } else {
      setLocalLoading(false);
    }
  }, [isAuthenticated]);

  const calculateProgressFromStreak = (courseId) => {
    if (!streakData || streakData.last30Days.length === 0) return 0;
    
    const activeDays = streakData.last30Days.filter(day => day.isActiveDay);
    if (activeDays.length === 0) return 0;
    
    const totalProgress = activeDays.reduce((sum, day) => sum + (day.progressPercentage || 0), 0);
    return Math.min(100, Math.round(totalProgress / activeDays.length));
  };

  const loadCourses = async () => {
    try {
      setLocalLoading(true);
      setError(null);
      
      await fetchProfile();
      
      const processedCourses = enrolledCourses.map(course => {
        const progressFromAPI = course.progressPercentage || course.progressPercent || 
                               course.progress || course.overallProgress || 0;
        
        let finalProgress = progressFromAPI;
        
        if (selectedCourseId === course.id && streakData) {
          const streakProgress = calculateProgressFromStreak(course.id);
          finalProgress = Math.max(progressFromAPI, streakProgress);
        }
        
        const totalLessons = course.totalLessons || course.totalModules || 10;
        const completedLessons = course.completedLessons || 
                                Math.floor((finalProgress / 100) * totalLessons);
        
        return {
          ...course,
          actualProgress: finalProgress,
          displayProgress: finalProgress,
          completedLessons: completedLessons,
          totalLessons: totalLessons
        };
      });
      
      const progressMap = {};
      processedCourses.forEach(course => {
        progressMap[course.id] = {
          progress: course.displayProgress,
          completedLessons: course.completedLessons,
          totalLessons: course.totalLessons,
          isCompleted: course.displayProgress === 100,
          isInProgress: course.displayProgress > 0 && course.displayProgress < 100,
          isNotStarted: course.displayProgress === 0
        };
      });
      
      setCourseProgressData(progressMap);
      
    } catch (err) {
      setError(err.message || "Failed to load courses");
    } finally {
      setLocalLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (streakData && enrolledCourses.length > 0) {
      const updatedProgress = { ...courseProgressData };
      
      enrolledCourses.forEach(course => {
        if (selectedCourseId === course.id) {
          const streakProgress = calculateProgressFromStreak(course.id);
          const apiProgress = course.progressPercentage || course.progressPercent || 0;
          const finalProgress = Math.max(apiProgress, streakProgress);
          
          const totalLessons = course.totalLessons || 10;
          const completedLessons = Math.floor((finalProgress / 100) * totalLessons);
          
          updatedProgress[course.id] = {
            progress: finalProgress,
            completedLessons: completedLessons,
            totalLessons: totalLessons,
            isCompleted: finalProgress === 100,
            isInProgress: finalProgress > 0 && finalProgress < 100,
            isNotStarted: finalProgress === 0
          };
        }
      });
      
      setCourseProgressData(updatedProgress);
    }
  }, [streakData, selectedCourseId]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadCourses();
  };

  const handleCourseClick = (courseId) => {
    if (setSelectedCourseId) {
      setSelectedCourseId(courseId);
    }
    
    if (loadCourseStreak) {
      loadCourseStreak(courseId);
    }
    
    navigate(`/course/${courseId}`);
  };

  const handleViewStreak = (courseId, e) => {
    e.stopPropagation();
    
    if (setSelectedCourseId) {
      setSelectedCourseId(courseId);
    }
    
    navigate(`/profile?view=streak&course=${courseId}`);
  };

  const getProgressInfo = (courseId) => {
    if (courseProgressData[courseId]) {
      return courseProgressData[courseId];
    }
    
    const course = enrolledCourses.find(c => c.id === courseId);
    const progress = course?.progressPercentage || course?.progressPercent || 0;
    const totalLessons = course?.totalLessons || 10;
    const completedLessons = Math.floor((progress / 100) * totalLessons);
    
    return {
      progress,
      completedLessons,
      totalLessons,
      isCompleted: progress === 100,
      isInProgress: progress > 0 && progress < 100,
      isNotStarted: progress === 0
    };
  };

  const filteredCourses = enrolledCourses.filter(course => {
    const { progress } = getProgressInfo(course.id);
    
    if (filter === "all") return true;
    if (filter === "in-progress") return progress > 0 && progress < 100;
    if (filter === "completed") return progress === 100;
    if (filter === "not-started") return progress === 0;
    return true;
  });

  const stats = enrolledCourses.reduce((acc, course) => {
    const { progress, isCompleted, isInProgress, isNotStarted } = getProgressInfo(course.id);
    
    acc.totalCourses++;
    acc.totalProgress += progress;
    
    if (isCompleted) acc.completedCount++;
    if (isInProgress) acc.inProgressCount++;
    if (isNotStarted) acc.notStartedCount++;
    
    return acc;
  }, {
    totalCourses: 0,
    totalProgress: 0,
    completedCount: 0,
    inProgressCount: 0,
    notStartedCount: 0
  });

  const averageProgress = stats.totalCourses > 0 
    ? Math.round(stats.totalProgress / stats.totalCourses)
    : 0;

  const currentStreak = streakData?.currentStreak || 0;

  const topCourses = [...enrolledCourses]
    .sort((a, b) => {
      const progressA = getProgressInfo(a.id).progress;
      const progressB = getProgressInfo(b.id).progress;
      return progressB - progressA;
    })
    .slice(0, 3);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
            <HiOutlineAcademicCap className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Access Your Learning Journey
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Sign in to view your enrolled courses and track your progress
          </p>
          <button
            onClick={openLogin}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Sign In to Continue
            <HiChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
                <HiOutlineBookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Learning Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your learning progress and streaks
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600 dark:text-gray-400">In Progress: {stats.inProgressCount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Completed: {stats.completedCount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-gray-600 dark:text-gray-400">Not Started: {stats.notStartedCount}</span>
              </div>
              {currentStreak > 0 && (
                <div className="flex items-center gap-2 text-sm bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full">
                  <HiOutlineFire className="w-4 h-4 text-orange-500" />
                  <span className="text-orange-600 dark:text-orange-400 font-medium">
                    {currentStreak} day streak
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing || localLoading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 dark:hover:border-blue-500"
            >
              <HiOutlineRefresh className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Sync Progress'}
            </button>
            
            {selectedCourseId && currentStreak > 0 && (
              <button
                onClick={() => navigate(`/profile?view=streak`)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
              >
                <HiOutlineFire className="w-5 h-5" />
                View Streak Details
              </button>
            )}
          </div>
        </div>

        <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-blue-200 dark:border-gray-700 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Overall Learning Progress
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Combined progress across all courses
              </p>
              
              <div className="w-full h-4 bg-blue-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${averageProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                />
              </div>
              
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">0%</span>
                <span className="font-medium text-gray-900 dark:text-white">{averageProgress}% Complete</span>
                <span className="text-gray-600 dark:text-gray-400">100%</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                  {averageProgress}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Average Progress
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
            <div className="flex items-start gap-3">
              <HiOutlineExclamationCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-yellow-800 dark:text-yellow-300 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <HiOutlineBookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalCourses}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <HiOutlineTrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Progress</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.inProgressCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <HiOutlineCheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.completedCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <HiOutlineFire className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Learning Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentStreak} days
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:border-blue-500"
            }`}
          >
            All Courses ({stats.totalCourses})
          </button>
          <button
            onClick={() => setFilter("in-progress")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "in-progress"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:border-green-500"
            }`}
          >
            In Progress ({stats.inProgressCount})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "completed"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:border-purple-500"
            }`}
          >
            Completed ({stats.completedCount})
          </button>
          <button
            onClick={() => setFilter("not-started")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "not-started"
                ? "bg-gray-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:border-gray-500"
            }`}
          >
            Not Started ({stats.notStartedCount})
          </button>
        </div>

        {topCourses.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <HiOutlineStar className="w-5 h-5 text-yellow-500" />
                Top Performing Courses
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topCourses.map((course, index) => {
                const { progress, completedLessons, totalLessons, isCompleted } = getProgressInfo(course.id);
                
                return (
                  <div 
                    key={course.id} 
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600' :
                        index === 1 ? 'bg-gray-100 text-gray-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        <span className="font-bold">{index + 1}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                        {course.title}
                      </h4>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-medium text-gray-900 dark:text-white">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            isCompleted ? 'bg-green-500' : 
                            progress > 50 ? 'bg-blue-500' : 
                            progress > 20 ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex justify-between">
                      <span>{completedLessons}/{totalLessons} lessons</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        progress > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {progress > 0 ? 'Active' : 'Not started'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {(localLoading || loading) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse"
              >
                <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {!(localLoading || loading) && (
          <>
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                  <HiOutlineBookOpen className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {filter === "all" ? "No courses enrolled yet" : `No ${filter.replace('-', ' ')} courses`}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                  {filter === "all" 
                    ? "Start your learning journey by enrolling in courses that interest you"
                    : `You don't have any ${filter.replace('-', ' ')} courses at the moment`
                  }
                </p>
                {filter !== "all" ? (
                  <button
                    onClick={() => setFilter("all")}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    View All Courses
                  </button>
                ) : (
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    <HiOutlineAcademicCap className="w-5 h-5" />
                    Browse All Courses
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const { 
                    progress, 
                    completedLessons, 
                    totalLessons, 
                    isCompleted, 
                    isInProgress 
                  } = getProgressInfo(course.id);
                  
                  const hasStreak = selectedCourseId === course.id && streakData;
                  
                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden"
                      onClick={() => handleCourseClick(course.id)}
                    >
                      <div className="absolute top-3 right-3 z-10">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          isInProgress ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {progress}% Complete
                        </div>
                      </div>
                      
                      {hasStreak && streakData.currentStreak > 0 && (
                        <div className="absolute top-3 left-3 z-10">
                          <button
                            onClick={(e) => handleViewStreak(course.id, e)}
                            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm"
                          >
                            <HiOutlineFire className="w-3 h-3" />
                            {streakData.currentStreak} days
                          </button>
                        </div>
                      )}
                      
                      <div className="relative overflow-hidden rounded-lg mb-4">
                        <img
                          src={course.thumbnailUrl || course.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400'}
                          alt={course.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <span className="px-3 py-1 bg-black/70 text-white text-xs rounded-full">
                            {course.category || course.type || 'Course'}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {course.title}
                      </h3>
                      
                      {course.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {course.description}
                        </p>
                      )}

                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                          <span className="flex items-center gap-1">
                            <HiOutlineBookOpen className="w-3 h-3" />
                            {completedLessons}/{totalLessons} lessons
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {progress}%
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full ${
                              isCompleted
                                ? "bg-gradient-to-r from-green-500 to-green-600"
                                : isInProgress
                                ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                : "bg-gradient-to-r from-gray-400 to-gray-500"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCourseClick(course.id);
                          }}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm"
                        >
                          {isCompleted ? 'Review Course' : isInProgress ? 'Continue Learning' : 'Start Learning'}
                        </button>
                        
                        <button
                          onClick={(e) => handleViewStreak(course.id, e)}
                          className="px-3 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800/40 transition-colors flex items-center gap-1"
                          title="View streak details"
                        >
                          <HiOutlineFire className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}