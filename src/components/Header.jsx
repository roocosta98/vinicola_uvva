import { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, Trash2, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logoUvva from '../assets/logo-uvva.png';
import trilogiaImg from '../assets/trilogia_uvva_box.png';
import vineyardImg from '../assets/vineyard.png';
import arenitoImg from '../assets/arenito_dish.png';
import heroImg from '../assets/hero.png';

const imagesMap = {
  'trilogia_uvva_box.png': trilogiaImg,
  'vineyard.png': vineyardImg,
  'arenito_dish.png': arenitoImg,
  'hero.png': heroImg,
};

export default function Header({ view = 'home', setView, cartItems = [], removeCartItem, updateCartItem, isLoggedIn = false, theme = 'dark', toggleTheme }) {
  const { language: activeLang, setLanguage: setActiveLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const languages = [
    { code: 'PT', name: 'Português', flagColor: 'bg-[#2b8a3e]' },
    { code: 'EN', name: 'English', flagColor: 'bg-[#00247d]' },
    { code: 'ES', name: 'Español', flagColor: 'bg-[#c60b1e]' }
  ];

  const handleMobileLangCycle = () => {
    const currentIndex = languages.findIndex(l => l.code === activeLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    setActiveLang(languages[nextIndex].code);
  };


  // Effect to apply glassmorphism on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mini cart or mobile menu is open
  useEffect(() => {
    if (isMiniCartOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMiniCartOpen, isMobileMenuOpen]);


  const handleNavLinkClick = (e, targetHash, isRestauranteLink = false, isToursLink = false, isVinhosLink = false, isVinicolaLink = false, isEmpresasLink = false, isContatoLink = false, isImprensaLink = false, isMateriasLink = false) => {
    e.preventDefault();
    if (isRestauranteLink) {
      if (setView) setView('restaurante');
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isToursLink) {
      if (setView) setView('tours');
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isVinhosLink) {
      if (setView) setView('vinhos');
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isVinicolaLink) {
      if (setView) setView('vinicola');
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isEmpresasLink) {
      if (setView) setView('empresas');
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isContatoLink) {
      if (setView) setView('contato');
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isImprensaLink) {
      if (setView) setView('imprensa');
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isMateriasLink) {
      if (setView) setView('materias');
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsMobileMenuOpen(false);
      if (view !== 'home') {
        if (setView) setView('home');
        // Let React render the home view, then scroll to the element
        setTimeout(() => {
          const element = document.querySelector(targetHash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else if (targetHash === '#' || targetHash === '') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(targetHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (targetHash === '#' || targetHash === '') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (view !== 'home') {
      if (setView) setView('home');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-header py-3 shadow-md' : ((view === 'vinicola' || view === 'empresas' || view === 'contato' || view === 'imprensa' || view === 'materias' || view === 'artigo') ? 'bg-transparent py-6' : (view === 'produto' || view === 'carrinho') ? 'bg-[#1c1514] py-6' : 'bg-gradient-to-b from-[#1c1514]/80 to-transparent py-6')}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Layout (lg and above) - Fully Balanced & Symmetrical */}
        <div className="hidden lg:flex items-center justify-between h-16 relative">
          
          {/* Left Side: Navigation Links (Aligned to the left edge of the content) */}
          <nav className="flex items-center space-x-6 xl:space-x-8">
            <a 
              href="#vinicola" 
              onClick={(e) => handleNavLinkClick(e, '', false, false, false, true)}
              className={`text-[10px] xl:text-[11px] uppercase tracking-[0.16em] font-section font-semibold transition-colors duration-300 ${view === 'vinicola' ? 'text-[#c5a880]' : 'text-[#fcfbf9] hover:text-[#c5a880]'}`}
            >
              {t('header.vinicola')}
            </a>
            <a 
              href="#vinhos" 
              onClick={(e) => handleNavLinkClick(e, '', false, false, true)}
              className={`text-[10px] xl:text-[11px] uppercase tracking-[0.16em] font-section font-semibold transition-colors duration-300 ${view === 'vinhos' ? 'text-[#c5a880]' : 'text-[#fcfbf9] hover:text-[#c5a880]'}`}
            >
              {t('header.vinhos')}
            </a>
            <a 
              href="#restaurante" 
              onClick={(e) => handleNavLinkClick(e, '', true)}
              className={`text-[10px] xl:text-[11px] uppercase tracking-[0.16em] font-section font-semibold transition-colors duration-300 ${view === 'restaurante' ? 'text-[#c5a880]' : 'text-[#fcfbf9] hover:text-[#c5a880]'}`}
            >
              {t('header.restaurante')}
            </a>
            <a 
              href="#experiencias" 
              onClick={(e) => handleNavLinkClick(e, '', false, true)}
              className={`text-[10px] xl:text-[11px] uppercase tracking-[0.16em] font-section font-semibold transition-colors duration-300 ${view === 'tours' ? 'text-[#c5a880]' : 'text-[#fcfbf9] hover:text-[#c5a880]'}`}
            >
              {t('header.experiencias')}
            </a>
          </nav>

          {/* Center: Brand Logo (Centered perfectly) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
            <a href="#" onClick={handleLogoClick} className="flex justify-center w-36">
              <img src={logoUvva} alt="Vinícola UVVA Logo" className="h-14 w-auto transform hover:scale-105 transition-transform duration-500" />
            </a>
          </div>

          {/* Right Side: Links + Utility Actions (Aligned to the right edge of the content) */}
          <div className="flex items-center space-x-6 xl:space-x-8">
            <nav className="flex items-center space-x-6 xl:space-x-8">
              <a 
                href="#conteudos" 
                onClick={(e) => handleNavLinkClick(e, '', false, false, false, false, false, false, false, true)}
                className={`text-[10px] xl:text-[11px] uppercase tracking-[0.16em] font-section font-semibold transition-colors duration-300 ${view === 'materias' || view === 'artigo' ? 'text-[#c5a880]' : 'text-[#fcfbf9] hover:text-[#c5a880]'}`}
              >
                {t('header.conteudos')}
              </a>
              <a 
                href="#contato" 
                onClick={(e) => handleNavLinkClick(e, '', false, false, false, false, false, true)}
                className={`text-[10px] xl:text-[11px] uppercase tracking-[0.16em] font-section font-semibold transition-colors duration-300 ${view === 'contato' ? 'text-[#c5a880]' : 'text-[#fcfbf9] hover:text-[#c5a880]'}`}
              >
                {t('header.contato')}
              </a>

            </nav>

            {/* Utilities and Languages */}
            <div className="flex items-center space-x-4 xl:space-x-6">
              {/* Language Selector Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsLangDropdownOpen(true)}
                onMouseLeave={() => setIsLangDropdownOpen(false)}
              >
                <button 
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center text-[10px] xl:text-xs font-semibold tracking-wider text-[#fcfbf9]/80 hover:text-[#c5a880] transition-colors duration-300 py-2 focus:outline-none cursor-pointer"
                >
                  <span>{activeLang}</span>
                  <span className={`ml-1 h-1.5 w-1.5 rounded-full ${languages.find(l => l.code === activeLang)?.flagColor || 'bg-[#2b8a3e]'}`}></span>
                  <svg className={`ml-1.5 h-3 w-3 transition-transform duration-300 opacity-60 hover:opacity-100 ${isLangDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu with blur and luxury aesthetics */}
                <div className={`absolute right-0 mt-1 w-24 bg-[#1c1514]/95 backdrop-blur-md border border-[#c5a880]/15 shadow-2xl py-1 z-50 transition-all duration-300 transform origin-top-right ${
                  isLangDropdownOpen 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}>
                  {languages.filter(l => l.code !== activeLang).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setActiveLang(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-[10px] xl:text-xs font-semibold tracking-wider text-[#fcfbf9]/60 hover:text-[#c5a880] hover:bg-[#fcfbf9]/5 transition-all duration-300 text-left cursor-pointer"
                    >
                      <span>{lang.code}</span>
                      <span className={`h-1.5 w-1.5 rounded-full ${lang.flagColor}`}></span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Utility Icons */}
              <div className="flex items-center space-x-2">
                {/* Theme Toggle Button (Desktop) */}
                <button 
                  onClick={toggleTheme}
                  className="text-[#fcfbf9] hover:text-[#c5a880] transition-all duration-300 p-1.5 cursor-pointer relative flex items-center justify-center focus:outline-none"
                  aria-label="Toggle Theme"
                >
                  <div className="relative w-4.5 h-4.5 flex items-center justify-center">
                    <Sun className={`w-4 h-4 absolute transition-all duration-500 transform ${theme === 'light' ? 'rotate-0 scale-100 opacity-100 text-amber-500' : 'rotate-90 scale-0 opacity-0'}`} />
                    <Moon className={`w-4 h-4 absolute transition-all duration-500 transform ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100 text-[#c5a880]' : '-rotate-90 scale-0 opacity-0'}`} />
                  </div>
                </button>

                <button className="text-[#fcfbf9] hover:text-[#c5a880] transition-colors duration-300 p-1" aria-label="Search">
                  <Search className="h-4.5 w-4.5" />
                </button>
                <button 
                  onClick={() => setIsMiniCartOpen(true)}
                  className="text-[#fcfbf9] hover:text-[#c5a880] transition-colors duration-300 p-1 relative" 
                  aria-label="Shopping Cart"
                >
                  <ShoppingBag className="h-4.5 w-4.5" />
                  {cartItems.length > 0 && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#c5a880]"></span>}
                </button>
                <button 
                  onClick={() => { if(setView) { setView(isLoggedIn ? 'conta' : 'auth'); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                  className="text-[#fcfbf9] hover:text-[#c5a880] transition-colors duration-300 p-1 cursor-pointer relative" 
                  aria-label="User Profile"
                >
                  <User className="h-4.5 w-4.5" />
                  {isLoggedIn && <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile & Tablet Layout (Below lg) */}
        <div className="flex lg:hidden items-center justify-between h-16 relative">
          
          {/* Mobile Menu Toggle button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#fcfbf9] hover:text-[#c5a880] focus:outline-none transition-colors duration-300 z-10 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Centered Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10 w-32">
            <a href="#" onClick={handleLogoClick} className="flex justify-center">
              <img src={logoUvva} alt="Vinícola UVVA Logo" className="h-12 w-auto transform hover:scale-105 transition-transform duration-500" />
            </a>
          </div>

          {/* Minimalist Mobile Utilities with cyclic selector */}
          <div className="flex items-center space-x-3 z-10">
            {/* Theme Toggle Button (Mobile) */}
            <button 
              onClick={toggleTheme}
              className="text-[#fcfbf9] hover:text-[#c5a880] transition-all duration-300 p-1.5 cursor-pointer relative flex items-center justify-center focus:outline-none"
              aria-label="Toggle Theme"
            >
              <div className="relative w-4.5 h-4.5 flex items-center justify-center">
                <Sun className={`w-4 h-4 absolute transition-all duration-500 transform ${theme === 'light' ? 'rotate-0 scale-100 opacity-100 text-amber-500' : 'rotate-90 scale-0 opacity-0'}`} />
                <Moon className={`w-4 h-4 absolute transition-all duration-500 transform ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100 text-[#c5a880]' : '-rotate-90 scale-0 opacity-0'}`} />
              </div>
            </button>

            {/* Cyclic Language Badge */}
            <button 
              onClick={handleMobileLangCycle}
              className="flex items-center text-[10px] font-semibold tracking-wider text-[#fcfbf9]/60 hover:text-[#c5a880] transition-colors duration-300 mr-1 cursor-pointer focus:outline-none select-none py-2"
              title="Clique para mudar o idioma / Click to change language"
            >
              <span className="text-[#fcfbf9]">{activeLang}</span>
              <span className={`ml-1 h-1.5 w-1.5 rounded-full ${languages.find(l => l.code === activeLang)?.flagColor || 'bg-[#2b8a3e]'}`}></span>
            </button>

            {/* Shopping Cart Icon */}
            <button className="text-[#fcfbf9] p-2 hover:text-[#c5a880] rounded-full transition-colors" onClick={() => { setIsMiniCartOpen(true); setIsMobileMenuOpen(false); }}>
              <ShoppingBag className="h-4.5 w-4.5" />
              {cartItems.length > 0 && <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-[#c5a880]"></span>}
            </button>
            
            {/* User Profile Icon */}
            <button 
              onClick={() => { if(setView) { setView(isLoggedIn ? 'conta' : 'auth'); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
              className="text-[#fcfbf9] hover:text-[#c5a880] transition-colors duration-300 p-1 cursor-pointer relative" 
              aria-label="User Profile"
            >
              <User className="h-4.5 w-4.5" />
              {isLoggedIn && <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>}
            </button>
          </div>

        </div>

      </div>
    </header>

    {/* Mobile Menu Panel */}
    <div className={`lg:hidden fixed inset-0 z-40 bg-[#1c1514] transition-all duration-500 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}>
      <div className="flex flex-col h-full justify-between pt-24 pb-12 px-6">
        <nav className="flex flex-col space-y-6 text-center">
          <a 
            href="#vinicola" 
            onClick={(e) => handleNavLinkClick(e, '', false, false, false, true)}
            className={`text-lg uppercase tracking-[0.25em] font-section font-semibold py-2 transition-colors duration-300 ${view === 'vinicola' ? 'text-[#c5a880]' : 'text-[#fcfbf9] hover:text-[#c5a880]'}`}
          >
            {t('header.vinicola')}
          </a>
          <a 
            href="#vinhos" 
            onClick={(e) => handleNavLinkClick(e, '', false, false, true)}
            className={`text-lg uppercase tracking-[0.25em] font-section font-semibold py-2 transition-colors duration-300 ${view === 'vinhos' ? 'text-[#c5a880]' : 'text-[#fcfbf9] hover:text-[#c5a880]'}`}
          >
            {t('header.vinhos')}
          </a>
          <a 
            href="#restaurante" 
            onClick={(e) => handleNavLinkClick(e, '', true)}
            className={`text-lg uppercase tracking-[0.25em] font-section font-semibold py-2 transition-colors duration-300 ${view === 'restaurante' ? 'text-[#c5a880]' : 'text-[#fcfbf9] hover:text-[#c5a880]'}`}
          >
            {t('header.restaurante')}
          </a>
          <a 
            href="#experiencias" 
            onClick={(e) => handleNavLinkClick(e, '', false, true)}
            className={`text-lg uppercase tracking-[0.25em] font-section font-semibold py-2 transition-colors duration-300 ${view === 'tours' ? 'text-[#c5a880]' : 'text-[#fcfbf9] hover:text-[#c5a880]'}`}
          >
            {t('header.experiencias')}
          </a>

          <a 
            href="#conteudos" 
            onClick={(e) => handleNavLinkClick(e, '', false, false, false, false, false, false, false, true)}
            className={`text-lg uppercase tracking-[0.25em] font-section font-semibold py-2 transition-colors duration-300 ${view === 'materias' || view === 'artigo' ? 'text-[#c5a880]' : 'text-[#fcfbf9] hover:text-[#c5a880]'}`}
          >
            {t('header.conteudos')}
          </a>
          <a 
            href="#contato" 
            onClick={(e) => handleNavLinkClick(e, '', false, false, false, false, false, true)}
            className={`text-lg uppercase tracking-[0.25em] font-section font-semibold py-2 transition-colors duration-300 ${view === 'contato' ? 'text-[#c5a880]' : 'text-[#fcfbf9] hover:text-[#c5a880]'}`}
          >
            {t('header.contato')}
          </a>

        </nav>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="h-px w-16 bg-[#c5a880]/30"></div>
          <p className="text-xs tracking-wider text-[#c5a880]">CHAPADA DIAMANTINA • BRASIL</p>
        </div>
      </div>
    </div>

    {/* Mini Cart Overlay */}
    {isMiniCartOpen && (
      <div className="fixed inset-0 z-[60] bg-[#1c1514]/50 backdrop-blur-sm transition-opacity" onClick={() => setIsMiniCartOpen(false)}></div>
    )}

    {/* Mini Cart Drawer */}
    <div className={`fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-[#fcfbf9] z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col font-section ${isMiniCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#e8e2d9] shrink-0 bg-white">
        <h3 className="font-title text-xl text-[#1c1514] font-light">{t('header.cartTitle')}</h3>
        <button onClick={() => setIsMiniCartOpen(false)} className="text-[#1c1514]/40 hover:text-[#c5a880] transition-colors p-2">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Items */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {cartItems.length === 0 ? (
          <p className="text-center text-[#1c1514]/40 mt-10">{t('header.emptyCart')}</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="flex gap-4 border-b border-[#e8e2d9]/30 pb-4 last:border-b-0 last:pb-0">
              <div className="w-16 h-16 bg-[#f9f8f6] border border-[#e8e2d9]/50 overflow-hidden flex items-center justify-center shrink-0">
                <img 
                  src={imagesMap[item.img]} 
                  alt={item.title} 
                  className="max-w-full max-h-full object-contain mix-blend-multiply" 
                />
              </div>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#1c1514] leading-tight truncate">{item.title}</h4>
                    <span className="text-[10px] text-[#1c1514]/60 block truncate">{item.subtitle}</span>
                  </div>
                  <button 
                    onClick={() => removeCartItem(item.id)} 
                    className="text-[#1c1514]/40 hover:text-red-500 transition-colors p-1"
                    title={t('common.remove')}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-[#8a7b2e] font-semibold">R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}</span>
                  
                  {/* Interactive Quantity Selector */}
                  <div className="flex items-center border border-[#e8e2d9] bg-transparent h-6 w-20">
                    <button 
                      onClick={() => updateCartItem(item.id, { qty: Math.max(1, item.qty - 1) })}
                      className="flex-1 h-full text-[#1c1514]/50 hover:text-[#c5a880] transition-colors font-bold text-xs flex items-center justify-center"
                    >-</button>
                    <span className="w-6 text-center text-[10px] text-[#1c1514] font-semibold">{item.qty}</span>
                    <button 
                      onClick={() => updateCartItem(item.id, { qty: item.qty + 1 })}
                      className="flex-1 h-full text-[#1c1514]/50 hover:text-[#c5a880] transition-colors font-bold text-xs flex items-center justify-center"
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Drawer Footer */}
      {cartItems.length > 0 && (
        <div className="p-6 border-t border-[#e8e2d9] shrink-0 bg-white space-y-3 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold uppercase tracking-wider">{t('common.subtotal')}</span>
            <span className="text-lg font-bold text-[#8a7b2e]">
              R$ {cartItems.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2).replace('.', ',')}
            </span>
          </div>
          <button 
            onClick={() => { setView('checkout'); setIsMiniCartOpen(false); }}
            className="w-full py-3 bg-[#1c1514] text-white font-semibold text-xs tracking-widest uppercase hover:bg-[#8a7b2e] transition-colors"
          >
            {t('common.checkout')}
          </button>
          <button 
            onClick={() => { setView('carrinho'); setIsMiniCartOpen(false); }} 
            className="w-full py-3 border border-[#1c1514] text-[#1c1514] font-semibold text-xs tracking-widest uppercase hover:bg-[#1c1514] hover:text-white transition-colors"
          >
            {t('header.checkoutBtn')}
          </button>
        </div>
      )}
    </div>
  </>
);
}
