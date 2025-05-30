// app/actions.ts
"use server";

import db from "@/lib/prisma";

export async function saveFormData(prev: any, formData: FormData) {
  try {
    // Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const serviceType = formData.get("serviceType") as string;
    const brief = formData.get("brief") as string;
    const lastPrice = parseFloat(formData.get("lastPrice") as string);
    const discount = parseFloat(formData.get("discount") as string);
    const agreed = formData.get("agreed") === "true";
    const negotiation = formData.get("negotiation") === "true";
    const noPrice = formData.get("noPrice") === "true";

    // Calculate discounted price
    const discountedPrice = lastPrice ? lastPrice * (1 - discount / 100) : null;

    // Save data to the database
    await db.formData.create({
      data: {
        name,
        email,
        phone,
        serviceType,
        brief,
        lastPrice,
        discountedPrice,
        discount,
        agreed,
        negotiation,
        noPrice,
      },
    });

    return {
      success: true,
      message: "Form submitted successfully! We'll contact you soon.",
    };
  } catch (error) {
    console.error("Error saving form data:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
