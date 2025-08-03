import { getLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from '@/components/link';
import TeamMember from './component/TeamMember';
import { User2Icon } from 'lucide-react';

const teamMembers = [
  {
    name: "Eng. Murad - Chairman",
    image: "/assets/dta.svg",
    expertise: "Mangement",
    yearsOfExperience: 17,
  },
  {
    name: "Eng. Khalid Ali -- CEO",
    image: "/assets/dta.svg",
    expertise: "Full Stack Developer",
    yearsOfExperience: 15,
  },
  {
    name: "Mike Johnson",
    image: "/assets/dta.svg",
    expertise: "Backend Development",
    yearsOfExperience: 6,
  },
];

export default async function TeamPage() {
  const locale = await getLocale();
  // Use translations for the team page
  // This must be used in a client component, so pass locale as prop to a client wrapper
  return <TeamPageClient locale={locale} />;
}

import React from 'react';
function TeamPageClient({ locale }: { locale: string }) {
  const t = useTranslations('team');
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-blue-900/80 via-blue-700/70 to-blue-400/40 dark:from-neutral-900/90 dark:via-neutral-800/80 dark:to-blue-900/30 rounded-3xl p-10 mb-12 shadow-xl border border-blue-100 dark:border-neutral-800 overflow-hidden backdrop-blur-md">
        {/* Glassy effect overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl bg-white/10 dark:bg-black/20 backdrop-blur-md" />
        <div className="relative z-10 flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-black text-foreground drop-shadow-lg mb-4 tracking-tight">{t('ourTeam')}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4 font-medium "
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.12)' }}>{t('meetProfessionals')}</p>
        </div>
        <div className="relative z-10 flex-shrink-0 mt-8 md:mt-0 flex justify-center md:justify-end w-full md:w-auto">
          <Link href={`/${locale}/apply-job`}>
            <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-extrabold text-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30">
              <User2Icon className="w-6 h-6 mr-1" />
              {t('joinOurTeam')}
            </span>
          </Link>
        </div>
      </section>
      <div className="border-t border-border mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <TeamMember key={member.name} {...member} />
        ))}
      </div>
    </div>
  );
}
