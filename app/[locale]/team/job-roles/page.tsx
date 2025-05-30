import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getLocale } from "next-intl/server";

export default async function JobRolesPage() {
  const locale = await getLocale();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">General Job Roles and Terms</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Expectations</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Collaborate effectively with cross-functional teams</li>
            <li>
              Stay updated with the latest industry trends and technologies
            </li>
            <li>Contribute to a positive and inclusive work environment</li>
            <li>Deliver high-quality work within agreed timelines</li>
            <li>Participate in code reviews and knowledge sharing sessions</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Competitive salary and benefits package</li>
            <li>Opportunities for professional growth and skill development</li>
            <li>Flexible work arrangements</li>
            <li>Collaborative and innovative work culture</li>
            <li>Exciting projects with cutting-edge technologies</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Application Terms</h2>
          <p>By submitting an application, you agree to the following:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All information provided is accurate and complete</li>
            <li>We may contact your references and previous employers</li>
            <li>
              Your application will be kept on file for future opportunities
            </li>
            <li>
              We will handle your personal information in accordance with our
              privacy policy
            </li>
          </ul>
        </section>
      </div>
      <div className="mt-8">
        <Link href={`/${locale}/team/apply`}>Back to Team Page</Link>
      </div>
    </div>
  );
}
