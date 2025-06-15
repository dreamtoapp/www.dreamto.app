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
import ExpressQueryModal from './ExpressQueryModal';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contacts.map((item: ContactUs) => (
        <div key={item.id} className="bg-card rounded-xl shadow p-6 flex flex-col gap-2">
          <div className="font-bold text-lg">{item.name}</div>
          <div className="text-sm text-muted-foreground">{item.email}</div>
          <div><strong>Mobile:</strong> {item.mobile}</div>
          <div><strong>Project Type:</strong> {item.projectType}</div>
          <div><strong>Budget:</strong> {item.budget}</div>
          <div><strong>Project Details:</strong> <div className="whitespace-pre-line break-words rounded p-2 mt-1">{item.projectDetails}</div></div>
          <div><strong>Message:</strong> <div className="whitespace-pre-line break-words rounded p-2 mt-1">{item.message}</div></div>
          <div className="text-xs text-gray-500 mt-2"><strong>Submitted:</strong> {new Date(item.createdAt).toLocaleString()}</div>
          <div className="mt-2">
            <ViewMoreModal item={item} />
          </div>
        </div>
      ))}
    </div>
  </section>
        </TabsContent>

        {/* Express Queries Table */}
        <TabsContent value="express-queries">
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Express Queries</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {expressQuery.map((item: ExpressQuery) => (
        <div key={item.id} className="bg-card rounded-xl shadow p-6 flex flex-col gap-2">
          <div className="font-bold text-lg">{item.name}</div>
          <div><strong>Mobile:</strong> {item.mobile}</div>
          <div><strong>Brief:</strong> <div className="whitespace-pre-line break-words rounded p-2 mt-1">{item.brief}</div></div>
          <div className="text-xs text-gray-500 mt-2"><strong>Submitted:</strong> {new Date(item.createdAt).toLocaleString()}</div>
          <div className="mt-2">
            <ExpressQueryModal item={item} />
          </div>
        </div>
      ))}
    </div>
  </section>
        </TabsContent>

        {/* Visitors Table */}
        <TabsContent value="visitors">
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Visitors</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {visitors.map((item: Visitor) => (
        <div key={item.id} className="bg-card rounded-xl shadow p-6 flex flex-col gap-2">
          <div className="font-bold text-lg">{item.ip || 'N/A'}</div>
          <div><strong>Country:</strong> {item.country || 'N/A'}</div>
          <div><strong>City:</strong> {item.city || 'N/A'}</div>
          <div><strong>Visit Count:</strong> {item.visitCount}</div>
          <div className="text-xs text-gray-500 mt-2"><strong>Visited:</strong> {new Date(item.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
