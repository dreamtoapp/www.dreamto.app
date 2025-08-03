"use client";

import { useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import Link from '@/components/link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AttachmentInput from './AttachmentInput';

const expertiseAreas = [
  "web-development",
  "mobile-development",
  "ui-ux-design",
  "marketing",
  "project-management",
  "quality-assurance",
  "devops",
  "data-science",
];

export default function ApplyPage() {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("teamApply");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agreeToTerms) {
      alert(t("termsAlert"));
      return;
    }
    // Handle form submission here
    // Redirect to a thank you page or back to the team page
    router.push(`/${locale}/thank-you`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-background rounded-2xl shadow-xl border border-border p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-foreground tracking-tight">{t("title")}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">{t("name")}</Label>
              <Input id="name" required autoComplete="name" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" required autoComplete="email" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input id="phone" type="tel" required autoComplete="tel" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="expertise">{t("areaOfExpertise")}</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectExpertise")} />
                </SelectTrigger>
                <SelectContent>
                  {expertiseAreas.map((area) => (
                    <SelectItem
                      key={area}
                      value={area}
                    >
                      {t(`expertise.${area}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experience">{t("yearsOfExperience")}</Label>
              <Input id="experience" type="number" min="0" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="age">{t("age")}</Label>
              <Input id="age" type="number" min="18" required className="mt-1" />
            </div>
            <div className="md:col-span-2">
              <Label>{t("gender")}</Label>
              <RadioGroup defaultValue="prefer-not-to-say" className="flex flex-row gap-6 mt-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">{t("male")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">{t("female")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                  <Label htmlFor="prefer-not-to-say">{t("preferNotToSay")}</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="about">{t("aboutYou")}</Label>
              <Textarea id="about" required className="mt-1 min-h-[80px]" />
            </div>
            <div className="md:col-span-2">
              <Label>{t("attachment")}</Label>
              <AttachmentInput onFileChange={setAttachment} />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            />
            <Label htmlFor="terms">
              {t("agreeToTerms")}{' '}
              <Link
                href={`/${locale}/team/job-roles`}
                className="text-primary hover:underline"
              >
                {t("jobRolesAndTerms")}
              </Link>
            </Label>
          </div>
          <div className="flex justify-between items-center gap-4 mt-6">
            <Link href={`/${locale}/team`} className="text-primary hover:underline font-medium">{t("backToTeamPage")}</Link>
            <Button type="submit" disabled={!agreeToTerms} size="lg" className="px-8 py-3 font-bold text-lg shadow-md">
              {t("submitApplication")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
