import architectureImg from '../assets/architecture.png';
import grapesImg from '../assets/grapes.png';
import sunsetImg from '../assets/sunset.png';
import logoUvva from '../assets/logo-uvva.png';
import { useLanguage } from '../context/LanguageContext';

export default function NossaHistoria({ setView }) {
  const { t } = useLanguage();

  return (
    <section id="historia" className="font-section overflow-hidden w-full">
      
      {/* Top Half: Light Background (Aligns with Loja Online above) */}
      <div className="bg-[#fcfbf9] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            
            {/* Block 1: History Intro Text */}
            <div className="bg-[#fcfbf9] p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-5 min-h-[360px] md:min-h-[380px]">
              <span className="text-[#c5a880] text-xs uppercase tracking-[0.25em] font-semibold">
                {t('nossaHistoria.tagline')}
              </span>
              <h2 className="text-3xl font-title font-light text-[#1c1514] leading-tight">
                {t('nossaHistoria.title')}
              </h2>
              <p className="text-xs sm:text-sm text-[#1c1514]/70 leading-relaxed">
                {t('nossaHistoria.description')}
              </p>
            </div>

            {/* Block 2: Architecture Image */}
            <div className="relative h-[360px] md:h-auto overflow-hidden group">
              <img 
                src={architectureImg} 
                alt="Arquitetura de Concreto da Vinícola UVVA" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[#1c1514]/10 group-hover:bg-[#1c1514]/0 transition-colors duration-500"></div>
            </div>

            {/* Block 3: Solid Warm Beige Block */}
            <div className="bg-[#f2ebd9] text-[#1c1514] p-8 sm:p-12 lg:p-16 flex flex-col justify-between min-h-[360px] md:min-h-[380px] hover:bg-[#eae1c8] transition-colors duration-500 md:col-span-2 lg:col-span-1">
              <span className="text-[#1c1514]/40 text-xs uppercase tracking-widest font-bold">
                {t('nossaHistoria.archTag')}
              </span>
              <div className="space-y-4 my-auto">
                <h3 className="text-xl sm:text-2xl font-title font-light text-[#1c1514] leading-snug">
                  {t('nossaHistoria.archTitle')}
                </h3>
                <p className="text-xs text-[#1c1514]/70 leading-relaxed">
                  {t('nossaHistoria.archDesc')}
                </p>
              </div>
              <a 
                href="#vinicola" 
                onClick={(e) => {
                  e.preventDefault();
                  if (setView) setView('vinicola');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1c1514] hover:text-[#c5a880] transition-colors duration-300 flex items-center gap-2 group pt-4"
              >
                {t('nossaHistoria.ctaHistory')} 
                <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Half: Dark Background (Aligns with ExperienciaUnica below) */}
      <div className="bg-[#1c1514] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            
            {/* Block 4: Grapes Image */}
            <div className="relative h-[360px] md:h-auto overflow-hidden group">
              <img 
                src={grapesImg} 
                alt="Uvas de Autor Vinícola UVVA" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[#1c1514]/20 group-hover:bg-[#1c1514]/0 transition-colors duration-500"></div>
            </div>

            {/* Block 5: Monogram + Poetry Quote */}
            <div className="bg-[#231a18] p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-center space-y-6 min-h-[360px] md:min-h-[380px] border-y md:border-y-0 md:border-x border-[#c5a880]/10">
              <div className="w-12 h-12 opacity-65">
                <img src={logoUvva} alt="UVVA Monogram" className="w-full h-full filter invert brightness-200" />
              </div>
              <p className="text-sm sm:text-base font-title italic text-[#c5a880] max-w-xs leading-relaxed">
                {t('nossaHistoria.poetry')}
              </p>
              <div className="h-0.5 w-12 bg-[#c5a880]/30"></div>
              <span className="text-[10px] uppercase tracking-widest text-[#fcfbf9]/40 font-semibold">
                {t('nossaHistoria.terroir')}
              </span>
            </div>

            {/* Block 6: Wine Glass Image */}
            <div className="relative h-[360px] md:h-auto overflow-hidden group md:col-span-2 lg:col-span-1">
              <img 
                src={sunsetImg} 
                alt="Taça de Vinho Tinto UVVA" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[#1c1514]/20 group-hover:bg-[#1c1514]/0 transition-colors duration-500"></div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
