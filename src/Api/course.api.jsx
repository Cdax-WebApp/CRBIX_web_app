import api from "./api";

/* ==================== COURSES ==================== */

// Get all courses (public / logged in)
export const getCourses = async (userId) => {
  try {
    const res = await api.get("/api/courses", {
      params: userId ? { userId } : {},
    });
    return res.data?.data ?? [];
  } catch (err) {
    console.error("Failed to fetch courses:", err);
    return [];
  }
};

// Get dashboard courses
export const getDashboardCourses = async (userId) => {
  try {
    const res = await api.get("/api/dashboard/courses", {
      params: { userId },
    });
    return res.data?.data ?? [];
  } catch (err) {
    console.error("Dashboard fetch failed:", err);
    return [];
  }
};

// Get single course with modules + progress
export const getCourseById = async (courseId, userId) => {
  try {
    const res = await api.get(`/api/courses/${courseId}`, {
      params: { userId },
    });
    return res.data?.data ?? null;
  } catch (err) {
    console.error("Course fetch failed:", err);
    return null;
  }
};

/* ==================== PURCHASE ==================== */

export const purchaseCourse = async (userId, courseId) => {
  try {
    const res = await api.post("/api/purchase", null, {
      params: { userId, courseId },
    });

    return {
      success: true,
      message: res.data?.message ?? "Purchase successful",
    };
  } catch (err) {
    console.error("Purchase failed:", err);
    return { success: false, message: "Purchase failed" };
  }
};

/* ==================== MODULES ==================== */

// Get modules by course
export const getModulesByCourse = async (courseId, userId) => {
  try {
    const res = await api.get(`/api/modules/course/${courseId}`, {
      params: { userId },
    });
    return res.data ?? {};
  } catch (err) {
    console.error("Module fetch failed:", err);
    return {};
  }
};

/* ==================== VIDEO PROGRESS ==================== */

// Complete video & auto unlock next
export const completeVideo = async (userId, courseId, moduleId, videoId) => {
  try {
    const res = await api.post("/api/videos/complete", {
      userId,
      courseId,
      moduleId,
      videoId,
    });

    return { success: true };
  } catch (err) {
    console.error("Video complete failed:", err);
    return { success: false };
  }
};

/* ==================== ASSESSMENT ==================== */

// Can attempt assessment
export const canAttemptAssessment = async (userId, assessmentId) => {
  const res = await api.get("/api/course/assessment/can-attempt", {
    params: { userId, assessmentId },
  });
  return res.data?.canAttempt ?? false;
};

// Get assessment questions
export const getAssessmentQuestions = async (userId, assessmentId) => {
  const res = await api.get("/api/course/assessment/questions", {
    params: { userId, assessmentId },
  });
  return res.data;
};

// Submit assessment
export const submitAssessment = async (userId, assessmentId, answers) => {
  const res = await api.post(
    "/api/course/assessment/submit",
    answers,
    { params: { userId, assessmentId } }
  );
  return res.data;
};
