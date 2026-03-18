import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MaskTransition from '@/components/MaskTransition';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import Experience from '@/components/Experience';
import About from '@/components/About';
import Certifications from '@/components/Certifications';
import Achievements from '@/components/Achievements';
import ImpactMetrics from '@/components/ImpactMetrics';
import CodeCadence from '@/components/CodeCadence';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <MaskTransition />
    <Projects />
    <TechStack />
    <Experience />
    <About />
    <Certifications />
    <Achievements />
    <ImpactMetrics />
    <CodeCadence />
    <Contact />
    <Footer />
  </>
);

export default Home;
