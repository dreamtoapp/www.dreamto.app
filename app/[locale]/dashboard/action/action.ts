import db from "@/lib/prisma";
import { ApplicationStatus } from "@prisma/client";

// Types for all models
export type ContactUs = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  projectType: string;
  projectDetails: string;
  budget: string;
  message: string;
  createdAt: Date;
};

export type ExpressQuery = {
  id: string;
  name: string;
  brief: string;
  mobile: string;
  createdAt: Date;
};

export type Visitor = {
  id: string;
  ip: string;
  country: string | null;
  city: string | null;
  region: string | null;
  org: string | null;
  timezone: string | null;
  visitCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Crombo = {
  id: string;
  company: string;
  name: string;
  mobile: string;
  email: string;
  note: string;
  createdAt: Date;
};

export type Price = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  packageTtype: string;
  createdAt: Date;
};

export type ProjectRequest = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  projectType: string;
  projectDetails: string;
  budget: string;
  message: string;
  createdAt: Date;
};

export type FormData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  brief: string | null;
  lastPrice: number | null;
  discountedPrice: number | null;
  discount: number | null;
  agreed: boolean | null;
  negotiation: boolean | null;
  noPrice: boolean | null;
  createdAt: Date;
};

export type ConsultationRequest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  voiceUrl: string | null;
  createdAt: Date;
};

export type NewsletterSubscription = {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type JobApplication = {
  id: string;
  applicationNumber: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  areaOfExpertise: string;
  yearsOfExperience: number;
  aboutYou: string;
  attachmentUrl: string | null;
  attachmentName: string | null;
  status: ApplicationStatus;
  submittedAt: Date | null;
  locale: string;
  ipAddress: string | null;
  userAgent: string | null;
  source: string | null;
  adminNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
  statusHistory: ApplicationStatusHistory[];
};

export type ApplicationStatusHistory = {
  id: string;
  applicationId: string;
  status: ApplicationStatus;
  notes: string | null;
  changedBy: string | null;
  changedAt: Date;
};

export type DashboardStats = {
  totalContacts: number;
  totalExpressQueries: number;
  totalVisitors: number;
  totalCrombo: number;
  totalPrices: number;
  totalProjectRequests: number;
  totalFormData: number;
  totalConsultations: number;
  totalNewsletterSubscriptions: number;
  totalJobApplications: number;
  activeJobApplications: number;
  recentSubmissions: number;
  topCountries: { country: string; count: number }[];
  monthlyStats: { month: string; count: number }[];
};

// Main function to get all dashboard data
export const getAllDashboardData = async () => {
  try {
    // Fetch all data from all models
    const [
      contacts,
      expressQuery,
      visitors,
      crombo,
      prices,
      projectRequests,
      formData,
      consultations,
      newsletterSubscriptions,
      jobApplications
    ] = await Promise.all([
      db.contactus.findMany({ orderBy: { createdAt: "desc" } }),
      db.expressQuery.findMany({ orderBy: { createdAt: "desc" } }),
      db.visitor.findMany({ orderBy: { createdAt: "desc" } }),
      db.crombo.findMany({ orderBy: { createdAt: "desc" } }),
      db.price.findMany({ orderBy: { createdAt: "desc" } }),
      db.projectRequest.findMany({ orderBy: { createdAt: "desc" } }),
      db.formData.findMany({ orderBy: { createdAt: "desc" } }),
      db.consultationRequest.findMany({ orderBy: { createdAt: "desc" } }),
      db.newsletterSubscription.findMany({ orderBy: { createdAt: "desc" } }),
      db.jobApplication.findMany({
        orderBy: { createdAt: "desc" },
        include: { statusHistory: true }
      })
    ]);

    // Calculate statistics
    const stats = await calculateDashboardStats();

    return {
      contacts,
      expressQuery,
      visitors,
      crombo,
      prices,
      projectRequests,
      formData,
      consultations,
      newsletterSubscriptions,
      jobApplications,
      stats
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to fetch dashboard data.");
  }
};

// Calculate dashboard statistics
export const calculateDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const [
      totalContacts,
      totalExpressQueries,
      totalVisitors,
      totalCrombo,
      totalPrices,
      totalProjectRequests,
      totalFormData,
      totalConsultations,
      totalNewsletterSubscriptions,
      totalJobApplications,
      activeJobApplications,
      recentSubmissions
    ] = await Promise.all([
      db.contactus.count(),
      db.expressQuery.count(),
      db.visitor.count(),
      db.crombo.count(),
      db.price.count(),
      db.projectRequest.count(),
      db.formData.count(),
      db.consultationRequest.count(),
      db.newsletterSubscription.count({ where: { isActive: true } }),
      db.jobApplication.count(),
      db.jobApplication.count({ where: { status: { not: "REJECTED" } } }),
      db.jobApplication.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      })
    ]);

    // Get top countries
    const visitors = await db.visitor.findMany({
      where: { country: { not: null } },
      select: { country: true }
    });

    const countryCounts = visitors.reduce((acc, visitor) => {
      if (visitor.country) {
        acc[visitor.country] = (acc[visitor.country] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Get monthly stats for the last 6 months
    const monthlyStats = await getMonthlyStats();

    return {
      totalContacts,
      totalExpressQueries,
      totalVisitors,
      totalCrombo,
      totalPrices,
      totalProjectRequests,
      totalFormData,
      totalConsultations,
      totalNewsletterSubscriptions,
      totalJobApplications,
      activeJobApplications,
      recentSubmissions,
      topCountries,
      monthlyStats
    };
  } catch (error) {
    console.error("Error calculating dashboard stats:", error);
    throw new Error("Failed to calculate dashboard statistics.");
  }
};

// Get monthly statistics
export const getMonthlyStats = async () => {
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    const startOfMonth = new Date(year, date.getMonth(), 1);
    const endOfMonth = new Date(year, date.getMonth() + 1, 0);

    const count = await db.jobApplication.count({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      }
    });

    months.push({ month: `${monthName} ${year}`, count });
  }

  return months;
};

