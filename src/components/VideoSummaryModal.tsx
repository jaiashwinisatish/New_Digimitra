import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sparkles, Loader2, Copy, Check, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { summarizeVideo } from "@summarizer/api";
import { useLanguage } from "@/context/LanguageContext";
import API from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface VideoSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  lesson: {
    _id?: string;
    id?: string;
    title: { en: string; mr: string };
    videoUrl: string;
    summary?: string;
  } | null;
}

export const VideoSummaryModal: React.FC<VideoSummaryModalProps> = ({
  isOpen,
  onClose,
  courseId,
  lesson,
}) => {
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const getYoutubeWatchUrl = (url: string) => {
    if (!url) return "";
    const match = url.match(/(?:v=|\/|embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = match ? match[1] : null;
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
  };

  const fetchSummary = async () => {
    if (!lesson) return;
    
    // If summary already exists in the lesson object, use it directly
    if (lesson.summary) {
      setSummary(lesson.summary);
      setError("");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const watchUrl = getYoutubeWatchUrl(lesson.videoUrl);
      if (!watchUrl) {
        throw new Error("Invalid YouTube video URL");
      }

      const rawResult = await summarizeVideo(watchUrl);
      let extractedSummary = rawResult;
      
      try {
        const parsed = JSON.parse(rawResult);
        extractedSummary = parsed.translation || parsed.summary || rawResult;
      } catch (e) {
        // Not a JSON response, keep raw text
      }

      if (!extractedSummary || typeof extractedSummary !== "string" || !extractedSummary.trim()) {
        throw new Error("Empty summary returned from summarizer");
      }

      setSummary(extractedSummary);

      // Save summary back to the server
      const lessonId = lesson._id || lesson.id;
      await API.put(`/courses/${courseId}/lessons/${lessonId}/summary`, {
        summary: extractedSummary,
      });

      // Invalidate the course query cache so that the parent UI updates and caches the summary
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      toast.success(language === "en" ? "Summary generated and saved!" : "सारांश यशस्वीरित्या तयार आणि जतन केला!");
    } catch (err: any) {
      console.error("Summarization error:", err);
      setError(language === "en" ? "Failed to generate video summary. Please try again." : "व्हिडिओ सारांश तयार करण्यात अपयश आले. कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && lesson) {
      fetchSummary();
    } else {
      // Clear state when modal is closed
      setSummary("");
      setError("");
      setLoading(false);
      setCopied(false);
    }
  }, [isOpen, lesson]);

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success(language === "en" ? "Summary copied to clipboard!" : "सारांश क्लिपबोर्डवर कॉपी केला!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!lesson) return null;

  const lessonTitleText = lesson.title?.[language] || lesson.title?.en;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-card border border-border shadow-elegant rounded-3xl overflow-hidden p-0 gap-0">
        
        {/* Modal Header with beautiful gradient */}
        <div className="relative p-6 pb-8 gradient-soft border-b border-border/60">
          <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20">
            <Sparkles className="h-16 w-16 text-primary animate-pulse" />
          </div>
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-primary animate-spin" style={{ animationDuration: '4s' }} />
              <span>AI Study Helper</span>
            </div>
            <DialogTitle className={`text-2xl font-bold tracking-tight text-foreground pr-6 mt-1.5 ${language === "mr" ? "font-marathi" : ""}`}>
              {lessonTitleText}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm font-medium">
              {language === "en" ? "Interactive Video Summarization" : "परस्परसंवादी व्हिडिओ सारांश"}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-thin">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-14 w-14 rounded-full border-4 border-primary/20 animate-ping" />
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground text-base">
                  {language === "en" ? "Summarizing Video..." : "व्हिडिओचा सारांश तयार होत आहे..."}
                </p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  {language === "en" 
                    ? "Our AI is processing the video content to extract key highlights. Please wait." 
                    : "महत्त्वाचे मुद्दे काढण्यासाठी आमचे AI व्हिडिओवर प्रक्रिया करत आहे. कृपया प्रतीक्षा करा."}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
              <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{error}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={fetchSummary} 
                className="rounded-xl border-primary/30 text-primary hover:bg-primary/5 hover:border-primary gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                {language === "en" ? "Retry Generation" : "पुन्हा प्रयत्न करा"}
              </Button>
            </div>
          )}

          {!loading && !error && summary && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                  {language === "en" ? "Key Summary" : "महत्त्वाचा सारांश"}
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  className="rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 gap-1.5 h-8 px-2.5"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-success" />
                      <span className="text-success font-semibold">{language === "en" ? "Copied" : "कॉपी केले"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{language === "en" ? "Copy Summary" : "सारांश कॉपी करा"}</span>
                    </>
                  )}
                </Button>
              </div>
              
              <div className={`text-foreground/90 leading-relaxed whitespace-pre-wrap rounded-2xl bg-muted/30 border border-border/40 p-5 md:p-6 text-sm md:text-base font-medium shadow-inner ${language === "mr" ? "font-marathi leading-8" : ""}`}>
                {summary}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-muted/30 border-t border-border/60 flex justify-end">
          <Button 
            onClick={onClose} 
            className="rounded-xl px-6 font-semibold"
            variant="default"
          >
            {language === "en" ? "Close" : "बंद करा"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
