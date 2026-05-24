import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import gastronomyImg from '../assets/gastronomy.png';

export default function Restaurante() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  const slides = [
    {
      title: t('restaurante.slide1Title'),
      description: t('restaurante.slide1Desc'),
      dish: t('restaurante.slide1Dish'),
    },
    {
      title: t('restaurante.slide2Title'),
      description: t('restaurante.slide2Desc'),
      dish: t('restaurante.slide2Dish'),
    },
    {
      title: t('restaurante.slide3Title'),
      description: t('restaurante.slide3Desc'),
      dish: t('restaurante.slide3Dish'),
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="reserva" className="bg-[#fcfbf9] text-[#1c1514] py-24 sm:py-32 font-section overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Column: Copywriting & CTA */}
          <div className="w-full lg:w-[45%] flex flex-col space-y-8 animate-fade-in">
            <div>
              <span className="text-[#c5a880] text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
                {t('restaurante.premiumTag')}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-light leading-tight">
                {t('restaurante.openTitle').split(' ')[0]} <br /> {t('restaurante.openTitle').split(' ').slice(1).join(' ')}
              </h2>
            </div>
            
            {/* Dynamic content depending on active slide */}
            <div className="space-y-4 min-h-[160px]">
              <h3 className="text-lg font-semibold text-[#1c1514] tracking-wide transition-all duration-500">
                {slides[currentSlide].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#1c1514]/75 leading-relaxed max-w-lg transition-all duration-500">
                {slides[currentSlide].description}
              </p>
            </div>

            <div className="pt-2">
              <a 
                href="#reservar-mesa" 
                className="inline-block border border-[#1c1514] hover:bg-[#1c1514] hover:text-[#fcfbf9] text-[#1c1514] font-semibold text-xs tracking-[0.2em] uppercase py-4 px-8 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center font-section"
              >
                {t('restaurante.ctaReserve')}
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Carousel Display */}
          <div className="w-full lg:w-[50%] relative group">
            {/* Soft decorative shadow frame */}
            <div className="absolute inset-0 bg-[#f2ebd9] transform rotate-3 scale-[0.98] z-0 opacity-50 transition-transform duration-700 group-hover:rotate-1"></div>

            <div className="relative z-10 shadow-2xl overflow-hidden">
              <img 
                src={gastronomyImg} 
                alt={t('restaurante.dishAlt')} 
                className="w-full h-[350px] sm:h-[450px] object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Slider Arrows Overlaid */}
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={handlePrev}
                  className="h-10 w-10 bg-[#1c1514]/80 text-[#fcfbf9] hover:bg-[#c5a880] hover:text-[#1c1514] flex items-center justify-center rounded-none shadow-lg transition-all duration-300"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleNext}
                  className="h-10 w-10 bg-[#1c1514]/80 text-[#fcfbf9] hover:bg-[#c5a880] hover:text-[#1c1514] flex items-center justify-center rounded-none shadow-lg transition-all duration-300"
                  aria-label="Próximo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Slider Indicator & Active Dish Details Card */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1c1514] via-[#1c1514]/80 to-transparent p-6 text-[#fcfbf9]">
                <span className="text-[10px] text-[#c5a880] uppercase tracking-widest font-semibold block mb-1">
                  {t('restaurante.featuredDish')}
                </span>
                <p className="text-xs font-semibold tracking-wide font-section">
                  {slides[currentSlide].dish}
                </p>

                {/* Dot markers */}
                <div className="flex space-x-2 mt-4">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1.5 transition-all duration-300 rounded-full ${
                        currentSlide === i ? 'w-6 bg-[#c5a880]' : 'w-1.5 bg-[#fcfbf9]/30'
                      }`}
                      aria-label={`Ir para slide ${i+1}`}
                    ></button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
