import api from "./api";

/**
 * FAVORITES API
 * Backend base: https://cdaxx-backend.onrender.com
 * Controller: /api/favorites
 */

/**
 * Get all favorite courses of a user
 * GET /api/favorites/{userId}
 */
export const getUserFavorites = async (userId) => {
  const response = await api.get(`/api/favorites/${userId}`);
  return response.data;
};

/**
 * Add a course to favorites
 * POST /api/favorites/{userId}/add/{courseId}
 */
export const addToFavorites = async (userId, courseId) => {
  const response = await api.post(
    `/api/favorites/${userId}/add/${courseId}`
  );
  return response.data;
};

/**
 * Remove a course from favorites
 * DELETE /api/favorites/{userId}/remove/{courseId}
 */
export const removeFromFavorites = async (userId, courseId) => {
  await api.delete(
    `/api/favorites/${userId}/remove/${courseId}`
  );
};

/**
 * Check if a course is already favorite
 * GET /api/favorites/{userId}/check/{courseId}
 */
export const checkIsFavorite = async (userId, courseId) => {
  const response = await api.get(
    `/api/favorites/${userId}/check/${courseId}`
  );
  return response.data; // boolean
};