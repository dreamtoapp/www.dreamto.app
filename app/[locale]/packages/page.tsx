"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Import Shadcn Dialog
import { saveFormData } from "./action"; // Import the server action
import { useTranslations } from "next-intl";

// Main Page Component
export default function Page() {
  const t = useTranslations("page");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Welcome Message Section */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        {t("welcomeTitle")}
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        {t("welcomeMessage")}
      </p>

      {/* Main Container */}
      <Form t={t} />
    </div>
  );
}

// Form Component
function Form({ t }: { t: (key: string) => string }) {
  const [state, formAction] = React.useActionState(saveFormData, {
    success: false,
    message: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    brief: "",
    lastPrice: 0,
    discount: 20,
    selectedOption: "", // Single state for agreement options
  });

  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataInstance = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataInstance.append(key, value.toString());
    });
    startTransition(() => {
      formAction(formDataInstance);
      if (state.success) {
        setShowModal(true); // Show modal only if submission is successful
      }
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        {/* User Information */}
        <h2 className="text-xl font-semibold text-gray-800">
          {t("contactInfoTitle")}
        </h2>
        <InputField
          name="name"
          placeholder={t("namePlaceholder")}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <InputField
          name="email"
          placeholder={t("emailPlaceholder")}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <InputField
          name="phone"
          placeholder={t("phonePlaceholder")}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        {/* Select Service */}
        <SelectService
          value={formData.serviceType}
          onChange={(value) => setFormData({ ...formData, serviceType: value })}
          t={t}
        />

        {/* Project Details */}
        <ProjectDetails
          value={formData.brief}
          onChange={(value) => setFormData({ ...formData, brief: value })}
          t={t}
        />

        {/* Price Calculation */}
        <ProjectPricing
          lastPrice={formData.lastPrice}
          onChange={(value) => setFormData({ ...formData, lastPrice: value })}
          t={t}
        />

        {/* Agreement Options */}
        <AcceptButton
          selectedOption={formData.selectedOption}
          onChange={(value) =>
            setFormData({ ...formData, selectedOption: value })
          }
          t={t}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending} // Disable button while submitting
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300"
        >
          {isPending ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t("submittingButton")}
            </span>
          ) : (
            t("submitButton")
          )}
        </Button>
      </form>

      {/* Modal for Success/Error Messages */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("thankYouTitle")}</DialogTitle>
            <DialogDescription>{t("thankYouMessage")}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

// InputField Component for DRY Principle
const InputField = ({
  name,
  placeholder,
  value,
  onChange,
}: {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Input
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
};

// SelectService Component
function SelectService({
  value,
  onChange,
  t,
}: {
  value: string;
  onChange: (value: string) => void;
  t: any;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-800">
        {t("selectServiceTitle")}
      </h3>
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={t("servicesLabel")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t("servicesLabel")}</SelectLabel>
            <SelectItem value="webDesign">{t("webDesign")}</SelectItem>
            <SelectItem value="seo">{t("seo")}</SelectItem>
            <SelectItem value="graphicDesign">{t("graphicDesign")}</SelectItem>
            <SelectItem value="contentWriting">
              {t("contentWriting")}
            </SelectItem>
            <SelectItem value="digitalMarketing">
              {t("digitalMarketing")}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

// ProjectDetails Component
function ProjectDetails({
  value,
  onChange,
  t,
}: {
  value: string;
  onChange: (value: string) => void;
  t: any;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-800">
        {t("projectDetailsTitle")}
      </h3>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("projectDetailsPlaceholder")}
        className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
      />
    </div>
  );
}

// ProjectPricing Component
function ProjectPricing({
  lastPrice,
  onChange,
  t,
}: {
  lastPrice: number;
  onChange: (value: number) => void;
  t: any;
}) {
  const DISCOUNT_PERCENTAGE = 20;

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-800">
        {t("projectPricingTitle")}
      </h3>
      <div className="space-y-4">
        <Input
          type="number"
          value={lastPrice || 0} // Fallback to 0 if NaN or undefined
          onChange={(e) => {
            const newValue = parseFloat(e.target.value); // Parse the input value
            onChange(isNaN(newValue) ? 0 : newValue); // Fallback to 0 if NaN
          }}
          placeholder={t("lastPriceLabel")}
          className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {lastPrice ? (
          <p className="text-base font-bold text-green-600">
            {t("newPriceLabel")}: $
            {(lastPrice * (1 - DISCOUNT_PERCENTAGE / 100)).toFixed(2)}
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            {t("discountedPricePlaceholder")}
          </p>
        )}
      </div>
    </div>
  );
}

// AcceptButton Component with Radio Buttons
function AcceptButton({
  selectedOption,
  onChange,
  t,
}: {
  selectedOption: string;
  onChange: (value: string) => void;
  t: any;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-800">
        {t("agreementOptionsTitle")}
      </h3>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            name="agreementOption"
            value="agreed"
            checked={selectedOption === "agreed"}
            onChange={() => onChange("agreed")}
            className="mr-2"
          />
          {t("agreedOption")}
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="agreementOption"
            value="negotiation"
            checked={selectedOption === "negotiation"}
            onChange={() => onChange("negotiation")}
            className="mr-2"
          />
          {t("negotiationOption")}
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="agreementOption"
            value="noPrice"
            checked={selectedOption === "noPrice"}
            onChange={() => onChange("noPrice")}
            className="mr-2"
          />
          {t("noPriceOption")}
        </label>
      </div>
    </div>
  );
}
