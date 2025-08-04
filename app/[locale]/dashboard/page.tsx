"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Simple data structure for testing
      const mockData = {
        stats: {
          totalJobApplications: 5,
          activeJobApplications: 3,
          totalVisitors: 150,
          recentSubmissions: 12
        },
        jobApplications: [
          {
            id: '1',
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            areaOfExpertise: 'Frontend Development',
            yearsOfExperience: 3,
            status: 'SUBMITTED',
            createdAt: new Date().toISOString()
          }
        ],
        contacts: [
          {
            id: '1',
            name: 'Jane Smith',
            email: 'jane@example.com',
            mobile: '+0987654321',
            projectType: 'Web Application',
            budget: '$5000-10000',
            createdAt: new Date().toISOString()
          }
        ],
        visitors: [
          {
            id: '1',
            ip: '192.168.1.1',
            country: 'Saudi Arabia',
            city: 'Riyadh',
            visitCount: 5,
            createdAt: new Date().toISOString()
          }
        ],
        consultations: [
          {
            id: '1',
            name: 'Ahmed Ali',
            email: 'ahmed@example.com',
            phone: '+966501234567',
            message: 'I need consultation for my startup project',
            createdAt: new Date().toISOString()
          }
        ]
      };

      setData(mockData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">Complete control over all data and operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{data?.stats?.totalJobApplications || 0}</p>
                </div>
                <div className="h-8 w-8 bg-blue-500 rounded"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{data?.stats?.activeJobApplications || 0}</p>
                </div>
                <div className="h-8 w-8 bg-green-500 rounded"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                  <p className="text-2xl font-bold text-gray-900">{data?.stats?.totalVisitors || 0}</p>
                </div>
                <div className="h-8 w-8 bg-purple-500 rounded"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recent Submissions</p>
                  <p className="text-2xl font-bold text-gray-900">{data?.stats?.recentSubmissions || 0}</p>
                </div>
                <div className="h-8 w-8 bg-orange-500 rounded"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Applications */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.jobApplications?.map((app: any) => (
              <Card key={app.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{app.fullName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Email:</strong> {app.email}</p>
                  <p><strong>Phone:</strong> {app.phone}</p>
                  <p><strong>Expertise:</strong> {app.areaOfExpertise}</p>
                  <p><strong>Experience:</strong> {app.yearsOfExperience} years</p>
                  <p><strong>Status:</strong> {app.status}</p>
                  <p><strong>Submitted:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Submissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.contacts?.map((contact: any) => (
              <Card key={contact.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Email:</strong> {contact.email}</p>
                  <p><strong>Mobile:</strong> {contact.mobile}</p>
                  <p><strong>Project Type:</strong> {contact.projectType}</p>
                  <p><strong>Budget:</strong> {contact.budget}</p>
                  <p><strong>Submitted:</strong> {new Date(contact.createdAt).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Visitors */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Visitors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.visitors?.map((visitor: any) => (
              <Card key={visitor.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{visitor.country || 'Unknown'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>IP:</strong> {visitor.ip}</p>
                  <p><strong>City:</strong> {visitor.city || 'N/A'}</p>
                  <p><strong>Visit Count:</strong> {visitor.visitCount}</p>
                  <p><strong>First Visit:</strong> {new Date(visitor.createdAt).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Consultations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Consultations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.consultations?.map((consultation: any) => (
              <Card key={consultation.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{consultation.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Email:</strong> {consultation.email}</p>
                  <p><strong>Phone:</strong> {consultation.phone || 'N/A'}</p>
                  <p><strong>Message:</strong> {consultation.message.substring(0, 100)}...</p>
                  <p><strong>Submitted:</strong> {new Date(consultation.createdAt).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Refresh Button */}
        <div className="text-center">
          <Button onClick={loadDashboardData} variant="outline" className="px-8 py-4">
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
}
