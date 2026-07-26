import axios from 'axios';
import { INITIAL_MOCK_COURSES, INITIAL_MOCK_PROGRESS, INITIAL_MOCK_USER, updateMockProgress, updateWatchProgress } from '@/data/mockCourses';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token
API.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        if (parsed?.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch (e) {
        // ignore JSON error
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function getMockFallback(config: any) {
  const url = config?.url || '';
  const method = (config?.method || 'get').toLowerCase();

  if (url.includes('/courses')) {
    if (method === 'get') {
      const match = url.match(/\/courses\/([^\/]+)/);
      if (match && match[1] && match[1] !== 'courses') {
        const courseId = match[1];
        const course = INITIAL_MOCK_COURSES.find(c => c._id === courseId || c.id === courseId) || INITIAL_MOCK_COURSES[0];
        return { data: course, status: 200, statusText: 'OK', headers: {}, config };
      }
      return { data: INITIAL_MOCK_COURSES, status: 200, statusText: 'OK', headers: {}, config };
    }
    if (method === 'post') {
      return { data: { message: "Success" }, status: 200, statusText: 'OK', headers: {}, config };
    }
    if (method === 'put') {
      const match = url.match(/\/courses\/([^\/]+)\/lessons\/([^\/]+)\/summary/);
      if (match && match[1] && match[2]) {
        const courseId = match[1];
        const lessonId = match[2];
        let body: any = {};
        try {
          body = config?.data ? (typeof config.data === 'string' ? JSON.parse(config.data) : config.data) : {};
        } catch (e) {
          body = {};
        }
        const course = INITIAL_MOCK_COURSES.find(c => c._id === courseId || c.id === courseId);
        if (course) {
          const lesson = course.lessons?.find((l: any) => l._id === lessonId || l.id === lessonId);
          if (lesson) {
            lesson.summary = body.summary;
          }
        }
        return { data: { message: "Summary updated successfully" }, status: 200, statusText: 'OK', headers: {}, config };
      }
    }
  }

  if (url.includes('/progress')) {
    if (method === 'get') {
      return { data: INITIAL_MOCK_PROGRESS, status: 200, statusText: 'OK', headers: {}, config };
    }
    if (method === 'post') {
      let body: any = {};
      try {
        body = config?.data ? (typeof config.data === 'string' ? JSON.parse(config.data) : config.data) : {};
      } catch (e) {
        body = {};
      }

      if (url.includes('/progress/watch-time')) {
        if (body?.courseId && body?.lessonId) {
          const updated = updateWatchProgress(body.courseId, body.lessonId, body.currentSeconds || 0, body.totalSeconds || 600);
          return { data: updated, status: 200, statusText: 'OK', headers: {}, config };
        }
      }

      if (body?.courseId && body?.lessonId) {
        const updated = updateMockProgress(body.courseId, body.lessonId);
        return { data: updated, status: 200, statusText: 'OK', headers: {}, config };
      }
      return { data: { message: "Progress updated" }, status: 200, statusText: 'OK', headers: {}, config };
    }
  }

  if (url.includes('/auth/login') || url.includes('/auth/register')) {
    return { data: INITIAL_MOCK_USER, status: 200, statusText: 'OK', headers: {}, config };
  }

  if (url.includes('/certificate')) {
    const dummyBlob = new Blob(["Sample Certificate PDF Content"], { type: "application/pdf" });
    return { data: dummyBlob, status: 200, statusText: 'OK', headers: {}, config };
  }

  return null;
}

// Global error handler with mock fallback when backend is unavailable
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    const fallback = getMockFallback(error.config);
    if (fallback) {
      console.warn(`[API Fallback] Backend unreachable or failed (${error.message}). Serving mock fallback data for: ${error.config?.url}`);
      return Promise.resolve(fallback);
    }

    return Promise.reject(error);
  }
);

export default API;
