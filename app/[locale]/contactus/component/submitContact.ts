"use server";

import { z } from "zod";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendWhatsAppMessage } from "@/lib/actions/sendWhatsapp";

// Validation schema using zod
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[0-9]{10,15}$/, "Invalid mobile number"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// WhatsApp Notification Function
// async function sendWhatsAppMessage(message: string): Promise<void> {
//   const apiKey = process.env.CALLMEBOT_API_KEY;
//   const phone = process.env.CALLMEBOT_PHONE;

//   if (!apiKey || !phone) {
//     console.error("Missing WhatsApp API credentials.");
//     return;
//   }

//   const encodedMessage = encodeURIComponent(message);
//   const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodedMessage}&apikey=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) console.error("Failed to send WhatsApp message.");
//   } catch (error) {
//     console.error("Error sending WhatsApp message:", error);
//   }
// }

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
      message: formData.get("message")?.toString().trim() || "",
    };

    // Validate form data
    const validation = contactFormSchema.safeParse(rawData);
    if (!validation.success) {
      return { success: false, errors: validation.error.flatten().fieldErrors };
    }

    // Save to database
    await db.contactus.create({ data: rawData });

    // Send WhatsApp Notification
    const messageContent = `New Contact Submission:\nName: ${rawData.name}\nEmail: ${rawData.email}\nMobile: ${rawData.mobile}\nMessage: ${rawData.message}`;
    await sendWhatsAppMessage(messageContent);

    // Revalidate page cache
    revalidatePath("/contact");

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("Error processing contact form:", error);
    return {
      success: false,
      message: "An error occurred while processing your request.",
    };
  }
}
