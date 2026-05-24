import { useState, useEffect } from 'react';
import logoUvva from '../assets/logo-uvva.png';
import { useLanguage } from '../context/LanguageContext';

export default function AgeGate() {
  const { t, currentLanguage } = useLanguage();
  const [status, setStatus] = useState('checking'); // 'checking' | 'verified' | 'gate' | 'blocked'

  useEffect(() => {
    // Check localStorage for previous verification
    const isVerified = localStorage.getItem('uvva-age-verified');
    if (isVerified === 'true') {
      setStatus('verified');
    } else if (isVerified === 'false') {
      setStatus('blocked');
    } else {
      setStatus('gate');
    }
  }, []);

  useEffect(() => {
    // Lock body scroll when verification or block screen is active
    if (status === 'gate' || status === 'blocked') {
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
  }, [status]);

  const handleConfirm = () => {
    localStorage.setItem('uvva-age-verified', 'true');
    setStatus('verified');
  };

  const handleDeny = () => {
    localStorage.setItem('uvva-age-verified', 'false');
    setStatus('blocked');
  };

  if (status === 'checking' || status === 'verified') {
    return null;
  }

  if (status === 'blocked') {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#1c1514] flex items-center justify-center p-6 text-center select-none fade-in">
        <div className="max-w-2xl mx-auto space-y-8 fade-in-up">
          {/* Main restriction title from user's design image */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-title font-light text-[#fcfbf9] leading-tight max-w-lg mx-auto tracking-wide">
            {currentLanguage === 'EN' 
              ? 'Access to the website is restricted to individuals over 18.' 
              : currentLanguage === 'ES' 
                ? 'El acceso al sitio web está restringido a mayores de 18 años.' 
                : 'Acesso ao site restrito a maiores de 18 anos.'}
          </h1>
          
          {/* Subtle luxurious gold separator line */}
          <div className="h-[1px] w-12 bg-[#c5a880]/30 mx-auto"></div>

          {/* Description details from the image */}
          <p className="text-xs sm:text-sm text-[#fcfbf9]/60 font-section leading-relaxed max-w-md mx-auto">
            {currentLanguage === 'EN'
              ? 'For safety and compliance reasons, we cannot grant you access at this time. Thank you for your interest.'
              : currentLanguage === 'ES'
                ? 'Por razones de seguridad y cumplimiento, no podemos permitirle el acceso en este momento. Agradecemos su interés.'
                : 'Por questões de segurança e conformidade, não podemos liberar seu acesso no momento. Agradecemos o interesse.'}
          </p>
        </div>
      </div>
    );
  }

  // Active Verification Gate Screen
  return (
    <div className="fixed inset-0 z-[9999] bg-[#1c1514] flex items-center justify-center p-6 text-center select-none overflow-y-auto fade-in">
      
      {/* Decorative premium glassmorphic ambient lights */}
      <div className="absolute top-1/4 left-1/4 h-[250px] w-[250px] rounded-full bg-[#c5a880]/4 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 h-[250px] w-[250px] rounded-full bg-[#c5a880]/4 blur-[120px] pointer-events-none"></div>
 
      <div className="max-w-xl mx-auto space-y-10 z-10 py-8 fade-in-up">
        {/* Symmetric Brand Logo */}
        <div className="w-24 sm:w-28 mx-auto">
          <img src={logoUvva} alt="Vinícola UVVA" className="w-full h-auto" />
        </div>

        {/* Informative Header */}
        <div className="space-y-4">
          <span className="text-[#c5a880] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold block">
            {currentLanguage === 'EN'
              ? 'AGE VERIFICATION'
              : currentLanguage === 'ES'
                ? 'VERIFICACIÓN DE EDAD'
                : 'VERIFICAÇÃO DE MAIORIDADE'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-title font-light text-[#fcfbf9] leading-tight max-w-sm mx-auto">
            {t('ageGate.title')}
          </h2>
          <p className="text-xs sm:text-sm text-[#fcfbf9]/50 font-section leading-relaxed max-w-xs mx-auto">
            {t('ageGate.description')}
          </p>
        </div>

        {/* Elegant Gold Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs mx-auto pt-2">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#c5a880] hover:bg-[#b3956d] text-[#1c1514] font-semibold text-xs tracking-[0.2em] uppercase py-4 px-8 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center shadow-xl cursor-pointer"
          >
            {currentLanguage === 'EN' ? 'Yes' : currentLanguage === 'ES' ? 'Sí' : 'Sim'}
          </button>
          
          <button
            onClick={handleDeny}
            className="w-full border border-[#fcfbf9]/20 hover:border-[#c5a880] hover:bg-[#c5a880]/5 text-[#fcfbf9]/80 hover:text-[#c5a880] font-semibold text-xs tracking-[0.2em] uppercase py-4 px-8 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center cursor-pointer"
          >
            {currentLanguage === 'EN' ? 'No' : currentLanguage === 'ES' ? 'No' : 'Não'}
          </button>
        </div>

        {/* Bottom micro-copy */}
        <p className="text-[10px] text-[#fcfbf9]/30 tracking-widest font-section max-w-xs mx-auto leading-relaxed">
          {currentLanguage === 'EN'
            ? 'By proceeding, you accept our terms of use. Please drink responsibly.'
            : currentLanguage === 'ES'
              ? 'Al continuar, acepta nuestros términos de uso. Beba con moderación.'
              : 'Ao prosseguir, você aceita nossos termos de uso. Beba com moderação.'}
        </p>

      </div>
    </div>
  );
}
