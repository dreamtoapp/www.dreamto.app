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
  message: string;
  createdAt: Date; // updated to Date
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

export default async function Dashboard() {
  // Fetch data using the server action
  const { contacts, expressQuery, visitors } = await getContactUsData();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      {/* Tabs Section */}
      <Tabs defaultValue="contact-us">
        <TabsList>
          <TabsTrigger value="contact-us">
            Crombo
            <Badge className="ml-2" variant="secondary">
              {contacts.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value="contact-us">
            Prices Req
            <Badge className="ml-2" variant="secondary">
              {contacts.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value="contact-us">
            Contact Us
            <Badge className="ml-2" variant="secondary">
              {contacts.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="express-queries">
            Express Queries
            <Badge className="ml-2" variant="secondary">
              {expressQuery.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="visitors">
            Visitors
            <Badge className="ml-2" variant="secondary">
              {visitors.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Contact Us Tab */}
        <TabsContent value="contact-us">
          <section className="mb-8">
            <h2 className="text-2xl font-medium mb-4">
              Contact Us Submissions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((item: ContactUs) => (
                <Card
                  key={item.id}
                  className="shadow-lg border border-gray-200 rounded-lg"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p>
                        <strong>Email:</strong> {item.email}
                      </p>
                      <p>
                        <strong>Mobile:</strong> {item.mobile}
                      </p>
                      <p>
                        <strong>Message:</strong> {item.message}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        <strong>Date:</strong>{" "}
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Button className="mt-4" variant="outline" size="sm">
                      View More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        {/* Express Queries Tab */}
        <TabsContent value="express-queries">
          <section>
            <h2 className="text-2xl font-medium mb-4">Express Queries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expressQuery.map((item: ExpressQuery) => (
                <Card
                  key={item.id}
                  className="shadow-lg border border-gray-200 rounded-lg"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p>
                        <strong>Mobile:</strong> {item.mobile}
                      </p>
                      <p>
                        <strong>Brief:</strong> {item.brief}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        <strong>Date:</strong>{" "}
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Button className="mt-4" variant="outline" size="sm">
                      View More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        {/* Visitors Tab */}
        <TabsContent value="visitors">
          <section>
            <h2 className="text-2xl font-medium mb-4">Visitors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visitors.map((item: Visitor) => (
                <Card
                  key={item.id}
                  className="shadow-lg border border-gray-200 rounded-lg"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {item.ip || "Unknown IP"}{" "}
                      <span className="bg-green-500 text-white rounded-full p-1 text-xs size-6 ">
                        {item.visitCount}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p>
                        <strong>IP:</strong> {item.ip || "N/A"}
                      </p>
                      <p>
                        <strong>Country:</strong> {item.country || "N/A"}
                      </p>
                      <p>
                        <strong>City:</strong> {item.city || "N/A"}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        <strong>Visit Time:</strong>{" "}
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Button className="mt-4" variant="outline" size="sm">
                      View More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
