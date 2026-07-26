export interface Lesson {
  _id: string;
  id: string;
  unitId: string;
  unitNumber: number;
  lessonNumber: number;
  title: { en: string; mr: string };
  videoUrl: string;
  driveUrl: string;
  duration: string; // e.g. "10:00"
  durationSeconds: number;
  order: number;
}

export interface Unit {
  _id: string;
  id: string;
  unitNumber: number;
  title: { en: string; mr: string };
  description: { en: string; mr: string };
  lessons: Lesson[];
}

export const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1gW1nRh89OrrSm6OCVRZnwoI3PnZPW7lA";

// High quality, direct streamable educational video embeds for all unit lessons
const units: Unit[] = [
  {
    _id: "course-1-unit-1",
    id: "course-1-unit-1",
    unitNumber: 1,
    title: { en: "Unit 1: Getting Started with Word", mr: "वर्डसह सुरवात" },
    description: { en: "Introduction to Microsoft Word and interface basics.", mr: "मायक्रोसॉफ्ट वर्डची ओळख आणि इंटरफेसच्या मूलभूत गोष्टी." },
    lessons: []
  },
  {
    _id: "course-1-unit-2",
    id: "course-1-unit-2",
    unitNumber: 2,
    title: { en: "Unit 2: Font Group & File Options", mr: "फॉन्ट ग्रुप आणि फाईल पर्याय" },
    description: { en: "Master font formatting options and file management operations.", mr: "फॉन्ट स्वरूपण पर्याय आणि फाईल व्यवस्थापन क्रिया पूर्णपणे शिका." },
    lessons: []
  },
  {
    _id: "course-1-unit-3",
    id: "course-1-unit-3",
    unitNumber: 3,
    title: { en: "Unit 3: Paragraph formatting", mr: "परिच्छेद स्वरूपण" },
    description: { en: "Formatting paragraphs, alignments, and lists.", mr: "परिच्छेद स्वरूपण, अलाइनमेंट आणि याद्या." },
    lessons: []
  }
];

const lessons: Lesson[] = [
  {
    _id: "course-1-l-1-1",
    id: "course-1-l-1-1",
    unitId: "course-1-unit-1",
    unitNumber: 1,
    lessonNumber: 1,
    title: { en: "Introduction to Microsoft Word", mr: "मायक्रोसॉफ्ट वर्डची ओळख" },
    videoUrl: "https://youtu.be/H6JzgCLObm0?si=woRryjJ_gLGBMrWY",
    driveUrl: DRIVE_FOLDER_URL,
    duration: "10:00",
    durationSeconds: 600,
    order: 1
  },
  {
    _id: "course-1-l-2-1",
    id: "course-1-l-2-1",
    unitId: "course-1-unit-2",
    unitNumber: 2,
    lessonNumber: 1,
    title: { en: "Home Tab – Font Group (Part 1)", mr: "होम टॅब - फॉन्ट ग्रुप (भाग १)" },
    videoUrl: "https://youtu.be/NQU5qpx1_WM?si=g0Dqno11I7JtQzbZ",
    driveUrl: DRIVE_FOLDER_URL,
    duration: "12:00",
    durationSeconds: 720,
    order: 2
  },
  {
    _id: "course-1-l-2-2",
    id: "course-1-l-2-2",
    unitId: "course-1-unit-2",
    unitNumber: 2,
    lessonNumber: 2,
    title: { en: "Home Tab – Font Group (Part 2)", mr: "होम टॅब - फॉन्ट ग्रुप (भाग २)" },
    videoUrl: "https://youtu.be/7GE5RdasmvA?si=fHPlKQ60OUfFUzS_",
    driveUrl: DRIVE_FOLDER_URL,
    duration: "11:00",
    durationSeconds: 660,
    order: 3
  },
  {
    _id: "course-1-l-2-3",
    id: "course-1-l-2-3",
    unitId: "course-1-unit-2",
    unitNumber: 2,
    lessonNumber: 3,
    title: { en: "Home Tab – Font Group (Part 3)", mr: "होम टॅब - फॉन्ट ग्रुप (भाग ३)" },
    videoUrl: "https://youtu.be/Y4ZwvVPyU1w?si=kqlyKMdbqPOzDnw5",
    driveUrl: DRIVE_FOLDER_URL,
    duration: "09:00",
    durationSeconds: 540,
    order: 4
  },
  {
    _id: "course-1-l-2-4",
    id: "course-1-l-2-4",
    unitId: "course-1-unit-2",
    unitNumber: 2,
    lessonNumber: 4,
    title: { en: "File Tab Explanation", mr: "फाईल टॅबचे स्पष्टीकरण" },
    videoUrl: "https://youtu.be/aU1T_CKE6bM?si=XuyRVF2qdnNP0cgO",
    driveUrl: DRIVE_FOLDER_URL,
    duration: "08:00",
    durationSeconds: 480,
    order: 5
  },
  {
    _id: "course-1-l-3-1",
    id: "course-1-l-3-1",
    unitId: "course-1-unit-3",
    unitNumber: 3,
    lessonNumber: 1,
    title: { en: "Home Tab – Paragraph Group (Part 1)", mr: "होम टॅब - परिच्छेद ग्रुप (भाग १)" },
    videoUrl: "https://youtu.be/Q_4uEZ99xKA?si=hVkbFp4KBBZg5o5d",
    driveUrl: DRIVE_FOLDER_URL,
    duration: "14:00",
    durationSeconds: 840,
    order: 6
  },
  {
    _id: "course-1-l-3-2",
    id: "course-1-l-3-2",
    unitId: "course-1-unit-3",
    unitNumber: 3,
    lessonNumber: 2,
    title: { en: "Home Tab – Paragraph Group (Part 2)", mr: "होम टॅब - परिच्छेद ग्रुप (भाग २)" },
    videoUrl: "https://youtu.be/5hlvsoC4euY?si=ZkUiDcjDlwzZdqbJ",
    driveUrl: DRIVE_FOLDER_URL,
    duration: "13:00",
    durationSeconds: 780,
    order: 7
  }
];

