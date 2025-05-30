import Link from "next/link";
import TeamMember from "./component/TeamMember";
import { getLocale } from "next-intl/server";

const teamMembers = [
  {
    name: "John Doe",
    image: "/placeholder.svg?height=200&width=200",
    expertise: "Frontend Development",
    yearsOfExperience: 5,
  },
  {
    name: "Jane Smith",
    image: "/placeholder.svg?height=200&width=200",
    expertise: "Mobile Development",
    yearsOfExperience: 7,
  },
  {
    name: "Mike Johnson",
    image: "/placeholder.svg?height=200&width=200",
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
