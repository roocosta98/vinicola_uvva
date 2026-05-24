import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import sunsetImg from '../assets/sunset.png';
import vineyardImg from '../assets/vineyard.png';
import architectureImg from '../assets/architecture.png';

export default function ExperienciaUnica() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { t } = useLanguage();

  const experiences = [
    {
      id: 1,
      title: t('experienciaUnica.slide1Title'),
      subtitle: t('experienciaUnica.slide1Subtitle'),
      description: t('experienciaUnica.slide1Desc'),
      image: vineyardImg,
      alt: t('experienciaUnica.slide1Alt')
    },
    {
      id: 2,
      title: t('experienciaUnica.slide2Title'),
      subtitle: t('experienciaUnica.slide2Subtitle'),
      description: t('experienciaUnica.slide2Desc'),
      image: sunsetImg,
      alt: t('experienciaUnica.slide2Alt')
    },
    {
      id: 3,
      title: t('experienciaUnica.slide3Title'),
      subtitle: t('experienciaUnica.slide3Subtitle'),
      description: t('experienciaUnica.slide3Desc'),
      image: architectureImg,
      alt: t('experienciaUnica.slide3Alt')
    }
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % experiences.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    <section id="experiencias" className="bg-[#1c1514] text-[#fcfbf9] py-24 sm:py-32 font-section overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Column: Synchronized Descriptive Content & CTA */}
          <div className="w-full lg:w-[45%] flex flex-col space-y-8">
            
            {/* Sychronized text container with key to trigger animation on index change */}
            <div key={activeSlide} className="animate-fade-in space-y-6">
              <div>
                <span className="text-[#c5a880] text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
                  {experiences[activeSlide].subtitle}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-light leading-tight">
                  {experiences[activeSlide].title}
                </h2>
              </div>
              
              <p className="text-xs sm:text-sm text-[#fcfbf9]/60 leading-relaxed max-w-lg min-h-[100px]">
                {experiences[activeSlide].description}
              </p>
            </div>

            <div className="pt-2">
              <a 
                href="#agendamento" 
                className="inline-block bg-[#c5a880] hover:bg-[#b3956d] text-[#1c1514] font-semibold text-xs tracking-[0.2em] uppercase py-4.5 px-8 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center shadow-xl"
              >
                {t('experienciaUnica.ctaBook')}
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Image Slider */}
          <div className="w-full lg:w-[50%] relative group">
            {/* Elegant luxury framing wrapper */}
            <div className="absolute inset-0 border border-[#c5a880]/20 transform translate-x-4 translate-y-4 z-0 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
            
            <div className="relative z-10 overflow-hidden shadow-2xl h-[350px] sm:h-[450px] bg-[#1c1514]">
              
              {/* Sliding Image strip */}
              <div 
                className="flex h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {experiences.map((exp) => (
                  <div key={exp.id} className="w-full h-full shrink-0 relative">
                    <img 
                      src={exp.image} 
                      alt={exp.alt} 
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-[2000ms] ease-out"
                    />
                    {/* Soft gradient overlay for premium lighting */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1514]/65 via-transparent to-[#1c1514]/20"></div>
                  </div>
                ))}
              </div>

              {/* Slider Controls: Minimalist transparent arrows */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-20 pointer-events-none">
                <button
                  onClick={handlePrev}
                  className="h-10 w-10 bg-[#1c1514]/60 backdrop-blur-sm border border-[#fcfbf9]/10 hover:border-[#c5a880] text-[#fcfbf9] hover:text-[#c5a880] flex items-center justify-center rounded-none transition-all duration-300 pointer-events-auto cursor-pointer focus:outline-none"
                  aria-label="Experiência anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="h-10 w-10 bg-[#1c1514]/60 backdrop-blur-sm border border-[#fcfbf9]/10 hover:border-[#c5a880] text-[#fcfbf9] hover:text-[#c5a880] flex items-center justify-center rounded-none transition-all duration-300 pointer-events-auto cursor-pointer focus:outline-none"
                  aria-label="Próxima experiência"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Progress Track: Luxury rounded bullets */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2.5 z-20">
                {experiences.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer focus:outline-none ${
                      activeSlide === idx ? 'w-6 bg-[#c5a880]' : 'w-1.5 bg-[#fcfbf9]/40 hover:bg-[#fcfbf9]/80'
                    }`}
                    aria-label={`Ir para slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