units[0].lessons = lessons.filter(l => l.unitNumber === 1);
units[1].lessons = lessons.filter(l => l.unitNumber === 2);
units[2].lessons = lessons.filter(l => l.unitNumber === 3);

export const INITIAL_MOCK_COURSES = [
  {
    _id: "course-1",
    id: "course-1",
    title: { en: "Microsoft Word", mr: "मायक्रोसॉफ्ट वर्ड" },
    description: {
      en: "Learn word processing from basics to advanced document creation across 3 comprehensive units with streamable video lessons.",
      mr: "३ प्रगत युनिट्सद्वारे मूलभूत गोष्टींपासून प्रगत दस्तऐवज निर्मितीपर्यंत वर्ड प्रोसेसिंग शिका."
    },
    category: { en: "MS Office", mr: "MS ऑफिस" },
    hours: 5,
    level: { en: "Beginner", mr: "नवशिक्या" },
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    units: units,
    lessons: lessons,
    assignments: [
      {
        _id: "assign-1-1",
        question: { en: "Which shortcut is used to copy text in MS Word?", mr: "MS Word मध्ये मजकूर कॉपी करण्यासाठी कोणती शॉर्टकट की वापरली जाते?" },
        options: [
          { en: "Ctrl + V", mr: "Ctrl + V" },
          { en: "Ctrl + C", mr: "Ctrl + C" },
          { en: "Ctrl + X", mr: "Ctrl + X" },
          { en: "Ctrl + Z", mr: "Ctrl + Z" }
        ],
        correctAnswer: 1
      },
      {
        _id: "assign-1-2",
        question: { en: "What is the default file extension for MS Word 2019?", mr: "MS Word 2019 साठी डीफॉल्ट फाइल एक्सटेंशन काय आहे?" },
        options: [
          { en: ".txt", mr: ".txt" },
          { en: ".pdf", mr: ".pdf" },
          { en: ".docx", mr: ".docx" },
          { en: ".xlsx", mr: ".xlsx" }
        ],
        correctAnswer: 2
      }
    ]
  }
];

export const INITIAL_MOCK_USER = {
  _id: "user-123",
  name: "Demo Student",
  email: "demo@digimitra.org",
  role: "student",
  languagePreference: "en",
  token: "mock-jwt-token-123",
  enrolledCourses: ["course-1"]
};

