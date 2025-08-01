"use server";

import { z } from "zod";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendWhatsAppMessage } from "@/lib/actions/sendWhatsapp";

// Service mapping for validation
const validServices = [
  "website-development",
  "mobile-app-development",
  "ecommerce-development",
  "crm-development",
  "ui-ux-design",
  "digital-marketing",
  "visual-identity"
] as const;

// Validation schema using zod
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[0-9]{10,15}$/, "Invalid mobile number"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Please select at least one service")
    .refine((val) => {
      const services = val.split(',').map(s => s.trim());
      return services.length > 0 && services.every(service => validServices.includes(service as any));
    }, "Please select valid services"),
  projectDetails: z.string().min(10, "Project details must be at least 10 characters"),
  budget: z.string().min(1, "Budget is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Service name mapping for display
const serviceNameMap: Record<string, string> = {
  "website-development": "Website Development",
  "mobile-app-development": "Mobile App Development",
  "ecommerce-development": "E-commerce Development",
  "crm-development": "CRM Development",
  "ui-ux-design": "UI/UX Design",
  "digital-marketing": "Digital Marketing",
  "visual-identity": "Visual Identity"
};

// Arabic service name mapping
const arabicServiceNameMap: Record<string, string> = {
  "website-development": "تطوير المواقع الإلكترونية",
  "mobile-app-development": "تطبيقات الجوال",
  "ecommerce-development": "متاجر إلكترونية",
  "crm-development": "أنظمة CRM",
  "ui-ux-design": "تصاميم واجهات المستخدم",
  "digital-marketing": "التسويق الرقمي",
  "visual-identity": "الهوية البصرية"
};

// Submit Contact Function
export async function submitContact(
  prev: any,
  formData: FormData
): Promise<{
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}> {
  try {
    // Extract and sanitize form data
    const rawData = {
      name: formData.get("name")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      mobile: formData.get("mobile")?.toString().trim() || "",
      projectType: formData.get("projectType")?.toString() || "",
      projectDetails: formData.get("projectDetails")?.toString().trim() || "",
      budget: formData.get("budget")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
    };

    // Validate form data
    const validation = contactFormSchema.safeParse(rawData);
    if (!validation.success) {
      return { success: false, errors: validation.error.flatten().fieldErrors };
    }

    // Process selected services
    const selectedServices = rawData.projectType.split(',').map(s => s.trim());
    const serviceNames = selectedServices.map(service => serviceNameMap[service] || service);
    const arabicServiceNames = selectedServices.map(service => arabicServiceNameMap[service] || service);

    // Create enhanced project type string
    const enhancedProjectType = selectedServices.length > 1
      ? `${selectedServices.join(', ')} (${selectedServices.length} services)`
      : selectedServices[0];

    // Save to database with enhanced data
    const contactData = {
      ...rawData,
      projectType: enhancedProjectType,
      // Store additional service information if needed
      projectDetails: `${rawData.projectDetails}\n\nSelected Services:\n${serviceNames.join('\n')}\n\nالخدمات المختارة:\n${arabicServiceNames.join('\n')}`
    };

    await db.projectRequest.create({ data: contactData });

    // Create WhatsApp message with enhanced service information
    const servicesList = selectedServices.map(service => `• ${serviceNameMap[service] || service}`).join('\n');
    const arabicServicesList = selectedServices.map(service => `• ${arabicServiceNameMap[service] || service}`).join('\n');

    const messageContent = `🆕 New Contact Submission:

👤 Name: ${rawData.name}
📧 Email: ${rawData.email}
📱 Mobile: ${rawData.mobile}

🛠️ Selected Services (${selectedServices.length}):
${servicesList}

الخدمات المختارة (${selectedServices.length}):
${arabicServicesList}

💰 Budget: ${rawData.budget}
📋 Project Details: ${rawData.projectDetails}
💬 Message: ${rawData.message}

📊 Total Services: ${selectedServices.length}
🕒 Submitted: ${new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Riyadh',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`;

    // Send WhatsApp Notification
    await sendWhatsAppMessage(messageContent);

    // Revalidate page cache
    revalidatePath("/contact");

    return {
      success: true,
      message: "Your message has been sent successfully! We'll get back to you within 24 hours.",
    };
  } catch (error) {
    console.error("Error processing contact form:", error);
    return {
      success: false,
      message: "An error occurred while processing your request. Please try again.",
    };
  }
}
