import { getTranslations, getLocale } from 'next-intl/server';
import Link from '@/components/link';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, ArrowRight } from 'lucide-react';

export default async function TeamPage() {
  const t = await getTranslations("team");
  const locale = await getLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-2xl mb-8 shadow-2xl">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight">
              فريقنا
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              انضم إلى فريقنا الديناميكي وساعدنا في بناء تجارب رقمية مذهلة
            </p>
          </div>

          {/* Team Info */}
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">عن فريقنا</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              نحن فريق من المحترفين الشغوفين الذين يعملون معاً لتحويل الأفكار إلى واقع رقمي.
              نؤمن بقوة التعاون والإبداع في تحقيق النجاح.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">مشاريع متنوعة</h3>
                <p className="text-muted-foreground">نعمل على مجموعة واسعة من المشاريع التقنية</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">فريق متعاون</h3>
                <p className="text-muted-foreground">بيئة عمل إبداعية وداعمة للنمو المهني</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">تطوير مستمر</h3>
                <p className="text-muted-foreground">فرص تعلم ونمو مهني مستمر</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="px-8 py-4 font-bold text-lg bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link href={`/${locale}/team/apply`}>
                انضم إلى فريقنا
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-4 font-bold text-lg border-2 border-slate-300 hover:border-primary transition-all duration-300"
            >
              <Link href={`/${locale}/team/job-roles`}>
                الوظائف المتاحة
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
