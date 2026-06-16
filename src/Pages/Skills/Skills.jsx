import { Layers } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import './Skills.css';
import { useTranslation } from '../../hooks/useTranslation';

const Skills = ({ scrollContainerRef }) => {
  const { t } = useTranslation();
  const [isIconVisible, setIsIconVisible] = useState(false);
  const pageRef = useRef(null);

  const SKILLS_CATEGORIES = {
    'Frontend Frameworks': ['React 19', 'Vue', 'Angular', 'Lit', 'Vuetify'],
    Languages: ['TypeScript', 'JavaScript'],
    Backend: ['Node.js', 'Express.js'],
    Testing: ['Jasmine', 'Mocha/Chai', 'Mockoon'],
    'Version Control': ['Github', 'Bitbucket'],
    DevOps: ['CI/CD', 'Pipelines'],
    'Project Management': ['JIRA', 'Confluence', 'Agile'],
    'Build Tools': ['Vite', 'Rollup'],
    Styling: ['SCSS', 'CSS'],
    'State Management': ['Redux', 'Pinia'],
    'Soft Skills': [
      t('pages.skills.soft-skills.teamwork'),
      t('pages.skills.soft-skills.adaptability'),
      t('pages.skills.soft-skills.problem-solving'),
      t('pages.skills.soft-skills.quick-learner'),
      t('pages.skills.soft-skills.communication'),
    ],
  };

  // Intersection Observer for snap detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            setIsIconVisible(true);
          } else {
            setIsIconVisible(false);
          }
        });
      },
      {
        threshold: [0.75],
        root: scrollContainerRef?.current || null,
      },
    );

    if (pageRef.current) {
      observer.observe(pageRef.current);
    }

    return () => {
      if (pageRef.current) {
        observer.unobserve(pageRef.current);
      }
    };
  }, [scrollContainerRef]);

  return (
    <div ref={pageRef} className="skills-page">
      <div className="skills-content">
        {/* Left side - Layers Icon */}
        <div
          className={`skills-icon-section ${isIconVisible ? 'is-visible' : ''}`}
        >
          <Layers className="skills-layers-icon" />
        </div>

        {/* Right side - Title and Skills */}
        <div className="skills-right-section">
          <h1 className="skills-title">{t('pages.skills.title')}.</h1>
          <div className="skills-categories-container">
            {Object.entries(SKILLS_CATEGORIES).map(
              ([category, skills], catIndex) => (
                <div
                  key={category}
                  className="skills-category"
                  style={{ animationDelay: `${catIndex * 0.1}s` }}
                >
                  <h3 className="category-title">
                    {t(`pages.skills.categories.${category}`)}
                  </h3>
                  <div className="skills-pills">
                    {skills.map((skill, skillIndex) => (
                      <span
                        key={skill}
                        className="skill-pill"
                        style={{
                          animationDelay: `${
                            catIndex * 0.1 + skillIndex * 0.05
                          }s`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
