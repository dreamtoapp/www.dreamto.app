// pages/dashboard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // ShadCN Card components
import { Button } from "@/components/ui/button"; // ShadCN Button component
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // ShadCN Tabs components
import { Badge } from "@/components/ui/badge"; // ShadCN Badge component
import { getContactUsData } from "./action/action"; // Import the refactored server action
import { useTranslations, useFormatter } from 'next-intl';

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
  const t = useTranslations('dashboard');
  const format = useFormatter();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">{t('adminDashboard')}</h1>

      {/* Tabs Section */}
      <Tabs defaultValue="contact-us">
        <TabsList>
          <TabsTrigger value="contact-us">
            {t('cromboTab')}
            <Badge className="ml-2" variant="secondary">
              {t('contactsTab', { count: contacts.length })}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value="contact-us">
            {t('pricesReqTab')}
            <Badge className="ml-2" variant="secondary">
              {t('contactsTab', { count: contacts.length })}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value="contact-us">
            {t('contactUsTab')}
            <Badge className="ml-2" variant="secondary">
              {t('contactsTab', { count: contacts.length })}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="express-queries">
            {t('expressQueriesTab')}
            <Badge className="ml-2" variant="secondary">
              {t('expressQueriesTabCount', { count: expressQuery.length })}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="visitors">
            {t('visitorsTab')}
            <Badge className="ml-2" variant="secondary">
              {t('visitorsTabCount', { count: visitors.length })}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Contact Us Tab */}
        <TabsContent value="contact-us">
          <section className="mb-8">
            <h2 className="text-2xl font-medium mb-4">
              {t('contactUsSubmissions')}
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
                        <strong>{t('email')}:</strong> {item.email}
                      </p>
                      <p>
                        <strong>{t('mobile')}:</strong> {item.mobile}
                      </p>
                      <p>
                        <strong>{t('message')}:</strong> {item.message}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        <strong>{t('date')}:</strong>{' '}
                        {format.dateTime(item.createdAt, 'medium')}
                      </p>
                    </div>
                    <Button className="mt-4" variant="outline" size="sm">
                      {t('viewMore')}
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
            <h2 className="text-2xl font-medium mb-4">{t('expressQueries')}</h2>
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
                        <strong>{t('mobile')}:</strong> {item.mobile}
                      </p>
                      <p>
                        <strong>{t('brief')}:</strong> {item.brief}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        <strong>{t('date')}:</strong>{' '}
                        {format.dateTime(item.createdAt, 'medium')}
                      </p>
                    </div>
                    <Button className="mt-4" variant="outline" size="sm">
                      {t('viewMore')}
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
            <h2 className="text-2xl font-medium mb-4">{t('visitors')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visitors.map((item: Visitor) => (
                <Card
                  key={item.id}
                  className="shadow-lg border border-gray-200 rounded-lg"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {item.ip || t('unknownIP')}{' '}
                      <span className="bg-green-500 text-white rounded-full p-1 text-xs size-6 ">
                        {t('visitCount', { count: item.visitCount })}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p>
                        <strong>{t('ip')}:</strong> {item.ip || t('na')}
                      </p>
                      <p>
                        <strong>{t('country')}:</strong> {item.country || t('na')}
                      </p>
                      <p>
                        <strong>{t('city')}:</strong> {item.city || t('na')}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        <strong>{t('visitTime')}:</strong>{' '}
                        {format.dateTime(item.createdAt, 'medium')}
                      </p>
                    </div>
                    <Button className="mt-4" variant="outline" size="sm">
                      {t('viewMore')}
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
