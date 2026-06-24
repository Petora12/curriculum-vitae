import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar/Navbar';
import Profile from './Pages/Profile/Profile';
import About from './Pages/About/About';
import Schooling from './Pages/Schooling/Schooling';
import Companies from './Pages/Companies/Companies';
import Skills from './Pages/Skills/Skills';
import Languages from './Pages/Languages/Languages';
import Hobbies from './Pages/Hobbies/Hobbies';
import Contacts from './Pages/Contacts/Contacts';
import './App.css';
import { ArrowUp } from 'lucide-react';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollTop;
        const viewportHeight = window.innerHeight;

        // Calculate progress
        // 0-1: Profile to About (move to left)
        // 1-2: About to Companies (move to navbar)
        const progress = scrollPosition / viewportHeight;
        setScrollProgress(progress);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToTop = () =>
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="App">
      <Navbar scrollProgress={scrollProgress} />
      <div className="scroll-container" ref={scrollContainerRef}>
        <Profile scrollProgress={scrollProgress} />
        <About />
        <Companies scrollContainerRef={scrollContainerRef} />
        <Schooling />
        <Skills />
        <Languages />
        <Hobbies />
        <Contacts />
      </div>

      {scrollProgress >= 2 && (
        <button
          className="scroll-button"
          onClick={scrollToTop}
          aria-label="Back to first page"
        >
          <ArrowUp strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

export default App;
