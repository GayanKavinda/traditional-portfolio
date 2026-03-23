//src/pages/Home.tsx

import Navbar               from '@/components/layout/Navbar';
import Hero                 from '@/components/sections/Hero/Hero';
import MaskTransition        from '@/components/animations/MaskTransition';
import Projects              from '@/components/sections/Projects';
import TechStack             from '@/components/sections/TechStack/index';
import Experience            from '@/components/sections/Experience';
import About                 from '@/components/sections/About';
import EngineeringPhilosophy from '@/components/sections/EngineeringPhilosophy';
import Certifications        from '@/components/sections/Certifications';
import Achievements          from '@/components/sections/Achievements';
import Testimonials          from '@/components/sections/Testimonials';
import ImpactMetrics         from '@/components/sections/ImpactMetrics';
import CodeCadence           from '@/components/sections/CodeCadence';
import Contact               from '@/components/sections/Contact';
import Footer                from '@/components/layout/Footer';
import SideNav               from '@/components/layout/SideNav';
 
const Home = () => (
  <>
    <Navbar />
    <SideNav />
 
    {/* id="home" on the first section so SideNav can observe it */}
    <div id="home">
      <Hero />
    </div>
 
    <MaskTransition />
    <Projects />
    <TechStack />
    <Experience />
    <About />
    <EngineeringPhilosophy />
    <Certifications />
    <Achievements />
    <Testimonials />
    <ImpactMetrics />
    <CodeCadence />
    <Contact />
    <Footer />
  </>
);
 
export default Home;