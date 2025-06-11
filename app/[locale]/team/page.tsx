import { getLocale } from 'next-intl/server';

import Link from '@/components/link';

import TeamMember from './component/TeamMember';

const teamMembers = [
 
  {
    name: "Eng. Murad - Chairman",
    image: "/assets/dta.svg",
    expertise: "Mangement",
    yearsOfExperience: 17,
  },
  {
    name: "Eng. Khalid Ali -- CEO",
    image: "/assets/team/kh4.png",
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
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <TeamMember key={member.name} {...member} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href={`/${locale}/team/apply`}>Join Our Team</Link>
      </div>
    </div>
  );
}
