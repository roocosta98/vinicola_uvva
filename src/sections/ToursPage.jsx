import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LayoutGrid, List, ChevronLeft, ChevronRight, X, Clock, DollarSign, Users, Award, ShieldCheck, MapPin } from 'lucide-react';
import toursHero from '../assets/tours_hero_banner.png';
import grapesImg from '../assets/grapes.png';
import sunsetImg from '../assets/sunset.png';
import winesImg from '../assets/wines.png';
import architectureImg from '../assets/architecture.png';
import arenitoExpImg from '../assets/arenito_experience.jpg';
import vineyardImg from '../assets/vineyard.png';
import arenitoHeroImg from '../assets/arenito_hero.jpg';
import arenitoDishImg from '../assets/arenito_dish.png';
import { useLanguage } from '../context/LanguageContext';

export default function ToursPage({ setView, setSelectedTour }) {
  const { t, currentLanguage } = useLanguage();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states inside modal
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    data: '',
    participantes: '2',
    mensagem: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
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
  }, [isModalOpen]);

  // Handle page changes with smooth scroll to breadcrumbs
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const element = document.querySelector('#tours-listing-top');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const translatedTours = t('toursPage.tours') || [];

  const toursData = [
    {
      id: 1,
      isEsgotado: true,
      image: grapesImg,
      ...(translatedTours[0] || {})
    },
    {
      id: 2,
      isEsgotado: false,
      image: sunsetImg,
      ...(translatedTours[1] || {})
    },
    {
      id: 3,
      isEsgotado: true,
      image: winesImg,
      ...(translatedTours[2] || {})
    },
    {
      id: 4,
      isEsgotado: false,
      image: architectureImg,
      ...(translatedTours[3] || {})
    },
    {
      id: 5,
      isEsgotado: false,
      image: arenitoExpImg,
      ...(translatedTours[4] || {})
    },
    {
      id: 6,
      isEsgotado: false,
      image: vineyardImg,
      ...(translatedTours[5] || {})
    },
    {
      id: 7,
      isEsgotado: false,
      image: arenitoDishImg,
      ...(translatedTours[6] || {})
    },
    {
      id: 8,
      isEsgotado: true,
      image: arenitoHeroImg,
      ...(translatedTours[7] || {})
    }
  ];

  // Pagination logic
  const itemsPerPage = 4;
  const totalPages = Math.ceil(toursData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTours = toursData.slice(indexOfFirstItem, indexOfLastItem);

  const handleOpenModal = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
    setFormSubmitted(false);
    // Reset form data
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      data: '',
      participantes: '2',
      mensagem: ''
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedTour(null);
    }, 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="fade-in bg-[#fcfbf9] text-[#1c1514] font-section min-h-screen">
      
      {/* 1. Cinematic Hero Banner */}
      <section 
        className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-start pt-24 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${toursHero})` }}
      >
        {/* Rich dark luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 z-0"></div>

        {/* Ambient warm glow in top left */}
        <div className="absolute top-1/4 left-12 w-80 h-80 bg-[#c5a880]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6 py-12 sm:py-20 animate-fade-in-up">
          <div className="space-y-2">
            <span className="text-[#c5a880] text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-semibold block">
              {currentLanguage === 'EN' ? 'UVVA WINERY TOURS' : currentLanguage === 'ES' ? 'BODEGA UVVA TOURS' : 'VINÍCOLA UVVA TOURS'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-title font-light text-[#fcfbf9] leading-tight tracking-wide max-w-3xl">
              {(t('toursPage.subtitle') || 'VIVA UMA EXPERIÊNCIA ÚNICA.').toUpperCase()}
            </h1>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-[#fcfbf9]/80 leading-relaxed max-w-2xl font-light font-section">
            {t('toursPage.intro')}
          </p>
        </div>
      </section>

      {/* 2. Listing & Catalog Section */}
      <div id="tours-listing-top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Breadcrumbs Navigation */}
        <nav className="text-xs text-[#1c1514]/50 tracking-wider uppercase mb-3 flex items-center space-x-1.5 font-medium select-none">
          <button 
            onClick={() => setView('home')} 
            className="hover:text-[#c5a880] transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            {currentLanguage === 'EN' ? 'Home' : currentLanguage === 'ES' ? 'Inicio' : 'Home'}
          </button>
          <span>/</span>
          <span className="text-[#1c1514]/90 font-semibold">{t('toursPage.title')}</span>
        </nav>

        {/* Heading and Controls Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#c5a880]/20 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-light leading-tight text-[#1c1514]">
              {t('toursPage.title')}
            </h2>
          </div>

          {/* Symmetrical Mode Toggles */}
          <div className="flex items-center space-x-4 self-start md:self-end">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1c1514]/40 select-none">
              {currentLanguage === 'EN' ? 'View' : currentLanguage === 'ES' ? 'Visualizar' : 'Visualizar'}
            </span>
            <div className="flex bg-[#1c1514]/5 p-1 rounded-none border border-[#c5a880]/15">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-all duration-300 cursor-pointer ${
                  viewMode === 'grid' 
                    ? 'bg-[#1c1514] text-[#c5a880]' 
                    : 'text-[#1c1514]/60 hover:text-[#1c1514]'
                }`}
                title={currentLanguage === 'EN' ? 'Grid View' : currentLanguage === 'ES' ? 'Vista de Cuadrícula' : 'Visualizar em Grade'}
              >
                <LayoutGrid className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-all duration-300 cursor-pointer ${
                  viewMode === 'list' 
                    ? 'bg-[#1c1514] text-[#c5a880]' 
                    : 'text-[#1c1514]/60 hover:text-[#1c1514]'
                }`}
                title={currentLanguage === 'EN' ? 'List View' : currentLanguage === 'ES' ? 'Vista de Lista' : 'Visualizar em Lista'}
              >
                <List className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Tours Cards Grid/List Component */}
        {viewMode === 'grid' ? (
          /* Grid View Mode: 2x2 layout */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {currentTours.map((tour) => (
              <div 
                key={tour.id} 
                className="group relative h-[320px] sm:h-[390px] overflow-hidden bg-[#28201f] border border-[#c5a880]/15 shadow-xl transition-all duration-500 hover:border-[#c5a880]/50"
              >
                {/* Background Image with zoom on card hover */}
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out transform scale-100 group-hover:scale-105"
                />
                
                {/* Rich Glassmorphic, dark, highly structured overlay with text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/60 p-5 sm:p-6 flex flex-col justify-center items-center text-center z-10 transition-colors duration-300">
                  
                  {/* Tightly centered content container */}
                  <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3.5 max-w-sm">
                    {/* Card Tag */}
                    <span className="text-[#c5a880] text-[8px] sm:text-[9px] uppercase tracking-[0.12em] font-semibold block leading-normal">
                      {tour.tag}
                    </span>

                    {/* Card Title */}
                    <h3 className="text-lg sm:text-2xl font-title font-light text-[#fcfbf9] tracking-wider uppercase leading-tight select-none">
                      {tour.title}
                    </h3>

                    {/* Card Description */}
                    <p className={`text-[10px] sm:text-xs text-[#fcfbf9]/80 leading-relaxed font-section mx-auto max-w-xs ${tour.isEsgotado ? 'italic' : ''}`}>
                      {tour.description}
                    </p>

                    {/* Price display inside ref layout */}
                    {!tour.isEsgotado && (
                      <p className="text-xs sm:text-sm font-title font-light text-[#c5a880] tracking-wider select-none">
                        {tour.price}
                      </p>
                    )}

                    {/* Centered border CTA */}
                    <div className="pt-2">
                      <button
                        onClick={() => { if (setView) { setSelectedTour(tour); setView('tour_interna'); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                        className="bg-black/40 backdrop-blur-sm border border-[#fcfbf9]/40 hover:border-[#c5a880] hover:bg-[#c5a880] hover:text-[#1c1514] text-[#fcfbf9] font-medium text-[9px] sm:text-[10px] tracking-[0.15em] uppercase py-2 px-5 sm:py-2.5 sm:px-6 transition-all duration-300 transform active:scale-95 cursor-pointer"
                      >
                        {t('common.seeMore')}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Subtle outer gold glowing layout ring */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#c5a880]/20 pointer-events-none transition-all duration-500 z-20"></div>
              </div>
            ))}
          </div>
        ) : (
          /* List View Mode: Horizontal Editorial Rows */
          <div className="flex flex-col space-y-12">
            {currentTours.map((tour) => (
              <div 
                key={tour.id} 
                className="group flex flex-col md:flex-row bg-[#1c1514] text-[#fcfbf9] border border-[#c5a880]/15 shadow-2xl overflow-hidden transition-all duration-500 hover:border-[#c5a880]/40"
              >
                {/* Left Side: Capa / Image */}
                <div className="w-full md:w-[42%] h-[280px] sm:h-[350px] md:h-auto overflow-hidden relative shrink-0">
                  <img 
                    src={tour.image} 
                    alt={tour.title} 
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out transform scale-100 group-hover:scale-104"
                  />
                  {/* Elegant vertical overlay to blend image to content */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 md:to-black/40 z-10"></div>
                  
                  {/* Status pill on image if esgotado */}
                  {tour.isEsgotado && (
                    <span className="absolute top-4 left-4 bg-red-950/80 backdrop-blur-sm border border-red-500/30 text-red-300 text-[9px] uppercase tracking-widest font-semibold px-3 py-1.5 z-20 shadow-md">
                      {currentLanguage === 'EN' ? 'Sold Out' : currentLanguage === 'ES' ? 'Agotado' : 'Esgotado'}
                    </span>
                  )}
                </div>

                {/* Right Side: Editorial Content Layout */}
                <div className="w-full md:w-[58%] p-6 sm:p-8 flex flex-col justify-between space-y-4 md:space-y-6 z-15">
                  <div className="space-y-2">
                    <span className="text-[#c5a880] text-[9px] sm:text-[10px] uppercase tracking-[0.1em] font-semibold block">
                      {tour.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-title font-light tracking-wider uppercase leading-tight select-none">
                      {tour.title}
                    </h3>
                    
                    {/* Tour metadata stats row */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[9px] text-[#fcfbf9]/60 uppercase tracking-[0.08em] font-medium border-t border-[#c5a880]/10 max-w-md">
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#c5a880]" /> {tour.duration}</span>
                      <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-[#c5a880]" /> {tour.groupSize}</span>
                    </div>
                  </div>

                  <p className={`text-xs sm:text-sm text-[#fcfbf9]/70 leading-relaxed font-section max-w-xl ${tour.isEsgotado ? 'italic' : ''}`}>
                    {tour.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-[#c5a880]/10">
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#fcfbf9]/40 uppercase tracking-wider block">
                        {currentLanguage === 'EN' ? 'Investment' : currentLanguage === 'ES' ? 'Inversión' : 'Valor do Investimento'}
                      </span>
                      <span className="text-sm sm:text-base font-title font-light text-[#c5a880] tracking-wider select-none">
                        {tour.price === 'Esgotado' || tour.price === 'Sold Out' || tour.price === 'Agotado'
                          ? (currentLanguage === 'EN' ? 'Sold Out for 2025' : currentLanguage === 'ES' ? 'Agotado para 2025' : 'Esgotado para 2025')
                          : tour.price}
                      </span>
                    </div>

                    <button
                      onClick={() => { if (setView) { setSelectedTour(tour); setView('tour_interna'); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                      className="bg-transparent border border-[#c5a880] text-[#c5a880] hover:bg-[#c5a880] hover:text-[#fcfbf9] font-semibold text-[10px] tracking-widest uppercase px-6 py-2 transition-all duration-300 transform active:scale-95 text-center cursor-pointer shadow-lg"
                    >
                      {t('common.seeMore')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. Elegant Dynamic Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-3 mt-16 sm:mt-24 select-none animate-fade-in">
            {/* Prev button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`h-11 w-11 flex items-center justify-center border transition-all duration-300 focus:outline-none ${
                currentPage === 1
                  ? 'border-[#1c1514]/10 text-[#1c1514]/20 cursor-not-allowed'
                  : 'border-[#1c1514]/20 hover:border-[#c5a880] hover:bg-[#1c1514] hover:text-[#c5a880] text-[#1c1514] cursor-pointer'
              }`}
              aria-label={currentLanguage === 'EN' ? 'Previous page' : currentLanguage === 'ES' ? 'Página anterior' : 'Página anterior'}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Numeric page buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-11 w-11 font-semibold text-xs tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#1c1514] text-[#c5a880] border border-[#1c1514]'
                    : 'border border-[#1c1514]/20 hover:border-[#c5a880] text-[#1c1514] hover:bg-[#1c1514]/5'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`h-11 w-11 flex items-center justify-center border transition-all duration-300 focus:outline-none ${
                currentPage === totalPages
                  ? 'border-[#1c1514]/10 text-[#1c1514]/20 cursor-not-allowed'
                  : 'border-[#1c1514]/20 hover:border-[#c5a880] hover:bg-[#1c1514] hover:text-[#c5a880] text-[#1c1514] cursor-pointer'
              }`}
              aria-label={currentLanguage === 'EN' ? 'Next page' : currentLanguage === 'ES' ? 'Siguiente página' : 'Próxima página'}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

      </div>

      {/* 5. Portalized Full Details Modal */}
      {isModalOpen && selectedTour && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none animate-fade-in p-3 sm:p-6 md:p-10 select-none">
          
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-[#140f0e]/85 backdrop-blur-md transition-all duration-500 cursor-pointer"
            onClick={handleCloseModal}
          ></div>

          {/* Main Modal Layout Card Container */}
          <div className="relative w-full max-w-5xl bg-[#fcfbf9] text-[#1c1514] shadow-2xl border border-[#c5a880]/35 overflow-hidden flex flex-col md:flex-row h-auto max-h-[92vh] sm:max-h-[85vh] z-50">
            
            {/* Left Side (Image & Basic Data) */}
            <div className="w-full md:w-[45%] h-[240px] md:h-auto relative overflow-hidden shrink-0 select-none">
              <img 
                src={selectedTour.image} 
                alt={selectedTour.title} 
                className="w-full h-full object-cover transform scale-100 hover:scale-102 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1514] via-black/30 to-black/60 z-10"></div>
              
              {/* Overlay brand items on image side */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-20 text-[#fcfbf9]">
                <div>
                  <span className="text-[#c5a880] text-[9px] uppercase tracking-[0.1em] font-semibold block mb-1">
                    {selectedTour.tag}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-title font-light tracking-wider uppercase leading-tight">
                    {selectedTour.title}
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs border-b border-[#c5a880]/20 pb-3">
                    <Clock className="h-4.5 w-4.5 text-[#c5a880] shrink-0" />
                    <div>
                      <span className="text-[#fcfbf9]/50 block text-[9px] uppercase">
                        {currentLanguage === 'EN' ? 'Duration' : currentLanguage === 'ES' ? 'Duración' : 'Duração'}
                      </span>
                      <span className="font-semibold text-xs tracking-wider">{selectedTour.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs border-b border-[#c5a880]/20 pb-3">
                    <Users className="h-4.5 w-4.5 text-[#c5a880] shrink-0" />
                    <div>
                      <span className="text-[#fcfbf9]/50 block text-[9px] uppercase">
                        {currentLanguage === 'EN' ? 'Group Size' : currentLanguage === 'ES' ? 'Tamaño del Grupo' : 'Tamanho do Grupo'}
                      </span>
                      <span className="font-semibold text-xs tracking-wider">{selectedTour.groupSize}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <DollarSign className="h-4.5 w-4.5 text-[#c5a880] shrink-0" />
                    <div>
                      <span className="text-[#fcfbf9]/50 block text-[9px] uppercase">
                        {currentLanguage === 'EN' ? 'Investment' : currentLanguage === 'ES' ? 'Inversión' : 'Investimento'}
                      </span>
                      <span className="font-semibold text-xs tracking-wider text-[#c5a880]">
                        {selectedTour.price === 'Esgotado' || selectedTour.price === 'Sold Out' || selectedTour.price === 'Agotado'
                          ? (currentLanguage === 'EN' ? 'Temporarily Sold Out' : currentLanguage === 'ES' ? 'Temporalmente Agotado' : 'Temporariamente Esgotado')
                          : selectedTour.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side (Details Scrollable Content) */}
            <div className="w-full md:w-[55%] p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
              
              {/* Close Button at top right */}
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 h-9 w-9 flex items-center justify-center bg-[#1c1514] text-[#c5a880] hover:text-[#fcfbf9] border border-[#c5a880]/20 hover:border-[#c5a880] transition-all duration-300 focus:outline-none cursor-pointer z-50 rounded-none shadow-md"
                aria-label={t('common.close')}
              >
                <X className="h-4 w-4" />
              </button>

              {/* Scroll Content Wrap */}
              <div className="space-y-8 pr-1 font-section text-xs">
                
                {/* 1. Full detailed copy description */}
                <div className="space-y-3">
                  <h5 className="text-[#c5a880] text-[10px] uppercase tracking-[0.1em] font-semibold flex items-center gap-1.5">
                    <Award className="h-4 w-4" /> {currentLanguage === 'EN' ? 'About the Experience' : currentLanguage === 'ES' ? 'Sobre la Experiencia' : 'Sobre a Vivência'}
                  </h5>
                  <p className="text-[#1c1514]/85 leading-relaxed">
                    {selectedTour.fullDescription}
                  </p>
                </div>

                {/* 2. Program Itinerary */}
                {selectedTour.itinerary && selectedTour.itinerary.length > 0 && (
                  <div className="space-y-4">
                    <h5 className="text-[#c5a880] text-[10px] uppercase tracking-[0.1em] font-semibold flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> {currentLanguage === 'EN' ? 'The Planned Itinerary' : currentLanguage === 'ES' ? 'El Itinerario Programado' : 'O Roteiro Programado'}
                    </h5>
                    <ul className="space-y-2.5 pl-1.5">
                      {selectedTour.itinerary.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 leading-normal">
                          <span className="h-5 w-5 rounded-full bg-[#1c1514]/5 text-[#c5a880] font-semibold text-[10px] flex items-center justify-center shrink-0 border border-[#c5a880]/20 select-none">
                            {idx + 1}
                          </span>
                          <span className="text-[#1c1514]/75 text-xs">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 3. What is Included */}
                {selectedTour.included && selectedTour.included.length > 0 && (
                  <div className="space-y-4">
                    <h5 className="text-[#c5a880] text-[10px] uppercase tracking-[0.1em] font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" /> {currentLanguage === 'EN' ? 'What is Included' : currentLanguage === 'ES' ? 'Qué Incluye' : 'O Que Está Incluso'}
                    </h5>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedTour.included.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs leading-normal">
                          <span className="text-[#c5a880] text-sm leading-none shrink-0 font-bold">•</span>
                          <span className="text-[#1c1514]/75">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Luxury Interactive Booking / Contact Form */}
                <div className="pt-6 border-t border-[#c5a880]/20 space-y-4 select-text">
                  <div className="space-y-1">
                    <h5 className="text-[#1c1514] text-[11px] uppercase tracking-[0.1em] font-semibold">
                      {selectedTour.isEsgotado 
                        ? (currentLanguage === 'EN' ? 'Express Interest for 2026' : currentLanguage === 'ES' ? 'Manifestar Interés para 2026' : 'Manifestar Interesse para 2026')
                        : (currentLanguage === 'EN' ? 'Make a Booking Request' : currentLanguage === 'ES' ? 'Hacer Solicitud de Reserva' : 'Fazer Solicitação de Reserva')}
                    </h5>
                    <p className="text-[10px] text-[#1c1514]/50 leading-relaxed max-w-md">
                      {selectedTour.isEsgotado 
                        ? (currentLanguage === 'EN' 
                            ? 'Fill in the details below to enter the exclusive priority list for the next crop of tours in 2026.' 
                            : currentLanguage === 'ES' 
                              ? 'Complete sus datos a continuación para unirse a la lista de prioridad exclusiva para la próxima cosecha de tours en 2026.' 
                              : 'Preencha os dados abaixo para entrar na lista de prioridade exclusiva da próxima safra de tours em 2026.') 
                        : (currentLanguage === 'EN' 
                            ? 'Enter your details below. Our customer service team will respond within the next 2 hours to finalize your payment and confirm your date.' 
                            : currentLanguage === 'ES' 
                              ? 'Envíe sus datos a continuación. Nuestro equipo de atención al cliente responderá en las próximas 2 horas para finalizar su pago y confirmar la fecha.' 
                              : 'Envie seus dados abaixo. Nossa equipe de atendimento ao cliente responderá nas próximas 2 horas para finalizar seu pagamento e confirmar data.')}
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="bg-[#1c1514]/5 p-5 border border-[#c5a880]/40 text-center space-y-3 animate-fade-in">
                      <p className="text-xs font-semibold text-[#c5a880] tracking-wide uppercase">
                        {currentLanguage === 'EN' ? 'Request Submitted Successfully' : currentLanguage === 'ES' ? 'Solicitud Enviada con Éxito' : 'Solicitação Enviada com Sucesso'}
                      </p>
                      <p className="text-[10px] text-[#1c1514]/70 leading-relaxed max-w-sm mx-auto">
                        {currentLanguage === 'EN'
                          ? 'Thank you for reaching out! One of our consulting winemakers will contact you via email or WhatsApp in the next few hours to finalize your luxury experience.'
                          : currentLanguage === 'ES'
                            ? '¡Gracias por contactarnos! Uno de nuestros enólogos asesores se pondrá en contacto por correo electrónico o WhatsApp en las próximas horas para finalizar su experiencia de lujo.'
                            : 'Obrigado pelo contato! Um de nossos enólogos assessores entrará em contato via e-mail ou WhatsApp nas próximas horas para finalizar sua experiência de luxo.'}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs select-text">
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-[#1c1514]/50 font-medium mb-1">{t('common.name')}</label>
                        <input 
                          type="text" 
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          className="w-full bg-[#1c1514]/5 border border-[#c5a880]/20 rounded-none text-xs text-[#1c1514] py-2 px-3 focus:outline-none focus:border-[#c5a880] focus:bg-white transition-all duration-300"
                          placeholder={currentLanguage === 'EN' ? 'e.g., John Doe' : currentLanguage === 'ES' ? 'Ej: Juan Pérez' : 'Ex: Pedro Alencar'}
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-[#1c1514]/50 font-medium mb-1">{t('common.email')}</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-[#1c1514]/5 border border-[#c5a880]/20 rounded-none text-xs text-[#1c1514] py-2 px-3 focus:outline-none focus:border-[#c5a880] focus:bg-white transition-all duration-300"
                          placeholder={currentLanguage === 'EN' ? 'e.g., john@email.com' : currentLanguage === 'ES' ? 'Ej: juan@email.com' : 'Ex: pedro@email.com'}
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-[#1c1514]/50 font-medium mb-1">{t('common.phone')}</label>
                        <input 
                          type="tel" 
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          className="w-full bg-[#1c1514]/5 border border-[#c5a880]/20 rounded-none text-xs text-[#1c1514] py-2 px-3 focus:outline-none focus:border-[#c5a880] focus:bg-white transition-all duration-300"
                          placeholder={currentLanguage === 'EN' ? 'e.g., +1 (555) 000-0000' : currentLanguage === 'ES' ? 'Ej: +34 600 000 000' : 'Ex: (75) 99999-9999'}
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-[#1c1514]/50 font-medium mb-1">{t('common.date')}</label>
                        <input 
                          type="date" 
                          name="data"
                          value={formData.data}
                          onChange={handleInputChange}
                          className="w-full bg-[#1c1514]/5 border border-[#c5a880]/20 rounded-none text-xs text-[#1c1514] py-2 px-3 focus:outline-none focus:border-[#c5a880] focus:bg-white transition-all duration-300"
                          required 
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[9px] uppercase tracking-wider text-[#1c1514]/50 font-medium mb-1">
                          {currentLanguage === 'EN' ? 'Guests' : currentLanguage === 'ES' ? 'Participantes' : 'Participantes'}
                        </label>
                        <select
                          name="participantes"
                          value={formData.participantes}
                          onChange={handleInputChange}
                          className="w-full bg-[#1c1514]/5 border border-[#c5a880]/20 rounded-none text-xs text-[#1c1514] py-2 px-3 focus:outline-none focus:border-[#c5a880] focus:bg-white transition-all duration-300 cursor-pointer"
                        >
                          <option value="1">{currentLanguage === 'EN' ? '1 Person' : currentLanguage === 'ES' ? '1 Persona' : '1 Pessoa'}</option>
                          <option value="2">{currentLanguage === 'EN' ? '2 People' : currentLanguage === 'ES' ? '2 Personas' : '2 Pessoas'}</option>
                          <option value="4">{currentLanguage === 'EN' ? '4 People' : currentLanguage === 'ES' ? '4 Personas' : '4 Pessoas'}</option>
                          <option value="6">{currentLanguage === 'EN' ? '6 People' : currentLanguage === 'ES' ? '6 Personas' : '6 Pessoas'}</option>
                          <option value="8">{currentLanguage === 'EN' ? '8 People' : currentLanguage === 'ES' ? '8 Personas' : '8 Pessoas'}</option>
                          <option value="10+">{currentLanguage === 'EN' ? 'More than 10 People' : currentLanguage === 'ES' ? 'Más de 10 Personas' : 'Mais de 10 Pessoas'}</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[9px] uppercase tracking-wider text-[#1c1514]/50 font-medium mb-1">
                          {currentLanguage === 'EN' ? 'Special Requests or Dietary Restrictions' : currentLanguage === 'ES' ? 'Observaciones o Necesidades Especiales' : 'Observações ou Necessidades Especiais'}
                        </label>
                        <textarea 
                          name="mensagem"
                          value={formData.mensagem}
                          onChange={handleInputChange}
                          rows="2"
                          className="w-full bg-[#1c1514]/5 border border-[#c5a880]/20 rounded-none text-xs text-[#1c1514] py-2 px-3 focus:outline-none focus:border-[#c5a880] focus:bg-white transition-all duration-300 resize-none"
                          placeholder={currentLanguage === 'EN' ? 'e.g., food allergies, dietary restrictions, accessibility needs...' : currentLanguage === 'ES' ? 'Ej: alergias alimentarias, restricciones, necesidades especiales...' : 'Ex: Restrições alimentares, alergias, acessibilidade, etc...'}
                        ></textarea>
                      </div>
                      <div className="sm:col-span-2 pt-2">
                        <button
                          type="submit"
                          className="w-full bg-[#1c1514] hover:bg-[#c5a880] hover:text-[#1c1514] text-[#c5a880] font-semibold text-xs tracking-[0.12em] uppercase py-2.5 transition-all duration-300 transform active:scale-95 text-center cursor-pointer shadow-lg"
                        >
                          {selectedTour.isEsgotado 
                            ? (currentLanguage === 'EN' ? 'Express Interest for 2026' : currentLanguage === 'ES' ? 'Manifestar Interés para 2026' : 'Manifestar Interesse para 2026')
                            : (currentLanguage === 'EN' ? 'Send Reservation Request' : currentLanguage === 'ES' ? 'Enviar Solicitud de Reserva' : 'Enviar Solicitação de Reserva')}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