// CRUD Operations for Job Applications
export const updateJobApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus,
  notes?: string,
  changedBy?: string
) => {
  try {
    const result = await db.$transaction(async (tx) => {
      // Update the application status
      const updatedApplication = await tx.jobApplication.update({
        where: { id: applicationId },
        data: {
          status,
          submittedAt: status === 'SUBMITTED' ? new Date() : undefined,
          adminNotes: notes
        }
      });

      // Add to status history
      await tx.applicationStatusHistory.create({
        data: {
          applicationId,
          status,
          notes,
          changedBy
        }
      });

      return updatedApplication;
    });

    return { success: true, application: result };
  } catch (error) {
    console.error("Error updating job application status:", error);
    return { success: false, error: "Failed to update application status" };
  }
};

// Delete operations
export const deleteRecord = async (model: string, id: string) => {
  try {
    let result;

    switch (model) {
      case 'contactus':
        result = await db.contactus.delete({ where: { id } });
        break;
      case 'expressQuery':
        result = await db.expressQuery.delete({ where: { id } });
        break;
      case 'visitor':
        result = await db.visitor.delete({ where: { id } });
        break;
      case 'crombo':
        result = await db.crombo.delete({ where: { id } });
        break;
      case 'price':
        result = await db.price.delete({ where: { id } });
        break;
      case 'projectRequest':
        result = await db.projectRequest.delete({ where: { id } });
        break;
      case 'formData':
        result = await db.formData.delete({ where: { id } });
        break;
      case 'consultationRequest':
        result = await db.consultationRequest.delete({ where: { id } });
        break;
      case 'newsletterSubscription':
        result = await db.newsletterSubscription.delete({ where: { id } });
        break;
      case 'jobApplication':
        result = await db.jobApplication.delete({ where: { id } });
        break;
      default:
        throw new Error(`Unknown model: ${model}`);
    }

    return { success: true, deletedRecord: result };
  } catch (error) {
    console.error(`Error deleting ${model} record:`, error);
    return { success: false, error: `Failed to delete ${model} record` };
  }
};

// Search functionality
export const searchRecords = async (model: string, query: string) => {
  try {
    let results;
    const searchQuery = { contains: query, mode: 'insensitive' as const };

    switch (model) {
      case 'contactus':
        results = await db.contactus.findMany({
          where: {
            OR: [
              { name: searchQuery },
              { email: searchQuery },
              { mobile: searchQuery },
              { projectType: searchQuery }
            ]
          },
          orderBy: { createdAt: "desc" }
        });
        break;
      case 'jobApplication':
        results = await db.jobApplication.findMany({
          where: {
            OR: [
              { fullName: searchQuery },
              { email: searchQuery },
              { phone: searchQuery },
              { applicationNumber: searchQuery },
              { areaOfExpertise: searchQuery }
            ]
          },
          include: { statusHistory: true },
          orderBy: { createdAt: "desc" }
        });
        break;
      // Add more cases for other models as needed
      default:
        throw new Error(`Search not implemented for model: ${model}`);
    }

    return { success: true, results };
  } catch (error) {
    console.error(`Error searching ${model} records:`, error);
    return { success: false, error: `Failed to search ${model} records` };
  }
};

// Legacy function for backward compatibility
export const getContactUsData = async () => {
  try {
    const contacts = await db.projectRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    const expressQuery = await db.expressQuery.findMany({
      orderBy: { createdAt: "desc" },
    });

    const visitors = await db.visitor.findMany({
      orderBy: { createdAt: "desc" },
    });

    const consultations = await db.consultationRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { contacts, expressQuery, visitors, consultations };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data.");
  }
};
