import NavBar from "@/components/NavBar";
import Banner from "@/components/Banner";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <Banner />
      <WhyChoose />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
