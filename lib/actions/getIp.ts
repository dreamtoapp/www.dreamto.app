"use server";

import { headers } from "next/headers";
import db from "@/lib/prisma";
import { sendWhatsAppMessage } from "./sendWhatsapp";

interface GeoLocation {
  country: string;
  city: string;
  region: string;
  org: string;
  timezone: string;
}

export async function getIpInfo(): Promise<{
  ip: string;
  location: GeoLocation;
  visitCount: number;
}> {
  try {
    const headersList = await headers();
    let ip =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      "127.0.0.1";
    const accessToken = process.env.IPINFO_ACCESS_TOKEN;

    // Get real public IP if running locally
    if (ip === "127.0.0.1" || ip === "::1") {
      return {
        ip: "local",
        location: {
          country: "Local",
          city: "Local",
          region: "Local",
          org: "Local",
          timezone: "Local",
        },
        visitCount: 1,
      };
    }
    // if (ip === "127.0.0.1" || ip === "::1") {
    //   try {
    //     const publicIpResponse = await fetch(
    //       "https://api64.ipify.org?format=json",
    //       {
    //         cache: "no-store",
    //         next: { revalidate: 0 }, // Ensures Next.js 15 does not cache this request
    //       }
    //     );

    //     if (!publicIpResponse.ok) throw new Error("Failed to fetch public IP");

    //     const publicIpData = await publicIpResponse.json();
    //     ip = publicIpData.ip;
    //   } catch (error) {
    //     console.error("⚠️ Public IP fetch failed:", error);
    //     ip = "Unknown"; // Set default if request fails
    //   }
    // }

    let ipInfo: GeoLocation = {
      country: "Unknown",
      city: "Unknown",
      region: "Unknown",
      org: "Unknown",
      timezone: "Unknown",
    };

    // 🔹 Try fetching from ipinfo.io with error handling
    try {
      const response = await fetch(
        `https://ipinfo.io/${ip}/json?token=${accessToken}`,
        {
          cache: "no-store",
          next: { revalidate: 0 },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch from ipinfo.io");

      const data = await response.json();
      ipInfo = {
        country: data.country || "Unknown",
        city: data.city || "Unknown",
        region: data.region || "Unknown",
        org: data.org || "Unknown",
        timezone: data.timezone || "Unknown",
      };
    } catch (error) {
      console.warn("⚠️ ipinfo.io failed, falling back to IP-API.com");
      try {
        const fallbackResponse = await fetch(
          `http://ip-api.com/json/${ip}?fields=status,country,city,regionName,org,timezone`,
          {
            cache: "no-store",
            next: { revalidate: 0 },
          }
        );

        if (!fallbackResponse.ok)
          throw new Error("Failed to fetch from ip-api.com");

        const fallbackData = await fallbackResponse.json();
        if (fallbackData.status === "success") {
          ipInfo = {
            country: fallbackData.country || "Unknown",
            city: fallbackData.city || "Unknown",
            region: fallbackData.regionName || "Unknown",
            org: fallbackData.org || "Unknown",
            timezone: fallbackData.timezone || "Unknown",
          };
        }
      } catch (fallbackError) {
        console.error("❌ IP-API.com failed as well:", fallbackError);
      }
    }

    // 🔹 Check if visitor exists in DB & update visit count
    let visitCount = 1;
    try {
      const existingVisitor = await db.visitor.findUnique({ where: { ip } });

      if (existingVisitor) {
        visitCount = existingVisitor.visitCount + 1;
        await db.visitor.update({ where: { ip }, data: { visitCount } });

        sendWhatsAppMessage(
          `🔄 Returning visitor from: ${ipInfo.country}/${ipInfo.city} (Visit #${visitCount})`
        ).catch((err) =>
          console.error("⚠️ WhatsApp Notification Failed:", err)
        );
      } else {
        await db.visitor.create({ data: { ip, ...ipInfo, visitCount: 1 } });

        sendWhatsAppMessage(
          `🆕 New visitor from: ${ipInfo.country}/${ipInfo.city}`
        ).catch((err) =>
          console.error("⚠️ WhatsApp Notification Failed:", err)
        );
      }
    } catch (dbError) {
      console.error("❌ Database Error:", dbError);
    }

    return { ip, location: ipInfo, visitCount };
  } catch (error) {
    console.error("❌ Unexpected Error in getIpInfo:", error);
    return {
      ip: "Unknown",
      location: {
        country: "Unknown",
        city: "Unknown",
        region: "Unknown",
        org: "Unknown",
        timezone: "Unknown",
      },
      visitCount: 1,
    };
  }
}
