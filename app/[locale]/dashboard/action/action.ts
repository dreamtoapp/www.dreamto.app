// lib/contactUs.ts
import db from "@/lib/prisma"; // Ensure your Prisma client is correctly imported

export const getContactUsData = async () => {
  try {
    // Fetch data from all the tables and sort by the latest 'createdAt' (descending order)
    const contacts = await db.projectRequest.findMany({
      orderBy: {
        createdAt: "desc", // Sort by 'createdAt' in descending order (latest first)
      },
    });
    

    const expressQuery = await db.expressQuery.findMany({
      orderBy: {
        createdAt: "desc", // Sort by 'createdAt' in descending order (latest first)
      },
    });

    const visitors = await db.visitor.findMany({
      orderBy: {
        createdAt: "desc", // Sort by 'createdAt' in descending order (latest first)
      },
    });

    return { contacts, expressQuery, visitors };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data.");
  }
};
