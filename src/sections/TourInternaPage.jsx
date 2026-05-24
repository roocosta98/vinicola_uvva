import { useEffect, useState } from 'react';
import { Clock, Users, Globe, MapPin } from 'lucide-react';
import tourBannerImg from '../assets/tours_hero_banner.png'; 
import winesImg from '../assets/wines.png';
import wineryExterior from '../assets/architecture.png';
import vineyardImg from '../assets/vineyard.png';
import TourBookingModal from '../components/TourBookingModal';
import { useLanguage } from '../context/LanguageContext';

export default function TourInternaPage({ setView, selectedTour }) {
  const { t, currentLanguage } = useLanguage();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fallback to default or use selected tour
  const tourInfo = selectedTour ? {
    title: selectedTour.title,
    subtitle: selectedTour.tag || 'VINÍCOLA UVVA',
    description: selectedTour.description,
    price: selectedTour.price,
    winesTasted: [
      { id: 1, name: 'Chardonnay', bottleIndex: 0 },
      { id: 2, name: 'Cabernet Franc', bottleIndex: 3 },
      { id: 3, name: 'Sauvignon Blanc', bottleIndex: 2 },
      { id: 4, name: 'Blend Tinto', bottleIndex: 1 }
    ],
    fullDescription: selectedTour.fullDescription,
    included: selectedTour.included,
    image: selectedTour.image,
    duration: selectedTour.duration,
    groupSize: selectedTour.groupSize
  } : {
    title: t('toursPage.tours.3.title') || 'EXPERIÊNCIA UVVA',
    subtitle: t('toursPage.tours.3.tag') || 'VINÍCOLA UVVA | TOUR COMPLETO COM DEGUSTAÇÃO',
    description: t('toursPage.tours.3.description') || 'Tour completo (1h30 min)\nDegustação de vinhos (30min)',
    price: t('toursPage.tours.3.price') || 'R$ 310,00 por pessoa',
    winesTasted: [
      { id: 1, name: 'Chardonnay', bottleIndex: 0 },
      { id: 2, name: 'Cabernet Franc', bottleIndex: 3 },
      { id: 3, name: 'Sauvignon Blanc', bottleIndex: 2 },
      { id: 4, name: 'Blend Tinto', bottleIndex: 1 }
    ],
    fullDescription: t('toursPage.tours.3.fullDescription') || 'Ao longo de duas horas, o visitante é guiado por um enólogo, que apresenta o projeto da Vinícola UVVA...',
    included: t('toursPage.tours.3.included') || [
      'A visita será guiada por um enólogo da vinícola.',
      'Apresentação da história da família e do projeto.',
      'Visita aos vinhedos.',
      'Degustação de 4 Vinhos.'
    ],
    image: tourBannerImg,
    duration: t('toursPage.tours.3.duration') || '2h00',
    groupSize: t('toursPage.tours.3.groupSize') || 'Até 10 pessoas'
  };

  return (
    <div className="bg-[#fcfbf9] text-[#1c1514] font-section min-h-screen fade-in">
      
      {/* ──────────────────────── Hero Banner ──────────────────────── */}
      <section className="relative h-[65vh] md:h-[75vh] w-full flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={tourInfo.image || tourBannerImg} 
            alt={tourInfo.title} 
            className="w-full h-full object-cover brightness-[0.85]"
          />
          {/* Subtle gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1514]/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="max-w-2xl text-white space-y-6">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
              {tourInfo.subtitle}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-title font-light tracking-wide leading-tight">
              {tourInfo.title}
            </h1>
            <p className="text-sm sm:text-base font-light text-white/90 whitespace-pre-line leading-relaxed">
              {tourInfo.description}
            </p>
            <div className="pt-2">
              <p className="text-2xl sm:text-3xl font-title font-light mb-6">
                {tourInfo.price}
              </p>
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-transparent border border-white hover:bg-white hover:text-[#1c1514] text-white font-semibold text-xs tracking-[0.2em] uppercase py-3.5 px-8 transition-all duration-300 cursor-pointer"
              >
                {t('tourInternaPage.bookBtn') || (currentLanguage === 'EN' ? 'Book Tour' : currentLanguage === 'ES' ? 'Reservar Tour' : 'Reservar Tour')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Breadcrumb ──────────────────────── */}
      <div className="bg-[#fcfbf9] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#1c1514]/50 font-semibold">
            <button onClick={() => setView('home')} className="hover:text-[#c5a880] transition-colors cursor-pointer">
              {currentLanguage === 'EN' ? 'Home' : currentLanguage === 'ES' ? 'Inicio' : 'Home'}
            </button>
            <span>/</span>
            <button onClick={() => setView('tours')} className="hover:text-[#c5a880] transition-colors cursor-pointer">{t('toursPage.title')}</button>
            <span>/</span>
            <span className="text-[#c5a880]">{tourInfo.title}</span>
          </nav>
        </div>
      </div>

      {/* ──────────────────────── Vinhos Degustados (Overlapping Section) ──────────────────────── */}
      <section className="relative flex flex-col pt-12">
        {/* Title part (White Background) */}
        <div className="bg-[#fcfbf9] text-center pb-20 relative z-20">
          <h2 className="text-2xl sm:text-3xl font-title font-light tracking-wider uppercase text-[#1c1514]">
            {currentLanguage === 'EN' ? 'Wines Tasted on the Tour' : currentLanguage === 'ES' ? 'Vinos Degustados en el Tour' : 'Vinhos Degustados no Tour'}
          </h2>
        </div>

        {/* Overlapping Magic */}
        <div className="relative w-full bg-gradient-to-b from-[#fcfbf9] from-50% to-[#28201f] to-50% flex justify-center py-12 z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
              {tourInfo.winesTasted.map((wine) => (
                <div key={wine.id} className="relative h-[400px] w-[140px] sm:h-[500px] sm:w-[180px] md:h-[600px] md:w-[220px] transform hover:scale-105 transition-transform duration-700 ease-out cursor-pointer group flex-shrink-0">
                  {/* Glowing shadow behind the bottle for separation */}
                  <div className="absolute inset-0 bg-[#c5a880]/5 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Bottle Sprite Mask */}
                  <div className="absolute inset-0 overflow-hidden z-10 flex justify-center">
                    <img 
                      src={winesImg} 
                      alt={wine.name}
                      className="absolute max-w-none h-full object-contain"
                      style={{ 
                        left: `-${wine.bottleIndex * 100}%`,
                        width: '400%', 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Visita Técnica & Incluso ──────────────────────── */}
      <section className="bg-[#28201f] text-[#fcfbf9] pt-12 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            
            {/* Left Column: Visita Técnica */}
            <div className="space-y-6">
              <h3 className="text-[14px] sm:text-[15px] font-title font-light tracking-[0.25em] uppercase text-white mb-8">
                {t('tourInternaPage.technicalVis')}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                {tourInfo.fullDescription}
              </p>
            </div>

            {/* Right Column: Incluso no Tour */}
            <div className="space-y-6">
              <h3 className="text-[14px] sm:text-[15px] font-title font-light tracking-[0.25em] uppercase text-white mb-8">
                {t('tourInternaPage.includesLabel')}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-white/70 font-light">
                {tourInfo.included && tourInfo.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 bg-[#c5a880] rounded-full shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────── Grid Informativo (Mosaico) ──────────────────────── */}
      <section className="w-full max-w-[1600px] mx-auto pt-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-none lg:grid-rows-2">
          
          {/* Row 1, Col 1: Dias e Horários */}
          <div className="bg-white p-12 flex flex-col justify-center h-[350px]">
            <h4 className="text-xl font-title font-light mb-6 text-[#1c1514]">
              {currentLanguage === 'EN' ? 'Days & Hours' : currentLanguage === 'ES' ? 'Días y Horarios' : 'Dias e Horários'}
            </h4>
            <ul className="space-y-4 text-[11px] text-[#1c1514]/70 font-light">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-0.5 w-0.5 bg-[#1c1514] rounded-full shrink-0"></span>
                <span>
                  {currentLanguage === 'EN'
                    ? 'Monday, Thursday, Friday, and Sunday (including holidays) at 09:30 AM, 11:00 AM, and 02:30 PM. Reservations only.'
                    : currentLanguage === 'ES'
                      ? 'Lunes, jueves, viernes y domingos (incluidos festivos) a las 09h30, 11h y 14h30. Solo con reserva.'
                      : 'Segunda, quinta, sexta e domingo (inclusive aos feriados) 09h30, 11h e 14h30. Apenas com reservas.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-0.5 w-0.5 bg-[#1c1514] rounded-full shrink-0"></span>
                <span>
                  {currentLanguage === 'EN'
                    ? 'Friday (Inclusive Visit) at the Winery, 09:30 AM, 10:00 AM, 02:00 PM, and 02:30 PM. Reservations only.'
                    : currentLanguage === 'ES'
                      ? 'Viernes (Visita Inclusiva) en la Bodega, 09h30, 10h, 14h y 14h30. Solo con reserva.'
                      : 'Sexta-feira (Visita Inclusiva) na Vinícola, 09h30, 10h, 14h e 14h30. Apenas com reservas.'}
                </span>
              </li>
            </ul>
          </div>

          {/* Row 1, Col 2: Image Winery Exterior */}
          <div className="h-[350px]">
            <img src={wineryExterior} alt="Arquitetura Vinícola UVVA" className="w-full h-full object-cover" />
          </div>

          {/* Row 1, Col 3: Idioma */}
          <div className="bg-[#28201f] p-12 flex flex-col justify-center items-center text-center h-[350px]">
            <h4 className="text-xl font-title font-light mb-4 text-white">{t('tourInternaPage.languageLabel')}</h4>
            <p className="text-[11px] text-white/70 font-light max-w-[200px]">
              {currentLanguage === 'EN'
                ? 'Portuguese - English option subject to availability.'
                : currentLanguage === 'ES'
                  ? 'Portugués - Opción en inglés sujeta a disponibilidad.'
                  : 'Português - Opção em inglês sujeita à disponibilidade.'}
            </p>
          </div>

          {/* Row 2, Col 1: Image Vineyards */}
          <div className="h-[350px]">
            <img src={vineyardImg} alt="Vinhedos UVVA" className="w-full h-full object-cover" />
          </div>

          {/* Row 2, Col 2: Duração */}
          <div className="bg-[#1c1514] p-12 flex flex-col justify-center items-center text-center h-[350px]">
            <h4 className="text-xl font-title font-light mb-2 text-white">
              {currentLanguage === 'EN' ? 'Approximate Duration' : currentLanguage === 'ES' ? 'Duración Aproximada' : 'Duração aproximada'}
            </h4>
            <p className="text-xl font-title font-light text-white">
              {tourInfo.duration}
            </p>
          </div>

          {/* Row 2, Col 3: Limite de visitantes */}
          <div className="bg-[#f4f1ec] p-12 flex flex-col justify-center items-center text-center h-[350px]">
            <h4 className="text-xl font-title font-light mb-4 text-[#c5a880]">
              {currentLanguage === 'EN' ? 'Group size limit' : currentLanguage === 'ES' ? 'Límite de visitantes por grupo' : 'Limite de visitantes por grupo'}
            </h4>
            <p className="text-[11px] text-[#1c1514]/70 font-light">
              {tourInfo.groupSize}
            </p>
          </div>

        </div>
      </section>

      <TourBookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        tour={tourInfo} 
      />
    </div>
  );
}
