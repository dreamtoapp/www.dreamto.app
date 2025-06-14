// pages/dashboard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // ShadCN Card components
import { Button } from "@/components/ui/button"; // ShadCN Button component
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // ShadCN Tabs components
import { Badge } from "@/components/ui/badge"; // ShadCN Badge component
import { getContactUsData } from "./action/action"; // Import the refactored server action


// Define types for each model (corrected for visitor data)
type ContactUs = {
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

type ExpressQuery = {
  id: string;
  name: string;
  brief: string;
  mobile: string;
  createdAt: Date; // updated to Date
};

type Visitor = {
  id: string;
  createdAt: Date; // updated to Date
  ip: string | null; // Optional field from Prisma schema
  country: string | null; // Optional field from Prisma schema
  city: string | null; // Optional field from Prisma schema
  updatedAt: Date; // updated to Date
  visitCount: number | 0;
};

import { FaEnvelope, FaQuestionCircle, FaUsers } from 'react-icons/fa';
import ViewMoreModal from './ViewMoreModal';

export default async function Dashboard() {
  // Fetch data using the server action
  const { contacts, expressQuery, visitors } = await getContactUsData();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-card rounded-2xl shadow p-6 flex items-center gap-4">
          <FaEnvelope className="text-primary w-8 h-8" />
          <div>
            <div className="text-2xl font-bold">{contacts.length}</div>
            <div className="text-sm text-muted-foreground">Project Requests</div>
          </div>
        </div>
        <div className="bg-card rounded-2xl shadow p-6 flex items-center gap-4">
          <FaQuestionCircle className="text-primary w-8 h-8" />
          <div>
            <div className="text-2xl font-bold">{expressQuery.length}</div>
            <div className="text-sm text-muted-foreground">Express Queries</div>
          </div>
        </div>
        <div className="bg-card rounded-2xl shadow p-6 flex items-center gap-4">
          <FaUsers className="text-primary w-8 h-8" />
          <div>
            <div className="text-2xl font-bold">{visitors.length}</div>
            <div className="text-sm text-muted-foreground">Visitors</div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="contact-us">
        <TabsList className="mb-6">
          <TabsTrigger value="contact-us" className="flex items-center gap-2">
  <FaEnvelope /> Project Requests
</TabsTrigger>
          <TabsTrigger value="express-queries" className="flex items-center gap-2">
            <FaQuestionCircle /> Express Queries
          </TabsTrigger>
          <TabsTrigger value="visitors" className="flex items-center gap-2">
            <FaUsers /> Visitors
          </TabsTrigger>
        </TabsList>

        {/* Project Requests Table */}
        <TabsContent value="contact-us">
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Project Requests Submissions</h2>
            <div className="overflow-x-auto rounded-xl shadow">
              <table className="min-w-full divide-y divide-gray-200 bg-card">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-muted-foreground uppercase">Name</th>
<th className="px-4 py-2 text-left text-xs font-bold text-muted-foreground uppercase">Email</th>
<th className="px-4 py-2 text-left text-xs font-bold text-muted-foreground uppercase">Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((item: ContactUs) => (
                    <tr key={item.id} className="hover:bg-muted/40 transition">
                      <td className="px-4 py-2 font-medium">{item.name}</td>
                      <td className="px-4 py-2">{item.email}</td>
                      <td className="px-4 py-2">{item.mobile}</td>
                      <td className="px-4 py-2">{item.projectType}</td>
                      <td className="px-4 py-2">{item.projectDetails}</td>
                      <td className="px-4 py-2">{item.budget}</td>
                      <td className="px-4 py-2">{item.message}</td>
                      <td className="px-4 py-2 text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-2">
                        <Button size="sm" variant="outline">View More</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </TabsContent>

        {/* Express Queries Table */}
        <TabsContent value="express-queries">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Express Queries</h2>
            <div className="overflow-x-auto rounded-xl shadow">
              <table className="min-w-full divide-y divide-gray-200 bg-card">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-muted-foreground uppercase">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-muted-foreground uppercase">Mobile</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-muted-foreground uppercase">Brief</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-muted-foreground uppercase">Date</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {expressQuery.map((item: ExpressQuery) => (
                    <tr key={item.id} className="hover:bg-muted/40 transition">
                      <td className="px-4 py-2 font-medium">{item.name}</td>
                      <td className="px-4 py-2">{item.mobile}</td>
                      <td className="px-4 py-2 max-w-xs truncate">{item.brief}</td>
                      <td className="px-4 py-2 text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-2">
                        <Button size="sm" variant="outline">View More</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </TabsContent>

        {/* Visitors Table */}
        <TabsContent value="visitors">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Visitors</h2>
            <div className="overflow-x-auto rounded-xl shadow">
              <table className="min-w-full divide-y divide-gray-200 bg-card">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-muted-foreground uppercase">IP</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-muted-foreground uppercase">Country</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-muted-foreground uppercase">City</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-muted-foreground uppercase">Visit Count</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-muted-foreground uppercase">Visit Time</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((item: Visitor) => (
                    <tr key={item.id} className="hover:bg-muted/40 transition">
                      <td className="px-4 py-2 font-medium">{item.ip || 'N/A'}</td>
                      <td className="px-4 py-2">{item.country || 'N/A'}</td>
                      <td className="px-4 py-2">{item.city || 'N/A'}</td>
                      <td className="px-4 py-2">{item.visitCount}</td>
                      <td className="px-4 py-2 text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-2">
                        <Button size="sm" variant="outline">View More</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
