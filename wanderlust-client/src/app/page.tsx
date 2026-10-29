
import Banner from "@/components/Home/Banner";
import WhyChoose from "@/components/Home/WhyChoose";
import Testimonials from "@/components/Home/Testimonials";
import CTA from "@/components/Home/CTA";
import Features from "@/components/Home/features";

export default function Home() {
  return (
    <>
      <Banner />
      <Features></Features>
      <WhyChoose />
      <Testimonials />
      <CTA />
    </>
  );
}
