import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Import images from assets
import heroBg from '../assets/vinicola_hero.png';
import architectureImg from '../assets/architecture.png';
import barricaImg from '../assets/barrica_uvva.png';
import grapesImg from '../assets/grapes.png';
import soloBadgeImg from '../assets/solo_badge.png';
import vineyardImg from '../assets/vineyard.png';
import vinicolaPanoramicaImg from '../assets/vinicola_panoramica.png';
import arenitoDishImg from '../assets/arenito_dish.png';
import toursHeroBannerImg from '../assets/tours_hero_banner.png';
import logoUvva from '../assets/logo-uvva.png';

export default function VinicolaPage({ setView }) {
  const [activeTerroirSlide, setActiveTerroirSlide] = useState(0);
  const { t } = useLanguage();

  // Always scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const terroirSlides = [
    {
      id: 1,
      image: architectureImg,
      alt: t('vinicolaPage.slide1Alt')
    },
    {
      id: 2,
      image: vinicolaPanoramicaImg,
      alt: t('vinicolaPage.slide2Alt')
    },
    {
      id: 3,
      image: vineyardImg,
      alt: t('vinicolaPage.slide3Alt')
    }
  ];

  const handleTerroirNext = () => {
    setActiveTerroirSlide((prev) => (prev + 1) % terroirSlides.length);
  };

  const handleTerroirPrev = () => {
    setActiveTerroirSlide((prev) => (prev - 1 + terroirSlides.length) % terroirSlides.length);
  };

  return (
    <div className="fade-in bg-[#fcfbf9] text-[#1c1514] font-section min-h-screen">
      
      {/* 1. Cinematic Hero Banner (Visual Widescreen with elegant Overlay) */}
      <section className="relative h-[75vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden bg-[#1c1514]">
        {/* Background Image */}
        <img 
          src={heroBg} 
          alt="Paisagem deslumbrante dos vinhedos da UVVA com cadeiras de madeira" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-103 select-none z-0"
        />
        
        {/* Luxury subtle overlay for visual comfort and readability */}
        <div className="absolute inset-0 bg-black/45 z-10"></div>Base Content

        {/* Centered Premium Content Overlay */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full text-white space-y-6 md:space-y-8 select-none">
          {/* Sub-headline */}
          <span className="text-[#fcfbf9]/95 text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase">
            {t('header.vinicola').toUpperCase()}
          </span>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-title font-light tracking-wide text-white uppercase leading-tight drop-shadow-md">
            {t('vinicolaPage.heroTitle')}
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-[#fcfbf9]/90 font-light font-section max-w-2xl mx-auto leading-relaxed tracking-wider drop-shadow-md">
            {t('vinicolaPage.heroDesc')}
          </p>

          {/* Button: ASSISTA AO VÍDEO ▶ */}
          <div className="pt-2 sm:pt-4">
            <button 
              className="group border border-[#fcfbf9]/45 hover:border-white text-white hover:bg-white hover:text-[#1c1514] font-semibold text-[10px] sm:text-xs tracking-[0.2em] uppercase py-3.5 px-8 transition-all duration-300 transform active:scale-95 cursor-pointer rounded-none shadow-lg flex items-center gap-2"
            >
              <span>{t('vinicolaPage.watchVideo')}</span>
              <span className="text-[8px] sm:text-[10px]">▶</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Primeiro Bloco Editorial (Altitude e Terroir) */}
      <section className="py-16 sm:py-24 bg-[#fcfbf9] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
          
          <div className="space-y-3">
            <span className="text-[#c5a880] text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold block leading-none">
              {t('vinicolaPage.terroirTagline')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-light leading-tight tracking-wide text-[#1c1514] uppercase">
              {t('vinicolaPage.terroirTitle')}
            </h2>
          </div>

          <div className="h-px w-20 bg-[#c5a880]/30 mx-auto"></div>

          <div className="space-y-6 text-sm sm:text-base text-[#1c1514]/80 leading-relaxed font-light font-section max-w-3xl mx-auto">
            <p>
              {t('vinicolaPage.terroirDesc1')}
            </p>
            <p>
              {t('vinicolaPage.terroirDesc2')}
            </p>
          </div>

        </div>
      </section>

      {/* 3. Seção Arquitetura Contemporânea (Asymmetric Grid) */}
      <section className="pt-12 pb-24 sm:pt-16 sm:pb-36 bg-[#fcfbf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left side: Interactive Image Slider with frame */}
            <div className="relative group">
              {/* Elegant luxury framing wrapper */}
              <div className="absolute inset-0 border border-[#c5a880]/20 transform translate-x-4 translate-y-4 z-0 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
              
              <div className="relative z-10 overflow-hidden shadow-2xl h-[300px] sm:h-[380px] border border-[#c5a880]/20">
                <div className="relative w-full h-full overflow-hidden bg-transparent">
                  {/* Sliding Image strip */}
                  <div 
                    className="flex h-full transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${activeTerroirSlide * 100}%)` }}
                  >
                    {terroirSlides.map((slide) => (
                      <div key={slide.id} className="w-full h-full shrink-0 relative">
                        <img 
                          src={slide.image} 
                          alt={slide.alt} 
                          className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-[2000ms] ease-out select-none"
                        />
                        {/* Soft premium lighting overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
                      </div>
                    ))}
                  </div>

                  {/* Slider Controls: Minimalist transparent arrows */}
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 z-20 pointer-events-none">
                    <button
                      onClick={handleTerroirPrev}
                      className="h-8 w-8 bg-[#1c1514]/65 backdrop-blur-xs border border-[#fcfbf9]/15 hover:border-[#c5a880] text-[#fcfbf9] hover:text-[#c5a880] flex items-center justify-center rounded-none transition-all duration-300 pointer-events-auto cursor-pointer focus:outline-none"
                      aria-label="Slide anterior"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleTerroirNext}
                      className="h-8 w-8 bg-[#1c1514]/65 backdrop-blur-xs border border-[#fcfbf9]/15 hover:border-[#c5a880] text-[#fcfbf9] hover:text-[#c5a880] flex items-center justify-center rounded-none transition-all duration-300 pointer-events-auto cursor-pointer focus:outline-none"
                      aria-label="Próximo slide"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Progress track bullets */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {terroirSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTerroirSlide(idx)}
                        className={`h-1 transition-all duration-500 rounded-full cursor-pointer focus:outline-none ${
                          activeTerroirSlide === idx ? 'w-5 bg-[#c5a880]' : 'w-1 bg-[#fcfbf9]/40 hover:bg-[#fcfbf9]/80'
                        }`}
                        aria-label={`Ir para slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Editorial text block */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <span className="text-[#c5a880] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold block leading-none">
                  {t('vinicolaPage.section3Tagline')}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-title font-light tracking-wide uppercase leading-tight text-[#1c1514]">
                  {t('vinicolaPage.section3Title')}
                </h3>
              </div>
              
              <p className="text-xs sm:text-sm md:text-base text-[#1c1514]/75 leading-relaxed font-light font-section">
                {t('vinicolaPage.section3Desc')}
              </p>
              
              <div className="pt-2">
                <div className="flex items-center space-x-2 text-[#c5a880] font-semibold text-[10px] sm:text-xs tracking-widest uppercase">
                  <span>{t('vinicolaPage.section3Footer')}</span>
                  <div className="h-px w-8 bg-[#c5a880]/40"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Seção "Do Vinho à Uva" (Asymmetric Full-Bleed Right Edge Layout) */}
      <section className="py-20 sm:py-28 bg-[#fcfbf9] overflow-hidden relative">
        
        {/* Full-bleed right image (visible on desktop) starting at the absolute limit of the screen (right edge) */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 h-full hidden lg:block z-0 group">
          <div className="w-full h-full overflow-hidden bg-[#1c1514]/5 border-l border-[#c5a880]/15">
            <img 
              src={barricaImg} 
              alt="Barrica de Carvalho francês envelhecendo os cortes nobres UVVA" 
              className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-103 transition-transform duration-[1200ms] ease-out select-none"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
            
            {/* Left Column (Content Box): Overlaps image on desktop */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 md:p-16 shadow-2xl border border-[#c5a880]/15 z-20 relative max-w-2xl lg:max-w-none mx-auto lg:mx-0">
              <div className="space-y-6 sm:space-y-8">
                
                {/* Title */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-title font-light tracking-wide uppercase leading-tight text-[#1c1514]">
                  {t('vinicolaPage.section4Title')}
                </h3>
                
                {/* Custom Mockup Paragraphs */}
                <div className="space-y-5 text-sm sm:text-base text-[#1c1514]/80 leading-relaxed font-light font-section text-justify">
                  <p>
                    {t('vinicolaPage.section4Desc1')}
                  </p>
                  <p>
                    {t('vinicolaPage.section4Desc2')}
                  </p>
                  <p>
                    {t('vinicolaPage.section4Desc3')}
                  </p>
                  <p>
                    {t('vinicolaPage.section4Desc4')}
                  </p>
                </div>

                {/* Button: Gold/brown solid background button with right arrow */}
                <div className="pt-4">
                  <button
                    onClick={() => setView('vinhos')}
                    className="bg-[#c5a880] hover:bg-[#b3956d] text-white font-semibold text-xs tracking-[0.2em] uppercase py-4 px-8 transition-all duration-300 transform active:scale-95 cursor-pointer rounded-none shadow-md flex items-center gap-3 group"
                  >
                    <span>{t('vinicolaPage.section4Button')}</span>
                    <span className="text-sm transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Empty grid space for desktop since the absolute image covers the right side */}
            <div className="hidden lg:block lg:col-span-5 pointer-events-none"></div>

            {/* Mobile Image (visible only on mobile, placed below the content box) */}
            <div className="lg:hidden w-full overflow-hidden z-10 shadow-xl group mt-8">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 border border-[#c5a880]/15">
                <img 
                  src={barricaImg} 
                  alt="Barrica de Carvalho francês envelhecendo os cortes nobres UVVA" 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-[1200ms] ease-out select-none"
                />
              </div>
            </div>

          </div>
          
        </div>
      </section>

      {/* 5. Seção dos Três Pilares (Distintivos Circulares) */}
      <section className="py-20 sm:py-28 bg-[#fcfbf9] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 text-center">
            
            {/* Pilar 1: Microclima */}
            <div className="flex flex-col items-center space-y-5 group">
              <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border border-[#c5a880]/35 p-1.5 bg-[#fcfbf9] transition-all duration-500 group-hover:border-[#c5a880] group-hover:scale-103 shadow-md">
                <img 
                  src={grapesImg} 
                  alt="Grapes close-up representing the unique microclimate" 
                  className="h-full w-full object-cover rounded-full select-none" 
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold tracking-[0.2em] text-[#c5a880] uppercase">
                  {t('vinicolaPage.pillar1Title')}
                </h4>
                <p className="text-[10px] sm:text-xs text-[#1c1514]/65 uppercase tracking-widest max-w-[200px] leading-relaxed mx-auto font-medium">
                  {t('vinicolaPage.pillar1Desc')}
                </p>
              </div>
            </div>

            {/* Pilar 2: Solo */}
            <div className="flex flex-col items-center space-y-5 group">
              <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border border-[#c5a880]/35 p-1.5 bg-[#fcfbf9] transition-all duration-500 group-hover:border-[#c5a880] group-hover:scale-103 shadow-md">
                <img 
                  src={soloBadgeImg} 
                  alt="Terroir soil detail representation" 
                  className="h-full w-full object-cover rounded-full select-none" 
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold tracking-[0.2em] text-[#c5a880] uppercase">
                  {t('vinicolaPage.pillar2Title')}
                </h4>
                <p className="text-[10px] sm:text-xs text-[#1c1514]/65 uppercase tracking-widest max-w-[200px] leading-relaxed mx-auto font-medium">
                  {t('vinicolaPage.pillar2Desc')}
                </p>
              </div>
            </div>

            {/* Pilar 3: Dupla Poda */}
            <div className="flex flex-col items-center space-y-5 group">
              <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border border-[#c5a880]/35 p-1.5 bg-[#fcfbf9] transition-all duration-500 group-hover:border-[#c5a880] group-hover:scale-103 shadow-md">
                <img 
                  src={vineyardImg} 
                  alt="Green rows vineyard representing pruning" 
                  className="h-full w-full object-cover rounded-full select-none" 
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold tracking-[0.2em] text-[#c5a880] uppercase">
                  {t('vinicolaPage.pillar3Title')}
                </h4>
                <p className="text-[10px] sm:text-xs text-[#1c1514]/65 uppercase tracking-widest max-w-[200px] leading-relaxed mx-auto font-medium">
                  {t('vinicolaPage.pillar3Desc')}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Banner Panorâmico Widescreen (Caminho dos Vinhedos) */}
      <section className="relative py-28 md:py-36 bg-[#1c1514] overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={vinicolaPanoramicaImg} 
            alt="Vinhedos under twilight light in Chapada Diamantina" 
            className="w-full h-full object-cover select-none brightness-90"
          />
          {/* Deep elegant overlay */}
          <div className="absolute inset-0 bg-[#140f0e]/75 backdrop-blur-3xs"></div>
        </div>

        {/* Floating Centered Poetry Quote */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-base sm:text-lg md:text-xl text-[#fcfbf9]/90 font-title font-light italic leading-relaxed tracking-wider">
            {t('vinicolaPage.poetryQuote')}
          </p>
          <div className="h-0.5 w-16 bg-[#c5a880]/40 mx-auto mt-6"></div>
        </div>
      </section>

      {/* 7. Seção de Links Rápidos de Rodapé (Alta Gastronomia vs Nossos Tours) */}
      <section className="py-16 sm:py-24 bg-[#fcfbf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            
            {/* Column Left: Alta Gastronomia */}
            <div 
              onClick={() => setView('restaurante')}
              className="relative h-[250px] sm:h-[320px] md:h-[360px] group overflow-hidden cursor-pointer flex flex-col items-center justify-center text-center p-6 border border-[#c5a880]/15 shadow-md hover:shadow-2xl transition-all duration-500 rounded-none bg-[#140f0e]"
            >
              {/* Background image zoom on hover */}
              <div className="absolute inset-0 z-0 transition-transform duration-[1500ms] ease-out transform scale-100 group-hover:scale-103">
                <img 
                  src={arenitoDishImg} 
                  alt="Gourmet dish at Restaurante Arenito" 
                  className="w-full h-full object-cover select-none"
                />
              </div>
              {/* Gold hue gradient overlay on hover */}
              <div className="absolute inset-0 bg-[#140f0e]/75 group-hover:bg-[#140f0e]/65 transition-colors duration-500 z-10"></div>
              
              <div className="relative z-20 space-y-3">
                <span className="text-[#c5a880] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold block">
                  {t('vinicolaPage.link1Tagline')}
                </span>
                <h4 className="text-xl sm:text-2xl font-title font-light text-[#fcfbf9] tracking-wide uppercase select-none">
                  {t('vinicolaPage.link1Title')}
                </h4>
                <div className="h-px w-8 bg-[#c5a880]/50 mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>

            {/* Column Right: Nossos Tours */}
            <div 
              onClick={() => setView('tours')}
              className="relative h-[250px] sm:h-[320px] md:h-[360px] group overflow-hidden cursor-pointer flex flex-col items-center justify-center text-center p-6 border border-[#c5a880]/15 shadow-md hover:shadow-2xl transition-all duration-500 rounded-none bg-[#140f0e]"
            >
              {/* Background image zoom on hover */}
              <div className="absolute inset-0 z-0 transition-transform duration-[1500ms] ease-out transform scale-100 group-hover:scale-103">
                <img 
                  src={toursHeroBannerImg} 
                  alt="People taking a vineyard tour during twilight sunset" 
                  className="w-full h-full object-cover select-none"
                />
              </div>
              {/* Gold hue gradient overlay on hover */}
              <div className="absolute inset-0 bg-[#140f0e]/75 group-hover:bg-[#140f0e]/65 transition-colors duration-500 z-10"></div>
              
              <div className="relative z-20 space-y-3">
                <span className="text-[#c5a880] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold block">
                  {t('vinicolaPage.link2Tagline')}
                </span>
                <h4 className="text-xl sm:text-2xl font-title font-light text-[#fcfbf9] tracking-wide uppercase select-none">
                  {t('vinicolaPage.link2Title')}
                </h4>
                <div className="h-px w-8 bg-[#c5a880]/50 mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}   </div>

          </div>
        </div>
      </section>

    </div>
  );
}
