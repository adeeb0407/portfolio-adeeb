import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Progress from "@/components/Progress";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Proof from "@/components/Proof";
import Chapters from "@/components/Chapters";
import Record from "@/components/Record";
import Range from "@/components/Range";
import Agents from "@/components/Agents";
import Products from "@/components/Products";
import Shipping from "@/components/Shipping";
import Work from "@/components/Work";
import Quotes from "@/components/Quotes";
import Build from "@/components/Build";
import OffClock from "@/components/OffClock";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Intro />
      <Cursor />
      <Progress />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Proof />
        <Chapters />
        <Record />
        <Range />
        <Agents />
        <Products />
        <Shipping />
        <Work />
        <Quotes />
        <Build />
        <OffClock />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
