"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const expertiseAreas = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Marketing",
  "Project Management",
  "Quality Assurance",
  "DevOps",
  "Data Science",
];

export default function ApplyPage() {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions before submitting.");
      return;
    }
    // Handle form submission here
    console.log("Form submitted");
    // Redirect to a thank you page or back to the team page
    router.push("/thank-you");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Apply to Join Our Team</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" required />
        </div>
        <div>
          <Label htmlFor="expertise">Area of Expertise</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select your expertise" />
            </SelectTrigger>
            <SelectContent>
              {expertiseAreas.map((area) => (
                <SelectItem
                  key={area}
                  value={area.toLowerCase().replace(/\s+/g, "-")}
                >
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="experience">Years of Experience</Label>
          <Input id="experience" type="number" min="0" required />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" min="18" required />
        </div>
        <div>
          <Label>Gender</Label>
          <RadioGroup defaultValue="prefer-not-to-say">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="prefer-not-to-say"
                id="prefer-not-to-say"
              />
              <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="about">About You</Label>
          <Textarea id="about" required />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
          />
          <Label htmlFor="terms">
            I agree to the{" "}
            <Link
              href={`/${locale}/team/job-roles`}
              className="text-primary hover:underline"
            >
              job roles and terms
            </Link>
          </Label>
        </div>
        <div className="flex justify-between">
          <Link href={`/${locale}/team`}>Back to Team Page</Link>
          <Button type="submit" disabled={!agreeToTerms}>
            Submit Application
          </Button>
        </div>
      </form>
    </div>
  );
}
