import type React from "react";
import Head from "next/head";

export const ServicesSEO: React.FC = () => (
  <Head>
    <title>Our Services - Building Tomorrow's Solutions Today</title>
    <meta
      name="description"
      content="Discover our range of services including web development, mobile app development, CRM solutions, and more."
    />
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Web Development",
        provider: {
          "@type": "Organization",
          name: "Your Company Name",
        },
        areaServed: {
          "@type": "Country",
          name: "Global",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Website Development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mobile App Development",
              },
            },
            // Add more services as needed
          ],
        },
      })}
    </script>
  </Head>
);
