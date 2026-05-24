import heroImg from '../assets/hero.png';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-uvva-brown keep-dark">
      {/* Background Image with Dark Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Vinícola UVVA Adega e Vinhos" 
          className="w-full h-full object-cover object-center scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
        />
        {/* Dark Vignette and Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1514] via-[#1c1514]/40 to-[#1c1514]/70 z-1"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        
        {/* Tiny Tagline */}
        <span className="inline-block text-[#c5a880] text-xs uppercase tracking-[0.3em] font-semibold mb-6 animate-pulse">
          {t('hero.tagline')}
        </span>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-title font-light text-[#fcfbf9] leading-tight mb-8 max-w-4xl mx-auto drop-shadow-2xl">
          {t('hero.title')}
        </h1>

        {/* Description / Subtext (Optional for readability but keeping it ultra clean) */}
        <p className="text-sm md:text-base text-[#fcfbf9]/75 font-section max-w-xl mx-auto mb-12 leading-relaxed tracking-wide">
          {t('hero.description')}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#loja" 
            className="w-full sm:w-auto bg-[#c5a880] hover:bg-[#b3956d] text-[#1c1514] font-semibold text-xs tracking-[0.2em] uppercase py-4.5 px-8 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center shadow-lg font-section"
          >
            {t('hero.ctaCollection')}
          </a>
          <a 
            href="#experiencias" 
            className="w-full sm:w-auto glass-button text-[#fcfbf9] font-semibold text-xs tracking-[0.2em] uppercase py-4.5 px-8 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center shadow-lg font-section"
          >
            {t('hero.ctaReserve')}
          </a>
        </div>

      </div>

      {/* Subtle bottom arrow indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 hidden lg:block animate-bounce">
        <a href="#loja" className="text-[#c5a880]/50 hover:text-[#c5a880] transition-colors duration-300" aria-label="Scroll Down">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </section>
  );
}
