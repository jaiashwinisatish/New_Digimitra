import { motion } from "framer-motion";
import { Download, Share2, Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

const Certificate = () => {
  const { t, language } = useLanguage();

  const handleDownload = () => {
    toast.success(language === "en" ? "Download starting..." : "डाउनलोड सुरू होत आहे...");
  };

  return (
    <div className="container py-10 md:py-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className={`text-3xl md:text-5xl font-bold tracking-tight ${language === "mr" ? "font-marathi" : ""}`}>
          {t("nav_certificate")}
        </h1>
        <p className="text-muted-foreground mt-3">
          {language === "en" ? "Celebrate your achievement and share it with the world." : "तुमचे यश साजरे करा आणि जगाशी शेअर करा."}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto"
      >
        <div className="absolute -inset-4 gradient-hero rounded-3xl blur-2xl opacity-30" />
        <div className="relative rounded-3xl bg-card border-4 border-double border-primary/30 shadow-elegant overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 gradient-hero" />
          <div className="absolute bottom-0 left-0 right-0 h-2 gradient-hero" />

          <div className="p-8 md:p-14 text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-elegant">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>

            <div className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Digimitra</div>

            <h2 className={`text-3xl md:text-5xl font-extrabold gradient-text tracking-tight ${language === "mr" ? "font-marathi" : ""}`}>
              {t("cert_title")}
            </h2>

            <p className={`text-muted-foreground ${language === "mr" ? "font-marathi" : ""}`}>{t("cert_presented")}</p>

            <div className="py-2">
              <div className="text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                Priya Patil
              </div>
              <div className="h-px bg-border max-w-xs mx-auto mt-3" />
            </div>

            <p className={`text-muted-foreground ${language === "mr" ? "font-marathi" : ""}`}>{t("cert_for")}</p>

            <div className={`text-xl md:text-2xl font-semibold ${language === "mr" ? "font-marathi" : ""}`}>
              {language === "en" ? "Social Studies – Class 9" : "सामाजिक शास्त्र – इयत्ता ९"}
            </div>

            <div className="flex justify-around pt-8 mt-4 border-t border-border text-sm">
              <div>
                <div className="font-semibold">May 1, 2026</div>
                <div className="text-xs text-muted-foreground mt-1">Date</div>
              </div>
              <div className="flex flex-col items-center">
                <Award className="h-10 w-10 text-primary" />
                <div className="text-xs text-muted-foreground mt-1">Verified</div>
              </div>
              <div>
                <div className="font-semibold italic">Digimitra</div>
                <div className="text-xs text-muted-foreground mt-1">Director</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-center gap-3 mt-10">
        <Button variant="hero" size="lg" onClick={handleDownload}>
          <Download className="h-4 w-4" /> {t("download_pdf")}
        </Button>
        <Button variant="outline" size="lg" onClick={() => toast.success(language === "en" ? "Link copied!" : "लिंक कॉपी केली!")}>
          <Share2 className="h-4 w-4" /> {t("share")}
        </Button>
      </div>
    </div>
  );
};

export default Certificate;
