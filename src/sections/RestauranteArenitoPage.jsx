import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Clock, Compass, MapPin, ChevronDown, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import bgHero from '../assets/arenito_hero.jpg';
import imgExperience from '../assets/arenito_experience.jpg';
import bgDish from '../assets/arenito_dish.png';
import gastronomyImg from '../assets/gastronomy.png';
import RestauranteBookingModal from '../components/RestauranteBookingModal';
import { useLanguage } from '../context/LanguageContext';

export default function RestauranteArenitoPage() {
  const { t, language } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const getFormattedPrice = (priceBRL, priceUSD) => {
    if (language === 'PT') {
      return `R$ ${priceBRL}`;
    }
    return `$ ${priceUSD}`;
  };

  // Lock/Unlock body scroll when menu modal is open to prevent background scrolling artifacts
  useEffect(() => {
    if (isMenuModalOpen || isBookingModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMenuModalOpen, isBookingModalOpen]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % experienceSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + experienceSlides.length) % experienceSlides.length);
  };

  const experienceSlides = [
    {
      img: imgExperience,
      alt: t('restauranteArenitoPage.expSlide1Alt'),
      title: t('restauranteArenitoPage.expSlide1Title'),
      desc: t('restauranteArenitoPage.expSlide1Desc')
    },
    {
      img: bgDish,
      alt: t('restauranteArenitoPage.expSlide2Alt'),
      title: t('restauranteArenitoPage.expSlide2Title'),
      desc: t('restauranteArenitoPage.expSlide2Desc')
    },
    {
      img: gastronomyImg,
      alt: t('restauranteArenitoPage.expSlide3Alt'),
      title: t('restauranteArenitoPage.expSlide3Title'),
      desc: t('restauranteArenitoPage.expSlide3Desc')
    }
  ];

  const faqItems = [
    {
      question: t('restauranteArenitoPage.faq1Q'),
      answer: t('restauranteArenitoPage.faq1A')
    },
    {
      question: t('restauranteArenitoPage.faq2Q'),
      answer: t('restauranteArenitoPage.faq2A')
    },
    {
      question: t('restauranteArenitoPage.faq3Q'),
      answer: t('restauranteArenitoPage.faq3A')
    },
    {
      question: t('restauranteArenitoPage.faq4Q'),
      answer: t('restauranteArenitoPage.faq4A')
    },
    {
      question: t('restauranteArenitoPage.faq5Q'),
      answer: t('restauranteArenitoPage.faq5A')
    },
    {
      question: t('restauranteArenitoPage.faq6Q'),
      answer: t('restauranteArenitoPage.faq6A')
    },
    {
      question: t('restauranteArenitoPage.faq7Q'),
      answer: t('restauranteArenitoPage.faq7A')
    }
  ];

  return (
    <div className="fade-in bg-[#fcfbf9]">
      
      {/* 1. Cinematic Hero Section with Red Wine & Smoke Background */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-start pt-24 font-section bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${bgHero})` }}
      >
        {/* Soft, dark gradient luxury overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1514]/70 via-[#1c1514]/50 to-[#1c1514]/90 z-0"></div>

        {/* Ambient atmospheric lighting details */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8 py-16 sm:py-24">
          <div className="space-y-4">
            <span className="text-[#c5a880] text-xs uppercase tracking-[0.3em] font-semibold block animate-fade-in-up">
              {t('restaurante.tagline')}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-title font-light text-[#fcfbf9] leading-tight tracking-wide animate-fade-in-up">
              {t('restauranteArenitoPage.title')}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[#fcfbf9]/75 leading-relaxed max-w-2xl font-light animate-fade-in-up">
            {t('restauranteArenitoPage.heroDesc')}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-5 pt-4 animate-fade-in-up">
            <a 
              href="#reservar-mesa"
              onClick={(e) => { e.preventDefault(); setIsBookingModalOpen(true); }}
              className="w-full sm:w-auto bg-[#c5a880] hover:bg-[#b3956d] text-[#1c1514] font-semibold text-xs tracking-[0.2em] uppercase py-4 px-10 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center shadow-xl cursor-pointer"
            >
              {t('restauranteArenitoPage.btnReserve')}
            </a>
            <a 
              href="#cardapio"
              onClick={(e) => { e.preventDefault(); setIsMenuModalOpen(true); }}
              className="w-full sm:w-auto border border-[#fcfbf9]/30 hover:border-[#c5a880] hover:bg-[#c5a880]/5 text-[#fcfbf9] hover:text-[#c5a880] font-semibold text-xs tracking-[0.2em] uppercase py-4 px-10 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center cursor-pointer"
            >
              {t('restauranteArenitoPage.btnMenu')}
            </a>
          </div>
        </div>
      </section>

      {/* 2. Floating Info Card Row (Horários, Menu, Localização) - Overlapping Hero and Alta Gastronomia */}
      <div className="relative z-20 -mt-16 sm:-mt-24 -mb-16 sm:-mb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-section animate-fade-in-up">
        <div className="bg-[#1c1514] text-[#fcfbf9] shadow-2xl border border-[#c5a880]/25 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#c5a880]/15">
          
          {/* Card 1: Horários */}
          <div className="p-8 sm:p-10 flex flex-col items-center text-center space-y-4 hover:bg-[#c5a880]/5 transition-colors duration-300">
            <div className="h-12 w-12 rounded-full border border-[#c5a880]/20 flex items-center justify-center text-[#c5a880] bg-[#fcfbf9]/5 shadow-sm">
              <Clock className="h-5 w-5 stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#c5a880]">
              {t('restauranteArenitoPage.card1Title')}
            </h3>
            <p className="text-xs text-[#fcfbf9]/70 leading-relaxed max-w-xs">
              {t('restauranteArenitoPage.card1Desc')}
            </p>
          </div>

          {/* Card 2: Menus */}
          <div className="p-8 sm:p-10 flex flex-col items-center text-center space-y-4 hover:bg-[#c5a880]/5 transition-colors duration-300">
            <div className="h-12 w-12 rounded-full border border-[#c5a880]/20 flex items-center justify-center text-[#c5a880] bg-[#fcfbf9]/5 shadow-sm">
              <Compass className="h-5 w-5 stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#c5a880]">
              {t('restauranteArenitoPage.card2Title')}
            </h3>
            <p className="text-xs text-[#fcfbf9]/70 leading-relaxed max-w-xs">
              {t('restauranteArenitoPage.card2Desc')}
            </p>
          </div>

          {/* Card 3: Localização */}
          <div className="p-8 sm:p-10 flex flex-col items-center text-center space-y-4 hover:bg-[#c5a880]/5 transition-colors duration-300">
            <div className="h-12 w-12 rounded-full border border-[#c5a880]/20 flex items-center justify-center text-[#c5a880] bg-[#fcfbf9]/5 shadow-sm">
              <MapPin className="h-5 w-5 stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#c5a880]">
              {t('restauranteArenitoPage.card3Title')}
            </h3>
            <p className="text-xs text-[#fcfbf9]/70 leading-relaxed max-w-xs">
              {t('restauranteArenitoPage.card3Desc')}
            </p>
          </div>

        </div>
      </div>

      {/* 3. Alta Gastronomia / A Experiência Section */}
      <section className="bg-[#fcfbf9] text-[#1c1514] pt-36 pb-24 sm:pt-48 sm:pb-32 font-section overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
            
            {/* Left Column: Image with rotated frame and interactive slider */}
            <div className="w-full lg:w-1/2 relative group px-4">
              <div className="absolute inset-0 bg-[#f2ebd9] transform rotate-3 scale-[0.98] z-0 opacity-60 transition-transform duration-700 group-hover:rotate-1"></div>
              
              <div className="relative z-10 shadow-2xl border border-[#c5a880]/15 overflow-hidden h-[360px] sm:h-[480px]">
                {/* Active Slide Image */}
                <img 
                  src={experienceSlides[activeSlide].img} 
                  alt={experienceSlides[activeSlide].alt} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                />

                {/* Glassmorphism Slide Info Card */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1c1514] via-[#1c1514]/85 to-transparent p-6 text-[#fcfbf9]">
                  <span className="text-[10px] text-[#c5a880] uppercase tracking-widest font-semibold block mb-1">
                    {experienceSlides[activeSlide].title}
                  </span>
                  <p className="text-xs font-light text-[#fcfbf9]/90 font-section leading-relaxed">
                    {experienceSlides[activeSlide].desc}
                  </p>
                </div>

                {/* Slider Control Arrows */}
                <div className="absolute inset-y-0 inset-x-0 flex items-center justify-between px-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={prevSlide}
                    className="h-9 w-9 bg-[#1c1514]/80 text-[#fcfbf9] hover:bg-[#c5a880] hover:text-[#1c1514] flex items-center justify-center rounded-none shadow-lg transition-all duration-300 cursor-pointer"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="h-4.5 w-4.5" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="h-9 w-9 bg-[#1c1514]/80 text-[#fcfbf9] hover:bg-[#c5a880] hover:text-[#1c1514] flex items-center justify-center rounded-none shadow-lg transition-all duration-300 cursor-pointer"
                    aria-label="Próximo"
                  >
                    <ChevronRight className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Bullet Indicators */}
                <div className="absolute top-4 right-4 flex space-x-1.5 bg-[#1c1514]/60 backdrop-blur-sm px-3 py-1.5 rounded-none border border-[#c5a880]/20">
                  {experienceSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeSlide === i ? 'w-4 bg-[#c5a880]' : 'w-1.5 bg-[#fcfbf9]/40'
                      }`}
                      aria-label={`Ir para imagem ${i+1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Copywriting content */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-6">
              <div>
                <span className="text-[#c5a880] text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
                  {t('restaurante.premiumTag')}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-light leading-tight text-[#1c1514]">
                  {t('restauranteArenitoPage.expTitle')}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#1c1514]/75 leading-relaxed">
                {t('restauranteArenitoPage.expDesc')}
              </p>

              <p className="text-xs text-[#1c1514]/60 leading-relaxed italic">
                {t('restauranteArenitoPage.expQuote')}
              </p>

              <div className="pt-4">
                <a 
                  href="#cardapio"
                  onClick={(e) => { e.preventDefault(); setIsMenuModalOpen(true); }}
                  className="inline-flex items-center gap-2 border border-[#1c1514] hover:bg-[#1c1514] hover:text-[#fcfbf9] text-[#1c1514] font-semibold text-xs tracking-[0.2em] uppercase py-4 px-8 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center font-section group"
                >
                  {t('restauranteArenitoPage.btnMenu')} <ArrowRight className="h-4.5 w-4.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Reserve Um Horário (Restricted Width Framed Card Section, not full bleed, sized exactly to max-w-7xl) */}
      <section className="bg-[#fcfbf9] py-8 sm:py-12 font-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="relative rounded-none overflow-hidden shadow-xl border border-[#c5a880]/20 py-6 sm:py-8 px-6 sm:px-12 bg-cover bg-center keep-dark"
            style={{ backgroundImage: `url(${bgDish})` }}
          >
            {/* High contrast overlay restricted inside the card */}
            <div className="absolute inset-0 bg-black/85 z-0"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
              {/* Left side text content aligned left */}
              <div className="text-left space-y-2 max-w-3xl">
                <span className="text-[#c5a880] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold block">
                  {t('restaurante.premiumTag')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-title font-light text-[#fcfbf9] leading-tight tracking-wide">
                  {t('restauranteArenitoPage.reserveTitle')}
                </h2>
                <p className="text-[11px] sm:text-xs text-[#fcfbf9]/75 leading-relaxed">
                  {t('restauranteArenitoPage.reserveDesc')}
                </p>
              </div>
              
              {/* Right side button - left-aligned on mobile, right-aligned on desktop */}
              <div className="shrink-0 self-start md:self-center">
                <a 
                  href="#reservar-mesa-formulario"
                  onClick={(e) => { e.preventDefault(); setIsBookingModalOpen(true); }}
                  className="inline-block bg-[#c5a880] hover:bg-[#b3956d] text-[#1c1514] font-semibold text-xs tracking-[0.2em] uppercase py-3.5 px-7 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-center cursor-pointer whitespace-nowrap"
                >
                  {t('restauranteArenitoPage.reserveBtn')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Accordion Section */}
      <section className="bg-[#fcfbf9] text-[#1c1514] py-24 sm:py-32 font-section border-t border-[#c5a880]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-[#c5a880] text-xs uppercase tracking-[0.25em] font-semibold block">
              {t('restauranteArenitoPage.faqTagline')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-title font-light text-[#1c1514] leading-tight">
              {t('restauranteArenitoPage.faqTitle')}
            </h2>
            <div className="h-[1px] w-12 bg-[#c5a880]/30 mx-auto mt-4"></div>
          </div>

          {/* Accordion list */}
          <div className="space-y-4 pt-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="border-b border-[#c5a880]/15 last:border-b-0 pb-4 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between py-4 text-left font-medium text-sm sm:text-base text-[#1c1514] hover:text-[#c5a880] transition-colors duration-300 cursor-pointer focus:outline-none select-none"
                  >
                    <span>{item.question}</span>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-500 ease-in-out shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-[#c5a880]' : 'text-[#1c1514]/40'
                      }`} 
                    />
                  </button>

                  {/* Animated accordion panel */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-[#1c1514]/65 leading-relaxed pr-8 pb-4 pt-1">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Stunning Premium Menu Modal - Rendered via Portal to escape stacking contexts and sit above fixed headers */}
      {isMenuModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#140f0e]/95 backdrop-blur-md animate-fade-in">
          
          {/* Outer Glass Card Frame */}
          <div className="relative w-full max-w-4xl bg-[#1c1514] border border-[#c5a880]/30 shadow-2xl p-6 sm:p-10 max-h-[85vh] overflow-y-auto flex flex-col font-section animate-fade-in-up">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsMenuModalOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#fcfbf9]/60 hover:text-[#c5a880] p-1.5 transition-colors duration-300 cursor-pointer"
              aria-label="Fechar Cardápio"
            >
              <X className="h-6 w-6 stroke-[1.5]" />
            </button>

            {/* Modal Header */}
            <div className="text-center space-y-3 pb-8 border-b border-[#c5a880]/15">
              <span className="text-[#c5a880] text-xs uppercase tracking-[0.3em] font-semibold block">
                {t('restauranteArenitoPage.menuSubtitle')}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-light text-[#fcfbf9] tracking-wide">
                {t('restauranteArenitoPage.menuTitle')}
              </h2>
              <p className="text-[10px] sm:text-xs text-[#c5a880] tracking-widest uppercase">
                {t('restauranteArenitoPage.menuTagline')}
              </p>
            </div>

            {/* Menu Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 pt-8">
              
              {/* Left Column: Entradas & Sobremesas */}
              <div className="space-y-10">
                
                {/* Category 1: Entradas */}
                <div className="space-y-6">
                  <h3 className="text-[#c5a880] text-sm uppercase tracking-[0.2em] font-semibold border-b border-[#c5a880]/10 pb-2">
                    {t('restauranteArenitoPage.catEntradas')}
                  </h3>
                  
                  {/* Item 1 */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="text-sm font-semibold tracking-wide text-[#fcfbf9]">
                        {t('restauranteArenitoPage.item1Title')}
                      </h4>
                      <span className="text-xs font-semibold text-[#c5a880] shrink-0">{getFormattedPrice(48, 10)}</span>
                    </div>
                    <p className="text-xs text-[#fcfbf9]/60 leading-relaxed font-light">
                      {t('restauranteArenitoPage.item1Desc')}
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="text-sm font-semibold tracking-wide text-[#fcfbf9]">
                        {t('restauranteArenitoPage.item2Title')}
                      </h4>
                      <span className="text-xs font-semibold text-[#c5a880] shrink-0">{getFormattedPrice(52, 11)}</span>
                    </div>
                    <p className="text-xs text-[#fcfbf9]/60 leading-relaxed font-light">
                      {t('restauranteArenitoPage.item2Desc')}
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="text-sm font-semibold tracking-wide text-[#fcfbf9]">
                        {t('restauranteArenitoPage.item3Title')}
                      </h4>
                      <span className="text-xs font-semibold text-[#c5a880] shrink-0">{getFormattedPrice(42, 9)}</span>
                    </div>
                    <p className="text-xs text-[#fcfbf9]/60 leading-relaxed font-light">
                      {t('restauranteArenitoPage.item3Desc')}
                    </p>
                  </div>
                </div>

                {/* Category 2: Sobremesas */}
                <div className="space-y-6">
                  <h3 className="text-[#c5a880] text-sm uppercase tracking-[0.2em] font-semibold border-b border-[#c5a880]/10 pb-2">
                    {t('restauranteArenitoPage.catSobremesas')}
                  </h3>
                  
                  {/* Item 1 */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="text-sm font-semibold tracking-wide text-[#fcfbf9]">
                        {t('restauranteArenitoPage.item7Title')}
                      </h4>
                      <span className="text-xs font-semibold text-[#c5a880] shrink-0">{getFormattedPrice(38, 8)}</span>
                    </div>
                    <p className="text-xs text-[#fcfbf9]/60 leading-relaxed font-light">
                      {t('restauranteArenitoPage.item7Desc')}
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="text-sm font-semibold tracking-wide text-[#fcfbf9]">
                        {t('restauranteArenitoPage.item8Title')}
                      </h4>
                      <span className="text-xs font-semibold text-[#c5a880] shrink-0">{getFormattedPrice(36, 8)}</span>
                    </div>
                    <p className="text-xs text-[#fcfbf9]/60 leading-relaxed font-light">
                      {t('restauranteArenitoPage.item8Desc')}
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Pratos Principais & Harmonização */}
              <div className="space-y-10">
                
                {/* Category 3: Pratos Principais */}
                <div className="space-y-6">
                  <h3 className="text-[#c5a880] text-sm uppercase tracking-[0.2em] font-semibold border-b border-[#c5a880]/10 pb-2">
                    {t('restauranteArenitoPage.catPrincipais')}
                  </h3>
                  
                  {/* Item 1 */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="text-sm font-semibold tracking-wide text-[#fcfbf9]">
                        {t('restauranteArenitoPage.item4Title')}
                      </h4>
                      <span className="text-xs font-semibold text-[#c5a880] shrink-0">{getFormattedPrice(138, 28)}</span>
                    </div>
                    <p className="text-xs text-[#fcfbf9]/60 leading-relaxed font-light">
                      {t('restauranteArenitoPage.item4Desc')}
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="text-sm font-semibold tracking-wide text-[#fcfbf9]">
                        {t('restauranteArenitoPage.item5Title')}
                      </h4>
                      <span className="text-xs font-semibold text-[#c5a880] shrink-0">{getFormattedPrice(145, 30)}</span>
                    </div>
                    <p className="text-xs text-[#fcfbf9]/60 leading-relaxed font-light">
                      {t('restauranteArenitoPage.item5Desc')}
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="text-sm font-semibold tracking-wide text-[#fcfbf9]">
                        {t('restauranteArenitoPage.item6Title')}
                      </h4>
                      <span className="text-xs font-semibold text-[#c5a880] shrink-0">{getFormattedPrice(115, 24)}</span>
                    </div>
                    <p className="text-xs text-[#fcfbf9]/60 leading-relaxed font-light">
                      {t('restauranteArenitoPage.item6Desc')}
                    </p>
                  </div>
                </div>

                {/* Category 4: Bebidas & Harmonização */}
                <div className="space-y-6">
                  <h3 className="text-[#c5a880] text-sm uppercase tracking-[0.2em] font-semibold border-b border-[#c5a880]/10 pb-2">
                    {t('restauranteArenitoPage.catHarmonizacao')}
                  </h3>
                  
                  {/* Item 1 */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="text-sm font-semibold tracking-wide text-[#fcfbf9]">
                        {t('restauranteArenitoPage.item9Title')}
                      </h4>
                      <span className="text-xs font-semibold text-[#c5a880] shrink-0">{getFormattedPrice(35, 7)}</span>
                    </div>
                    <p className="text-xs text-[#fcfbf9]/60 leading-relaxed font-light">
                      {t('restauranteArenitoPage.item9Desc')}
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="text-sm font-semibold tracking-wide text-[#fcfbf9]">
                        {t('restauranteArenitoPage.item10Title')}
                      </h4>
                      <span className="text-xs font-semibold text-[#c5a880] shrink-0">{getFormattedPrice(48, 10)}</span>
                    </div>
                    <p className="text-xs text-[#fcfbf9]/60 leading-relaxed font-light">
                      {t('restauranteArenitoPage.item10Desc')}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Footer Note */}
            <div className="mt-12 pt-6 border-t border-[#c5a880]/15 text-center">
              <p className="text-[10px] text-[#fcfbf9]/40 leading-relaxed max-w-lg mx-auto">
                {t('restauranteArenitoPage.menuFooter')}
              </p>
            </div>

          </div>
        </div>,
        document.body
      )}

      <RestauranteBookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}
