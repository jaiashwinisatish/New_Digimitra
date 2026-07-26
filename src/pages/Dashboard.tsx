import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, BookOpen, Clock, TrendingUp, ArrowRight, Loader2, PlayCircle, CheckCircle2, Sparkles, Layers } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CourseCard } from "@/components/CourseCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import API from "@/services/api";
import { INITIAL_MOCK_PROGRESS, INITIAL_MOCK_COURSES } from "@/data/mockCourses";

const Dashboard = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const { data: rawProgress, isLoading } = useQuery({
    queryKey: ["progress", user?._id],
    queryFn: async () => {
      if (!user?._id) return INITIAL_MOCK_PROGRESS;
      const { data } = await API.get(`/progress/${user?._id}`);
      return data;
    },
    enabled: true,
  });

  const progress = Array.isArray(rawProgress) && rawProgress.length > 0 ? rawProgress : INITIAL_MOCK_PROGRESS;

  if (isLoading && (!rawProgress || rawProgress.length === 0)) {
    return (
      <div className="container py-20 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">{language === "en" ? "Loading dashboard..." : "डॅशबोर्ड लोड होत आहे..."}</p>
      </div>
    );
  }

  const inProgress = progress.filter((p: any) => p.courseId && p.progressPercentage > 0 && p.progressPercentage < 100);
  const completed = progress.filter((p: any) => p.courseId && p.progressPercentage === 100);
  const overall = progress.length > 0 ? Math.round(progress.reduce((a: number, p: any) => a + (p.progressPercentage || 0), 0) / progress.length) : 0;

  const totalCompletedLessons = progress.reduce((a: number, p: any) => a + (p.completedLessons?.length || 0), 0);
  const totalLessonsInApp = INITIAL_MOCK_COURSES.reduce((a: number, c: any) => a + (c.lessons?.length || 0), 0);
  const totalRemainingLessons = Math.max(0, totalLessonsInApp - totalCompletedLessons);
  const estimatedHoursLeft = Math.round((totalRemainingLessons * 11) / 60);

  const activeProgress = inProgress[0] || progress[0] || INITIAL_MOCK_PROGRESS[0];
  const activeCourse = activeProgress?.courseId || INITIAL_MOCK_COURSES[0];
  const lastLessonId = activeProgress?.lastWatchedLessonId || activeCourse?.lessons?.[0]?._id || "course-1-l-1-1";
  const lastLesson = (activeCourse?.lessons || []).find((l: any) => (l._id || l.id) === lastLessonId) || activeCourse?.lessons?.[0];
  const lastTime = activeProgress?.lastWatchedTime || 0;

  const formatMin = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const stats = [
    { icon: TrendingUp, label: t("overall_progress"), value: `${overall}%` },
    { icon: BookOpen, label: "Completed Lessons", value: `${totalCompletedLessons} / ${totalLessonsInApp}` },
    { icon: Clock, label: "Est. Time Left", value: `${estimatedHoursLeft} hrs` },
    { icon: Award, label: t("certificates_earned"), value: completed.length },
  ];

  const handleCertificateDownload = async (courseId: string, courseTitle: string) => {
    try {
      toast.info(language === "en" ? "Generating certificate..." : "प्रमाणपत्र तयार होत आहे...");
      const response = await API.get(`/certificate/${courseId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${courseTitle || 'course'}.pdf`);
      document.body.appendChild(link);
      link.click();
      toast.success(language === "en" ? "Certificate downloaded!" : "प्रमाणपत्र डाउनलोड झाले!");
    } catch (error) {
      toast.error("Error downloading certificate");
    }
  };

  const userName = (user?.name || "Student").split(' ')[0];

  return (
    <div className="container py-10 md:py-14 space-y-12">
      {/* Hero Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-12 text-primary-foreground shadow-elegant">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_70%_30%,white,transparent_60%)]" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-primary-foreground/80">{t("welcome_back")},</p>
            <h1 className="text-3xl md:text-5xl font-bold mt-1">{userName} 👋</h1>
            <p className="mt-3 text-primary-foreground/85 max-w-md">{t("welcome_sub")}</p>
          </div>
          {lastLesson && (
            <div className="bg-background/15 backdrop-blur-md p-5 rounded-2xl border border-white/20 max-w-sm w-full space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-primary-foreground/90">
                <Sparkles className="h-4 w-4" /> Last Watched Lesson
              </div>
              <div>
                <div className="font-bold text-sm line-clamp-1">{lastLesson.title?.[language] || lastLesson.title?.en}</div>
                <div className="text-xs text-primary-foreground/80 mt-1">Paused at {formatMin(lastTime)}</div>
              </div>
              <Button size="sm" variant="secondary" className="w-full bg-background text-primary font-semibold hover:bg-background/90" asChild>
                <Link to={`/courses/${activeCourse._id || activeCourse.id}/lesson/${lastLesson._id || lastLesson.id}`}>
                  <PlayCircle className="h-4 w-4 mr-2" /> Resume Learning
                </Link>
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="p-5 rounded-2xl bg-card border border-border shadow-card"
          >
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Unit-Wise Progress Breakdown Section */}
      <section className="p-8 rounded-3xl bg-card border border-border shadow-elegant space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Layers className="h-6 w-6 text-primary" /> Unit-Wise Learning Breakdown
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Track your progress across Unit 1, Unit 2, and Unit 3.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
            {activeCourse.title?.[language] || activeCourse.title?.en}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((uNum) => {
            const unitLessons = (activeCourse.lessons || []).filter((l: any) => l.unitNumber === uNum);
            const completedLessonsInUnit = unitLessons.filter((l: any) => (activeProgress.completedLessons || []).includes(l._id || l.id)).length;
            const pct = unitLessons.length > 0 ? Math.round((completedLessonsInUnit / unitLessons.length) * 100) : 0;

            return (
              <div key={uNum} className="p-6 rounded-2xl bg-muted/20 border border-border space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs uppercase font-bold text-primary tracking-wider">Unit {uNum}</div>
                    <div className="font-semibold text-base mt-1">
                      {uNum === 1 ? "Fundamentals & Getting Started" : uNum === 2 ? "Core Tools & Formatting" : "Advanced Features & Capstone"}
                    </div>
                  </div>
                  {pct === 100 && <CheckCircle2 className="h-5 w-5 text-success shrink-0" />}
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5 font-medium">
                    <span>{completedLessonsInUnit} of {unitLessons.length} lessons</span>
                    <span className="font-bold text-foreground">{pct}%</span>
                  </div>
                  <Progress value={pct} className="h-2 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Continue Learning */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{t("continue_learning")}</h2>
        </div>
        {inProgress.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgress.map((p: any, i: number) => {
              const c = p.courseId || {};
              const cId = c._id || c.id || `c-${i}`;
              return (
                <CourseCard key={cId} course={{ ...c, progress: p.progressPercentage }} index={i} />
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">{language === "en" ? "No courses in progress." : "प्रगतीपथावर कोणतेही अभ्यासक्रम नाहीत."}</p>
        )}
      </section>

      {/* Completed Courses */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{t("completed_courses")}</h2>
        </div>
        {completed.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {completed.map((p: any, idx: number) => {
              const c = p.courseId || {};
              const cId = c._id || c.id || `completed-${idx}`;
              const title = typeof c.title === "object" ? c.title?.[language] || c.title?.en : c.title || "Course";
              const titleEn = typeof c.title === "object" ? c.title?.en : c.title || "course";
              return (
                <div key={cId} className="p-5 rounded-2xl bg-card border border-border shadow-card flex items-center gap-4">
                  <img src={c.thumbnail} alt="" className="h-20 w-20 rounded-xl object-cover" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold truncate ${language === "mr" ? "font-marathi" : ""}`}>{title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={100} className="h-1.5 flex-1" />
                      <span className="text-xs font-semibold text-success">100%</span>
                    </div>
                  </div>
                  <Button variant="soft" size="sm" onClick={() => handleCertificateDownload(cId, titleEn)}>
                    {t("view_certificate")} <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">{language === "en" ? "No completed courses yet." : "अद्याप कोणतेही अभ्यासक्रम पूर्ण झालेले नाहीत."}</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