export const INITIAL_MOCK_PROGRESS = [
  {
    _id: "prog-1",
    user: "user-123",
    courseId: INITIAL_MOCK_COURSES[0],
    completedLessons: ["course-1-l-1-1", "course-1-l-2-1"],
    watchPositions: {
      "course-1-l-1-1": 600,
      "course-1-l-2-1": 720,
      "course-1-l-2-2": 320
    },
    watchPercentages: {
      "course-1-l-1-1": 100,
      "course-1-l-2-1": 100,
      "course-1-l-2-2": 48
    },
    lastWatchedLessonId: "course-1-l-2-2",
    lastWatchedTime: 320,
    progressPercentage: 29
  }
];

export function updateMockProgress(courseId: string, lessonId: string) {
  let progressItem = INITIAL_MOCK_PROGRESS.find((p: any) =>
    p?.courseId?._id === courseId || p?.courseId?.id === courseId || p?.courseId === courseId
  );

  const targetCourse = INITIAL_MOCK_COURSES.find((c: any) => c._id === courseId || c.id === courseId) || INITIAL_MOCK_COURSES[0];
  const totalLessons = targetCourse?.lessons?.length || 7;

  if (!progressItem) {
    progressItem = {
      _id: `prog-${Date.now()}`,
      user: "user-123",
      courseId: targetCourse,
      completedLessons: [lessonId],
      watchPositions: { [lessonId]: 0 },
      watchPercentages: { [lessonId]: 100 },
      lastWatchedLessonId: lessonId,
      lastWatchedTime: 0,
      progressPercentage: Math.round((1 / totalLessons) * 100)
    };
    INITIAL_MOCK_PROGRESS.push(progressItem);
  } else {
    if (progressItem.completedLessons.includes(lessonId)) {
      progressItem.completedLessons = progressItem.completedLessons.filter((id: string) => id !== lessonId);
    } else {
      progressItem.completedLessons.push(lessonId);
      progressItem.watchPercentages[lessonId] = 100;
    }
    progressItem.progressPercentage = Math.round((progressItem.completedLessons.length / totalLessons) * 100);
  }

  (targetCourse as any).progress = progressItem.progressPercentage;
  return progressItem;
}

export function updateWatchProgress(courseId: string, lessonId: string, currentSeconds: number, totalSeconds: number) {
  let progressItem = INITIAL_MOCK_PROGRESS.find((p: any) =>
    p?.courseId?._id === courseId || p?.courseId?.id === courseId || p?.courseId === courseId
  );

  const targetCourse = INITIAL_MOCK_COURSES.find((c: any) => c._id === courseId || c.id === courseId) || INITIAL_MOCK_COURSES[0];
  const totalLessons = targetCourse?.lessons?.length || 7;
  const percentage = totalSeconds > 0 ? Math.min(100, Math.round((currentSeconds / totalSeconds) * 100)) : 0;

  if (!progressItem) {
    progressItem = {
      _id: `prog-${Date.now()}`,
      user: "user-123",
      courseId: targetCourse,
      completedLessons: percentage >= 90 ? [lessonId] : [],
      watchPositions: { [lessonId]: currentSeconds },
      watchPercentages: { [lessonId]: percentage },
      lastWatchedLessonId: lessonId,
      lastWatchedTime: currentSeconds,
      progressPercentage: percentage >= 90 ? Math.round((1 / totalLessons) * 100) : 0
    };
    INITIAL_MOCK_PROGRESS.push(progressItem);
  } else {
    progressItem.watchPositions = progressItem.watchPositions || {};
    progressItem.watchPercentages = progressItem.watchPercentages || {};
    
    progressItem.watchPositions[lessonId] = Math.max(progressItem.watchPositions[lessonId] || 0, currentSeconds);
    progressItem.watchPercentages[lessonId] = Math.max(progressItem.watchPercentages[lessonId] || 0, percentage);
    progressItem.lastWatchedLessonId = lessonId;
    progressItem.lastWatchedTime = currentSeconds;

    if (percentage >= 90 && !progressItem.completedLessons.includes(lessonId)) {
      progressItem.completedLessons.push(lessonId);
    }
    progressItem.progressPercentage = Math.round((progressItem.completedLessons.length / totalLessons) * 100);
  }

  (targetCourse as any).progress = progressItem.progressPercentage;
  return progressItem;
}
