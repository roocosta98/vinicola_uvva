import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import logoUvva from '../assets/logo-uvva.png';
import footerBg from '../assets/footer_bg.png';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ view = 'home', setView }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  const handleNavLinkClick = (e, targetHash, isRestauranteLink = false, isToursLink = false, isVinhosLink = false, isVinicolaLink = false, isEmpresasLink = false, isContatoLink = false, isImprensaLink = false) => {
    e.preventDefault();
    if (isRestauranteLink) {
      if (setView) setView('restaurante');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isToursLink) {
      if (setView) setView('tours');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isVinhosLink) {
      if (setView) setView('vinhos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isVinicolaLink) {
      if (setView) setView('vinicola');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isEmpresasLink) {
      if (setView) setView('empresas');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isContatoLink) {
      if (setView) setView('contato');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isImprensaLink) {
      if (setView) setView('imprensa');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
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
    <footer 
      id="contato" 
      className="relative border-t border-[#c5a880]/15 pt-24 pb-12 text-[#fcfbf9]/80 font-section bg-[#140f0e] overflow-hidden"
    >
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${footerBg})` }}
      ></div>

      {/* Subtle premium dark overlay to blend the image beautifully while keeping the campfire glow visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1514]/85 via-transparent to-[#0a0707]/95 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand details */}
          <div className="flex flex-col space-y-6">
            <div className="w-32">
              <a href="#" onClick={handleLogoClick} className="block transform hover:scale-105 transition-transform duration-500">
                <img src={logoUvva} alt="Vinícola UVVA Logo" className="h-16 w-auto" />
              </a>
            </div>
            <p className="text-xs leading-relaxed text-[#fcfbf9]/60 max-w-sm font-light">
              {t('footer.desc')}
            </p>
            <div className="flex items-center space-x-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-10 w-10 rounded-full border border-[#c5a880]/20 bg-black/20 hover:bg-[#c5a880]/15 hover:border-[#c5a880] flex items-center justify-center text-[#fcfbf9]/60 hover:text-[#c5a880] hover:scale-110 hover:shadow-[0_0_12px_rgba(197,168,128,0.25)] transition-all duration-300" 
                aria-label="Instagram"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-10 w-10 rounded-full border border-[#c5a880]/20 bg-black/20 hover:bg-[#c5a880]/15 hover:border-[#c5a880] flex items-center justify-center text-[#fcfbf9]/60 hover:text-[#c5a880] hover:scale-110 hover:shadow-[0_0_12px_rgba(197,168,128,0.25)] transition-all duration-300" 
                aria-label="Facebook"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a 
                href="mailto:contato@vinicolauvva.com.br" 
                className="h-10 w-10 rounded-full border border-[#c5a880]/20 bg-black/20 hover:bg-[#c5a880]/15 hover:border-[#c5a880] flex items-center justify-center text-[#fcfbf9]/60 hover:text-[#c5a880] hover:scale-110 hover:shadow-[0_0_12px_rgba(197,168,128,0.25)] transition-all duration-300" 
                aria-label="E-mail"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="flex flex-col space-y-5 lg:pl-12">
            <h4 className="text-[#c5a880] text-xs uppercase tracking-[0.25em] font-semibold border-b border-[#c5a880]/10 pb-2 max-w-[150px]">
              {t('footer.linksTitle')}
            </h4>
            <ul className="space-y-3.5 text-xs text-[#fcfbf9]/70">
              <li>
                <a 
                  href="#vinhos" 
                  onClick={(e) => handleNavLinkClick(e, '', false, false, true)} 
                  className={`group flex items-center gap-2 hover:text-[#c5a880] transition-colors duration-300 ${view === 'vinhos' ? 'text-[#c5a880] font-medium' : ''}`}
                >
                  <span className={`w-1 h-1 rounded-full bg-[#c5a880] transition-all duration-300 ${view === 'vinhos' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0'}`}></span>
                  {t('footer.links.vinhos')}
                </a>
              </li>
              <li>
                <a 
                  href="#experiencias" 
                  onClick={(e) => handleNavLinkClick(e, '', false, true)} 
                  className={`group flex items-center gap-2 hover:text-[#c5a880] transition-colors duration-300 ${view === 'tours' ? 'text-[#c5a880] font-medium' : ''}`}
                >
                  <span className={`w-1 h-1 rounded-full bg-[#c5a880] transition-all duration-300 ${view === 'tours' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0'}`}></span>
                  {t('footer.links.experiencias')}
                </a>
              </li>
              <li>
                <a 
                  href="#restaurante" 
                  onClick={(e) => handleNavLinkClick(e, '', true)} 
                  className={`group flex items-center gap-2 hover:text-[#c5a880] transition-colors duration-300 ${view === 'restaurante' ? 'text-[#c5a880] font-medium' : ''}`}
                >
                  <span className={`w-1 h-1 rounded-full bg-[#c5a880] transition-all duration-300 ${view === 'restaurante' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0'}`}></span>
                  {t('footer.links.restaurante')}
                </a>
              </li>
              <li>
                <a 
                  href="#vinicola" 
                  onClick={(e) => handleNavLinkClick(e, '', false, false, false, true)} 
                  className={`group flex items-center gap-2 hover:text-[#c5a880] transition-colors duration-300 ${view === 'vinicola' ? 'text-[#c5a880] font-medium' : ''}`}
                >
                  <span className={`w-1 h-1 rounded-full bg-[#c5a880] transition-all duration-300 ${view === 'vinicola' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0'}`}></span>
                  {t('footer.links.vinicola')}
                </a>
              </li>
              <li>
                <a 
                  href="#empresas" 
                  onClick={(e) => handleNavLinkClick(e, '', false, false, false, false, true)} 
                  className={`group flex items-center gap-2 hover:text-[#c5a880] transition-colors duration-300 ${view === 'empresas' ? 'text-[#c5a880] font-medium' : ''}`}
                >
                  <span className={`w-1 h-1 rounded-full bg-[#c5a880] transition-all duration-300 ${view === 'empresas' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0'}`}></span>
                  {t('footer.links.empresas')}
                </a>
              </li>
              <li>
                <a 
                  href="#contato" 
                  onClick={(e) => handleNavLinkClick(e, '', false, false, false, false, false, true)} 
                  className={`group flex items-center gap-2 hover:text-[#c5a880] transition-colors duration-300 ${view === 'contato' ? 'text-[#c5a880] font-medium' : ''}`}
                >
                  <span className={`w-1 h-1 rounded-full bg-[#c5a880] transition-all duration-300 ${view === 'contato' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0'}`}></span>
                  {t('footer.links.contato')}
                </a>
              </li>
              <li>
                <a 
                  href="#imprensa" 
                  onClick={(e) => handleNavLinkClick(e, '', false, false, false, false, false, false, true)} 
                  className={`group flex items-center gap-2 hover:text-[#c5a880] transition-colors duration-300 ${view === 'imprensa' ? 'text-[#c5a880] font-medium' : ''}`}
                >
                  <span className={`w-1 h-1 rounded-full bg-[#c5a880] transition-all duration-300 ${view === 'imprensa' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0'}`}></span>
                  {t('footer.links.imprensa')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col space-y-5">
            <h4 className="text-[#c5a880] text-xs uppercase tracking-[0.25em] font-semibold border-b border-[#c5a880]/10 pb-2 max-w-[150px]">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4 text-xs text-[#fcfbf9]/70 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="h-4.5 w-4.5 text-[#c5a880] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {t('footer.address').split('\n').map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-[#c5a880] shrink-0" />
                <span>{t('footer.phone')}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-4.5 w-4.5 text-[#c5a880] shrink-0 mt-0.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.454L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.58 2.012 14.12 1 12.003 1 6.57 1 2.146 5.37 2.142 10.8c-.001 1.727.452 3.414 1.312 4.901L2.49 19.948l4.157-1.09c.001 0 .001 0 0 0z" />
                </svg>
                <span>
                  {t('footer.whatsappLabel')} <br />
                  <a href="https://wa.me/5575982439438" target="_blank" rel="noopener noreferrer" className="hover:text-[#c5a880] transition-colors duration-300 font-normal">
                    (75) 98243-9438
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-[#c5a880] shrink-0" />
                <a href={`mailto:${t('footer.email')}`} className="hover:text-[#c5a880] transition-colors duration-300">
                  {t('footer.email')}
                </a>
              </li>
              <li className="border-t border-[#c5a880]/10 pt-3 mt-3">
                <span className="text-[10px] uppercase tracking-wider text-[#c5a880] block mb-1">
                  {t('footer.hoursTitle')}
                </span>
                <span className="text-[11px] text-[#fcfbf9]/50 block">
                  {t('footer.hoursDesc')}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-5">
            <h4 className="text-[#c5a880] text-xs uppercase tracking-[0.25em] font-semibold border-b border-[#c5a880]/10 pb-2 max-w-[150px]">
              {t('footer.newsletter')}
            </h4>
            <p className="text-xs text-[#fcfbf9]/60 leading-relaxed max-w-xs font-light">
              {t('footer.newsletterDesc')}
            </p>
            {subscribed ? (
              <div className="glass-card p-5 text-center border-[#c5a880]/30 animate-fade-in">
                <span className="text-[#c5a880] text-[11px] font-semibold tracking-[0.15em] block mb-2">
                  {t('footer.newsletterSuccess')}
                </span>
                <p className="text-[10px] text-[#fcfbf9]/60 leading-relaxed">
                  {t('footer.newsletterSuccessDesc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5 mt-2 w-full max-w-xs">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletterPlaceholder')} 
                  className="bg-black/40 border border-[#c5a880]/20 rounded-none text-xs text-[#fcfbf9] placeholder-[#fcfbf9]/30 py-3 px-4 focus:outline-none focus:border-[#c5a880]/60 focus:ring-1 focus:ring-[#c5a880]/30 w-full transition-all duration-300 font-light"
                  required
                />
                <button 
                  type="submit" 
                  className="border border-[#c5a880] bg-transparent text-[#c5a880] font-semibold text-[11px] tracking-[0.2em] uppercase py-3 px-4 w-full transition-all duration-500 hover:bg-[#c5a880] hover:text-[#1c1514] hover:shadow-[0_0_15px_rgba(197,168,128,0.2)] cursor-pointer select-none text-center"
                >
                  {t('footer.newsletterBtn')}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#c5a880]/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#fcfbf9]/40 tracking-wider">
          <p>{t('footer.copyright')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#c5a880] transition-colors duration-300">
              {t('footer.privacy')}
            </a>
            <a href="#" className="hover:text-[#c5a880] transition-colors duration-300">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
