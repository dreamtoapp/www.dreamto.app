import React from "react";
import Services from "./service/Services";
import WhyChooseUs from "./WhyChooseUs";
import Footer from "./Footer";
import FromIdea from "./FromIdea";
import DesinAndDiscover from "./DesinAndDiscover";
async function HomePageBody() {
  return (
    <main className="grid  gap-4 grid-cols-1 md:grid-cols-1">
      <FromIdea />
      <DesinAndDiscover />
      <Services />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}

export default HomePageBody;
